import express from "express";
import { getMemberById, getMemberByYear, getMemberYears, updateMemberProfile, addMember, DeleteMember, getMembers } from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
.route("/")
.get(getMembers)
.post(protect, addMember);
router
.route("/:id")
.get(getMemberById)
.delete(protect, DeleteMember);
router.route("/profile").put(protect, updateMemberProfile);
router.route("/year/:year").get(getMemberByYear);
router.route("/years").get(getMemberYears);

export default router;