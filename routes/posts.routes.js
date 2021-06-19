const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const {
  getPosts,
  getUserPosts,
  addPost,
  handlePostInputErrors,
  getPostById,
  editPostById,
  deletePostById,
} = require("../controllers/posts.controller");
const fileUpload = require("../middleware/upload.middleware");
const { checkPostAuthor } = require("../middleware/authorship.middleware");
const mongooseIdCheckMiddleware = require("../middleware/mongooseIdCheck.middleware");
const path = require("path");

// @route /posts
router.get("/", getPosts);

// @route /posts/user
router.get("/user", requireAuth, getUserPosts);

// @route /posts/add
router.route("/add").get(requireAuth, (req, res, next) => {
  try {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  } catch (error) {
    next(error);
  }
});
router.post("/add", requireAuth, fileUpload, handlePostInputErrors, addPost);

// @route /posts/:postId
router
  .route("/:postId")
  .get(mongooseIdCheckMiddleware, getPostById)
  .put(
    mongooseIdCheckMiddleware,
    requireAuth,
    checkPostAuthor,
    fileUpload,
    handlePostInputErrors,
    editPostById
  )
  .delete(
    mongooseIdCheckMiddleware,
    requireAuth,
    checkPostAuthor,
    deletePostById
  );

module.exports = router;
