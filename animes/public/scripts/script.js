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

function getAnimes() {
  // Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let query = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
    }
    media(type: ANIME, sort: TRENDING_DESC) {
      id
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
        large
        color
      }
      episodes
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
let variables = {
page: 0,
perPage: 30
};

// Define the config we'll need for our Api request
let url = "https://graphql.anilist.co",
options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: query,
    variables: variables,
  }),
};

// Make the HTTP Api request
fetch(url, options)
  .then(handleResponse)
  .then(handleData)
  .then(carousel)
  .catch(handleError);

function handleResponse(response) {
  return response.json().then(function (json) {
  return response.ok ? json : Promise.reject(json);
});
}

function handleData(data) {
  console.log(data.data.Page)
  data.data.Page.media.forEach((anime) => {
    createAnimeScreen(
      anime.id,
      anime.coverImage.large,
      anime.title.romaji,
      anime.episodes,
      1
    );
  });
}

function handleError(error) {
alert("Error, check console");
console.error(error);
}
}

getAnimes();