'use strict';

const glob = require('glob');
const output = require('./output.js');

const blankUrl = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const testHooks = ['before', 'after', 'beforeEach', 'afterEach'];

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

function hasRepeatCaseArg() {
  return process.argv.indexOf('--repeat') !== -1;
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

function reuseBrowser(testSuite, options) {
  const testCases = {};
  includeSpecs(testSuite, options.include, options.wrapEach, testCases);

  testSuite.reuseBrowser = function(client) {
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
}

function shouldReuseBrowser(options) {
  return (options.reuseBrowser && !hasTestCaseArg()) ||
    (hasTestCaseArg() && hasRepeatCaseArg());
}

function setup(options) {
  const testSuite = {};

  testHooks.forEach((name) => {
    testSuite[name] = createCallback(name, options[name]);
  });

  if (shouldReuseBrowser(options)) {
    reuseBrowser(testSuite, options);
  } else {
    includeSpecs(testSuite, options.include, options.wrapEach);
  }

  return testSuite;
}

module.exports = setup;
