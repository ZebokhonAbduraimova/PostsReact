const jwt = require("jsonwebtoken");
const { ServerSideErrors } = require("../ErrorMessages");
const User = require("../models/User");
require("dotenv").config();

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.jwtSecret, async (err, decodedToken) => {
      if (err) {
        next(ServerSideErrors.InternalServerError);
      } else {
        const user = await User.findById(decodedToken.id);
        req.user = user;
        next();
      }
    });
  } else {
    next(ServerSideErrors.UnauthorizedError);
  }
};
