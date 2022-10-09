import {
  createAnime
} from "./screens.js";

import { getAnime, handleResponse, handleError } from "./api_requests.js";

import { carousel } from "./script.js";

function handleData(data) {
  createAnime(data.data.Media)
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
  const btnType = btn.getAttribute("data-type")

  const id = {
    id: Number(animeId)
  }

  btn.addEventListener('click', () => {
    const btnFunction = btn.getAttribute("data-function")

    if(btnFunction == "add") {
      axios.post(`http://localhost:5500/animes/${btnFunction}/${btnType}/`, id)
      .then(response => console.log(response))
      .catch(error => console.error(error))
    } else if (btnFunction == "delete") {
      axios.delete(`http://localhost:5500/animes/delete/${btnType}/${id.id}`)
      .then(response => console.log(response))
      .catch(error => console.error(error))
    }
    

    if(btnFunction == "add") {
      btn.setAttribute("data-function", "delete")
    } else {
      btn.setAttribute("data-function", "add")
    }
  })
})