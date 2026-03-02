import { connectToDb } from "./connect.js";
import mongoose from "mongoose";
import fs from "fs/promises"
import Artist from "./models/Artist.js";

const DATA_PATH = new URL("./data/artists.json", import.meta.url)

async function getArtists() {
    try {
        const file = await fs.readFile(DATA_PATH)
        const artistsJSON = file.toString()
        const artists = JSON.parse(artistsJSON)
        return artists

    } catch(error) {
        console.log("Error in getting data 'artists'", error)
        return []
    }
}



async function main() {
    const artists = await getArtists()
    await connectToDb('test')
    //! CLEAR DB
    await Artist.deleteMany()

    //!SEED DATA
    const artist1 = await Artist.create(artists[0])
    const artist2 = await Artist.create(artists[1])
    const artist3 = await Artist.create(artists[2])
    const artist4 = await Artist.create(artists[3])
    const artist5 = await Artist.create(artists[4])

    //! FIND ALL ARTISTS
    const artistsFromDb = await Artist.find()
    console.log("Artists: ",artistsFromDb.length, artistsFromDb[0]._id)
    const firstArtistId = artistsFromDb[0]._id

    //! FIND BY ID
    const foundArtist = await Artist.findById(firstArtistId)
    console.log("Found artist: ", foundArtist)

    //! UPDATE ONE
    const updatedArtist = await Artist.findByIdAndUpdate(foundArtist._id, {
        name: "Baddest bunny"
    }, {
        returnDocument: "after"
    })
    console.log(updatedArtist)

    //! FIND BY ID AND DELETE
    const deletedArtist = await Artist.findByIdAndDelete(updatedArtist._id,)
    console.log("Deleted artist", deletedArtist)
    const newArtistsFromDB = await Artist.find();
    console.log("Artists: ", newArtistsFromDB.length)
    //! FILTER ARTISTS
    const filteredArtists = await Artist.find({
        name: /pink/i

    })
    
    console.log("Filtered artists", filteredArtists)
    await Artist.deleteMany()


    await mongoose.disconnect()
}

main()