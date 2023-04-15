import express from "express";
import { google } from 'googleapis';
import dotenv from 'dotenv';
import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

dotenv.config('./.env');

const apiKey = process.env.YT_API_KEY;
const channelId = process.env.YT_CHANNEL_ID;

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});

const getYTVideoCount = async () => {
    try {
      const channelResponse = await youtube.channels.list({
        id: channelId,
        part: 'contentDetails',
      });
  
      const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
  
      const playlistItemsResponse = await youtube.playlistItems.list({
        playlistId: uploadsPlaylistId,
        part: 'snippet',
        maxResults: 1,
      });
  
      const totalVideos = playlistItemsResponse.data.pageInfo.totalResults;
      return totalVideos;
    } catch (err) {
      console.error('Error getting video count:', err);
    }
  };
  
const router = express.Router();

const getData = asyncHandler(async (req, res) => {
    const events_count = await Event.countDocuments();
    const yt_count = await getYTVideoCount();
    if(events_count && yt_count) {
        res.json({
            events_count, yt_count
        })
    } else {        
        res.status(404).json({ message: "datas not found" });
    }
}); 

router.route('/').get(getData);

export default router;