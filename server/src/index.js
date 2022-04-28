import http from 'http';
import cron from 'node-cron';
import { Server as SocketServer } from 'socket.io';
import app from './app.js';
import LogUtils from './utils/LogUtils.js';
import socketHandler from './socket.io.js';
import { importDataToFpt } from '../tool/import-data-to-fpt.js';

const port = process.env.PORT || 3001;

const apiServer = http.createServer(app);

const io = new SocketServer(apiServer, {
  cors: { origin: '*', }
});
io.on('connection', (socket) => socketHandler(io, socket));

apiServer.listen(port, () => {
  LogUtils.info('SERVER', `Server listening on port ${port}`);
});

// schedule task run every day at 03:00 AM
cron.schedule('0 3 * * *', () => {
  logging.info('SERVER', 'Running a task every day at 03:00 AM to import data to FPT');
  importDataToFpt();
});
