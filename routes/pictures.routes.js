const router = require("express").Router();
const {
  getPictureByName,
  getPicturesPath,
} = require("../controllers/pictures.controller");

// @route /pictures/path
router.get("/path", getPicturesPath);

// @route /pictures/:pictureName
router.get("/:pictureName", getPictureByName);

module.exports = router;
