const trendingAnimes = document.querySelector("#trend");
const popularityAnimes = document.querySelector("#popular");

function createLoadingScreen() {
  let loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");

  const img = document.createElement("img");
  img.setAttribute("src", "/icon/spinner.svg");

  const p = document.createElement("p");
  p.textContent = "carregando...";

  loadingDiv.appendChild(img);
  loadingDiv.appendChild(p);

  return loadingDiv;
}

function createErrorScreen() {
  let errorScreen = document.createElement("div");
  errorScreen.classList.add("error-screen");

  const img = document.createElement("img");
  img.setAttribute("src", "/imgs/undraw_server_down_s-4-lk.svg");

  const p = document.createElement("p");
  p.textContent = "Não conseguimos conectar ao servidor :(";

  errorScreen.appendChild(img);
  errorScreen.appendChild(p);

  return errorScreen;
}

function createNonAnimeFoundScreen() {
  let NonAnimeFoundScreen = document.createElement("div");
  NonAnimeFoundScreen.classList.add("nonAnimeFound");

  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = "Clique aqui para adicionar!";

  const p = document.createElement("p");
  p.textContent = "Nenhum anime encontrado. ";

  p.appendChild(a);

  NonAnimeFoundScreen.appendChild(p);

  return NonAnimeFoundScreen;
}

const createAnimeList = (
  animeId,
  animeImg = "",
  animeTile = "",
  animeEp = "0",
  parentDiv
) => {
  const animeScreen = document.createElement("div");
  animeScreen.setAttribute("id", animeId);
  animeScreen.classList.add("anime", "carousel-cell");

  const div = document.createElement("div");
  div.classList.add("anime-img");

  const animeImgElement = document.createElement("img");
  animeImgElement.setAttribute("src", animeImg);
  animeImgElement.setAttribute("alt", "anime image");

  if (animeEp) {
    var animeEpElement = document.createElement("span");
    animeEpElement.classList.add("episodes");
    animeEp == 1
      ? (animeEpElement.textContent = animeEp + " episode")
      : (animeEpElement.textContent = animeEp + " episodes");
  }

  const animeTitleElement = document.createElement("p");
  animeTitleElement.classList.add("anime-title");
  animeTitleElement.textContent = animeTile;

  div.appendChild(animeImgElement);

  if (animeEp) {
    div.appendChild(animeEpElement);
  }

  animeScreen.appendChild(div);
  animeScreen.appendChild(animeTitleElement);

  if (parentDiv == 1) {
    trendingAnimes.appendChild(animeScreen);
  } else if (parentDiv == 2) {
    popularityAnimes.appendChild(animeScreen);
  }
}

const createAnime = (animeData) => {
  const section = document.querySelector("section")
}

export {
  createAnime,
  createAnimeList,
  createErrorScreen,
  createLoadingScreen,
  createNonAnimeFoundScreen,
};
