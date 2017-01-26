module.exports = {

  load(client) {
    client.waitForElementPresent('h1', 1000)
      .assert.containsText('h1', 'nightrunner')
      .waitForElementPresent('#http', 1000)
      .assert.containsText('#http', '{"a":1,"b":2,"c":3}');
  },

  loadOne(client) {
    client.waitForElementPresent('h1', 1000)
      .assert.containsText('h1', 'nightrunner')
      .waitForElementPresent('#http', 1000)
      .assert.containsText('#http', '{"a":1,"b":2,"c":3}');
  },

  loadTwo(client) {
    client.waitForElementPresent('h1', 1000)
      .assert.containsText('h1', 'nightrunner')
      .waitForElementPresent('#http', 1000)
      .assert.containsText('#http', '{"a":1,"b":2,"c":3}');
  },

};
