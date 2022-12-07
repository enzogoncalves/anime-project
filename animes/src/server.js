const express = require("express");
const path = require("path");
const app = express();

const route = require('./route.js')

app.set('view engine', 'ejs') // avisar qual engine será usada

app.set('views', path.join(__dirname, 'views')) 

app.use(express.static("public")) 

app.use(express.urlencoded({extended: true})) // habilitar o uso do ejs no html

app.use(route)

app.listen(3000, () => {
  console.log("ouvindo porta 3000");
});