const User = require("../models/User");
const { UserErrors } = require("../ErrorMessages");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  // Login Errors: Empty Email
  if (err.message === UserErrors.EmptyEmailError.message) {
    errors.email = "Email is required";
  }

  // Login Errors: Empty Password
  if (err.message === UserErrors.EmptyPasswordError.message) {
    errors.password = "Password is required";
  }

  // Login Errors: Email
  if (err.message === UserErrors.WrongLoginEmail.message) {
    errors.email = "Email is not registered";
  }
  // Login Errors: Password
  if (err.message === UserErrors.WrongLoginPassword.message) {
    errors.password = "Password is incorrect";
  }

  // Register Errors: Duplicate Email Error
  if (err.code === UserErrors.DuplicateKey.statusCode) {
    errors.email = "Email already registered";
    return errors;
  }

  // Register Errors: User Validation Errors
  if (err.message.includes(UserErrors.UserValidationFailed.message)) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createJWTtoken = (id) => {
  return jwt.sign({ id }, process.env.jwtSecret, {
    expiresIn: 86400,
  });
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });
    const token = createJWTtoken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 86400 * 1000,
    });

    const resUser = await User.findById(newUser._id).select("-password -__v");

    return res.status(201).json({ user: resUser, cookie: token });
  } catch (error) {
    const errors = handleErrors(error);
    return res.status(400).json({ errors: errors });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) throw UserErrors.EmptyEmailError;
    if (!password) throw UserErrors.EmptyPasswordError;

    const user = await User.login(email.toLowerCase(), password);
    const token = createJWTtoken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 86400 * 1000,
    });

    const resUser = await User.findById(user._id).select("-password -__v");

    return res.status(201).json({ user: resUser, cookie: token });
  } catch (error) {
    const errors = handleErrors(error);
    return res.status(400).json({ errors: errors });
  }
};

exports.getUserByToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.jwtSecret, async (err, decodedToken) => {
        if (err) {
          throw err;
        } else {
          const user = await User.findById(decodedToken.id).select(
            "-password -__v"
          );
          return res.status(200).json({ user: user });
        }
      });
    } else {
      return res.status(200).json({ user: null });
    }
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  req.user = null;
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ user: null });
};
