function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid transaction data",
    });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate record",
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}

module.exports = errorHandler;