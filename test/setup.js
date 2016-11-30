const path = require('path');
const nr = require('../');
const createServer = require('../server/server.js');

module.exports = nr.setup({

  include: path.resolve(__dirname, 'specs/*.js'),
  reuseBrowser: true,

  before(client, done) {
    this.server = createServer(done);
  },

  after(client) {
    this.server.close();
  },

  wrapEach(testCase) {
    this.client
      .resizeWindow(1400, 900)
      .url(this.server.urls.http)
      .perform(() => testCase.call(this, this.client));
  }

});
