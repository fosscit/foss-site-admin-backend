import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  DeleteUser,
  getUsers
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/delete").post(DeleteUser);

export default router;
