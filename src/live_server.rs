use std::collections::HashSet;
use std::path::PathBuf;
use std::sync::mpsc::Receiver;
use std::sync::Arc;
use std::sync::RwLock;
use std::thread;
use std::time::{Duration, Instant};

use actix::prelude::*;
use actix_files as fs;
use actix_web::web::Data;
use actix_web::{middleware, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;
use log::{debug, info};
use rust_embed::RustEmbed;

/// How often heartbeat pings are sent
const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);
/// How long before lack of client response causes a timeout
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

#[derive(Message, Debug, Clone)]
#[rtype(result = "()")]
pub enum Trigger {
    Reload,
    StartRerendering,
    Shutdown,
}

impl Handler<Trigger> for MyWebSocket {
    type Result = ();

    fn handle(&mut self, msg: Trigger, ctx: &mut Self::Context) -> Self::Result {
        debug!("handling trigger {:#?}", msg);
        match msg {
            Trigger::Reload => ctx.text("reload"),
            Trigger::StartRerendering => ctx.text("start_rerendering"),
            Trigger::Shutdown => ctx.text("shutdown"),
        }
    }
}

#[actix_web::main]
pub async fn start_live_server(
    docroot: PathBuf,
    port: u32,
    rx: Receiver<Trigger>,
) -> std::io::Result<()> {
    let concierge = Arc::new(RwLock::new(Concierge::new()));
    let concierge_extern = concierge.clone();

    thread::spawn(move || {
        loop {
            let msg = rx.recv().unwrap(); // when sender hangs up, recv() returns an error, thus this thread panics here, good
            if let Ok(mut c) = concierge_extern.write() {
                c.trigger(msg);
            }
        }
    });

    HttpServer::new(move || {
        App::new()
            .data(concierge.clone())
            .data(docroot.clone())
            .wrap(middleware::Logger::default())
            .service(web::resource("/ws").route(web::get().to(ws_index)))
            .service(web::resource("/").route(web::get().to(|| {
                HttpResponse::Found()
                    .header("LOCATION", "index.html")
                    .finish()
            })))
            .service(web::resource("/index.html").route(web::get().to(patch_response)))
            .service(fs::Files::new("/", docroot.clone()))
    })
    // .bind(format!("127.0.0.1:{}", port))?
    .bind(format!("0.0.0.0:{}", port))?
    .run()
    .await
}

async fn ws_index(r: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let concierge = r
        .app_data::<Data<Arc<RwLock<Concierge>>>>()
        .expect("no concierge found!");
    let mws = MyWebSocket::new(concierge.get_ref().clone());
    let (_addr, res) = ws::start_with_addr(mws, &r, stream)?;

    Ok(res)
}

#[derive(Debug)]
struct MyWebSocket {
    hb: Instant,
    concierge: Arc<RwLock<Concierge>>,
}

impl MyWebSocket {
    fn new(concierge: Arc<RwLock<Concierge>>) -> MyWebSocket {
        MyWebSocket {
            hb: Instant::now(),
            concierge,
        }
    }
}

impl Actor for MyWebSocket {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        debug!("Websocket started");
        let addr = ctx.address();
        if let Ok(mut concierge) = self.concierge.write() {
            concierge.sockets.insert(addr);
        }
        self.hb(ctx);
    }

    fn stopped(&mut self, ctx: &mut Self::Context) {
        debug!("Websocket stopped");
        let addr = ctx.address();
        if let Ok(mut concierge) = self.concierge.write() {
            concierge.sockets.remove(&addr);
        }
    }
}

/// Handler for `ws::Message`
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWebSocket {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        // process websocket messages
        // println!("WS: {:?}", msg);
        match msg {
            Ok(ws::Message::Ping(msg)) => {
                self.hb = Instant::now();
                ctx.pong(&msg);
            }
            Ok(ws::Message::Pong(_)) => {
                self.hb = Instant::now();
            }
            Ok(ws::Message::Text(text)) => ctx.text(text),
            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
            Ok(ws::Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            }
            _ => ctx.stop(),
        }
    }
}

impl MyWebSocket {
    fn hb(&self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            // check client heartbeats
            if Instant::now().duration_since(act.hb) > CLIENT_TIMEOUT {
                info!("Websocket Client heartbeat failed, disconnecting!");
                ctx.stop();
                return;
            }
            ctx.ping(b"");
        });
    }
}

#[derive(Debug)]
struct Concierge {
    sockets: HashSet<Addr<MyWebSocket>>,
}

impl Concierge {
    fn new() -> Concierge {
        Concierge {
            sockets: HashSet::new(),
        }
    }

    fn trigger(&mut self, msg: Trigger) {
        for socket in &self.sockets {
            let _ = socket.do_send(msg.clone());
        }
    }
}

#[derive(RustEmbed)]
#[folder = "src/markdeck/.live_server"]
struct Assets;

async fn patch_response(r: HttpRequest, _stream: web::Payload) -> Result<HttpResponse, Error> {
    let body = std::fs::read(format!(
        "{}/index.html",
        r.app_data::<Data<PathBuf>>()
            .expect("no docroot?")
            .display()
    ))?;
    let patch =
        Assets::get("patch-html.html").expect("cannot find html snippet to patch index.html!");
    let res = actix_web::HttpResponse::Ok().body(format!(
        "{}\n\n\n{}", // horray to the lazy html renderer
        String::from_utf8_lossy(&body),
        std::str::from_utf8(&patch)?
    ));
    Ok(res)
}
