const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });

exports.generateRefreshToken = (user) =>
  jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

exports.verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);