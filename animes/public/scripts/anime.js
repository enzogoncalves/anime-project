import {
  createAnime
} from "./screens.js";

import { getAnime, handleResponse, handleError } from "./api_requests.js";

import { carousel } from "./script.js";

function handleData(data) {
  createAnime(data.data.Media)
  console.log(data.data.Media)
}

function showAnime(id) {
  const req = getAnime(id);
  const { url, options } = req;

  fetch(url, options)
    .then(handleResponse)
    .then((data) => {
      handleData(data);
    })
    .catch(handleError)
    .finally(carousel);
}

showAnime(5114);

const btns_functions = document.querySelectorAll('.btn-functions');

btns_functions.forEach((btn) => {
  const animeId = btn.parentElement.parentElement.parentElement.parentElement.getAttribute('id')
  btn.addEventListener('click', () => {
    axios.put(`localhost:5500/animes/likes/${animeId}`)
    .then(response => console.log(response))
    .catch(error => console.error(error))
  })
})