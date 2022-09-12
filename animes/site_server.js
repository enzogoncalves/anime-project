const express = require("express");
const path = require("path");
const app = express();

app.listen(3000, () => {
  console.log("ouvindo porta 3000");
});

app.get("/animes", (req, res) => {
  res.render("index");
});
