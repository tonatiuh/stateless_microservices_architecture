const nconf = require('nconf');

module.exports.init = function() {
  let env = process.env.NODE_ENV || 'development';

  nconf.argv().env().file({ file: `config/${env}.json` });

  console.log({
    message:     'Config init',
    description: env
  });
};
