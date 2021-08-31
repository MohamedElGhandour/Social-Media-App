const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const PostSchema = new Schema(
  {
    image: {
      type: String,
      default: null,
    },
    body: {
      type: String,
      default: "",
    },
    loves: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        body: String,
        user: { type: ObjectId, ref: "User" },
      },
    ],
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
