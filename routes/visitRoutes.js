import express from "express";
import { registerVisitor } from "../controllers/visitController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerVisitor);

export default router;