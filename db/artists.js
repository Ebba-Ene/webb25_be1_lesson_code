
import fs from "fs/promises"

const DATA_PATH = new URL('../data/artists.json', import.meta.url);


let artists = [
//   { id: 1, name: 'Bad Bunny' },
  { id: 2, name: 'Zara Larsson' },
  { id: 3, name: 'Radiohead' },
];


async function readArtists() {
    try {
        const file = await fs.readFile(DATA_PATH, 'utf8')
        const artistsJSON = file.toString()
        const artists = JSON.parse(artistsJSON)
        if(!Array.isArray(artists)){
            throw new Error("Artists is not in an array")
        }
        return artists
    } catch (err) {
        console.log("Unable to read from 'data/artists.json'", err)
        return []
    }
}

async function writeArtists(artists = []) {
    const artistsJSON = JSON.stringify(artists,null,2)
    try {
        await fs.writeFile(DATA_PATH, artistsJSON)
    } catch(err) {
        console.log("Unable to write to 'data/artists.json'", err)
    } 
}

export async function getAllArtists() {
    const _artists = await readArtists()
    return _artists
}

export function getArtistByid(id) {
    return artists.find(artist => artist.id === id) || null
}

export async function createArtist(data){
    const _artists = await readArtists()
    const lastId = Math.max(..._artists.map(a => a.id)) || 0
    const newArtist = {
        ...data,
        id: lastId + 1
    }
    _artists.push(newArtist)
    
    await writeArtists(_artists)
    
    return newArtist
}

export function updateArtist(id, data) {
    let artist = getArtistByid(id)
    if(!artist) return null

    artist = {
        ...artist,
        ...data
    }
    artists = artists.map(a => {
        if(a.id === artist.id) {
            return artist
        }
        return a
    })
    return artist
}

export function deleteArtist(id) {
    const artistIndex = artists.findIndex(artist => artist.id === id)
    if(artistIndex === -1) return false;
    artists.splice(artistIndex, 1)
    return true
}