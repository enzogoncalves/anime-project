import {
  createAnimeScreen,
  createErrorScreen,
  createLoadingScreen,
  createNonAnimeFoundScreen,
} from "./screens.js";

import { getAnimes, handleResponse, handleError } from "./api_requests.js";

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

function handleData(data, parentEl) {
  data.data.Page.media.forEach((anime) => {
    createAnimeScreen(
      anime.id,
      anime.coverImage.large,
      anime.title.romaji,
      anime.episodes,
      parentEl
    );
  });
}

function showAnimes(sort, parentEl) {
  const req = getAnimes(sort);
  const { url, options } = req;

  console.log(url, options);

  fetch(url, options)
    .then(handleResponse)
    .then(data => {
      handleData(data, parentEl)
    })
    .catch(handleError)
    .finally(carousel);
}

showAnimes("TRENDING_DESC", 1);
