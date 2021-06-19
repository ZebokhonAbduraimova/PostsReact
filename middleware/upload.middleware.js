const { ServerSideErrors, FileErrors } = require("../ErrorMessages");
const { upload } = require("../config/db-setup");
const multer = require("multer");

const singleUpload = upload.single("file");

module.exports = function (req, res, next) {
  return singleUpload(req, res, function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        next(ServerSideErrors.InternalServerError);
      } else if (err.message === FileErrors.FileMimeTypeError.message) {
        next(FileErrors.FileMimeTypeError);
      }
      next(err);
    } else if (!req.file) {
      next(FileErrors.NoFileError);
    } else {
      next();
    }
  });
};
