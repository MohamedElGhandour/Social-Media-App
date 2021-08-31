// mongodb
require("./config/db");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = express.json;
const authRouter = require("./api/auth");
const postRouter = require("./api/post");
const userRouter = require("./api/user");
const { verifyToken } = require("./utility/utility");
const User = require("./models/Auth");

app.use(cors());
app.use(bodyParser());
app.use(/^(?!\/api\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    res.json({
      status: "FAILED",
      message: "Bad authorization header",
    });
    return;
  }
  try {
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    if (
      decoded.name === "JsonWebTokenError" ||
      decoded.name === "TokenExpiredError"
    )
      throw decoded;
    const { _id } = decoded;
    User.findById(_id)
      .then((user) => {
        req.user = user;
        req.user.password = undefined;
        req.user.__v = undefined;
        next();
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while Fetching User!",
        });
      });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: "Error: access_token is not valid",
    });
  }
});
app.use("/api", postRouter);
app.use("/api", userRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
