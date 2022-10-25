const w = document.querySelector("#w");

window.addEventListener("resize", () => {
  w.textContent = window.innerWidth;
});

const nav = document.querySelector("nav");

function openMenu(el) {
  if(el.classList.contains('fa-bars')) {
    el.classList.add('fa-xmark')
    el.classList.remove('fa-bars')
  } else {
    el.classList.add('fa-bars')
    el.classList.remove('fa-xmark')
  }

  nav.classList.contains("active")
    ? nav.classList.remove("active")
    : nav.classList.add("active");
}
 
// export default function carousel() {
//   const elem = document.querySelectorAll(".main-carousel");
//   elem.forEach((el) => {
//     const flkty = new Flickity(el, {
//       // options
//       cellAlign: "left",
//       contain: true,
//       pageDots: false,
//     });
//   });
// }

