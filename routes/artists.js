import { Router } from 'express';
const artistRouter = Router()

let artists = [
  { id: 1, name: 'Bad Bunny' },
  { id: 2, name: 'Zara Larsson' },
  { id: 3, name: 'Radiohead' },
];

artistRouter.get("/", (req, res) => {
  res.json(artists)
})

// artistRouter.get("/", (req, res) => {
//   const { q } = req.query 
//   if(q) {
//     return res.json(artists.filter(artist => artist.name.includes(q)))
//   }
//   return res.json(artists)
// })

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


//Uppgift 1
artistRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id)
  const newName = req.body.name

  if(!newName || typeof newName !== "string"){
    return res.status(400).json({
      message: "Name is required"
    })
  }

  let artist = artists.find(a => a.id === id)

  if(artist){
   artist.name = newName;
   res.json({message: 'Artist uppdaterad', artist})
  }else{
    return res.status(404).json({
      message: "Artist not found"
    })
  }
})

//Uppgift 2
artistRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  
  let before = artists.length
  artists = artists.filter(artist => artist.id !== id)

  if(artists.length === before){
    return res.status(404).json({
      message: "Artist not found"
    })
  } else{
    return res.status(204).json()
  }
})

export default artistRouter;