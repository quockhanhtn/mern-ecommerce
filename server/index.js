import http from 'http';
import app from './app.js';
import logging from './utils/logging.js';

const port = process.env.PORT || 3001;

const server = http.createServer(app);
server.listen(port, () => {
  logging.info('SERVER', `Server listening on port ${port}`);
});
