import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import galleryRoutes from './routes/galleryRoutes.js';
import memberGalleryRoutes from './routes/memberGalleryRoutes.js';
import achievements from './Achievements/Achievements.js';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";


dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/membersgallery", memberGalleryRoutes);
app.use("/api/achievements", achievements);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);