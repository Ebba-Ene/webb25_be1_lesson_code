import Song from "../models/Song.js";
import { getFullTextSearch } from "../utils/fullTextSearch.js";

export async function getAllSongs(q) {
  let filter = { }
  if (q) {
    filter = {
      ...filter,
      ...getFullTextSearch(q),
    }
  }
  try {
    return await Song.find(filter).populate("artist");
  } catch (err) {
    console.error("Unable to read from 'Songs'", err)
    return []
  }
}

export async function getSongByid(id) {
  try {
    return await Song.findById(id).populate("artist");
  } catch (err) {
    console.error("Unable to read from 'Song'", err)
    return null
  }
}

export async function createSong(data) {
  try {
    const newSong = (await Song.create(data)).populate("artist")
    return newSong
  } catch (err) {
    console.error("Unable to create 'Song'", err)
    return null
  }
}

export async function updateSong(id, data) {
  try {
    const updatedSong = await Song.findByIdAndUpdate(id, data, { new: true }).populate("artist");
    return updatedSong
  } catch (err) {
    console.error("Unable to update 'Song'", err)
    return null
  }
}

export async function deleteSong(id) {
  try {
    return !!(await Song.findByIdAndDelete(id));
  } catch (err) {
    console.error("Unable to delete 'Song'", err)
    return false
  }
}
