const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = "Resources not found with this id.. Invalid ${err.path}";
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = "Duplicate Key ${Object.keys(err.keyValue)} Entered";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = "Your url is invalid. Please! try again later";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "Your url is expired. Please! try again later";
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
