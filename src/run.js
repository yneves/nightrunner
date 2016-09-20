const cp = require('child_process');
const path = require('path');
const install = require('./install.js');
const freeport = require('./freeport.js');

const run = (args = {}) => {
  install((drivers) => {
    freeport(args.port, (port) => {
      const opts = {
        cwd: path.resolve(__dirname, '..'),
        env: Object.assign({
          SERVER_PORT: port,
          CHROME_PATH: drivers.chrome.path,
          PHANTOMJS_PATH: path.resolve(__dirname, '../node_modules/phantomjs/bin/phantomjs'),
          SELENIUM_PATH: drivers.selenium.path
        }, process.env),
        stdio: 'inherit'
      };
      const server = cp.spawn('node', [path.resolve(__dirname, 'server.js')], opts);
      const nightwatch = cp.spawn('node', ['./node_modules/nightwatch/bin/runner.js', '--env', args.env], opts);
      nightwatch.on('close', () => server.kill());
    });
  });
};

module.exports = run;
