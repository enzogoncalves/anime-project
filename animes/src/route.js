const express = require('express')

const route = express.Router()

route.get("/animes", (req, res) => {
  res.render("index");
});

module.exports = route;