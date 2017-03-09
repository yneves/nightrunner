'use strict';

const cp = require('child_process');
const path = require('path');
const install = require('./install.js');

const resolve = (arg) => {
  if (!arg) {
    return '';
  }
  if (arg instanceof Array) {
    return arg.map(resolve).join(';');
  }
  return path.resolve(process.cwd(), arg);
};

const run = (args) => {
  args = args || {};

  install((drivers) => {
    if (args.download) {
      return;
    }

    const opts = {
      cwd: path.resolve(__dirname, '..'),
      env: Object.assign({
        NR_TESTS_PATH: resolve(args.tests),
        NR_PAGES_PATH: resolve(args.pages),
        NR_GLOBALS_PATH: resolve(args.globals),
        NR_COMMANDS_PATH: resolve(args.commands),
        NR_ASSERTIONS_PATH: resolve(args.assertions),
        NR_OUTPUT_PATH: resolve(args.output),
        NR_SCREENSHOTS_PATH: resolve(args.screenshots),
      }, process.env),
      stdio: 'inherit',
    };

    const nodeArgs = [
      require.resolve('nightwatch/bin/runner.js'),
    ];

    if (args.verbose) {
      nodeArgs.push('--verbose');
    }

    if (args.browser) {
      nodeArgs.push('--env', args.browser);
    }

    if (args.test) {
      nodeArgs.push('--test', path.resolve(process.cwd(), args.test));
    }

    if (args.case) {
      nodeArgs.push('--testcase', args.case);
    }

    const proc = cp.spawn('node', nodeArgs, opts);
    proc.on('close', (code) => {
      if (code !== 0) {
        throw new Error('nightwatch exited with code: ' + code);
      }
    });
    proc.on('error', (error) => {
      throw error;
    });
  });
};

module.exports = run;
