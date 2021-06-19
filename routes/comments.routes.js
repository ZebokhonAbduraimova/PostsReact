const {
  addComment,
  getPostComments,
  getUserComments,
  deleteCommentById,
  editCommentById,
} = require("../controllers/comments.controller");

const mongooseIdCheckMiddleware = require("../middleware/mongooseIdCheck.middleware");
const { requireAuth } = require("../middleware/auth.middleware");
const { checkCommentAuthor } = require("../middleware/authorship.middleware");
const router = require("express").Router();

// @route /comments/post/:postId
router
  .route("/post/:postId")
  .get(mongooseIdCheckMiddleware, getPostComments)
  .post(mongooseIdCheckMiddleware, requireAuth, addComment);

// @route /comments/:commentId
router
  .route("/:commentId")
  .delete(
    mongooseIdCheckMiddleware,
    requireAuth,
    checkCommentAuthor,
    deleteCommentById
  )
  .put(
    mongooseIdCheckMiddleware,
    requireAuth,
    checkCommentAuthor,
    editCommentById
  );

// @route /comments/user
router.route("/user").get(requireAuth, getUserComments);

module.exports = router;
