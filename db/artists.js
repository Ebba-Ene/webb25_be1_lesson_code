

let artists = [
  { id: 1, name: 'Bad Bunny' },
  { id: 2, name: 'Zara Larsson' },
  { id: 3, name: 'Radiohead' },
];


export function getAllArtists() {
    return artists
}

export function getArtistByid(id) {
    return artists.find(artist => artist.id === id) || null
}

export function createArtist(data){
    const lastId = Math.max(...artists.map(a => a.id)) || 0
    const newArtist = {
        ...data,
        id: lastId + 1
    }

    artists.push(newArtist)
    return newArtist
}

export function updateArtist(id, data) {
    let artist = getArtistByid(id)
    if(!artist) return null

    artist = {
        ...artist,
        ...data
    }
    return artist
}

export function deleteArtist(id) {
    const artistIndex = artists.findIndex(artist => artist.id === id)
    if(artistIndex === -1) return false;
    artists.splice(artistIndex, 1)
    return true
}