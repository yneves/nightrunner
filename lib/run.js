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
        NR_ASSERTIONS_PATH: args.assertions ? path.resolve(process.cwd(), args.assertions) : '',
        NR_OUTPUT_PATH: args.output ? path.resolve(process.cwd(), args.output) : ''
      }, process.env),
      stdio: 'inherit'
    };

    const nodeArgs = [
      require.resolve('nightwatch/bin/runner.js'),
    ];

    if (args.browser) {
      nodeArgs.push('--env', args.browser);
    }

    if (args.test) {
      nodeArgs.push('--test', args.test);
    }

    if (args.case) {
      nodeArgs.push('--testcase', args.case);
    }

    const proc = cp.spawn('node', nodeArgs, opts);
    proc.on('error', (error) => {
      console.error(error);
    });
  });
};

module.exports = run;
