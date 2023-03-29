import express from "express";
import { getEventById, getEvents, getEventByYear, getEventYears, CreateEvent, DeleteEvent, UpdateEvent } from "../controllers/eventController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/event").get(getEvents);
router
  .route("/event/:id")
  .get(getEventById)
  .delete(protect, DeleteEvent)
  .put(protect, UpdateEvent);
router.route("event/create").post(protect, CreateEvent);
router.route("/year/:year").get(getEventByYear);
router.route("/years").get(getEventYears);

export default router;