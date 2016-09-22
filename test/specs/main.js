const path = require('path');
const nr = require('../../');

module.exports = {

  before(browser, done) {
    browser.server = nr.server()
      .static('/', path.resolve(__dirname, '../www'))
      .listen(4132, done);
  },

  after(browser) {
    browser.server.close();
  },

  load(browser) {
    browser
      .url('http://localhost:4132')
      .waitForElementPresent('h1', 1000)
      .assert.containsText('h1', 'nightrunner')
      .end();
  }

};
