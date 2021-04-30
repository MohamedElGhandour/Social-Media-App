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

server.use("/api/users", (req, res) => {
  const status = 405;
  const message = "Not Available (Cheater -_-)";
  res.status(status).json({ status, message });
  return;
});

// server.use("/api/db", (req, res) => {
//   const status = 405;
//   const message = "Not Available (Cheater -_-)";
//   res.status(status).json({ status, message });
//   return;
// });

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
      var data = JSON.parse(data.toString());
      // Get current user data
      const users = [...data.users];
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
    res.status(status).json({ status, message, ...req.body });
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
    var data = JSON.parse(data.toString());

    // Get current user data
    const currentUser = data.users.filter((user) => {
      if (email === user.email && password === user.password) {
        return user;
      }
    });
    const user = currentUser[0];

    delete user["password"];

    const access_token = createToken({ email, password });
    const expiresIn = verifyToken(access_token).exp;
    res.status(200).json({ access_token, ...user, expiresIn });
  });
});

// Register New User
server.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
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
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      email: email,
      password: password,
      name: name,
      avatar: null,
      following: [],
      pending: [],
    });

    //add some data
    var writeData = fs.writeFile(
      "./api/db.json",
      JSON.stringify(data),
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
  });

  // Create token for new user
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
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
