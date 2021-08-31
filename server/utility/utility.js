const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Create a token from a payload
const createToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn });

// Verify the token
const verifyToken = (token) =>
  jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );

module.exports = { createToken, verifyToken };
