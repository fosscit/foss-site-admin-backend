import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventYear: {
      type: String,
      required: true,
    },
    time: {
      type: String
    },
    venue: {
      type: String
    },
    link: {
      type: String
    },
    materials: {
      type: String
    },
    speaker: {
      type: String
    },
    pic: {
      type: String,
      required: true,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
