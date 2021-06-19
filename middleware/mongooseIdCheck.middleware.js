const ObjectId = require("mongoose").Types.ObjectId;
const { ServerSideErrors } = require("../ErrorMessages");

module.exports = (req, res, next) => {
  const id = req.params.postId || req.params.commentId;
  if (ObjectId.isValid(id)) {
    next();
  } else {
    next(ServerSideErrors.NotFoundError);
  }
};
