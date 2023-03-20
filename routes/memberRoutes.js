import express from "express";
import { getMemberByYear, getMemberYears, updateMemberProfile, addMember, DeleteMember, getMembers } from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getMembers);
router.route("/").post(protect, addMember);
router.route("/profile").post(protect, updateMemberProfile);
router.route("/:id").delete(protect, DeleteMember);
router.route("/year/:year").get(getMemberByYear);
router.route("/years").get(getMemberYears);

export default router;