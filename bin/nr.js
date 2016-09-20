#!/usr/bin/env node

const parseArgs = require('minimist');
const run = require('../lib/run.js');
const args = parseArgs(process.argv.slice(2), {
  string: ['tests', 'globals', 'commands', 'pages', 'browser']
});
run(args);
