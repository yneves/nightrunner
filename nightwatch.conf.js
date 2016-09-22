const drivers = require('./lib/drivers.js');
const temp = require('temp');
const output = temp.mkdirSync('test-output');

const env = (key, def) => {
  if (process.env[key]) {
    return process.env[key];
  } else {
    return def;
  }
};

module.exports = {
  'src_folders': env('NR_TESTS_PATH'),
  'globals_path': env('NR_GLOBALS_PATH'),
  'page_objects_path': env('NR_PAGES_PATH'),
  'custom_commands_path': env('NR_COMMANDS_PATH'),
  'output_folder': output,
  'selenium': {
    'start_process': true,
    'server_path': drivers.selenium.path,
    'log_path': output,
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': drivers.chrome.path,
      'java.security.egd': 'file:///dev/urandom switch'
    }
  },
  'test_settings': {
    'default': {
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'screenshots': {
        'enabled': false,
        'path': output
      },
      'desiredCapabilities': {
        'browserName': 'phantomjs',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
        'phantomjs.page.settings.userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
        'phantomjs.binary.path': drivers.phantomjs.path,
        'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--local-storage-path=' + output, '--webdriver-loglevel=NONE'],
        'phantomjs.ghostdriver.cli.args': ['--logLevel=NONE']
      }
    },
    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
};
