import { Router } from 'express';
const songRouter = Router();

let songs = [
    { id: 1, title: 'Espresso', artist: 'Sabrina Carpenter' },
    { id: 2, title: 'Creep', artist: 'Radiohead' },
    { id: 3, title: 'Tití Me Preguntó', artist: 'Bad Bunny' },
];

songRouter.get("/", (req, res) => {
    return res.json(songs)
})

songRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({
            message: "Id has to be a valid number"
        })
    }
    const song = songs.find(song => song.id === id)
    if (!song) {
        return res.status(404).json({
            message: "Song does not exist"
        })
    }
    return res.json(song)
})

songRouter.post("/", (req, res) => {
    const { title, artist } = req.body
    if (!title || typeof title !== "string" || !artist || typeof artist !== "string") {
        return res.status(400).json({
            message: "Title and artist are required"
        })
    }
    const lastId = Math.max(...songs.map(song => song.id))
    const song = {
        title,
        artist,
        id: lastId + 1
    }

    songs.push(song)
    return res.status(201).json(song)
})

// Uppgift 1
songRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id)

    const { title, artist } = req.body
    if (!title || typeof title !== "string" || !artist || typeof artist !== "string") {
        return res.status(400).json({
            message: "New song title and artist are required"
        })
    }

    const song = songs.find(song => song.id === id)
    if (!song) {
        return res.status(404).json({
            message: "Song does not exist"
        })
    }

    song.title = title || song.title
    song.artist = artist || song.artist
    res.json(song)
    return res.status(200).json({
        message: "Updated successfully"
    })
})

// UPPGIFT 2
songRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const songIndex = songs.findIndex(song => song.id === id)
    if (songIndex === -1) {
        return res.status(404).json({
            message: "Song does not exist"
        })
    }

    songs.splice(songIndex, 1)
    return res.status(204).json({
        message: "Delete successful."
    })
})

export default songRouter; 