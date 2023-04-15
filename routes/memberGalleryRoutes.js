import express from "express";
import { getGallery, CreatePicture, deletePicture } from "../controllers/memberGalleryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
.route("/")
.get(getGallery)
.post(protect, CreatePicture);
router.route("/:id").delete(protect, deletePicture);

export default router;