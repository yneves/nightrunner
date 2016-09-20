const cp = require('child_process');
const path = require('path');
const install = require('./install.js');

const run = (args = {}) => {
  install((drivers) => {
    const opts = {
      cwd: path.resolve(__dirname, '..'),
      env: {
        NR_TESTS_PATH: path.resolve(process.cwd(), args.tests),
        NR_PAGES_PATH: path.resolve(process.cwd(), args.pages),
        NR_GLOBALS_PATH: path.resolve(process.cwd(), args.globals),
        NR_COMMANDS_PATH: path.resolve(process.cwd(), args.commands),
      },
      stdio: 'inherit'
    };
    const nightwatch = cp.spawn('node', [
      require.resolve('nightwatch/bin/runner.js'),
      '--env',
      args.browser || 'default'
    ], opts);
  });
};

module.exports = run;
