import express from "express";
import { registerVisitor, getVisits } from "../controllers/visitController.js";
const router = express.Router();

router
.route("/")
.get(getVisits)
.post(registerVisitor);

export default router;