const w = document.querySelector("#w");

window.addEventListener('resize', () => {
  w.textContent = window.innerWidth;
})

const menu_toggle = document.querySelector(".menu_toggle")
const nav = document.querySelector("nav")
menu_toggle.addEventListener("click", ({target}) => {
  target.getAttribute('src') == "../assets/icon/menu.svg" 
  ? menu_toggle.src = "../assets/icon/clear.svg" 
  : menu_toggle.src = "../assets/icon/menu.svg"

  nav.classList.contains("active") 
  ? nav.classList.remove("active")
  : nav.classList.add("active")
})

const elem = document.querySelector('.main-carousel');
const flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});


// --- SCREENS ---

function createLoadingScreen() {
  let loadingDiv = document.createElement('div')
  loadingDiv.classList.add("loading")

  const img = document.createElement('img');
  img.setAttribute("src", "../assets/icon/spinner.svg")

  const p = document.createElement('p');
  p.textContent = "carregando..."

  loadingDiv.appendChild(img)
  loadingDiv.appendChild(p)

  return loadingDiv;
}

function createErrorScreen() {
  let errorScreen = document.createElement('div')
  errorScreen.classList.add("error-screen")

  const img = document.createElement('img');
  img.setAttribute("src", "../assets/img/undraw_server_down_s-4-lk.svg")

  const p = document.createElement('p');
  p.textContent = "Não conseguimos conectar ao servidor :("

  errorScreen.appendChild(img)
  errorScreen.appendChild(p)

  return errorScreen;
}

function createNonAnimeFoundScreen() {
  let NonAnimeFoundScreen = document.createElement('div')
  NonAnimeFoundScreen.classList.add("nonAnimeFound")

  const a = document.createElement("a");
  a.setAttribute("href", "#")
  a.textContent = "Clique aqui para adicionar!"

  const p = document.createElement('p');
  p.textContent = "Nenhum anime encontrado. "

  p.appendChild(a)

  NonAnimeFoundScreen.appendChild(p)

  return NonAnimeFoundScreen;
}

function createAnimeScreen(animeImg = "", animeTile = "", animeEp = "0") {
  const animeScreen = document.createElement('div')
  animeScreen.classList.add('anime carousel-cell')

  const div = document.createElement('div')
  div.classList.add("anime-img")

  const animeImgElement = document.createElement('img')
  animeImgElement.setAttribute('src', animeImg)
  animeImgElement.setAttribute('alt', 'anime image')

  const animeEpElement = document.createElement('span')
  animeEpElement.classList.add("episodes")
  animeEpElement.textContent = animeEp;

  const animeTitleElement = document.createElement('p')
  animeTitleElement.classList.add("anime-title")
  animeTitleElement.textContent = animeTile;

  div.appendChild(animeImgElement)
  div.appendChild(animeEpElement)
  return animeScreen;
}

axios.get("")