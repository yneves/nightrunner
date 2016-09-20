const path = require('path');

const bin = path.resolve(__dirname, '../bin');

const selenium = {
  url: 'http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar',
  path: bin + '/selenium-server-standalone-2.43.1.jar'
};

const drivers = {
  darwin: {
    selenium,
    chrome: {
      url: 'http://chromedriver.storage.googleapis.com/2.19/chromedriver_mac32.zip',
      path: bin + '/chromedriver'
    }
  },
  win32: {
    selenium,
    chrome: {
      url: 'http://chromedriver.storage.googleapis.com/2.19/chromedriver_win32.zip',
      path: bin + '/chromedriver.exe'
    },
    ie: {
      url: 'http://selenium-release.storage.googleapis.com/2.48/IEDriverServer_Win32_2.48.0.zip',
      path: bin + '/IEDriverServer_Win32_2.48.0.exe'
    }
  },
  win64: {
    selenium,
    ie: {
      url: 'http://selenium-release.storage.googleapis.com/2.48/IEDriverServer_x64_2.48.0.zip',
      path: bin + '/IEDriverServer_x64_2.48.0.exe'
    }
  }
};

module.exports = drivers[process.platform];
