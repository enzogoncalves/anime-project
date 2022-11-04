const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json())


let animes = {
  likes: [],
  favorites: [],
  myList: []
};

app.use(express.json())

app.listen(5500, () => {
  console.log('Rodando de boa na porta 5500')
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

app.get('/animes/my-list', (req, res) => {
  res.jsonp(animes.myList)
})


// ----------- PUT -----------

app.route('/animes/add/likes/').post((req, res) => {
  animes.likes.push(req.body.id)
  res.json("adicionado com sucesso na lista de curtidos")
})

app.post('/animes/add/favorites/', (req, res) => {
  animes.favorites.push(req.body.id)
  res.json("adicionado com sucesso na lista de favoritos")
})

app.post('/animes/add/my-list/', (req, res) => {
  animes.myList.push(req.body.id)
  res.json("adicionado com sucesso na sua lista")
})

// ----------- DELETE -----------
app.delete('/animes/delete/', (req, res) => {
  animes = {
    likes: [],
    favorites: [],
    myList: []
  }
  res.json("tudo deletado")
})

app.delete('/animes/delete/likes/:id', (req, res) => {
  animes.likes = animes.likes.filter((item) => {
    return item != req.params.id
  })
  res.json("deletado com sucesso dos seus curtidos")
})

app.delete('/animes/delete/favorites/:id', (req, res) => {
  animes.favorites = animes.favorites.filter((item) => {
    return item != req.params.id
  })
  res.json("deletado com sucesso dos seus favoritos")
})

app.delete('/animes/delete/my-list/:id', (req, res) => {
  animes.myList = animes.myList.filter((item) => {
    return item != req.params.id
  })
  res.json("deletado com sucesso da sua lista")
})

