import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlenght: 6,
    },
    profilePic: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
