import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { createAnimeScreen } from "./screens.js";

import { getAnimeById, handleResponse, handleError } from "./api_requests.js";

function changeIconFunction(btn) {
  const btnFunction = btn.getAttribute("data-function");

  if (btnFunction == "add") {
    btn.setAttribute("data-function", "delete");
  } else {
    btn.setAttribute("data-function", "add");
  }

  changeIcon(btn);
}

function changeIcon(btn) {
  const btnType = btn.getAttribute("data-type");
  const btnFunction = btn.getAttribute("data-function");

  if (btnFunction == "add") {
    btn.style.backgroundImage = `url(../icons/${btnType}.svg)`;
  } else if (btnFunction == "delete") {
    btn.style.backgroundImage = `url(../icons/${btnType}-o.svg)`;
  }
}

function handleData(data) {
  createAnimeScreen(data.data.Media);
}

function handleChangeIconError(err) {
  console.error(err.message)

  const buttons = document.querySelectorAll(".btn-functions");

  buttons.forEach((btn) => {
    btn.style.backgroundImage = `url(../icons/no-wifi.png)`;
  })
}

function showAnime(id) {
  const req = getAnimeById(id, false);
  const { url, options } = req;

  fetch(url, options)
    .then(handleResponse)
    .then((data) => {
      handleData(data);
    })
    .catch(handleError);
}

const animeId = Number(
  document.getElementsByClassName("anime")[0].getAttribute("id")
);
showAnime(animeId);

const btns_functions = document.querySelectorAll(".btn-functions");

btns_functions.forEach((btn) => {
  const btnType = btn.getAttribute("data-type");

  btn.addEventListener("click", () => {
    const animeId = Number(
      document.getElementsByClassName("anime")[0].getAttribute("id")
    );

    const body = {
      list: btnType,
      id: animeId,
    };

    const btnFunction = btn.getAttribute("data-function");

    if (btnFunction == "add") {
      axios
        .post(`http://localhost:3000/api/animes/add/`, body)
        .then((response) => animeResponse(response, btn))
        .catch((err) => animeErr(err.message));
    } else if (btnFunction == "delete") {
      axios
        .delete(`http://localhost:3000/api/animes/delete/`, { data: body })
        .then((response) => animeResponse(response, btn))
        .catch((err) => animeErr(err.message));
    }
  });
});

function animeResponse(response, btn) {
  changeIconFunction(btn);
}

function animeErr(err) {
  alert("Não foi possível conectar ao servidor");
  console.log(err);
}

axios
  .get("http://localhost:3000/api/animes")
  .then((res) => verifyIfItsInDB(res))
  .catch((err) => handleChangeIconError(err));

function verifyIfItsInDB(res) {
  const lists = res.data != null ? res.data : [];  

  const buttons = document.querySelectorAll(".btn-functions");

  buttons.forEach((btn) => {
    const btnType = btn.getAttribute("data-type");

    for (const list in lists) {
      for (const id in lists[list].ids) {
        if (lists[list].ids[id] == animeId && btnType == list) {
          changeIconFunction(btn);
        } else {
          changeIcon(btn);
        }
      }
    }
  
  })
}
