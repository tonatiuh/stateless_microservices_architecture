const Redis = require('ioredis');

module.exports.init = function() {
  this.pub = new Redis();
  this.sub = new Redis();

  this.sub.subscribe('actions');
  this.sub.on('message', onMessage);
};

module.exports.send = function(data) {
  this.pub.publish('events', encode(data));
};

function onMessage(channel, message) {
  if (channel !== 'actions') { return false };
  try {
    let data = decode(message);
    const WSPool = require('../managers/wsPool');

    WSPool.clients[data.metadata.socketId].socket.emit('action', data.payload);
  } catch(error) {
    console.error({
      message     : 'onMessage',
      description : error
    });
  }
}

function encode(data) {
  return JSON.stringify(data);
}

function decode(encoded) {
  return JSON.parse(encoded);
}
