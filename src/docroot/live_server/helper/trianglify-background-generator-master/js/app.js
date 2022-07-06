var currentTrianglifier;
var currentPattern;

var palettes = [];
var currentXPalette;
var currentYPalette;

var NO_OF_PALETTES_TO_RETRIEVE = 100;

var triOptions = {
  width: function() {
    return parseInt($("#bg-width").val());
  },
  height: function() {
    return parseInt($("#bg-height").val());
  },
  cellSize: function(){
    return $('#cell-slider').slider("value");
  },
  cellpadding: function(){
    return $('#cellpadding-slider').slider("value");
  },
  bleed: function(){
    return $('#bleed-slider').slider("value");
  },
  xColors: function(){
    return currentXPalette.colors;
  },
  yColors: function(){
    return currentYPalette.colors;
  }
};

initialiseApp();

function initialiseApp() {
  initiateSliders();
  getColourSchemes(NO_OF_PALETTES_TO_RETRIEVE);
}

function setNewTrianglifier() {
  currentTrianglifier = new Trianglify({"bleed": triOptions.bleed(),
                          "cellsize": triOptions.cellSize(),
                          "x_gradient": triOptions.xColors(),
                          "y_gradient": triOptions.yColors(),
                          "cellpadding": triOptions.cellpadding(),
                          "noiseIntensity": 0
                        });
}

function updateScreen() {
  setNewTrianglifier();
  generateBackground();
}

function generateBackground() {
  currentPattern = currentTrianglifier.generate(triOptions.width(), triOptions.height());
  $("#backgrounds").css({"background-image": currentPattern.dataUrl});
  convertSVGtoPNG();
}

// Creates an image from an SVG, then sets up the 'Download' link so the user
// can open the image in a new tab
function convertSVGtoPNG() {
  var canvas = document.getElementById('the-canvas');
  var context = canvas.getContext('2d');
  canvas.width = triOptions.width();
  canvas.height = triOptions.height();

  var image = new Image();

  $(image).on("load", function() {
    context.drawImage(image, 0, 0);
    $("#download-btn").attr("href", canvas.toDataURL("image/png"));
  });
  image.src = currentPattern.dataUri;
}

// Class representing a single colour palette made up of multiple colours
// Colours are simply hex strings
function Palette(name, colors) {
  this.name = name;
  this.colors = colors;
}

// Retrieves colour palettes using the Colourlovers API, creating a new Palette
// for each
function getColourSchemes(limit) {
  $.ajax({
      type: "GET",
      url: "http://www.colourlovers.com/api/palettes/top?jsonCallback=?",
      data: { numResults: limit },
      dataType: 'json',
      success: function(data){
        $(data).each(function() {
          var palette_hash = this;
          var palette_name = palette_hash["title"];
          var colors = [];

          $(palette_hash["colors"]).each(function(){
            colors.push("#" + this);
          });

          palettes.push(new Palette(palette_name, colors));
        });
        addColourList();

        currentXPalette = palettes[0];
        currentYPalette = palettes[0];
        updateScreen();
        $("#loading").fadeOut(500);
      }
  });
}

// Adds a scrollable div to the page, containing clickable
// palettes retrieved from the Colourlovers API
function addColourList() {
  addColorbrewerPalettes();
  
  $(palettes).each(function(index){
    var cont = $("<div class='palette-cont clearfix' data-palette-index='" + index + "'></div>");
    var palette = this;
    var noOfColors = palette.colors.length;

    $(palette.colors).each(function(){
      var paletteColor = $("<span class='palette-colour'></span>");
      $(paletteColor).css({"width": (100 / noOfColors) + "%",
                            "background-color": this});
      $(cont).append(paletteColor);
    });
    $("#colour-list").append(cont);
  });

  $("#colour-list").on("click", ".palette-cont", function() {
    var paletteIndex = $(this).data("palette-index");

    $(".palette-cont").css("border", "none");
    $(this).css("border", "3px solid #444444");

    switch($("[type='radio']:checked").val()) {
      case "x":
        currentXPalette = palettes[paletteIndex];
        break;
      case "y":
        currentYPalette = palettes[paletteIndex];
        break;
      case "z":
        currentXPalette = palettes[paletteIndex];
        currentYPalette = palettes[paletteIndex];
        break;
    }
    updateScreen();
  });
}

// UI initialisers and event handlers

function initiateSliders() {
  $('#bleed-slider').slider({
    max: 500,
    min: 10,
    value: 150,
    step: 5,
    slide: function(e, slider) {
      $('#bleed-value').html(slider.value);
      updateScreen();
    }
  });

  $('#cell-slider').slider({
    max: 500,
    min: 10,
    value: 150,
    step: 5,
    slide: function(e, slider) {
      $('#cell-value').html(slider.value);
      updateScreen();
    }
  });

  $('#cellpadding-slider').slider({
    max: 500,
    min: 10,
    value: 15,
    step: 5,
    slide: function(e, slider) {
      $('#cellpadding-value').html(slider.value);
      updateScreen();
    }
  });
}

$(".screen-size-input").on("change", function(){
  updateScreen();
});

$("#randomise-colours").on("click", function(){
  currentXPalette = palettes[(Math.floor(Math.random() * NO_OF_PALETTES_TO_RETRIEVE))];
  currentYPalette = palettes[(Math.floor(Math.random() * NO_OF_PALETTES_TO_RETRIEVE))];
  $(".palette-cont").css("border", "none");
  updateScreen();
});

$("#generate").on('click', function() {
  updateScreen();
});

// $(colorbrewer).each(function(){
//   $(this).each(function(){
//     $(this).each(function(){
//         console.log(this);
//       });
//     });
//   });

function addColorbrewerPalettes() {
  Object.keys(colorbrewer).forEach(function(key){
    Object.keys(colorbrewer[key]).forEach(function(paletteKey){
      var currPalette = colorbrewer[key];
      var colourArray = currPalette[paletteKey];
      palettes.push(new Palette("colorbrewer_palette", colourArray));
    });
  });
}
