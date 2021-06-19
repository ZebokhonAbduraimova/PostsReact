const { getGFS } = require("../config/db-setup");
const { ServerSideErrors } = require("../ErrorMessages");

exports.getPictureByName = async (req, res, next) => {
  try {
    getGFS()
      .find({ filename: req.params.pictureName })
      .toArray((err, files) => {
        if (err) throw err;
        else if (!files[0] || files.length === 0) {
          throw ServerSideErrors.InternalServerError;
        }

        getGFS().openDownloadStreamByName(req.params.pictureName).pipe(res);
      });
  } catch (error) {
    next(error);
  }
};

exports.getPicturesPath = async (req, res, next) => {
  try {
    const picturesPath = req.protocol + "://" + req.get("host") + "/pictures/";
    return res.status(200).json({ picturesPath: picturesPath });
  } catch (error) {
    next(error);
  }
};
