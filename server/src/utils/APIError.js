/**
 * @extends Error
 * @author Anand Undavia <abundavia@gmail.com>
 */
class ExtendableError extends Error {
  constructor({ message, errors, status, isPublic, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 * @author Anand Undavia <abundavia@gmail.com>
 */
class ApiError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param errors
   * @param stack
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({ message, errors, stack, status = 500, isPublic = false }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }

  /**
   * Simple helper method to create an error of type APIError.  
   * @param {string} message  - Error message.
   * @param {number} status   - HTTP status code of error.
   * @returns 
   */
  static simple(message, status = 500) {
    return new ApiError({ message, status });
  }
}

export default ApiError;
