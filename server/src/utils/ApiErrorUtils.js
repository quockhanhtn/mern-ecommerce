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

class ApiErrorUtils extends ExtendableError {
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
   * Simple helper method to create an error ins of type APIError.  
   * @param {string} message  - Error message.
   * @param {number} status   - HTTP status code of error.
   * @returns 
   */
  static simple(message, status = 500) {
    return new ApiErrorUtils({ message, status });
  }
  static simple2(obj) {
    return new ApiErrorUtils({
      message: obj.message,
      status: obj.status,
      errors: obj.code,
    });
  }
}

export default ApiErrorUtils;
