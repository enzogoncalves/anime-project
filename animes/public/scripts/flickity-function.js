export default function carousel() {
  const elem = document.querySelectorAll(".main-carousel");
  elem.forEach((el) => {
    const flkty = new Flickity(el, {
      // options
      cellAlign: "left",
      contain: true,
      pageDots: false,
      imagesLoaded: true
    });
  });
}
