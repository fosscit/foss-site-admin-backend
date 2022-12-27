import express from "express";
import { addAnnouncement } from "../controllers/announceController.js";
const router = express.Router();

router.route("/").post(addAnnouncement);

export default router;