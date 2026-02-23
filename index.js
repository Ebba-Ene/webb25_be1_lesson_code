import express from "express"
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

let artists = [
  { id: 1, name: 'Bad Bunny' },
  { id: 2, name: 'Zara Larsson' },
  { id: 3, name: 'Radiohead' },
];

app.get("/", (req, res) => {
    return res.json({
        message: "Healthy?"
    })
})

app.get("/api/artists", (req, res) => {
  const { q } = req.query 
  if(q) {
    return res.json(artists.filter(artist => artist.name.includes(q)))
  }
  return res.json(artists)
})

app.get("/api/artists/:id", (req, res) => {
  const id = Number(req.params.id)
  if(isNaN(id)) {
    return res.status(400).json({
      message: "Id has to be a valid number"
    })
  }
  const artist = artists.find(artist => artist.id === id)
  if(!artist) {
    return res.status(404).json({
      message: "Artist does not exist"
    })
  }
  return res.json(artist)
})

app.post("/api/artists", (req, res) => {
    const { name } = req.body
    if(!name || typeof name !== "string"){
      return res.status(400).json({
        message: "Name is required"
      })
    }
    console.log(artists.map(a => a.id))
    const lastId = Math.max(...artists.map(a => a.id))
    console.log(lastId)
    const artist = {
      name,
      id: lastId + 1
    }

    artists.push(artist)
    return res.status(201).json(artist)
})

app.listen(PORT,(error) => {
    if(error) {
        console.log("Error in running express", error.message)
        return
    }
    console.log(`Server is running on port ${PORT}`)
})