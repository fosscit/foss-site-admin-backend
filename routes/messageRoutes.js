import express from "express";
import { addMessage, getMessages, deleteMessage } from "../controllers/messageController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getMessages);
router.route("/").post(addMessage);
router.route("/:id").delete(protect, deleteMessage);

export default router;