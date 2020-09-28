const EventBus = require('../engines/redis');

module.exports = class WSClient {
  constructor(socket) {
    this.socket = socket;
    this.socket.on('event', this.onEvent.bind(this));
  }

  /*
   * metadata : {}
   * payload  : {}
   * */
  onEvent(event) {
    EventBus.send({
      metadata : { socketId : this.socket.id },
      payload  : event
    });
  }
}
