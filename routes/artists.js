import { Router } from 'express';
const artistRouter = Router();

let artists = [
  { id: 1, name: 'Bad Bunny' },
  { id: 2, name: 'Zara Larsson' },
  { id: 3, name: 'Radiohead' },
];

artistRouter.get("/", (req, res) => {
  const { q } = req.query 
  if(q) {
    return res.json(artists.filter(artist => artist.name.includes(q)))
  }
  return res.json(artists)
})

artistRouter.get("/:id", (req, res) => {
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

artistRouter.post("/", (req, res) => {
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

// Uppgift 1
artistRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const artist = artists.find(artist => artist.id === id)
  if(!artist) {
    return res.status(404).json({
      message: "Artist does not exist"
    })
  }

  const { name } = req.body
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "New artist name is required"})
  }

  artist.name = name
  res.json(artist)
  return res.status(200).json({
    message: "Updated successfully"
  }) 
})

// UPPGIFT 2
artistRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const artist = artists.find(artist => artist.id === id)
  if(!artist) {
    return res.status(404).json({
      message: "Artist does not exist"
    })
  }

  artists.splice(artist, 1)
  return res.status(204).json({
    message: "Delete successful."
  }) 
})

export default artistRouter; 