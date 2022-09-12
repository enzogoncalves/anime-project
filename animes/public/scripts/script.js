import {
  createAnimeScreen,
  createErrorScreen,
  createLoadingScreen,
  createNonAnimeFoundScreen,
} from "./screens.js";

const w = document.querySelector("#w");

window.addEventListener("resize", () => {
  w.textContent = window.innerWidth;
});

const menu_toggle = document.querySelector(".menu_toggle");
const nav = document.querySelector("nav");
menu_toggle.addEventListener("click", ({ target }) => {
  target.getAttribute("src") == "/icon/menu.svg"
    ? (menu_toggle.src = "/icon/clear.svg")
    : (menu_toggle.src = "/icon/menu.svg");

  nav.classList.contains("active")
    ? nav.classList.remove("active")
    : nav.classList.add("active");
});

// --- SCREENS ---

function carousel() {
  const elem = document.querySelector(".main-carousel");
  const flkty = new Flickity(elem, {
    // options
    cellAlign: "left",
    contain: true,
    pageDots: false,
  });
}

function getTopAnimes() {
  axios
    .get("https://api.jikan.moe/v4/top/anime")
    .then((res) => res.data.data)
    .then((data) => {
      data.forEach((anime) => {
        createAnimeScreen(
          anime.mal_id,
          anime.images.webp.image_url,
          anime.title,
          anime.episodes
        );
      });
    })
    .then(() => {
      carousel();
    })
    .catch((err) => console.log(err));
}

getTopAnimes();
