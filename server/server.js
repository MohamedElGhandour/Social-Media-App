// server.js
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./api/db.json");
const middlewares = jsonServer.defaults();
const userdb = JSON.parse(fs.readFileSync("./api/db.json", "UTF-8"));
const SECRET_KEY = "123456789";
const expiresIn = "1h";

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Check if the user exists in database
function isAuthenticatedReq({ email }) {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
}

server.use("/api/users", (req, res) => {
  const status = 405;
  const message = "Not Available (Cheater -_-)";
  res.status(status).json({ status, message });
  return;
});

server.use("/api/db", (req, res) => {
  const status = 405;
  const message = "Not Available (Cheater -_-)";
  res.status(status).json({ status, message });
  return;
});

server.use("/api/usersInfo", (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    if (
      decoded.name === "JsonWebTokenError" ||
      decoded.name === "TokenExpiredError"
    )
      throw decoded;

    fs.readFile("./api/db.json", (err, data) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
      // Get current users data
      const currentData = JSON.parse(data.toString());
      // Get current user data
      const users = [...currentData.users];
      users.forEach((user) => {
        delete user.password;
      });
      res.status(200).json({ users });
    });
  } catch (err) {
    console.log(err.message);
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./api/db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    const currentData = JSON.parse(data.toString());

    // Get current user data
    const currentUser = currentData.users.filter((user) => {
      if (email === user.email && password === user.password) {
        return user;
      }
    });
    const user = currentUser[0];

    delete user["password"];

    const access_token = createToken({ email, password });
    const expiresIn = verifyToken(access_token).exp;
    const status = 200;
    res.status(200).json({ status, access_token, ...user, expiresIn });
  });
});

// Register New User
server.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  if (isAuthenticatedReq({ email }) === true) {
    const status = 401;
    const message = "Email already exist";
    res.status(status).json({ status, message });
    return;
  }

  if (name === ("" || null || undefined)) {
    const status = 401;
    const message = "name Is Require";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./api/db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    const currentData = JSON.parse(data.toString());

    // Get the id of last user
    const last_item_id = currentData.users[currentData.users.length - 1].id;
    //Add new user
    const newUser = {
      id: last_item_id + 1,
      email: email,
      password: password,
      name: name,
      avatar: null,
      cover: null,
      following: [],
      pending: [],
    };
    currentData.users.push(newUser);

    //add some data
    const writeData = fs.writeFile(
      "./api/db.json",
      JSON.stringify(currentData),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
    const newUserSuc = { ...newUser };
    delete newUserSuc["password"];
    // Create token for new user

    const access_token = createToken({ email, password });
    const expiresIn = verifyToken(access_token).exp;
    const status = 200;
    res.status(status).json({ status, access_token, ...newUserSuc, expiresIn });
  });
});

