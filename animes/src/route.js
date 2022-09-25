const express = require('express')

const route = express.Router()

route.get("/animes", (req, res) => {
  res.render("index");
});

route.get("/anime/:id", (req, res) => {
  res.render("anime");
});


module.exports = route;