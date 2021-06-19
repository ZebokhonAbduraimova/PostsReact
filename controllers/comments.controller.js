const Comment = require("../models/Comment");

exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ errors: { content: "Comment content should not be empty" } });
    }

    const newComment = await Comment.create({
      content: content,
      createdBy: req.user._id,
      toPost: req.params.postId,
    });

    const resComment = await Comment.findById(newComment._id)
      .populate("createdBy", "-password -__v")
      .exec();

    return res.status(200).json({ comment: resComment });
  } catch (error) {
    next(error);
  }
};

exports.getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ toPost: req.params.postId })
      .populate("createdBy", "-password -__v")
      .exec();

    return res.status(200).json({ comments: comments });
  } catch (error) {
    next(error);
  }
};

exports.getUserComments = async (req, res) => {
  try {
    const comments = await Comment.find({ createdBy: req.user._id })
      .populate("createdBy", "-password -__v")
      .exec();
    return res.status(200).json({ comments: comments });
  } catch (error) {
    next(error);
  }
};

exports.editCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    const { content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ errors: { content: "Comment content should not be empty" } });
    }

    comment.content = content;
    await comment.save();

    const resComment = await Comment.findById(comment._id)
      .populate("createdBy", "-password -__v")
      .exec();

    return res.status(200).json({ comment: resComment });
  } catch (error) {
    next(error);
  }
};

exports.deleteCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    await comment.deleteOne();

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
