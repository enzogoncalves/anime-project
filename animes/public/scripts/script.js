const w = document.querySelector("#w");

window.addEventListener("resize", () => {
  w.textContent = window.innerWidth;
});

const menu_toggle = document.querySelector(".menu_toggle");
const nav = document.querySelector("nav");
menu_toggle.addEventListener("click", ({ target }) => {
  target.getAttribute("src") == "/icons/menu.svg"
    ? (menu_toggle.src = "/icons/close.svg")
    : (menu_toggle.src = "/icons/menu.svg");

  nav.classList.contains("active")
    ? nav.classList.remove("active")
    : nav.classList.add("active");
});

export default function carousel() {
  const elem = document.querySelectorAll(".main-carousel");
  elem.forEach((el) => {
    const flkty = new Flickity(el, {
      // options
      cellAlign: "left",
      contain: true,
      pageDots: false,
    });
  });
}

