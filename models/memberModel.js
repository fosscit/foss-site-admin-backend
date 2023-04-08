import mongoose from "mongoose";

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
    },
    department: {
      type: String,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    year: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    period: {
      type: String,
      required: true,
    }
  }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
