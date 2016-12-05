'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

function includeSpecs(testSuite, patterns, wrapEach, target) {
  target = target || testSuite;
  if (typeof patterns === 'string') {
    patterns = [patterns];
  }
  patterns.map(pattern => glob.sync(pattern)).forEach(files => {
      files.forEach(file => {
          const specs = require(file);
          Object.keys(specs).forEach(key => {
              const testCase = specs[key];
              if (wrapEach) {
                target[key] = wrapEach.bind(testSuite, testCase.bind(testSuite));
              } else {
                target[key] = testCase;
              }
            });
        });
    });
}

function createCallback(name, callback) {
  return function (client, done) {
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

function hasTestCaseArg() {
  return process.argv.indexOf('--testcase') !== -1;
}

function setup(options) {

  const testSuite = {};

  ['before', 'after', 'beforeEach', 'afterEach'].forEach(name => {
      testSuite[name] = createCallback(name, options[name]);
    });

  if (options.reuseBrowser && !hasTestCaseArg()) {

    const testCases = {};
    includeSpecs(testSuite, options.include, options.wrapEach, testCases);

    testSuite.reuseBrowser = function (client) {

        const testKeys = Object.keys(testCases);
        const blankUrl = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

        function runTestCases() {
          if (testKeys.length === 0) {
            client.end();
            return;
          }
          const key = testKeys.shift();
          console.log('\nRunning:  \033[0;32m' + key + '\033[0m');
          client.url(blankUrl)
          .perform((callback) => testCases[key](callback))
          .perform(runTestCases);
        }

        client.url(blankUrl).perform(runTestCases);

      };

  } else if (options.include) {
    includeSpecs(testSuite, options.include, options.wrapEach);
  }

  return testSuite;
}

module.exports = setup;
