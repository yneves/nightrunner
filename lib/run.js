const cp = require('child_process');
const path = require('path');
const install = require('./install.js');

const run = (args = {}) => {
  install((drivers) => {
    const opts = {
      cwd: path.resolve(__dirname, '..'),
      env: Object.assign({
        NR_TESTS_PATH: args.tests ? path.resolve(process.cwd(), args.tests) : '',
        NR_PAGES_PATH: args.pages ? path.resolve(process.cwd(), args.pages) : '',
        NR_GLOBALS_PATH: args.globals ? path.resolve(process.cwd(), args.globals) : '',
        NR_COMMANDS_PATH: args.commands ? path.resolve(process.cwd(), args.commands) : '',
      }, process.env),
      stdio: 'inherit'
    };
    const proc = cp.spawn('node', [
      require.resolve('nightwatch/bin/runner.js'),
      '--env',
      args.browser || 'default'
    ], opts);
    proc.on('error', (error) => {
      console.error(error);
    });
  });
};

module.exports = run;
