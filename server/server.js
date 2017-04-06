const path = require('path');
const nr = require('../');
const driver = require('./driver.js');

module.exports = function createServer(port, done) {
  const server = nr.server();
  server.listenHttp(port, () => {
    server.listenWebsocket({autoAcceptConnections: true});
    server.driveHttp('/api', driver);
    server.driveWebsocket(driver);
    server.static('/', path.resolve(__dirname, './www'));
    done(server);
  });
  return server;
};

if (require.main === module) {
  createServer(7555, (server) => {
    console.log('Server running at: ' + server.urls.http);
  });
}
