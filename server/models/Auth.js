const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dv4iaou4v/image/upload/v1621727059/social-media-app/avatar_l0vqse.jpg",
    },
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/dv4iaou4v/image/upload/v1630250182/social-media-app/mlkfpjmphw4q5kvllvtg.jpg",
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    pending: [{ type: ObjectId, ref: "User" }],
    requests: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
