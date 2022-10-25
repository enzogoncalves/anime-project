import {
  createAnimeList
} from "./screens.js";

import { getAnimes, handleResponse, handleError } from "./api_requests.js";

// import { default as carousel } from "./script.js";

function handleData(data, parentEl) {
  data.data.Page.media.forEach((anime) => {
    createAnimeList(
      anime.id,
      anime.coverImage.large,
      anime.title.romaji,
      anime.episodes,
      parentEl
    );
  });
}

function showAnimes(sort, parentEl) {
  const req = getAnimes(sort);
  const { url, options } = req;

  console.log(url, options);

  fetch(url, options)
    .then(handleResponse)
    .then((data) => {
      handleData(data, parentEl);
    })
    .catch(handleError)
    .finally(createScriptTag());
}

showAnimes("TRENDING_DESC", 1);

function createScriptTag() {
  let script = document.createElement('script')
  script.src = '/scripts/flickity.js'
  document.body.append(script)
}