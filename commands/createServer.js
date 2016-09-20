const createServer = require('../lib/server.js');

module.exports.command = function(dirs, callback) {
  if (typeof dirs === 'function') {
    callback = dirs;
    dirs = undefined;
  }
  const server = createServer(dirs);
  if (typeof callback === 'function') {
    callback(server);
  }
  return this;
};
