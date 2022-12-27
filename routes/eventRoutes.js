import express from "express";
import { getEventById, getEvents, CreateEvent, DeleteEvent, UpdateEvent } from "../controllers/eventController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getEvents);
router
  .route("/:id")
  .get(getEventById)
  .delete(protect, DeleteEvent)
  .put(protect, UpdateEvent);
router.route("/create").post(protect, CreateEvent);

export default router;
