const express = require("express");
const router = express.Router();
const { createToken, verifyToken } = require("../utility/utility");
const User = require("../models/Auth");
const bcrypt = require("bcrypt");

// Signup
router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  if (name == undefined || email == undefined || password == undefined)
    res.json({
      status: "FAILED",
      message: "What the Fuck You Doing!?",
    });
  name = name.trim();
  email = email.trim();
  password = password.trim();
  if (name == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "This name contains certain characters that aren't allowed.",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "It looks like you may have entered an incorrect email address.",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  } else {
    // Checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // A user already exists
          res.json({
            status: "FAILED",
            message:
              "There is already a user with this email address. Please Log In",
          });
        } else {
          // Try to create new user
          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
              });
              newUser
                .save()
                .then((result) => {
                  const access_token = createToken({ _id: result._id });
                  const expiresIn = verifyToken(access_token).exp;
                  result.__v = undefined;
                  result.password = undefined;
                  res.json({
                    status: "SUCCESS",
                    message: "Signup successful",
                    data: result,
                    access_token,
                    expiresIn,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "An error occurred while saving user account!",
                    error: err,
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while hashing password!",
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user!",
        });
      });
  }
});

// login
router.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (email == undefined || password == undefined)
    res.json({
      status: "FAILED",
      message: "What the Fuck You Doing!?",
    });
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .populate("pending", "-__v -password")
      .then((data) => {
        if (data.length) {
          // User exists
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                const access_token = createToken({ _id: data[0]._id });
                const expiresIn = verifyToken(access_token).exp;
                data[0].__v = undefined;
                data[0].password = undefined;
                res.json({
                  status: "SUCCESS",
                  message: "Login successful",
                  data: data[0],
                  access_token,
                  expiresIn,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while comparing passwords",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  }
});

module.exports = router;
