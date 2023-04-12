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
//@route           POST /api/gallery
//@access          Private
const CreatePicture = asyncHandler(async (req, res) => {
  
    const { pic } = req.body;
  
    if (!pic) {
      res.status(400);
      throw new Error("Picture not Recieved");
      return;
    } else {
      const picture = new Gallery({ 
        pic
      });
  
      const createdPic = await picture.save();
  
      res.status(201).json(createdPic);
    }
  });

//@description     Delete single Picture
//@route           DELETE /api/gallery/:id
//@access          Private
const deletePicture = asyncHandler(async (req, res) => {

  const ID = req.params.id;
  const picture = await Gallery.findById(ID);

  if (picture) {
    await picture.remove();
    res.json({ message: "Picture Removed" });
  } else {
    res.status(404);
    throw new Error("Picture not Found");
  }
});

export { getGallery, CreatePicture, deletePicture };