const Redis = require('ioredis');

module.exports.init = function() {
  this.pub = new Redis();
  this.sub = new Redis();

  this.sub.subscribe('events');
  this.sub.on('message', onMessage.bind(this));
};

module.exports.send = function(data) {
  this.pub.publish('events', encode(data));
};

function onMessage(channel, message) {
  if (channel !== 'events') { return false };
  try {
    let data = decode(message);
    if (data.payload.current === '#') {
      this.pub.publish('actions', encode({
        metadata : data.metadata,
        payload  : {
          0 : ':)',
          1:  ';)'
        }
      }))
    }
    console.log(data)
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
