const trendingAnimes = document.querySelector("#trend");
const popularityAnimes = document.querySelector("#popular");

function createLoadingScreen() {
  let loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");

  const img = document.createElement("img");
  img.setAttribute("src", "/icons/spinner.svg");

  const p = document.createElement("p");
  p.textContent = "carregando...";

  loadingDiv.append(img, p);

  return loadingDiv;
}

function createErrorScreen() {
  let errorScreen = document.createElement("div");
  errorScreen.classList.add("error-screen");

  const img = document.createElement("img");
  img.setAttribute("src", "/img/undraw_server_down_s-4-lk.svg");

  const p = document.createElement("p");
  p.textContent = "Não conseguimos conectar ao servidor :(";

  errorScreen.append(img, p);

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

  animeScreen.append(div, animeTitleElement);

  if (parentDiv == 1) {
    trendingAnimes.appendChild(animeScreen);
  } else if (parentDiv == 2) {
    popularityAnimes.appendChild(animeScreen);
  }

  animeScreen.addEventListener('click', () => {
    window.location.href = `anime/${animeId}`
  })
};

const createAnime = (animeData) => {
  const animeContainer = document.querySelector(".anime-container");

  const options = document.querySelector('.options');
  options.remove()

  animeContainer.remove()

  const mainTag = document.querySelector('main')

  mainTag.appendChild(createAnimeBanner(animeData.bannerImage))
  animeContainer.append(
    createAnimeCover(animeData.coverImage.large), 
    createAnimeTitle(animeData.title.romaji),
    options,
    createAnimeDescription(animeData.description),
    createAnimeInfo(animeData)
  );
  mainTag.appendChild(animeContainer)
};
  
function createAnimeBanner(bannerImage) {
  const animeBanner = document.createElement("div");
  animeBanner.classList.add("anime-banner");
  animeBanner.setAttribute("alt", "anime banner");
  animeBanner.style.backgroundImage = `url('${bannerImage}')`;

  return animeBanner;
}

function createAnimeCover(coverImage) {
  const animeCover = document.createElement("img");
  animeCover.classList.add("anime-cover");
  animeCover.setAttribute('alt', 'anime cover')
  animeCover.setAttribute('src', coverImage)

  return animeCover;
}

function createAnimeTitle(animeName) {
  const animeTitle = document.createElement('h2');
  animeTitle.classList.add('anime-name')
  animeTitle.textContent = animeName;

  return animeTitle;
}

function createAnimeDescription(animeDescription) {
  const description = document.createElement('div')
  description.classList.add('description')
  // const restDescBtn = document.createElement('button')
  // restDescBtn.classList.add('rest-desc-btn')
  // restDescBtn.textContent('Read more')
  if(animeDescription.length >= 590) {
    const minimumDesc = animeDescription.slice(0, 590)
    const restDesc = animeDescription.slice(590)
    console.log(restDesc)
    description.innerHTML = `<h2>Description</h2><p>${minimumDesc}...<span class="rest-desc">${restDesc}</span><button class="rest-desc-btn" onclick="showRestDesc()">Read more</button></p>`;

    
  }
  // description.innerHTML = `<h2>Description</h2><p>${animeDescription}</p>`;
  
  return description;
}

function createAnimeInfo(animeData) {
  const details = document.createElement('div')
  details.classList.add('details')
  
  if(animeData.episodes == null) {
    details.appendChild(createInfo('Airing', `Ep ${animeData.nextAiringEpisode.episode}: ${getTime(animeData.nextAiringEpisode.timeUntilAiring)}`))
  } else {
    details.appendChild(createInfo('Episodes', animeData.episodes))
  }

  const dataArr = [
    {
      type: 'Format',
      value: animeData.format
    },
    {
      type: 'Status',
      value: animeData.status
    },
    {
      type: 'Start Date',
      value: getDate(animeData.startDate)
    },
    {
      type: 'Season',
      value: `${animeData.season} ${animeData.seasonYear}`
    },
    {
      type: 'Average Score',
      value: `${animeData.averageScore}%`
    },
    {
      type: 'Mean Score',
      value: `${animeData.meanScore}%`
    },
    {
      type: 'Popularity',
      value: animeData.popularity
    },
    {
      type: 'Favourites',
      value: animeData.favourites
    },
    {
      type: 'Source',
      value: animeData.source
    },
    {
      type: 'Hashtag',
      value: animeData.hashtag
    },
    
    {
      type: 'Genres',
      value: animeData.genres
    },
    {
      type: 'Romaji',
      value: animeData.title.romaji
    },
    {
      type: 'English',
      value: animeData.title.english
    },
    {
      type: 'Native',
      value: animeData.title.native
    },
    {
      type: 'Synonyms',
      value: animeData.synonyms
    },
  ]

  dataArr.forEach((dataItem) => {
    if(typeof dataItem.value == 'string' || dataItem.value != null) {
        details.appendChild(createInfo(dataItem.type, dataItem.value))
    }
  })  

  let producers = [];
  
  animeData.studios.edges.forEach((studio) => {
    if(studio.isMain) {
      details.appendChild(createInfo('Studio', studio.node.name))
    } else {
      producers.push(studio.node.name)
    }
  })

  details.appendChild(createInfo('Producers', producers))

  return details;
}

function createInfo(type, value) {
  const dataSet = document.createElement('div')
  dataSet.classList.add('data-set')
  
  const dataType = document.createElement('p')
  dataType.classList.add('data-type')
  dataType.textContent = type;

  const dataValue = document.createElement('p')
  dataValue.classList.add('data-value')
  
  if(typeof value != 'object') {
    dataValue.textContent = value;
  } else {
    value.forEach((val) => {
      dataValue.innerHTML += `<span>${val}</span>`;
    })
  }


  dataSet.append(dataType, dataValue)

  return dataSet;
}

function createAnimeRanking(rankings) {
// const rankingsBox = document.createElement('div')
  // rankingsBox.classList.add('rankings')

  // rankings.forEach((ranking) => {
  //   const rankingSpan = document.createElement('span')
  //   rankingSpan.textContent = `#${ranking.rank} ${ranking.context} ${ranking.year == null 
  //     ? '' 
  //     : ranking.year}`
  //   rankingsBox.appendChild(rankingSpan)
  // })

  // return rankingsBox;
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
