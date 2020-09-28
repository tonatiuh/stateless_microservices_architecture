const express = require('express');
const nconf   = require('nconf');
const Server  = require('../libs/server');

module.exports.init = function() {
  this.app  = express();
  this.http = new Server(nconf.get('engines:http'), this.app);

  // logs
  this.app.use(function(req, res, next){
    console.log({
      message     : 'Incoming request',
      description : `[${req.connection.remoteAddress}] ${req.method} ${req.url}`
    });

    return next();
  });

  // cors
  this.app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin');
    return next();
  });
};
