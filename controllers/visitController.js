import asyncHandler from "express-async-handler";
import { Visit } from "../models/visitModel.js";

//@description     Register new visit
//@route           POST /api/visits/
//@access          Public
const registerVisitor = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const newVisit = new Visit({
    email: email
  })
  newVisit.save();
  res.status(201).send("Visit Added!!");
});

//@description     Get all visit details
//@route           GET /api/visits/
//@access          Public
const getVisits = asyncHandler(async (req, res) => {
  try {
      const visits = await Visit.find();
      res.json(visits);
  } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { registerVisitor, getVisits };
