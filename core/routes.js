const { app } = require('./engines/server');
const { alive } = require('./controllers/main');

app.get('./alive', alive);
