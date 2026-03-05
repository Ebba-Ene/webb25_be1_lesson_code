import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Artist",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

songSchema.virtual("artistName").get(function () {
  return this.artist ? this.artist.name : null;
});

// Add text index for title and artist fields for full-text search
songSchema.index({ title: "text", artistName: "text" });

const Song = mongoose.model("Song", songSchema);

export default Song;
