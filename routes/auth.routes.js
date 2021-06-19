const router = require("express").Router();

const {
  register,
  login,
  logout,
  getUserByToken,
} = require("../controllers/auth.controller");

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/getUserByToken", getUserByToken);

module.exports = router;
