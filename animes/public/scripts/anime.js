import {
  createAnimeScreen
} from "./screens.js";

import { getAnime, handleResponse, handleError } from "./api_requests.js";

function changeIcon(btn) {
  // btn.children[0].classList.toggle('svg-solid--fa')
}

function handleData(data) {
  createAnimeScreen(data.data.Media)
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
}

const id = document.querySelector('.anime-container').getAttribute('id').replace('#', '')
showAnime(id);

const btns_functions = document.querySelectorAll('.btn-functions');

btns_functions.forEach((btn) => {
  const btnType = btn.getAttribute("data-type")

  btn.addEventListener('click', () => {
    let animeId = Number(document.getElementsByClassName('anime-container')[0].getAttribute('id'))

    const body =    {
      "list": btnType,
      "id": animeId
    }
    const btnFunction = btn.getAttribute("data-function")

    if(btnFunction == "add") {
      axios.post(`http://localhost:5500/animes/add/`, body)
      .then(response => animeResponse(response, btn))
      .catch(err => animeErr(err.message))
    } else if (btnFunction == "delete") {
      axios.delete(`http://localhost:5500/animes/delete/`, body)
      .then(response => animeResponse(response, btn))
      .catch(err => animeErr(err.message))
    }

    console.log(btnFunction, body, btnType)
  })
})

function animeResponse(response, btn) {
  changeIcon(btn)

  const btnFunction = btn.getAttribute("data-function")

  if(btnFunction == "add") {
    btn.setAttribute("data-function", "delete")
  } else {
    btn.setAttribute("data-function", "add")
  }

  console.log(response)
}

function animeErr(err) {
  alert('Não foi possível conectar ao servidor')
  console.log(err)
}

const bod = {"list": "likes", "id": 21}
axios.delete(`http://localhost:5500/animes/delete/`, bod)
      .then(response => console.log(response))
      .catch(err => console.error(err))