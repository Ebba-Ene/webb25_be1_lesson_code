import Artist from "../models/Artist.js";

export async function getAllArtists() {
  try {
    return await Artist.find();
  } catch (err) {
    console.error("Unable to read from 'Artists'", err)
    return []
  } 
}

export async function getArtistByid(id) {
  try {
    return await Artist.findById(id);
  } catch (err) {
    console.error("Unable to read from 'Artist'", err)
    return null
  }
}

export async function createArtist(data) {
  try {
    return await Artist.create(data);
  } catch (err) {
    console.error("Unable to create 'Artist'", err)
    return null
  } 
}

export async function updateArtist(id, data) {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(id, data, { returnDocument: "after" });
    if (!updatedArtist) return null;
    return updatedArtist;
  } catch (err) {
    console.error("Unable to update 'Artist'", err)
    return null
  }
}

export async function deleteArtist(id) {
  try {
    return !!(await Artist.findByIdAndDelete(id));
  } catch (err) {
    console.error("Unable to delete 'Artist'", err)
    return false
  }
}
