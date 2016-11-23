const path = require('path');
const nr = require('../');
const driver = require('./driver.js');

module.exports = function createServer(done) {
  const server = nr.server();
  server.listenHttp(7555, () => {
    server.listenWebsocket({ autoAcceptConnections: true });
    server.driveHttp('/api', driver);
    server.driveWebsocket(driver);
    server.static('/', path.resolve(__dirname, './www'));
    done();
  });
  return server;
}

if (require.main === module) {
  createServer((server) => {
    console.log('Server running at: ' + server.urls.http);
  });
}
