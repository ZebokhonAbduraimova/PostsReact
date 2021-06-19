const createError = (message, code) => {
  const error = new Error(message);
  error.statusCode = code;
  return error;
};

exports.UserErrors = {
  EmptyEmailError: createError("Empty request body email", 400),
  EmptyPasswordError: createError("Empty request body password", 400),
  UserValidationFailed: createError("User validation failed", 400),
  DuplicateKey: createError("duplicate key error", 11000),
  WrongLoginEmail: createError("Wrong email", 400),
  WrongLoginPassword: createError("Wrong password", 400),
};

exports.PostErrors = {
  PostValidationFailed: createError("Post validation failed", 400),
};

exports.CommentErrors = {
  CommentValidationFailed: createError("Comment validation failed", 400),
};

exports.FileErrors = {
  NoFileError: createError("No file attached", 400),
  FileMimeTypeError: createError("File not image", 400),
};

exports.ServerSideErrors = {
  InternalServerError: createError("Internal Server Error", 500),
  NotFoundError: createError("Not Found", 404),
  ForbiddenError: createError("Access Forbidden", 403),
  UnauthorizedError: createError("Unauthorized", 401),
};
