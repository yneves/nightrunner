const path = require('path');
const nr = require('../');
const createServer = require('../server/server.js');

module.exports = nr.setup({

  include: path.resolve(__dirname, 'specs/*.js'),
  reuseBrowser: true,

  wrapEach(testCase, next) {
    createServer(0, (server) => {
      this.client
        .resizeWindow(1400, 900)
        .url(server.urls.http)
        .perform(() => testCase.call(this, this.client))
        .perform(() => server.close())
        .perform(() => next());
    });
  },

});
