// const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/Auth");

router.get("/users", (req, res) => {
  User.find()
    .select("-password -__v")
    .limit(10)
    .then((users) => {
      res.json({
        status: "SUCCESS",
        message: "Fetching Users successful",
        data: users,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while Fetching Users",
      });
    });
});

router.get("/current_user", (req, res) => {
  let { _id } = req.user;
  User.find({ _id: _id })
    .populate("pending", "-__v -password")
    .select("-password -__v")
    .then((users) => {
      res.json({
        status: "SUCCESS",
        message: "Fetching User successful",
        data: users,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while Fetching User",
        error: err,
      });
    });
});

router.get("/user/:id", (req, res) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  User.findOne({ _id: req.params.id })
    .select("-password -__v")
    .then((user) => {
      Post.find({ user: { _id: req.params.id } })
        .skip(count * (page - 1))
        .sort({ createdAt: -1 })
        .limit(count)
        .select("-__v")
        .populate("user", "-__v -password")
        .populate(
          "loves",
          "-__v -password -cover -followers -following -requests -email"
        )
        .populate("comments.user", "-__v -password")
        .exec((err, posts) => {
          if (err) {
            return res.json({
              error: err,
              message: "An error occurred while Fetching User",
              status: "FAILED",
            });
          }
          res.json({
            user: user,
            posts: posts,
            status: "SUCCESS",
            message: "Fetching Users successful",
          });
        });
    })
    .catch((err) => {
      return res.json({
        status: "FAILED",
        error: "User not found",
        error: err,
      });
    });
});

router.put("/follow", (req, res) => {
  let { followId } = req.body;
  let { _id } = req.user;
  if (
    followId == _id ||
    followId == "" ||
    followId == null ||
    followId == undefined
  )
    return res.json({
      status: "FAILED",
      message: "An Unexpected Error Occurred",
    });
  User.findByIdAndUpdate(
    followId,
    {
      $addToSet: { pending: _id },
    },
    {
      new: true,
    },
    (err, targetUser) => {
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occurred while Sending The Request!",
          error: err,
        });
      }
      User.findByIdAndUpdate(
        _id,
        {
          $addToSet: { requests: followId },
        },
        { new: true }
      )
        .populate("pending", "-__v -password")
        .select("-password -__v")
        .then((currentUser) => {
          res.json({
            status: "SUCCESS",
            message: "Sending The Request successfully",
            data: {
              currentUser: currentUser,
              targetUser: targetUser,
            },
          });
        })
        .catch((err) => {
          return res.json({
            status: "FAILED",
            message: "An error occurred while Sending The Request!",
            error: err,
          });
        });
    }
  ).select("-password -__v");
});

router.put("/accept", (req, res) => {
  let { acceptId } = req.body;
  let { _id } = req.user;
  if (
    acceptId == _id ||
    acceptId == "" ||
    acceptId == null ||
    acceptId == undefined
  )
    return res.json({
      status: "FAILED",
      message: "An Unexpected Error Occurred",
    });
  User.findByIdAndUpdate(
    acceptId,
    {
      $addToSet: { following: _id },
      $pull: { requests: _id },
    },
    {
      new: true,
    },
    (err, targetUser) => {
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occurred while Sending The Request!",
          error: err,
        });
      }
      User.findByIdAndUpdate(
        _id,
        {
          $addToSet: { followers: acceptId },
          $pull: { pending: acceptId },
        },
        { new: true }
      )
        .populate("pending", "-__v -password")
        .select("-password -__v")
        .then((currentUser) => {
          res.json({
            status: "SUCCESS",
            message: "Sending The Request successfully",
            data: {
              currentUser: currentUser,
              targetUser: targetUser,
            },
          });
        })
        .catch((err) => {
          return res.json({
            status: "FAILED",
            message: "An error occurred while Sending The Request!",
            error: err,
          });
        });
    }
  ).select("-password -__v");
});

