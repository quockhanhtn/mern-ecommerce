import http from 'http';
import { Server as SocketServer } from 'socket.io';
import app from './app.js';
import LogUtils from './utils/LogUtils.js';
import socketHandler from './socket.io.js';

const port = process.env.PORT || 3001;

const apiServer = http.createServer(app);

const io = new SocketServer(apiServer, {
  cors: { origin: '*', }
});
io.on('connection', (socket) => socketHandler(io, socket));

apiServer.listen(port, () => {
  LogUtils.info('SERVER', `Server listening on port ${port}`);
});
