import Event from "../models/eventModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user notes
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

//@description     Fetch single Note
//@route           GET /api/events/:id
//@access          Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if(!event) {
    res.status(404).json({ message: "Note not found" });
  } else {
    res.json(event);
  }
  
});

//@description     Create single Note
//@route           GET /api/events/create
//@access          Private
const CreateEvent = asyncHandler(async (req, res) => {
  
  const { title, content, category, date, time, venue, link, materials, speaker, pic, startYear, endYear } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const year = startYear + " - " + endYear.slice(2);
    const event = new Event({ 
      user: req.user._id, 
      title, 
      content, 
      category, 
      eventDate: date, 
      eventYear: year,
      time,
      venue,
      link,
      materials,
      speaker,
      pic
    });

    const createdEvent = await event.save();

    res.status(201).json(createdEvent);
  }
});

//@description     Delete single Note
//@route           GET /api/events/:id
//@access          Private
const DeleteEvent = asyncHandler(async (req, res) => {
  
  const event = await Event.findById(req.params.id);
  
  if (event) {
    await event.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

// @desc    Update a note
// @route   PUT /api/events/:id
// @access  Private
const UpdateEvent = asyncHandler(async (req, res) => {
  const { title, content, category, eventDate, time, venue, link, materials, speaker, pic, startYear, endYear } = req.body;
  const Year = startYear + " - " + endYear.slice(2);
  const event = await Event.findById(req.params.id);
  
  if (event) {
    event.title = title;
    event.content = content;
    event.category = category;
    event.eventDate = eventDate;
    event.eventYear = Year;
    event.time = time;
    event.venue = venue;
    event.link = link;
    event.materials = materials;
    event.speaker = speaker;
    event.pic = pic;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getEventById, getEvents, CreateEvent, DeleteEvent, UpdateEvent };
