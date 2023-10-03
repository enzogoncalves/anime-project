import { getAnimeById, handleResponse } from './api_requests.js'

import { createAnimeList, createErrorScreen, createLoadingScreen, createNonAnimeFoundScreen } from './screens.js'

const loadingScreen = createLoadingScreen();

const section = document.querySelector('section')
section.append(loadingScreen);

function handleError(err) {
  console.log(err)
  section.append(createErrorScreen());
}

let list = document.querySelector('section')
list = list.getAttribute('id')

const title =  String(list)
.split('-')
.map(word => {
  const fL = word.slice(0,1)
  const w = word.slice(1)
  return fL.toUpperCase().concat(w)
})
.join(' ')

const listTitle = document.querySelector('.list-title')
listTitle.textContent = title


axios(`http://localhost:3000/api/animes/${list}`, {
  method: 'GET',
}).then(response => getAnime(response.data))
  .catch(err => handleError(err))
  .finally(() => {
    loadingScreen.remove();
  })

function getAnime(animes) {
  if(!animes) {
    section.append(createNonAnimeFoundScreen())
  } else {
    animes.forEach(anime => {
      const {url, options } =  getAnimeById(anime, true)
    
      fetch(url, options)
      .then(response => handleResponse(response))
      .then(data => {
        const media = data.data.Media;
      
        createAnimeList(
        media.id,
        media.coverImage.large,
        media.title.romaji,
        media.episodes,
        false
        )
      })
      .catch(err => console.error(err))
    })
  }
}
