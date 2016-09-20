const freeport = require('freeport');

const getPort = (port, callback) => {
  if (port) {
    callback(port);
  } else {
    freeport((error, free) => {
      if (error) {
        throw error;
      }
      callback(free);
    });
  }
};

module.exports = getPort;
