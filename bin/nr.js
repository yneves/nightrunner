#!/usr/bin/env node

const parseArgs = require('minimist');
const run = require('../lib/run.js');
const opts = {
  string: [
    'tests',
    'globals',
    'commands',
    'assertions',
    'pages',
    'browser',
    'test',
    'case',
    'screenshots',
    'output',
  ],
  boolean: [
    'download',
    'verbose',
    'repeat',
  ],
};
const args = parseArgs(process.argv.slice(2), opts);
run(args);
