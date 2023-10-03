require("dotenv").config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const route = require('./route.js')

const port = process.env.PORT

app.use(cors())

app.set('view engine', 'ejs') // avisar qual engine será usada
app.set('views', path.join(__dirname, 'views')) 


app.use(express.urlencoded({extended: true})) // habilitar o uso do ejs no html
app.use(express.static(__dirname + "../../" + "/public"))
app.use(express.json())

app.use(route)

app.listen(port || 3000, () => {
  console.log("ouvindo porta 3000");
});