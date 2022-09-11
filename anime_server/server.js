const express = require('express')
const axios = require('axios')
const app = express();

let animes = {
  likes: [],
  favorites: [],
  myList: []
};

app.use(express.json())

app.listen(5500, () => {
  console.log('Rodando de boa na porta 3000')
})

app.get('/animes/', (req, res) => {
  res.jsonp(animes)
})

// ----------- GET -----------
app.get('/animes/likes', (req, res) => {
  res.jsonp(animes.likes)
})

app.get('/animes/favorites', (req, res) => {
  res.jsonp(animes.favorites)
})

app.get('/animes/myList', (req, res) => {
  res.jsonp(animes.myList)
})


// ----------- PUT -----------

app.put('/animes/add/likes/:anime_id', (req, res) => {
  animes.likes.push(Number(req.params.anime_id))
  res.send("adicionado com sucesso na lista de curtidos")
})

app.put('/animes/add/favorites/:anime_id', (req, res) => {
  animes.favorites.push(Number(req.params.anime_id))
  res.send("adicionado com sucesso na lista de favoritos")
})

app.put('/animes/add/myList/:anime_id', (req, res) => {
  animes.myList.push(Number(req.params.anime_id))
  res.send("adicionado com sucesso na sua lista")
})

// ----------- DELETE -----------

app.delete('/animes/delete/likes/:anime_id', (req, res) => {
  animes.likes = animes.likes.filter((item) => {
    return item != Number(req.params.anime_id)
  })
  res.send("deletado com sucesso dos seus curtidos")
})

app.delete('/animes/delete/favorites/:anime_id', (req, res) => {
  animes.favorites = animes.favorites.filter((item) => {
    return item != Number(req.params.anime_id)
  })
  res.send("deletado com sucesso dos seus favoritos")
})

app.delete('/animes/delete/myList/:anime_id', (req, res) => {
  animes.myList = animes.myList.filter((item) => {
    return item != Number(req.params.anime_id)
  })
  res.send("deletado com sucesso da sua lista")
})

