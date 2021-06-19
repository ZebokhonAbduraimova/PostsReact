const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { UserErrors } = require("../ErrorMessages");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [isEmail, "Email format is wrong"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password length must be at least 8 characters"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  thumbnailId: {
    type: String,
    default: null,
  },
  thumbnailName: {
    type: String,
    default: null,
  },
});

// hash password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next();
  }
});

// static method to login user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw UserErrors.WrongLoginPassword;
    }
  } else {
    throw UserErrors.WrongLoginEmail;
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
