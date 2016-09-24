# nightrunner

Wrapper for Nightwatch.js. Automatically downloads all the necessary binaries (selenium, phantomjs, etc) and provides easy API to mock http server.

## Install

```
npm install nightrunner -g
```

## Usage

```
nr --tests="/path/to/specs" --commands="/path/to/commands" --browser="chrome"
```

## Example

This is how a spec file looks like.

Note: `nr.server()` returns an expressjs application with a few extensions.


```js
const nr = require('nightrunner');

module.exports = {

  before(browser, done) {
    browser.server = nr.server()
      .static('/', '/path/to/static')
      .listen(8080, done);
  },

  after(browser) {
    browser.server.close();
  },

  testCase() {
    browser.url('http://localhost:8080').end();
  },

  anotherTestCase() {
    browser.url('http://localhost:8080').end();
  }
};
```
