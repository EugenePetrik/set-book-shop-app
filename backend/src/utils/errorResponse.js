/**
 * Custom error class that extends the built-in Error class.
 * Used for handling HTTP errors with a specific status code.
 */
class ErrorResponse extends Error {
  /**
   * Create an ErrorResponse instance.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
