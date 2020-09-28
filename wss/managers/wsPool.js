const socketIo = require('socket.io');
const { http } = require('../engines/server');
const WSClient = require('../libs/WSClient');

const WSPool =  {
  clients: {}
};

WSPool.init = function () {
  this.sio = socketIo(http.cio);

  this.sio.on('connection', WSPool.addClient);
};

WSPool.addClient = function (socket) {
  WSPool.clients[socket.id] = new WSClient(socket);

  socket.on('disconnected', code => {
    delete WSPool.clients[socket.id];
  });
}

module.exports = WSPool;
