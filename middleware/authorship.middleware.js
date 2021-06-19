const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { ServerSideErrors } = require("../ErrorMessages");

exports.checkPostAuthor = async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw ServerSideErrors.InternalServerError;
  } else if (post.createdBy.toString() === req.user._id.toString()) {
    next();
  } else {
    next(ServerSideErrors.ForbiddenError);
  }
};

exports.checkCommentAuthor = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    throw ServerSideErrors.InternalServerError;
  } else if (comment.createdBy.toString() === req.user._id.toString()) {
    next();
  } else {
    next(ServerSideErrors.ForbiddenError);
  }
};
