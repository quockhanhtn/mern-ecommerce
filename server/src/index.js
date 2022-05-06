import http from 'http';
import cron from 'node-cron';
import os from 'os';
import { Server as SocketServer } from 'socket.io';
import { importDataToFpt } from '../tool/import-data-to-fpt.js';
import { importUserBehaviorToFpt } from '../tool/import-user-behavior.js';
import app from './app.js';
import socketHandler from './socket.io.js';
import LogUtils from './utils/LogUtils.js';
import SlackUtils from './utils/SlackUtils.js';

const serverIp = Object.entries((Object.entries(os.networkInterfaces())[0]))?.[1]?.[1]?.filter(x => x.family === 'IPv4')?.[0]?.address || '';
const serverPort = process.env.PORT || 3001;
const serverApi = http.createServer(app);

const io = new SocketServer(serverApi, {
  cors: { origin: '*', }
});
io.on('connection', (socket) => socketHandler(io, socket));

serverApi.listen(serverPort, () => {
  LogUtils.info('SERVER', `Server running at ${serverIp}:${serverPort}`);
});


if (process.env.NODE_ENV !== 'dev') {
  SlackUtils.sendMessage('------------------------------------------------------');
  SlackUtils.sendMessage(`Server running at *${serverIp}:${serverPort}*`);

  // schedule task run every day at 03:00 AM
  cron.schedule('0 3 * * *', () => {
    SlackUtils.sendMessage('*[RECOMMEND]* Running a task every day at 03:00 AM to import data to FPT');
    LogUtils.info('SERVER', 'Running a task every day at 03:00 AM to import data to FPT');

    importDataToFpt();
  });

  // schedule task run every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    SlackUtils.sendMessage('*[USER-BEHAVIOR]* Running a task every 30 minutes to import user behavior to FPT');
    LogUtils.info('SERVER', 'Running a task every 30 minutes to import user behavior to FPT');

    importUserBehaviorToFpt();
  });
}
