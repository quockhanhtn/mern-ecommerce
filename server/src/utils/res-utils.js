const resJson = (res, statusCode, message, data = null, extras = {}) => {
  const resJsonData = {
    success: statusCode >= 200 && statusCode < 300, // 200-299 Successful responses
    message: message
  };
  if (data) { resJsonData.data = data; }
  res.status(statusCode).json({ ...resJsonData, ...extras });
  res.end();
};

// Send **200 OK** success status response
const status200 = (res, message = null, data = null, extras = {}) => resJson(res, 200, message, data, extras);

// Send **201 Created** success status response
const status201 = (res, message, data = null) => resJson(res, 201, message, data);

// Send **203 No Content** success status response
const status203 = (res, message) => resJson(res, 204, message);

// Send **204 No Content** success status response
const status204 = (res, message) => resJson(res, 204, message);

// Send **400 Bad Request** response (validation Error Response)
const status400 = (res, message, data) => resJson(res, 400, message, data);

// Send **401 Unauthorized** client error status response
const status401 = (res, message = 'Auth failed!') => resJson(res, 401, message);

// Send **404 Not Found** client error response
const status404 = (res, message = 'Not found!') => resJson(res, 404, message);

// Send **405 Method Not Allowed response** client error response
const status405 = (res, message = 'Method not allowed!') => resJson(res, 405, message);

// Send **500 Internal Server Error** server error response
const status500 = (res, err) => resJson(res, 500, err.message, null, { detail: err });

export default {
  resJson,
  status200,
  status201,
  status203,
  status204,
  status400,
  status401,
  status404,
  status405,
  status500
}