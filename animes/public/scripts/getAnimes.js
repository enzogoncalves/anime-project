import { getAnimeById, handleResponse, handleError } from './api_requests.js'

import { createAnimeList } from './screens.js'

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


axios(`http://localhost:5500/animes/${list}`, {
  method: 'GET'
}).then(response => getAnime(response.data))
.catch(err => console.log(err))

function getAnime(animes) {
  console.log(animes)
  animes.forEach(anime => {
    const {url, options } =  getAnimeById(anime)
    
    fetch(url, options)
    .then(response => handleResponse(response))
    .then(data => {
      const media = data.data.Media;
      console.log(media)

      createAnimeList(
      media.id,
      media.coverImage.large,
      media.title.romaji,
      media.episodes,
      false
      )}
    )
    .catch(err => console.log(err))
  })
}
