const express = require('express')
const animeActions = require('./controllers/animeActions')

const route = express.Router()

route.get("/animes", (req, res) => {
  res.render("index");
});

route.get("/anime/:id", animeActions.test);

module.exports = route;