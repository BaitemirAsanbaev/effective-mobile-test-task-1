class ApiError extends Error {
  status;
  error;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.error = errors;
  }
  static NotFound(message="Not Found", errors = []) {
    return new ApiError(404, message, errors)
  }
  static BadRequest(message="Bad Request", errors = []) {
    return new ApiError(400, message, errors)
  }
}

module.exports = ApiError;