// Request
server.use("/api/request", (req, res) => {
  const { id, userId } = req.body;
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    if (
      decoded.name === "JsonWebTokenError" ||
      decoded.name === "TokenExpiredError"
    )
      throw decoded;

    fs.readFile("./api/db.json", (err, data) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
      // Get current users data
      const currentData = JSON.parse(data.toString());
      // Get current user data
      currentData.users.forEach((user) => {
        if (userId === user.id) {
          if (user.pending.includes(id)) {
            const pending = user.pending.filter(
              (idFollower) => !idFollower === id
            );
            user.pending = pending;
          } else {
            const [antheruser] = currentData.users.filter(
              (user) => user.id === id
            );
            if (antheruser.following.includes(userId)) {
              currentData.users.forEach((user) => {
                if (user.id === id) {
                  const newFollowing = user.following.filter(
                    (followerId) => followerId === id
                  );
                  user.following = newFollowing;
                }
              });
            } else {
              user.pending.push(id);
            }
          }
        }
      });
      //add some data
      const writeData = fs.writeFile(
        "./api/db.json",
        JSON.stringify(currentData),
        (err, result) => {
          // WRITE
          if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({ status, message });
            return;
          }
        }
      );
      // Get current user data
      const users = [...currentData.users];
      users.forEach((user) => {
        delete user.password;
      });
      res.status(200).json({ users });
    });
  } catch (err) {
    console.log(err.message);
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

// Follow
server.use("/api/follow", (req, res) => {
  const { id, userId, isAccepted } = req.body;
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  if (isAccepted === ("" || null || undefined)) {
    const status = 401;
    const message = "isAccepted Is Require";
    res.status(status).json({ status, message });
    return;
  }

  try {
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    if (
      decoded.name === "JsonWebTokenError" ||
      decoded.name === "TokenExpiredError"
    )
      throw decoded;

    fs.readFile("./api/db.json", (err, data) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
      // Get current users data
      const currentData = JSON.parse(data.toString());
      // Get current user data
      currentData.users.forEach((user) => {
        if (userId === user.id) {
          if (isAccepted) {
            const pending = user.pending.filter(
              (idFollower) => idFollower !== id
            );
            user.pending = pending;
            currentData.users.forEach((user) => {
              if (id === user.id) {
                user.following.push(userId);
              }
            });
          } else {
            const pending = user.pending.filter(
              (idFollower) => idFollower !== id
            );
            user.pending = pending;
          }
        }
      });
      //add some data
      const writeData = fs.writeFile(
        "./api/db.json",
        JSON.stringify(currentData),
        (err, result) => {
          // WRITE
          if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({ status, message });
            return;
          }
        }
      );
      // Get current user data
      const users = [...currentData.users];
      users.forEach((user) => {
        delete user.password;
      });
      res.status(200).json({ users });
    });
  } catch (err) {
    console.log(err.message);
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

// Avatar
server.use("/api/avatar", (req, res) => {
  const { id, avatar } = req.body;
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  if (avatar === ("" || null || undefined)) {
    const status = 401;
    const message = "Avatar URL Is Require";
    res.status(status).json({ status, message });
    return;
  }

  try {
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    if (
      decoded.name === "JsonWebTokenError" ||
      decoded.name === "TokenExpiredError"
    )
      throw decoded;

    fs.readFile("./api/db.json", (err, data) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
      // Get current users data
      const currentData = JSON.parse(data.toString());
      // Get current user data
      currentData.users.forEach((user) => {
        if (id === user.id) user.avatar = avatar;
      });
      //add some data
      const writeData = fs.writeFile(
        "./api/db.json",
        JSON.stringify(currentData),
        (err, result) => {
          // WRITE
          if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({ status, message });
            return;
          }
        }
      );
      // Get current user data
      const users = [...currentData.users];
      users.forEach((user) => {
        delete user.password;
      });
      res.status(200).json({ users });
    });
  } catch (err) {
    console.log(err.message);
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

// Cover
server.use("/api/Cover", (req, res) => {
  const { id, cover } = req.body;
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  if (cover === ("" || null || undefined)) {
    const status = 401;
    const message = "Cover URL Is Require";
    res.status(status).json({ status, message });
    return;
  }

  try {
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    if (
      decoded.name === "JsonWebTokenError" ||
      decoded.name === "TokenExpiredError"
    )
      throw decoded;

    fs.readFile("./api/db.json", (err, data) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
      // Get current users data
      const currentData = JSON.parse(data.toString());
      // Get current user data
      currentData.users.forEach((user) => {
        if (id === user.id) user.cover = cover;
      });
      //add some data
      const writeData = fs.writeFile(
        "./api/db.json",
        JSON.stringify(currentData),
        (err, result) => {
          // WRITE
          if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({ status, message });
            return;
          }
        }
      );
      // Get current user data
      const users = [...currentData.users];
      users.forEach((user) => {
        delete user.password;
      });
      res.status(200).json({ users });
    });
  } catch (err) {
    console.log(err.message);
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    // verifyToken(req.headers.authorization.split(" ")[1]);
    // console.log(verifyToken(req.headers.authorization.split(" ")[1]).err);
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    if (
      decoded.name === "JsonWebTokenError" ||
      decoded.name === "TokenExpiredError"
    )
      throw decoded;

    next();
  } catch (err) {
    console.log(err.message);
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

server.use("/api", router);
server.use(middlewares);
// server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
