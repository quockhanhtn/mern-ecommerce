import logging from "../utils/logging.js";

const LOG_TAG = 'HTTP_TRAFFIC';

export const logger = (req, res, next) => {
  // If using nginx, add to nginx.conf file: proxy_set_header  X-Real-IP  $remote_addr;
  const reqIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  //Log the request info
  logging.info(LOG_TAG, `${reqIP} ${req.method} ${req.url}`);

  res.on('finish', () => {
    //Log the response info
    logging.info(LOG_TAG, `${reqIP} ${req.method} ${req.url} (${res.statusCode})`);
  })

  next();
}