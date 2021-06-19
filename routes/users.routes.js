const {
  deleteAccount,
  handleThumbnailErrors,
  updateThumbnail,
} = require("../controllers/users.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const fileUpload = require("../middleware/upload.middleware");

const router = require("express").Router();

// @route /users/user
router
  .route("/user")
  .delete(requireAuth, deleteAccount)
  .put(requireAuth, fileUpload, handleThumbnailErrors, updateThumbnail);

module.exports = router;
