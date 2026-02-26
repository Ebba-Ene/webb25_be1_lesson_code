import { Router } from "express";
const songsRouter = Router();

let songs = [
  { id: 1, title: 'Esresso', artist: 'Sabrina Carpenter' },
  { id: 2, title: 'Creep', artist: 'Radiohead' },
  { id: 3, title: 'Tití Me Preguntó', artist: 'Bad Bunny' },
];

songsRouter.get("/", (req, res) => {
  const {q} = req.query
  if(q) {
    return res.json(songs.filter(song => song.title.includes(q) || song.artist.includes(q)))
  }
  return res.json(songs)
})

songsRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  if(isNaN(id)){
    return res.status(400).json({
      message:"Id has to be a valid number"
    })
  }

  const song = songs.find(song => song.id === id)

  if(!song){
    return res.status(404).json({message: "Song not found"})
  }

  return res.json(song)

})

songsRouter.post("/", (req, res) => {
  const title = req.body.title;
  const artist = req.body.artist;
  console.log(title, artist)

  if(!title || !artist || typeof title !== "string" || typeof artist !== "string"){
    return res.status(400).json({
      message: "Artist and or title is required"
    })
  }

  const lastId = Math.max(...songs.map(a => a.id))

  const song = {
    id: lastId+1,
    title, 
    artist
  }

  songs.push(song)
  return res.status(201).json(song)
})

songsRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const newTitle = req.body.title;
  const newArtist = req.body.artist;
    if((!newTitle || typeof newTitle !== "string") && (!newArtist || typeof newArtist !== "string")){
      return res.status(400).json({
        message: "Artist and or title is required"
    })
  }

  console.log(newArtist, newTitle)
  let song = songs.find(song => song.id === id);

  if(!song){
    return res.status(404).json({
      message: "Song not found"
    })
  }

  if(newTitle) song.title = newTitle
  if(newArtist) song.artist = newArtist

  return res.status(200).json(song)
})

songsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  const songIndex = songs.findIndex(song => song.id === id)
  if(songIndex === -1) {
    return res.status(404).json({
      message: "Song does not exist"
    })
  }

  songs.splice(songIndex, 1)
  return res.status(204).json({
    message: "Delete successful."
  }) 

})

export default songsRouter;