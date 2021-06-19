const User = require("../models/User");
const { getGFS } = require("../config/db-setup");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { deletePostRefs } = require("./posts.controller");
const { FileErrors } = require("../ErrorMessages");
const mongoose = require("mongoose");

exports.deleteAccount = async (req, res, next) => {
  try {
    const userToDel = await User.findById(req.user._id);

    // delete user thumbnail picture
    if (userToDel.thumbnailId) {
      await getGFS().delete(new mongoose.Types.ObjectId(userToDel.thumbnailId));
    }

    // delete all user posts with refs (comments, pictures)
    const userPosts = await Post.find({ createdBy: req.user._id });
    userPosts.forEach(async (post) => deletePostRefs(post));
    await Post.deleteMany({ createdBy: req.user._id });

    // delete all user comments
    await Comment.deleteMany({ createdBy: req.user._id });

    await userToDel.deleteOne();

    return res.status(200).json({ user: null });
  } catch (error) {
    next(error);
  }
};

exports.handleThumbnailErrors = async (err, req, res, next) => {
  let errors = { file: null };
  if (err) {
    if (err.message.includes(FileErrors.NoFileError.message)) {
      errors.file = "File not attached";
    } else if (err.message.includes(FileErrors.FileMimeTypeError.message)) {
      errors.file = "File not image";
    }
  }

  if (errors.file) {
    return res.status(400).json({ errors: errors });
  }

  next();
};

exports.updateThumbnail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.thumbnailId) {
      await getGFS().delete(new mongoose.Types.ObjectId(user.thumbnailId));
    }
    user.thumbnailId = req.file.id;
    user.thumbnailName = req.file.filename;

    await user.save();

    const resUser = await User.findById(user._id).select("-password -__v");
    return res.status(201).json({ user: resUser });
  } catch (error) {
    next(error);
  }
};
