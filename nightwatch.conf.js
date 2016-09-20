module.exports = {
  'src_folders': __dirname + '/tests/specs',
  'globals_path': __dirname + '/nightwatch.globals.json',
  'custom_commands_path': __dirname + '/tests/commands',
  'output_folder ': false,
  'selenium': {
    'start_process': true,
    'server_path': process.env.SELENIUM_PATH,
    'log_path': __dirname + '/tests_output',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': process.env.CHROME_PATH,
      'java.security.egd': 'file:///dev/urandom switch'
    }
  },

  'test_settings': {
    'default': {
      'launch_url': 'http://localhost:' + process.env.SERVER_PORT,
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'screenshots': {
        'enabled': false,
        'path': __dirname + '/tests_output'
      },
      'desiredCapabilities': {
        'browserName': 'phantomjs',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
        'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--local-storage-path=tests_output'],
        'phantomjs.page.settings.userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
        'phantomjs.binary.path': process.env.PHANTOMJS_PATH
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
