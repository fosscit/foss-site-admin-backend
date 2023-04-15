import mongoose from "mongoose";

const visitSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },
  }
);

const Visit = mongoose.model("Visits", visitSchema);

export { Visit };
