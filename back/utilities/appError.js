class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // we can get the message of the class, so we can know where the error occured
    Error.captureStackTrace(this, this.constructor); // we can capture stack trace, se we can know where the error occured
  }
}
module.exports = AppError;
