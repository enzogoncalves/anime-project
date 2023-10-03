const { initializeApp }= require("firebase/app")
const { getDatabase, ref, child, get, set } = require('firebase/database')
const express = require('express')
const animeActions = require('./controllers/animeActions')

const route = express.Router()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "anime-a1d1.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "anime-a1d1",
  storageBucket: "anime-a1d1.appspot.com",
  messagingSenderId: "915407279508",
  appId: "1:915407279508:web:2ea877f82d76cb9918ab81",
  measurementId: "G-VTCKQLRR7Q"
};

const fireApp = initializeApp(firebaseConfig);

async function getAnimes(list) {
  const db = getDatabase(fireApp)
  const dbRef = ref(db);
  const response = await get(child(dbRef, `animes/${list}/ids`))
  return response;
}

async function addAnime(list, id) {
  try {
    const animeList = await getAnimes(list)
      const db = getDatabase(fireApp)
      if(animeList.exists()) {
        const ids = animeList.val();
        ids.push(id)
        
        set(ref(db, `animes/${list}`), {
          ids
        })
        return "adicionado com sucesso"
      } else {
        set(ref(db, `animes/${list}`), {
          ids: [id]
        })
        return "adicionado com sucesso"
      }
  }
  catch (err) {
    return 'erro no banco de dados'
  }
}

async function removeAnime(list, id) {
  try {
    const animeList = await getAnimes(list)
      const db = getDatabase(fireApp)
      if(animeList.exists()) {
        let ids = animeList.val();
        if(ids.includes(id)) {
          ids = ids.filter(anime => {
            return anime != id
          })
          
          set(ref(db, `animes/${list}`), {
          ids: ids
        })
        return "Removido com sucesso do nosso banco de dados"
        } else { 
          return "Este id não está na lista"
        }
      } else {
      return "Esta lista não existe"
    }
  } catch(err) {
    return "erro" + err;
  }
}

// ----------- API GET -----------
route.get('/api/animes/', (req, res) => {
  const db = getDatabase(fireApp)
  const dbRef = ref(db);
  get(child(dbRef, `animes/`))
  .then(animes => res.json(animes))
  .catch(err => res.json(err))
})

route.get('/api/animes/:list', (req, res) => {
  getAnimes(req.params.list)
  .then(animes => res.jsonp(animes.val()))
  .catch(err => res.json(err))
})

// ----------- API POST -----------
route.post('/api/animes/add/', (req, res) => {
  addAnime(req.body.list, req.body.id)
  .then(response => res.json(response))
  .catch(err => res.errored(err))
})

// ----------- API DELETE -----------
route.delete('/api/animes/delete/', (req, res) => {
  removeAnime(req.body.list, req.body.id)
  .then(response => res.json(response))
  .catch(err => res.errored(err))
})


// ----------- CLIENT SIDE ROUTES -----------

route.get("/", (req, res) => {
  res.render("index");
});

route.get("/animes", (req, res) => {res.render("index");});
route.get("/anime/:id", animeActions.enterAnime);
route.get("/animes/:list", animeActions.myList);

module.exports = route;