router.put("/decline", (req, res) => {
  let { declineId } = req.body;
  let { _id } = req.user;
  if (
    declineId == _id ||
    declineId == "" ||
    declineId == null ||
    declineId == undefined
  )
    return res.json({
      status: "FAILED",
      message: "An Unexpected Error Occurred",
    });
  User.findByIdAndUpdate(
    declineId,
    {
      $pull: { requests: _id },
    },
    {
      new: true,
    },
    (err, targetUser) => {
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occurred while Sending The Request!",
          error: err,
        });
      }
      User.findByIdAndUpdate(
        _id,
        {
          $pull: { pending: declineId },
        },
        { new: true }
      )
        .populate("pending", "-__v -password")
        .select("-password -__v")
        .then((currentUser) => {
          res.json({
            status: "SUCCESS",
            message: "Sending The Request successfully",
            data: {
              currentUser: currentUser,
              targetUser: targetUser,
            },
          });
        })
        .catch((err) => {
          return res.json({
            status: "FAILED",
            message: "An error occurred while Sending The Request!",
            error: err,
          });
        });
    }
  ).select("-password -__v");
});

router.put("/cancel", (req, res) => {
  let { cancelId } = req.body;
  let { _id } = req.user;
  if (
    cancelId == _id ||
    cancelId == "" ||
    cancelId == null ||
    cancelId == undefined
  )
    return res.json({
      status: "FAILED",
      message: "An Unexpected Error Occurred",
    });
  User.findByIdAndUpdate(
    cancelId,
    {
      $pull: { pending: _id },
    },
    {
      new: true,
    },
    (err, targetUser) => {
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occurred while Sending The Request!",
          error: err,
        });
      }
      User.findByIdAndUpdate(
        _id,
        {
          $pull: { requests: cancelId },
        },
        { new: true }
      )
        .populate("pending", "-__v -password")
        .select("-password -__v")
        .then((currentUser) => {
          res.json({
            status: "SUCCESS",
            message: "Sending The Request successfully",
            data: {
              currentUser: currentUser,
              targetUser: targetUser,
            },
          });
        })
        .catch((err) => {
          return res.json({
            status: "FAILED",
            message: "An error occurred while Sending The Request!",
            error: err,
          });
        });
    }
  ).select("-password -__v");
});

router.put("/unfollow", (req, res) => {
  let { unfollowId } = req.body;
  let { _id } = req.user;
  if (
    unfollowId == _id ||
    unfollowId == "" ||
    unfollowId == null ||
    unfollowId == undefined
  )
    return res.json({
      status: "FAILED",
      message: "An Unexpected Error Occurred",
    });
  User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: { followers: _id },
    },
    {
      new: true,
    },
    (err, targetUser) => {
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occurred while Sending The Request!",
          error: err,
        });
      }
      User.findByIdAndUpdate(
        _id,
        {
          $pull: { following: unfollowId },
        },
        { new: true }
      )
        .populate("pending", "-__v -password")
        .select("-password -__v")
        .then((currentUser) => {
          res.json({
            status: "SUCCESS",
            message: "Sending The Request successfully",
            data: {
              currentUser: currentUser,
              targetUser: targetUser,
            },
          });
        })
        .catch((err) => {
          return res.json({
            status: "FAILED",
            message: "An error occurred while Sending The Request!",
            error: err,
          });
        });
    }
  ).select("-password -__v");
});

router.put("/avatar", (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: req.body.avatar } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occurred while Saving The Avatar!",
          error: err,
        });
      }
      res.json({
        status: "SUCCESS",
        message: "Saving the Avatar successful",
        data: result,
      });
    }
  );
});

router.put("/cover", (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { cover: req.body.cover } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occurred while Saving The Cover!",
          error: err,
        });
      }
      res.json({
        status: "SUCCESS",
        message: "Saving the Cover successful",
        data: result,
      });
    }
  );
});

router.post("/search_users", (req, res) => {
  let userPattern = new RegExp("^" + req.body.name);
  User.find({ email: { $regex: userPattern } })
    .select("-password -__v")
    .then((user) => {
      res.json({
        status: "SUCCESS",
        message: "Users found successfully",
        data: user,
      });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while Find The User!",
        data: result,
        error: err,
      });
    });
});

module.exports = router;
