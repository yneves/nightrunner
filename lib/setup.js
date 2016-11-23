const fs = require('fs');
const glob = require('glob');
const path = require('path');

function includeSpecs(testSuite, patterns, wrapEach) {
  if (typeof patterns === 'string') {
    patterns = [patterns];
  }
  patterns.map(pattern => glob.sync(pattern)).forEach(files => {
    files.forEach(file => {
      const specs = require(file);
      Object.keys(specs).forEach(key => {
        const testCase = specs[key];
        if (wrapEach) {
          testSuite[key] = wrapEach.bind(testSuite, testCase.bind(testSuite));
        } else {
          testSuite[key] = testCase;
        }
      });
    });
  });
}

function createCallback(name, callback) {
  return function(client, done) {
    this.client = client;
    if (typeof callback === 'function') {
      if (callback.length === 2) {
        callback.apply(this, [client, done]);
      } else {
        callback.apply(this, [client]);
        done();
      }
    } else {
      done();
    }
  }
}

function setup(options) {

  const testSuite = {};

  ['before', 'after', 'beforeEach', 'afterEach'].forEach(name => {
    testSuite[name] = createCallback(name, options[name]);
  })

  if (options.include) {
    includeSpecs(testSuite, options.include, options.wrapEach);
  }

  return testSuite;
}

module.exports = setup;
