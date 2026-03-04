import Artist from "../models/Artist.js";
import Song from "../models/Song.js";
import { connectToDb, disconnectFromDb } from "../config/db.js";

async function teardown() {
    await connectToDb("sqotifyv2");
    await Song.deleteMany();   // Clear songs before artists
    await Artist.deleteMany();
    console.log("Database cleared");
    await disconnectFromDb();  // Disconnect so process can exit
}

teardown().catch((err) => {
    console.error(err);
    process.exit(1);
});