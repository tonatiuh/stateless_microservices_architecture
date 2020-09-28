const { app } = require('./engines/server');
const { alive, home } = require('./controllers/main');

app.get('/alive', alive);
app.get('/', home);
