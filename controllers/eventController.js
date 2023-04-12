import Event from "../models/eventModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user notes
// @route   GET /api/events/event
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  // const events = await Event.find();
  // events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  const events = await Event.aggregate([
    {
      $addFields: {
        eventDateISO: {
          $dateFromString: {
            dateString: '$eventDate',
          },
        },
      },
    },
    {
      $sort: {
        eventDateISO: 1,
      },
    },
  ]);
  
  res.json(events);
});

//@description     Fetch single Note
//@route           GET /api/events/:id
//@access          Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if(!event) {
    res.status(404).json({ message: "Event not found" });
  } else {
    res.json(event);
  }
  
});

//@description     Fetch events by year
//@route           GET /api/events/year/:year
//@access          Public
const getEventByYear = asyncHandler(async (req, res) => { 
  const year = req.params.year.replace('-', ' - ');
  const events = await Event.find({ eventYear: year });

  events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  if(!events) {
    res.status(404).json({ message: "Event not found" });
  } else {
    res.json(events);
  }
  
});

//@description     Fetch the latest event
//@route           GET /api/events/years/years
//@access          Public
const getEventYears = asyncHandler(async (req, res) => { 
  const years = await Event.find({}, 'eventYear');
  const yearList = years.map(year => year.eventYear).sort();

  const newArray = yearList.reduce((acc, curr) => {
    const existingYear = acc.find((elem) => elem.year == curr);
    if (existingYear) {
      existingYear.count += 1;
    } else {
      acc.push({id: (acc.length + 1).toString(), year: curr, count: 1});
    }
    return acc;
  }, []);

  if(!years) {
    res.status(404).json({ message: "No data found" });
  } else {
    res.json(newArray);
  }
  
});

//@description     Fetch all the event Years
//@route           GET /api/events/event/current
//@access          Public
const getCurrentEvent = asyncHandler(async (req, res) => { 
  const event = await Event.find({});
  event.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  if(!event) {
    res.status(404).json({ message: "Event not found" });
  } else {
    res.json(event[event.length - 1]);
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

export { getEventById, getEvents, getEventByYear, getEventYears, getCurrentEvent, CreateEvent, DeleteEvent, UpdateEvent };
