const trendingAnimes = document.querySelector("#trend");
const popularityAnimes = document.querySelector("#popular");

function createLoadingScreen() {
  let loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");

  loadingDiv.innerHTML = `<img src="/icons/spinner.svg"><p>carregando...</p>`

  return loadingDiv;
}

function createErrorScreen() {
  let errorScreen = document.createElement("div");
  errorScreen.classList.add("error-screen");

  errorScreen.innerHTML = `<img src="/img/undraw_server_down_s-4-lk.svg"><p>Não conseguimos conectar ao servidor :(</p>`

  return errorScreen;
}

function createNonAnimeFoundScreen() {
  let NonAnimeFoundScreen = document.createElement("div");
  NonAnimeFoundScreen.classList.add("nonAnimeFound");

  NonAnimeFoundScreen.innerHTML = `<p>Nenhum anime encontrado. <a href="/animes" style="color:var(--light-blue)">Clique aqui para adicionar</a></p>`

  return NonAnimeFoundScreen;
}

const createAnimeList = (
  animeId,
  animeImg = "",
  animeTitle = "",
  animeEp = 0,
  initialPage = true,
  parentDiv = 0
) => {
  const animeScreen = document.createElement("div");
  animeScreen.setAttribute("id", animeId);
  
  if(initialPage) {
    animeScreen.classList.add("anime", "carousel-cell");
  } else {
    animeScreen.classList.add("anime");
  }

  animeScreen.innerHTML = `
    <div class="anime-cover">
      <img src="${animeImg}" alt="anime cover">
      ${animeEp ? `<span class="episodes">${animeEp == 1 ? `${animeEp} episode` : `${animeEp} episodes`}</span>` : ``}
    </div>
    <p class="anime-title">${animeTitle}</p>
  `

  if (parentDiv == 1) {
    trendingAnimes.appendChild(animeScreen);
  } else if (parentDiv == 2) {
    popularityAnimes.appendChild(animeScreen);
  } else {
    document.querySelector('section').appendChild(animeScreen)
  }

  animeScreen.addEventListener('click', () => {
    window.location.href = `/anime/${animeId}`
  })
};

const createAnimeScreen = (animeData) => {
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
    createAnimeInfo(animeData),
    createRelations(animeData.relations)
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

  if(animeDescription.length >= 1000) {
    description.classList.add('high-desc')

    const p = document.createElement('p')
    p.classList.add('high-desc')
    p.innerHTML = animeDescription;

    const h2 = document.createElement('h2')
    h2.textContent = 'Description';

    const restDescBtn = document.createElement('button')
    restDescBtn.classList.add('rest-desc-btn')

    restDescBtn.addEventListener('click', () => {
      if(!restDescBtn.classList.contains('active')) {
        restDescBtn.classList.add('active')
        description.classList.remove('high-desc')
      } else {
        restDescBtn.classList.remove('active')
        description.classList.add('high-desc')
      }
    })

    description.append(h2, p, restDescBtn)
  } else {    
    description.innerHTML = `<h2>Description</h2><p>${animeDescription}</p>`;
  }
  
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

function createRelations(relations) {
  const relationsBox = document.createElement('div')
  relationsBox.classList.add('relations')

  relations.nodes.forEach((relation, index) => {
    const source = firstLetterUpper(relations.edges[index].relationType)
    relationsBox.innerHTML += `
    <div class="relation" id="${relation.id}">
      <div>
        <img src="${relation.coverImage.medium}">
        <p>${source}</p>
      </div>
      <div class="hover-relation">
          <span>${source}</span>
          <p>${relation.title.romaji}</p>
          <p>${firstLetterUpper(relation.format)} · ${firstLetterUpper(relation.status)}</p>
      </div>
    </div>
    `
  })

  return relationsBox;
}

function firstLetterUpper(word) {
  const newW = word.slice(0,1).toUpperCase().concat(word.toLowerCase().slice(1));
  return newW;
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
  createAnimeScreen,
  createAnimeList,
  createErrorScreen,
  createLoadingScreen,
  createNonAnimeFoundScreen,
};
