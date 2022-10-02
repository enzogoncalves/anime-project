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
