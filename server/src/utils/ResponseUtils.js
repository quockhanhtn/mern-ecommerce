class ResponseUtils {
  /**
   * Send response in JSON format
   * @param {*} res - Express response object
   * @param {*} statusCode - HTTP status code
   * @param {*} message - Message to be sent
   * @param {*} data - Data to be sent
   * @param {*} extras - Other data to be sent
   */
  static sendJson(res, statusCode, message, data = null, extras = {}) {
    const responseData = {
      success: statusCode >= 200 && statusCode < 300, // 200-299 Successful responses
      message
    };
    res.set('Content-Type', 'application/json');

    Object.assign(responseData, data && { data });
    res.json({ ...responseData, ...extras });
    res.end();
  }

  /**
   * Send **200 OK** success status response
   */
  static status200(res, message = null, data = null, extras = {}) {
    this.sendJson(res, 200, message, data, extras);
  }
  /**
   * Send **201 Created** success status response
   */
  static status201(res, message, data = null, extras = {}) {
    this.sendJson(res, 201, message, data, extras);
  }
  /**
   * Send **203 No Content** success status response
   */
  static status203(res, message) {
    this.sendJson(res, 204, message);
  }
  /** 
   * Send **204 No Content** success status response
   */
  static status204(res, message) {
    this.sendJson(res, 204, message);
  }
  /** 
   * Send **400 Bad Request** response(validation Error Response)
   */
  static status400(res, message, data) {
    this.sendJson(res, 400, message, data);
  }
  /** 
   * Send ** 401 Unauthorized ** client error status response
   */
  static status401(res, message = 'Auth failed!') {
    this.sendJson(res, 401, message);
  }
  /** 
   * Send **404 Not Found** client error response
   */
  static status404(res, message = 'Not found!') {
    this.sendJson(res, 404, message);
  }
  /** 
   * Send **405 Method Not Allowed response** client error response
   */
  static status405(res, message = 'Method not allowed!') {
    this.sendJson(res, 405, message);
  }
  /**
   * Send **500 Internal Server Error** server error response
   */
  static status500(res, err) {
    this.sendJson(res, 500, err.message, null, { detail: err });
  }
}

export default ResponseUtils;
