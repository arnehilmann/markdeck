function calc_offset_left() {
    return offset_left = $(".slides").offset().left / window.deck.getScale();
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
