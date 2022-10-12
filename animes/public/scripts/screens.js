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

  const time = document.createElement("time");
  time.setAttribute("href", "#");
  time.textContent = "Clique aqui para adicionar!";
  time.style.color = "#FF6D00";

  const p = document.createElement("p");
  p.textContent = "Nenhum anime encontrado. ";

  p.appendChild(time);

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

  animeContainer.appendChild(createAnimeBanner(animeData.bannerImage))
  animeContainer.appendChild(createAnimeIntro(animeData))
  animeContainer.appendChild(createAnimeInfo(animeData))
};

function createAnimeBanner(bannerImage) {
  const animeBannerDiv = document.createElement("div");
  animeBannerDiv.classList.add("anime-banner");

  const animeBanner = document.createElement("img");
  animeBanner.setAttribute("alt", "anime banner");
  animeBanner.setAttribute("src", bannerImage);

  animeBannerDiv.appendChild(animeBanner);

  return animeBannerDiv
}

function createAnimeIntro(animeData) {
  const animeIntroDiv = document.createElement("div");
  animeIntroDiv.classList.add("anime-intro");

  const animeCover = document.createElement("img");
  animeCover.classList.add("anime-cover");
  animeCover.setAttribute('alt', 'anime cover')
  animeCover.setAttribute('src', animeData.coverImage.large)

  animeIntroDiv.appendChild(animeCover)
  
  const box = document.createElement('box')
  box.classList.add('box')
  
  const animeName = document.createElement('h2');
  animeName.classList.add('anime-name')
  animeName.textContent = animeData.title.romaji
  
  box.appendChild(animeName)
  
  const japaneseName = document.createElement('p')
  japaneseName.textContent = `Native name: ${animeData.title.native}`
  
  box.appendChild(japaneseName)
  
  const synopse = document.createElement('p')
  synopse.innerHTML = `Synopse: ${animeData.description}`

  const options = document.querySelector('.options');
  options.remove()

  box.appendChild(synopse)
  animeIntroDiv.appendChild(box)
  animeIntroDiv.appendChild(options)
  
  return animeIntroDiv;
}

function createAnimeInfo(animeData) {
  const info = document.createElement('div')
  info.classList.add('info')
  
  if(animeData.episodes == null) {
    info.appendChild(createInfo('Airing', `Ep ${animeData.nextAiringEpisode.episode}: ${getTime(animeData.nextAiringEpisode.timeUntilAiring)}`))
  } else {
    info.appendChild(createInfo('Episodes', animeData.episodes))
  }
    
  info.appendChild(createInfo('Genres', animeData.genres))

  info.appendChild(createInfo('Format', animeData.format))

  info.appendChild(createInfo('Status', animeData.status))

  info.appendChild(createInfo('Start Date', getDate(animeData.startDate)))

  info.appendChild(createInfo('Season', `${animeData.season} ${animeData.seasonYear}`))

  info.appendChild(createInfo('Average Score', animeData.averageScore + '%'))

  info.appendChild(createInfo('Mean Score', animeData.meanScore + '%'))

  info.appendChild(createInfo('Popularity', animeData.popularity))

  info.appendChild(createInfo('Favourites', animeData.favourites))



  const rankings = document.createElement('div')
  rankings.classList.add('rankings')

  animeData.rankings.forEach((ranking) => {
    const rankingSpan = document.createElement('span')
    rankingSpan.textContent = `#${ranking.rank} ${ranking.context} ${ranking.year == null 
      ? '' 
      : ranking.year}`
    rankings.appendChild(rankingSpan)
  })

  const animeInfo = document.createElement('div')
  animeInfo.classList.add('anime-info')

  animeInfo.appendChild(rankings)
  animeInfo.appendChild(info)

  return animeInfo;
}

function createInfo(title, data) {
  const eachInfo = document.createElement('div')
  eachInfo.classList.add('eachInfo')
  
  const infoTitle = document.createElement('p')
  infoTitle.classList.add('infoTitle')
  infoTitle.textContent = title;

  const infoData = document.createElement('p')
  infoData.classList.add('infoData')

  if(typeof data != 'object') {
    infoData.textContent = data;
  } else {
    data.forEach((dat) => {
      infoData.textContent += dat + ', ';
    })
    infoData.textContent = infoData.textContent.slice(0, infoData.textContent.length - 2)
  }

  eachInfo.appendChild(infoTitle)
  eachInfo.appendChild(infoData)
     
  return eachInfo;
}

function getTime(time) {
  const times = 
  { 
    seconds: time%60,
    minutes:Math.trunc(time/60)%60,
    hours:Math.trunc(time/60/60)%24,
    days:Math.trunc(time/60/60/24)
  }

  return `${times.days}d ${times.hours}h ${times.minutes}m`;
}

function getDate({day, month, year}) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  month = months[month - 1];
  
  return `${month} ${day}, ${year}`
}

export {
  createAnime,
  createAnimeList,
  createErrorScreen,
  createLoadingScreen,
  createNonAnimeFoundScreen,
};
