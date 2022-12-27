import mongoose from "mongoose";

const dateObj = new Date();

const visitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    visitCount: {
        type: Number,
        default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const dateSchema = mongoose.Schema({
    currentDate: {
        type: Date,
        default: new Date(),
    }
});

const DD = mongoose.model("Dates", dateSchema);

const Visit = mongoose.model("Visits", visitSchema);

export { Visit, DD };
