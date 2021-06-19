const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Comment content is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
