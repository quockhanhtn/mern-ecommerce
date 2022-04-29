import LogUtils from "../utils/LogUtils.js";

export default logger;

const LOG_TAG = 'HTTP_TRAFFIC';

/**
 * Logs the request and response
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function
 */
function logger(req, res, next) {
  // If using nginx, add to nginx.conf file: proxy_set_header  X-Real-IP  $remote_addr;
  const reqIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  //Log the request info
  LogUtils.info(LOG_TAG, `${reqIP} ${req.method} ${req.url}`);

  res.on('finish', () => {
    //Log the response info
    LogUtils.info(LOG_TAG, `${reqIP} ${req.method} ${req.url} (${res.statusCode})`);
  })

  next();
}
