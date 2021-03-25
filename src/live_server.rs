//! Simple echo websocket server.
//! Open `http://localhost:8080/ws/index.html` in browser
//! or [python console client](https://github.com/actix/examples/blob/master/websocket/websocket-client.py)
//! could be used for testing.
//! blatantly copied from https://github.com/actix/examples/blob/master/websockets/websocket/src/main.rs

use std::collections::HashSet;
use std::panic;
use std::path::Path;
use std::sync::mpsc::Receiver;
use std::sync::Arc;
use std::sync::RwLock;
use std::thread;
use std::time::{Duration, Instant};

use actix::prelude::*;
use actix_files as fs;
use actix_web::web::Data;
use actix_web::Responder;
use actix_web::{middleware, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;

async fn get_sessions(r: HttpRequest, _stream: web::Payload) -> impl Responder {
    let mydata = r
        .app_data::<Data<Arc<RwLock<Concierge>>>>()
        .expect("no mydata found!");
    format!("aha: {:#?}", mydata.get_ref())
}

/// How often heartbeat pings are sent
const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);
/// How long before lack of client response causes a timeout
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

async fn ws_index(r: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let concierge = r
        .app_data::<Data<Arc<RwLock<Concierge>>>>()
        .expect("no concierge found!");
    let mws = MyWebSocket::new(concierge.get_ref().clone());
    let (addr, res) = ws::start_with_addr(mws, &r, stream)?;

    /*
    let data_arc = r
        .app_data::<Data<Arc<RwLock<Concierge>>>>()
        .expect("TODO")
        .get_ref();
    println!("{:#?}", data_arc);
    if let Ok(mut data) = data_arc.write() {
        data.sockets.insert(addr);
    }
    */
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
        println!("Websocket started");
        let addr = ctx.address();
        if let Ok(mut concierge) = self.concierge.write() {
            concierge.sockets.insert(addr);
        }
        self.hb(ctx);
    }

    fn stopped(&mut self, ctx: &mut Self::Context) {
        println!("Websocket stopped");
        let addr = ctx.address();
        if let Ok(mut concierge) = self.concierge.write() {
            concierge.sockets.remove(&addr);
        }
    }
}

#[derive(Message, Debug, Clone)]
#[rtype(result = "()")]
pub enum Trigger {
    Reload,
    RefreshCss,
    Shutdown,
}

impl Handler<Trigger> for MyWebSocket {
    type Result = ();

    fn handle(&mut self, msg: Trigger, ctx: &mut Self::Context) -> Self::Result {
        println!("handling trigger {:#?}", msg);
        match msg {
            Trigger::Reload => ctx.text("reload"),
            Trigger::RefreshCss => ctx.text("refreshcss"),
            Trigger::Shutdown => ctx.text("shutdown"),
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
                println!("Websocket Client heartbeat failed, disconnecting!");
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

#[actix_web::main]
pub async fn start_live_server(
    docroot: &'static Path,
    rx: Receiver<Trigger>,
) -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_server=info,actix_web=info");
    env_logger::init();

    let concierge = Arc::new(RwLock::new(Concierge::new()));
    let concierge_extern = concierge.clone();

    thread::spawn(move || {
        loop {
            let msg = rx.recv().unwrap(); // TODO
            if let Ok(mut c) = concierge_extern.write() {
                c.trigger(msg);
            }
        }
    });

    HttpServer::new(move || {
        App::new()
            .data(concierge.clone())
            .data(docroot)
            .wrap(middleware::Logger::default())
            .service(web::resource("/ws").route(web::get().to(ws_index)))
            .service(web::resource("/").route(web::get().to(|| {
                HttpResponse::Found()
                    .header("LOCATION", "index.html")
                    .finish()
            })))
            .service(web::resource("/index.html").route(web::get().to(patch_response)))
            // .service(web::resource("/refresh").route(web::get().to(refresh)))
            // .service(web::resource("/reload").route(web::get().to(reload)))
            // .route("/sessions", web::get().to(get_sessions))
            .service(fs::Files::new("/", docroot))
    })
    .bind("127.0.0.1:8081")?
    .run()
    .await
}

/*
async fn reload(r: HttpRequest, _stream: web::Payload) -> Result<HttpResponse, Error> {
    println!("triggering reload");
    if let Ok(mut concierge) = r
        .app_data::<Data<Arc<RwLock<Concierge>>>>()
        .expect("no state?!")
        .write()
    {
        // concierge.address().do_send(Trigger::Reload);
        concierge.trigger(Trigger::Reload);
    }
    Ok(actix_web::HttpResponse::Ok().body(""))
}

async fn refresh(r: HttpRequest, _stream: web::Payload) -> Result<HttpResponse, Error> {
    println!("triggering refresh");
    if let Ok(mut concierge) = r
        .app_data::<Data<Arc<RwLock<Concierge>>>>()
        .expect("no state?!")
        .write()
    {
        // concierge.address().do_send(Trigger::Reload);
        concierge.trigger(Trigger::RefreshCss);
    }
    Ok(actix_web::HttpResponse::Ok().body(""))
}
*/

async fn patch_response(r: HttpRequest, _stream: web::Payload) -> Result<HttpResponse, Error> {
    let body = std::fs::read(format!(
        "{}/index.html",
        r.app_data::<Data<&Path>>().expect("no docroot?").display()
    ))?;
    let res = actix_web::HttpResponse::Ok().body(format!(
        "{}\n\n\n{}",
        String::from_utf8_lossy(&body),
        r#"
<!-- Code injected by live-server -->
<script type="text/javascript">
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function() {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
                    console.log(elem);
                    if (elem.href && elem.href.contains("rerendering.css")) {
                        head.removeChild(elem);
                        var rel = elem.rel;
                        if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                            var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                            elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                        }
                        head.appendChild(elem);
                    }
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function(msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			console.log('Live reload enabled.');
		})();
	}
	// ]]>
</script>
        "#
    ));
    Ok(res)
}
