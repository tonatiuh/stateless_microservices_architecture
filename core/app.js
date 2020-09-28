// NOTE: this helps when node.js dies running silently
try {
  require('./libs/config').init();
  require('./engines/server').init();

  require('./routes');
} catch(error) {
  console.error(error);
  process.exit(1)
}
