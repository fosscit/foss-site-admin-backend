import asyncHandler from "express-async-handler";
import { Announcement } from "../models/annouceModel.js";

const addAnnouncement = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
  
    const announcement = await Announcement.create({
      title,
      content
    });
  
    if (announcement) {
      res.status(201).json({
        _id: announcement._id,
        title: announcement.title,
        content: announcement.content,
      });
    } else {
      res.status(400);
      throw new Error("Error in Adding Announcement!!!");
    }
  });

export { addAnnouncement };