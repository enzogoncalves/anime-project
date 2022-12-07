export default function carousel() {
var tid = setInterval( function () {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );       

  const elem = document.querySelectorAll(".main-carousel");
  
  elem.forEach((el) => {
    const flkty = new Flickity(el, {
      // options
      cellAlign: "left",
      contain: true,
      pageDots: false,
      imagesLoaded: true,
      autoPlay: true,
      freeScroll: true,
    });
  
    flkty.on('dragStart', () => flkty.slider.style.pointerEvents = 'none');
    flkty.on('dragEnd', () => flkty.slider.style.pointerEvents = 'auto');
  });
}, 200);
}
