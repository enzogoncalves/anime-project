require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors')

const port = process.env.PORT

const route = require('./route.js')

app.set('view engine', 'ejs') // avisar qual engine será usada

app.set('views', path.join(__dirname, 'views')) 

app.use(cors())

app.use(express.static("public")) 

app.use(express.json())

app.use(express.urlencoded({extended: true})) // habilitar o uso do ejs no html

app.use(route)

app.listen(port || 3000, () => {
  console.log("ouvindo porta 3000");
});