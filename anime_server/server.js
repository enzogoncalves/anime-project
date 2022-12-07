const { initializeApp }= require("firebase/app")
const { getDatabase, ref, child, get, set } = require('firebase/database')
const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json())

app.listen(5500, () => {
  console.log('Rodando de boa na porta 5500')
})

const firebaseConfig = {
  databaseURL: "https://anime-a1d1-default-rtdb.firebaseio.com/",
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

// ----------- GET -----------
app.get('/animes/', (req, res) => {
  const db = getDatabase(fireApp)
  const dbRef = ref(db);
  get(child(dbRef, `animes/`))
  .then(animes => res.json(animes))
  .catch(err => res.json(err))
})

app.get('/animes/:list', (req, res) => {
  getAnimes(req.params.list)
  .then(animes => res.jsonp(animes.val()))
  .catch(err => res.json(err))
})

// ----------- POST -----------
app.post('/animes/add/', (req, res) => {
  addAnime(req.body.list, req.body.id)
  .then(response => res.json(response))
  .catch(err => res.errored(err))
})

// ----------- DELETE -----------
app.delete('/animes/delete/', (req, res) => {
  removeAnime(req.body.list, req.body.id)
  .then(response => res.json(response))
  .catch(err => res.errored(err))
})

