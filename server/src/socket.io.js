import LogUtils from './utils/LogUtils.js';

function socketHandler(io, socket) {
  const address = socket.handshake.address || socket.request.connection.remoteAddress;
  LogUtils.info('socket.io', `User from ${address} connected`);

  socket.on('disconnect', () => {
    LogUtils.info('socket.io', `User from ${address} disconnected`);
  });

  socket.on('chat', (data) => {
    console.log(data);
    io.emit('chat', data);
  });
}

export default socketHandler;
