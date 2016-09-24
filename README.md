# nightrunner

Wrapper for Nightwatch.js.

  * Automatically downloads all the necessary binaries (selenium, phantomjs, etc)
  * Provides easy API to mock http server (expressjs with a few extensions).
  * Config-less CLI tool.

[![Build Status](https://travis-ci.org/yneves/nightrunner.svg?branch=master)](https://travis-ci.org/yneves/nightrunner)

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
