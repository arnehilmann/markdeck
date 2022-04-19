function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const launchPdfRendering = () => {
    // console.log(window.location)
    // const render_url = window.location.origin + "/?render-pdf"
    // const render_url = window.location + ";render-pdf;"
    const render_url = window.origin + "/index.html?render-pdf"
    console.log("redirecting to", render_url)
    window.open(render_url, "markdeck-pdf",
        "location=no,menubar=no,scrollbars=no,status=no,titlebar=no,toolbar=no,resizeable=yes,width=100,height=100")
}

const renderPdf = async (filename, cbs, width=960, height=740,
            maxFrames=200, frameDelay=100, initialDelay=2000) => {
    console.log("rendering pdf now")

    const { jsPDF } = window.jspdf;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = document.createElement("video");

    try {
        console.log("preparing slides for pdf rendering")
        document.body.classList.add("rendering")
        window.resizeTo(width, height)
        cbs.init()

        const orig_title = document.title
        document.title = "✼ ✼ ✼ MARKDECK PDF RENDERING ✼ ✼ ✼"
        var displayMediaOptions = {video: {cursor: "never"}, audio: false};
        const captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        // console.log(captureStream)
        document.title = orig_title
        const captureTrack = captureStream.getVideoTracks()[0]
        captureTrack.onmute = captureTrack.onunmute = captureTrack.onended = e => console.log(e.type, e)
                
        await captureTrack.applyConstraints({
            resizeMode: 'none',
            cursor: 'never',
            width: width,
            height: height,
        });
        // console.log(captureTrack)
        const captureDevice = new ImageCapture(captureTrack)
        // console.log(captureDevice)

        const doc = new jsPDF({
            orientation: "landscape", 
            unit: "px",
            format: [width, height],
            hotfixes: ["px_scaling"],
            putOnlyUsedFonts: true,
            compress: true,
        })

        await delay(initialDelay)

        let first = true

        async function grab() {
            const MAX_ATTEMPTS = 10
            captureTrack.enabled = true
            for (var i = 0; i <= MAX_ATTEMPTS; i++) {
                if (captureTrack.readyState == "live" && !captureTrack.muted) {
                    break
                }
                console.log("attempt", i, ":", captureTrack.readyState, captureTrack.muted ? "muted" : "")
                if (captureTrack.readyState == "ended") {
                    throw new Error("track ended prematurely")
                }
                if (i == MAX_ATTEMPTS) {
                    throw new Error("track not ready!")
                }
                captureTrack.enabled = false
                await delay(200)
                captureTrack.enabled = true
                await delay(200)
            }
            return captureDevice.grabFrame()
                .then(frame => {
                    captureTrack.enabled = false
                    const s = Math.max(frame.width / width, frame.height / height)
                    const cw = frame.width / s
                    const ch = frame.height / s
                    const top = (height - ch) / 2
                    canvas.width = cw
                    canvas.height = ch
                    context.drawImage(frame, 0, 0, cw, ch)
                    frame.close()
                    const dataUrl = canvas.toDataURL("image/png")
                    if (!first) {
                        doc.addPage()
                        // throw new Error("aha")
                    }
                    first = false
                    doc.addImage(dataUrl, "PNG", 0, top)
                })
                .catch(error => {
                    console.error(error)
                    console.error(captureTrack)
                    throw error
                })
        }

        let renderError = undefined
        for (var i = 0; i < maxFrames; i++) {
            console.log("adding frame", i)
            try {
                await grab()
            } catch (error) {
                console.error(error)
                renderError = error
                document.body.classList.add("render-error")
            }
            if (cbs.isLastSlide()) {
                break
            }
            if (renderError) {
                break
            }
            await cbs.nextSlide()
            await delay(frameDelay)
        }

        if (!renderError) {
            doc.save(filename)
            console.log("saved to", filename)
        }
        captureStream.getTracks().forEach(track => track.stop());
    } catch (err) {
        console.error("Error: " + err);
    }
};
