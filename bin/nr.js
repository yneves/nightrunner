#!/usr/bin/env node

const parseArgs = require('minimist');
const run = require('../lib/run.js');
const opts = {
  string: [
    'tests',
    'globals',
    'commands',
    'pages',
    'browser',
    'test',
    'case'
  ],
  boolean: [
    'download'
  ]
};
const args = parseArgs(process.argv.slice(2), opts);
run(args);
