'use strict';

const glob = require('glob');
const output = require('./output.js');

function includeSpecs(testSuite, patterns, wrapEach, target) {
  target = target || testSuite;
  if (typeof patterns === 'string') {
    patterns = [patterns];
  }
  patterns.map((pattern) => glob.sync(pattern)).forEach((files) => {
      files.forEach((file) => {
          const specs = require(file);
          Object.keys(specs).forEach((key) => {
              const testCase = specs[key];
              target[key] = wrapEach
                ? wrapEach.bind(testSuite, testCase.bind(testSuite))
                : testCase;
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
    };
}

function hasTestCaseArg() {
  return process.argv.indexOf('--testcase') !== -1;
}

function getTestCasesToRun(testCases, options) {
  const testKeys = Object.keys(testCases);
  if (!options.parallel) {
    return testKeys;
  }
  testKeys.sort();
  const {total, index} = options.parallel;
  const length = Math.ceil(testKeys.length / total);
  const start = index * length;
  const end = start + length;
  return testKeys.slice(start, end);
}

function setup(options) {
  const testSuite = {};

  ['before', 'after', 'beforeEach', 'afterEach'].forEach((name) => {
    testSuite[name] = createCallback(name, options[name]);
  });

  if (options.reuseBrowser && !hasTestCaseArg()) {
    const testCases = {};
    includeSpecs(testSuite, options.include, options.wrapEach, testCases);

    testSuite.reuseBrowser = function(client) {
        const blankUrl = 'data:image/gif;base64,' +
            'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        const testKeys = getTestCasesToRun(testCases, options);

        function runTestCases() {
          if (testKeys.length === 0) {
            client.end();
            return;
          }
          const key = testKeys.shift();
          output.running(key);
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
