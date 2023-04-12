import Gallery from "../models/galleryModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all pictures from Gallery
// @route   GET /api/gallery
// @access  Public
const getGallery = asyncHandler(async (req, res) => {
    const pictures = await Gallery.find();
    res.json(pictures);
});

//@description     Create single Picture
//@route           POST /api/gallery/
//@access          Private
const CreatePicture = asyncHandler(async (req, res) => {
  
    const { pic } = req.body;
  
    if (!title) {
      res.status(400);
      throw new Error("Picture not Recieved");
      return;
    } else {
      const picture = new Event({ 
        pic
      });
  
      const createdPic = await picture.save();
  
      res.status(201).json(createdPic);
    }
  });

export { getGallery, CreatePicture };