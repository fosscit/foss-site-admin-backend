import express from "express";
import { getGallery, CreatePicture } from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
.route("/")
.get(getGallery)
.post(protect, CreatePicture);

export default router;