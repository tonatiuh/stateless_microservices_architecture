const http = require('http');

module.exports = class Server {
  constructor(settings, app){
    this.settings = settings;
    this.cio      = http.createServer(app).listen(settings.port, this.onConnected.bind(this));
  }

  onConnected(){
    console.log({
      message     : 'Http server started',
      description : this.settings
    })
  }
}
