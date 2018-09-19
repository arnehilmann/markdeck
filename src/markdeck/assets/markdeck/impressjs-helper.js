document.addEventListener("impress:init", function(event){
    console.log(event);
    var api = event.detail.api;
    var root = event.target;
    var window_scale = 1.0;
    var t = root.style.transform;
    var start = t.indexOf("scale(");
    if (start >= 0) {
        var end = t.indexOf(")", start);
        window_scale = t.substring(start + "scale(".length, end);
    }
    console.log("window scale: " + window_scale);
    var steps = api.lib.util.$$(".step", root);
    steps.forEach(function(step){
        step.dataset.x = (step.dataset.x / window_scale) * window.innerWidth;
        step.dataset.y = (step.dataset.y / window_scale) * window.innerHeight;
    });
    api.lib.util.$$(".step.left", root).forEach(function(step){
        step.style.left = (step.dataset.scale / window_scale * (step.clientWidth * window_scale - window.innerWidth) / 2) + "px";
    });
    api.lib.util.$$(".step.right", root).forEach(function(step){
        step.style.left = (-step.dataset.scale / window_scale * (step.clientWidth * window_scale - window.innerWidth) / 2) + "px";
    });
    api.lib.util.$$(".step.top", root).forEach(function(step){
        step.style.top = (step.dataset.scale / window_scale * (step.clientHeight * window_scale - window.innerHeight) / 2) + "px";
    });
    api.lib.util.$$(".step.bottom", root).forEach(function(step){
        step.style.top = (-step.dataset.scale / window_scale * (step.clientHeight * window_scale - window.innerHeight) / 2) + "px";
    });
    impress().goto(0);
    steps.forEach(function(step){
        var background = step.dataset.background;
        var background_image = step.dataset.backgroundImage;
        if (background || background_image) {
            var bg_div = document.getElementById(step.id + "__bg");
            if (bg_div) {
                bg_div.style.width = (window.innerWidth / window_scale) + "px";
                bg_div.style.height = (window.innerHeight / window_scale) + "px";
                bg_div.style.zIndex = step.style.zIndex - 10;
                bg_div.style.position = "absolute";
                bg_div.style.background = background;
                if (background_image) {
                    bg_div.style.backgroundImage = "url('" + background_image + "')";
                    //bg_div.style.backgroundSize = "cover";
                    bg_div.style.backgroundSize = bg_div.style.width + " " + bg_div.style.height;
                }
                bg_div.style.transform = step.style.transform;
                var step_scale = step.dataset.scale;
                //bg_div.style.width = (window.innerWidth / window_scale) + "px";
                //bg_div.style.height = (window.innerHeight / window_scale) + "px";
                root.children[0].insertBefore(bg_div, root.children[0].childNodes[0]);

                var computedBackgroundStyle = window.getComputedStyle(bg_div);
                if (computedBackgroundStyle && computedBackgroundStyle.backgroundColor) {
                    var rgb = colorToRgb(computedBackgroundStyle.backgroundColor);

                    // Ignore fully transparent backgrounds. Some browsers return
                    // rgba(0,0,0,0) when reading the computed background color of
                    // an element with no background
                    if (rgb && rgb.a !== 0) {
                        if (colorBrightness(computedBackgroundStyle.backgroundColor) < 128) {
                            step.classList.add('has-dark-background');
                        }
                        else {
                            step.classList.add('has-light-background');
                        }
                    }
                }
            }
        }
    });
});


function colorToRgb( color ) {

    var hex3 = color.match( /^#([0-9a-f]{3})$/i );
    if( hex3 && hex3[1] ) {
        hex3 = hex3[1];
        return {
            r: parseInt( hex3.charAt( 0 ), 16 ) * 0x11,
            g: parseInt( hex3.charAt( 1 ), 16 ) * 0x11,
            b: parseInt( hex3.charAt( 2 ), 16 ) * 0x11
        };
    }

    var hex6 = color.match( /^#([0-9a-f]{6})$/i );
    if( hex6 && hex6[1] ) {
        hex6 = hex6[1];
        return {
            r: parseInt( hex6.substr( 0, 2 ), 16 ),
            g: parseInt( hex6.substr( 2, 2 ), 16 ),
            b: parseInt( hex6.substr( 4, 2 ), 16 )
        };
    }

    var rgb = color.match( /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i );
    if( rgb ) {
        return {
            r: parseInt( rgb[1], 10 ),
            g: parseInt( rgb[2], 10 ),
            b: parseInt( rgb[3], 10 )
        };
    }

    var rgba = color.match( /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i );
    if( rgba ) {
        return {
            r: parseInt( rgba[1], 10 ),
            g: parseInt( rgba[2], 10 ),
            b: parseInt( rgba[3], 10 ),
            a: parseFloat( rgba[4] )
        };
    }

    return null;

}

/**
    * Calculates brightness on a scale of 0-255.
    *
    * @param {string} color See colorToRgb for supported formats.
    * @see {@link colorToRgb}
    */
function colorBrightness( color ) {

    if( typeof color === 'string' ) color = colorToRgb( color );

    if( color ) {
        return ( color.r * 299 + color.g * 587 + color.b * 114 ) / 1000;
    }

    return null;

}
