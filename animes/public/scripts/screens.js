const trendingAnimes = document.querySelector("#trend");
const popularityAnimes = document.querySelector("#popular");

function createLoadingScreen() {
  let loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");

  const img = document.createElement("img");
  img.setAttribute("src", "/icons/spinner.svg");

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
  img.setAttribute("src", "/img/undraw_server_down_s-4-lk.svg");

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
  a.style.color = "#FF6D00";

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
  div.classList.add("anime-cover");

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
};

const createAnime = (animeData) => {
  const animeContainer = document.querySelector(".animeContainer");
  animeContainer.setAttribute("id", animeData.id);

  const animeBannerDiv = document.createElement("div");
  animeBannerDiv.classList.add("anime-banner");

  const animeBanner = document.createElement("img");
  animeBanner.setAttribute("alt", "anime banner");
  animeBanner.setAttribute("src", animeData.bannerImage);

  animeBannerDiv.appendChild(animeBanner);

  const animeInfoDiv = document.createElement("div");
  animeInfoDiv.classList.add("anime-info");

  const animeCover = document.createElement("img");
  animeCover.classList.add("anime-cover");
  animeCover.setAttribute('alt', 'anime cover')
  animeCover.setAttribute('src', animeData.coverImage.large)

  animeInfoDiv.appendChild(animeCover)

  const box = document.createElement('box')

  const animeName = document.createElement('h2');
  animeName.classList.add('anime-name')
  animeName.textContent = animeData.title.romaji

  box.appendChild(animeName)

  const japaneseName = document.createElement('p')
  japaneseName.textContent = `Japanese name: ${animeData.title.native}`

  box.appendChild(japaneseName)

  const synopse = document.createElement('p')
  synopse.textContent = `Synopse: ${animeData.description.slice(0, animeData.description.indexOf('<br>'))}`
  
  box.appendChild(synopse)

  const episodes = document.createElement('p')
  episodes.textContent = `${animeData.episodes} episodes | ${animeData.duration} per ep`

  box.appendChild(episodes)

  const genres = document.createElement('p')
  genres.textContent = 'Genres: '

  animeData.genres.forEach((genre) => {
    const span = document.createElement('span')
    span.classList.add('gen')
    span.textContent = genre;
    genres.appendChild(span)
  })

  box.appendChild(genres)

  animeInfoDiv.appendChild(box)

  animeContainer.appendChild(animeBannerDiv)
  animeContainer.appendChild(animeInfoDiv)
};

export {
  createAnime,
  createAnimeList,
  createErrorScreen,
  createLoadingScreen,
  createNonAnimeFoundScreen,
};
