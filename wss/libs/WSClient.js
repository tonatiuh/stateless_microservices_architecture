const EventBus = require('../engines/kafka');

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
    EventBus.produce({
      metadata : { socketId : this.socket.id },
      payload  : event
    });
  }
}
