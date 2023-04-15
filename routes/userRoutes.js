import express from "express";
import {
  authUser,
  updateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;