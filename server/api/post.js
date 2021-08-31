const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Post post
router.post("/post", (req, res) => {
  let { image, body } = req.body;
  if (image === undefined || body === undefined) {
    res.json({
      status: "FAILED",
      message: "What the Fuck You Doing!?",
    });
  } else {
    image && (image = image.trim());
    body && (body = body.trim());
    user = req.user;
    const newPost = new Post({
      image,
      body,
      user: user,
    });
    if ((body == null || body == "") && (image == null || image == "")) {
      res.json({
        status: "FAILED",
        message: "Empty Post fields!",
      });
    } else {
      newPost
        .save()
        .then((result) => {
          result.__v = undefined;
          res.json({
            status: "SUCCESS",
            message: "Posting successful",
            data: result,
          });
        })
        .catch((err) => {
          res.json({
            status: "FAILED",
            message: "An error occurred while saving your Post!",
          });
        });
    }
  }
});

// Get Post
router.get("/posts", (req, res) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  const users = [...req.user.following, `${req.user._id}`];
  Post.find({ user: { $in: users } })
    .skip(count * (page - 1))
    .sort({ createdAt: -1 })
    .limit(count)
    .populate("user", "-__v -password")
    .populate(
      "loves",
      "-__v -password -cover -followers -following -requests -email"
    )
    .populate("comments.user", "-__v -password")
    .then((data) => {
      data.forEach((element) => (element.__v = undefined));
      res.json({
        status: "SUCCESS",
        message: "Fetching Posts successful",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while Fetching Posts",
        error: err,
      });
    });
});

// Get news
router.get("/news", (req, res) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  Post.find({})
    .skip(count * (page - 1))
    .sort({ createdAt: -1 })
    .limit(count)
    .populate("user", "-__v -password")
    .populate(
      "loves",
      "-__v -password -cover -followers -following -requests -email"
    )
    .populate("comments.user", "-__v -password")
    .then((data) => {
      data.forEach((element) => (element.__v = undefined));
      res.json({
        status: "SUCCESS",
        message: "Fetching Posts successful",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while Fetching Posts",
      });
    });
});

// Get images
router.get("/images", (req, res) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  Post.find({ image: { $ne: null } })
    .skip(count * (page - 1))
    .sort({ createdAt: -1 })
    .limit(count)
    .populate("user", "-__v -password")
    .populate("comments.user", "-__v -password")
    .then((data) => {
      data.forEach((element) => (element.__v = undefined));
      res.json({
        status: "SUCCESS",
        message: "Fetching Posts successful",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while Fetching Posts",
      });
    });
});

// toggle Love
router.put("/love", (req, res) => {
  Post.findById(req.body.id).then((post) => {
    Post.findByIdAndUpdate(
      req.body.id,
      post.loves.includes(req.user._id)
        ? {
            $pull: { loves: req.user._id },
          }
        : {
            $push: { loves: req.user._id },
          },
      {
        new: true,
      }
    )
      .populate(
        "loves",
        "-__v -password -cover -followers -following -requests -email"
      )
      .exec((err, result) => {
        if (err) {
          res.json({
            status: "FAILED",
            message: "An error occurred while Love Post",
          });
        } else {
          result.__v = undefined;
          res.json({
            status: "SUCCESS",
            message: "Love/unLove Post successful",
            data: result,
          });
        }
      });
  });
});
// add comment
router.put("/comment", (req, res) => {
  let { body, postId } = req.body;
  if (body === undefined || postId === undefined) {
    res.json({
      status: "FAILED",
      message: "What the Fuck You Doing!?",
    });
  }
  body = body.trim();
  postId = postId.trim();
  if (body == null || body == "") {
    res.json({
      status: "FAILED",
      message: "Empty Post fields!",
    });
  }
  user = req.user;
  const comment = {
    body: body,
    user: user,
  };
  Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.user", "-__v -password")
    .populate("user", "-__v -password")
    .exec((err, result) => {
      if (err) {
        res.json({
          status: "FAILED",
          message: "An error occurred while saving your Comment!",
        });
      } else {
        res.json({
          status: "SUCCESS",
          message: "Commenting Successful",
          data: result,
        });
      }
    });
});

module.exports = router;
