import { Router } from "express"
const songRouter = Router()

let songs = [
  { id: 1, title: "Espresso", artist: "Sabrina Carpenter", deleted: false },
  { id: 2, title: "Creep", artist: "Radiohead", deleted: false },
  { id: 3, title: "Tití Me Preguntó", artist: "Bad Bunny", deleted: false },
]

//B2
songRouter.get("/", (req, res) => {
    const {q, artist, sort, limit} = req.query

    let filteredSongs = songs.filter(song => !song.deleted)

    if (q){
        const lowerQ = q.toLowerCase()
        filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(lowerQ) ||
        song.artist.toLowerCase().includes(lowerQ)
    )
    }
    if (artist) {
        filteredSongs = songs.filter((song => 
            song.artist.toLowerCase() === artist.toLowerCase()
        ))
    }
    if (sort){
        console.log(sort)
        if (sort !== 'title' && sort !== 'artist'){
            return res.status(400).json({
                message: 'Sort must be title or artist'
            })
        }
        filteredSongs = [...filteredSongs].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    if (limit){
        const limitNum = Number(limit)
          if (!Number.isInteger(limitNum) || limitNum <= 0) {
        return res.status(400).json({
            message: "Limit must be a positive integer"
        })
    }
    filteredSongs = filteredSongs.slice(0, limitNum)
    }

    return res.json(filteredSongs)
})

songRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      message: "Id has to be a valid number",
    })
  }
  const song = songs.find((song) => song.id === id)
  //B3
  if (!song || song.deleted === true) {
    return res.status(404).json({
      message: "Song does not exist",
    })
  }
  return res.json(song)
})

songRouter.post("/", (req, res) => {
  const { title, artist } = req.body
  if (
    !title ||
    typeof title !== "string" ||
    !artist ||
    typeof artist !== "string"
  ) {
    return res.status(400).json({
      message: "Title and artist are required",
    })
  }
  const lastId = Math.max(...songs.map((song) => song.id))
  const song = {
    title,
    artist,
    id: lastId + 1,
  }

  songs.push(song)
  return res.status(201).json(song)
})

// Uppgift 1
songRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id)

  const { title, artist } = req.body
  if (
    !title ||
    typeof title !== "string" ||
    !artist ||
    typeof artist !== "string"
  ) {
    return res.status(400).json({
      message: "New song title and artist are required",
    })
  }

  const song = songs.find((song) => song.id === id)
  if (!song || song.deleted === true) {
    return res.status(404).json({
      message: "Song does not exist",
    })
  }

  song.title = title || song.title
  song.artist = artist || song.artist
  res.json(song)
  return res.status(200).json({
    message: "Updated successfully",
  })
})

// UPPGIFT 2
songRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Id has to be a valid number",
    })
  }

  const songIndex = songs.findIndex((song) => song.id === id)
  if (songIndex === -1 || songs[songIndex].deleted === true) {
    return res.status(404).json({
      message: "Song does not exist",
    })
  }
  songs[songIndex].deleted = true
  return res.status(204).json({
    message: "Delete successful.",
  })
})

export default songRouter
