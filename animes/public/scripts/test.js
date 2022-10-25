// main.js
var Flickity = require('flickity');
require('flickity-imagesloaded');

const flkty = new Flickity('.main-carousel', {
  // options
  cellAlign: "left",
  contain: true,
  pageDots: false,
  imagesLoaded: true
});

 