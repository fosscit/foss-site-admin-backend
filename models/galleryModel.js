import mongoose from "mongoose";

const gallerySchema = mongoose.Schema(
  {
    pic: {
        type: String,
        required: true,
    }
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
