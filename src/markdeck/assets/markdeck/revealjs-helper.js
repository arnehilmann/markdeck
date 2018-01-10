
function beautify_emojis(selector="h1, h2, span, p") {
    $(selector).Emoji({
        path:  'assets/3rdparty/jqueryemoji/apple72/',
        class: 'emoji',
        ext:   'png'
    });
}

function calc_offset_left() {
    var offset_left = $(".slides").offset().left;
    // console.log("offset_left: " + offset_left);
    var t = $(".slides")[0].style.transform;
    var start = t.indexOf("scale(");
    if (start > 0) {
        var end = t.indexOf(")", start);
        var s = t.substring(start + "scale(".length, end);
        // console.log("scale: " + s);
        return offset_left / s;
    } else {
        return offset_left;
    }
}

function flushleft(selector) {
    function deoffset() {
        // console.log("flushleft");
        var rel_offset_left = calc_offset_left();
        $(selector).each(function(i, e){
            $(this).css({"margin-left": "-" + rel_offset_left + "px"});
        });
    }
    deoffset();
    if (window.pdf_render) {
        setTimeout(deoffset, 50);
    } else {
        $(window).on("resize", deoffset);
    }
}

function centerleft(selector) {
    function deoffset() {
        // console.log("centerleft");
        var rel_offset_left = calc_offset_left() / 2;
        $(selector).each(function(i, e){
            $(this).css({"margin-left": "-" + rel_offset_left + "px"});
        });
    }
    deoffset();
    if (window.pdf_render) {
        setTimeout(deoffset, 50);
    } else {
        $(window).on("resize", deoffset);
    }
}
