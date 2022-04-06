import logging from './utils/logging.js';

function socketHandler(io, socket) {
  const address = socket.handshake.address || socket.request.connection.remoteAddress;
  logging.info('socket.io', `User from ${address} connected`);

  socket.on('disconnect', () => {
    logging.info('socket.io', `User from ${address} disconnected`);
  });

  socket.on('chat', (data) => {
    console.log(data);
    io.emit('chat', data);
  });
}

export default socketHandler;
