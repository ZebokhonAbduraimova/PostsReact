const Post = require("../models/Post");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

const { FileErrors } = require("../ErrorMessages");
const { getGFS } = require("../config/db-setup");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "-password -__v")
      .exec();

    return res.status(200).json({ posts: posts });
  } catch (error) {
    next(error);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id })
      .populate("createdBy", "-password -__v")
      .exec();
    return res.status(200).json({ posts: posts });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("createdBy", "-password -__v")
      .exec();

    return res.status(200).json({ post: post });
  } catch (error) {
    next(error);
  }
};

exports.handlePostInputErrors = async (err, req, res, next) => {
  let errors = { content: null, file: null };

  if (!req.body.content) {
    errors.content = "Post content is empty";
  }
  if (err) {
    if (err.message.includes(FileErrors.FileMimeTypeError.message)) {
      errors.file = "File not image";
    }
  }

  if (errors.file || errors.content) {
    return res.status(400).json({ errors: errors });
  }

  next();
};

exports.addPost = async (req, res, next) => {
  try {
    const { content } = req.body;

    let newPost = await Post.create({
      content: content,
      createdBy: req.user._id,
    });

    if (req.file) {
      newPost.pictureId = req.file.id;
      newPost.pictureName = req.file.filename;

      await newPost.save();
    }

    const resPost = await Post.findById(newPost._id)
      .populate("createdBy", "-password -__v")
      .exec();

    return res.status(200).json({ post: resPost });
  } catch (error) {
    next(error);
  }
};

exports.editPostById = async (req, res, next) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.postId);

    post.content = content;

    // update picture file
    if (req.file) {
      // delete old file from grid fs
      if (post.pictureId) {
        await getGFS().delete(new mongoose.Types.ObjectId(post.pictureId));
      }
      post.pictureId = req.file.id;
      post.pictureName = req.file.filename;
    }

    await post.save();

    const resPost = await Post.findById(post._id)
      .populate("createdBy", "-password -__v")
      .exec();

    return res.status(200).json({ post: resPost });
  } catch (error) {
    next(error);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    await this.deletePostRefs(post);

    await post.deleteOne();

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.deletePostRefs = async (post) => {
  // remove post picture
  if (post.pictureId) {
    await getGFS().delete(new mongoose.Types.ObjectId(post.pictureId));
  }

  // remove post comments
  await Comment.deleteMany({ toPost: post._id });
};
