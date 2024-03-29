import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import {
  createAnimeList
} from "./screens.js";

import { getAnimes, handleResponse, handleError } from "./api_requests.js";

import { default as carousel } from "./flickity-function.js";

function handleData(data, parentEl) {
  data.data.Page.media.forEach((anime) => {
    createAnimeList(
      anime.id,
      anime.coverImage.large,
      anime.title.romaji,
      anime.episodes,
      true,
      parentEl
    );
  });
}

function showAnimes(sort, parentEl) {
  const req = getAnimes(sort);
  const { url, options } = req;

  fetch(url, options)
    .then(handleResponse)
    .then((data) => {
      handleData(data, parentEl);
    })
    .catch(handleError)
    .finally(carousel);
}

showAnimes("TRENDING_DESC", 1);
showAnimes("FAVOURITES_DESC", 2);
showAnimes("POPULARITY_DESC", 3);
