const ApiError = require("./errors");

const errorHandler = (err, req, res, next) => {
  if (err.code === "23505") {
    return res.status(400).json({
      message: `Entity - ${JSON.stringify(req.body)} already exists`,
      error: err.detail || err.message,
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.error,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};

module.exports = errorHandler;
