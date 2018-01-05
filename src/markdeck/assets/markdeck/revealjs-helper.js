
function beautify_emojis(selector="h1, h2, span, p") {
    $(selector).Emoji({
        path:  'assets/3rdparty/jqueryemoji/apple72/',
        class: 'emoji',
        ext:   'png'
    });
}

function calc_offset_left() {
    var offset_left = $(".slides").offset().left;
    var t = $(".slides")[0].style.transform;
    var start = t.indexOf("scale(");
    var end = t.indexOf(")", start);
    var s = t.substring(start + "scale(".length, end);
    return offset_left / s;
}

function flushleft(selector) {
    function deoffset() {
        var rel_offset_left = calc_offset_left();
        $(selector).each(function(i, e){
            $(this).css({"margin-left": "-" + rel_offset_left + "px"});
        });
    }
    if (window.pdf_render) {
        setTimeout(deoffset, 200);
    } else {
        deoffset();
        $(window).on("resize", deoffset);
    }
}

function centerleft(selector) {
    function deoffset() {
        var rel_offset_left = calc_offset_left() / 2;
        $(selector).each(function(i, e){
            $(this).css({"margin-left": "-" + rel_offset_left + "px"});
        });
    }
    if (window.pdf_render) {
        setTimeout(deoffset, 200);
    } else {
        deoffset();
        $(window).on("resize", deoffset);
    }
}
