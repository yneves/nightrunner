const fs = require('fs');
const path = require('path');
const homeDir = require('home-dir');

const bin = path.resolve(homeDir(), '.nightrunner');

if (!fs.existsSync(bin)) {
  fs.mkdirSync(bin);
}

const selenium = {
  url: 'http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar',
  path: bin + '/selenium-server-standalone-2.43.1.jar/selenium-server-standalone-2.43.1.jar',
  downloadPath: bin + '/selenium-server-standalone-2.43.1.jar'
};

const phantomjs = {
  path: path.resolve(__dirname, '../node_modules/phantomjs/bin/phantomjs')
};

const drivers = {
  linux: {
    selenium,
    phantomjs: {
      url: 'https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2',
      path: bin + '/phantomjs-1.9.8-linux-x86_64/bin/phantomjs',
      downloadPath: bin + '/phantomjs'
    },
    chrome: {
      url: 'http://chromedriver.storage.googleapis.com/2.25/chromedriver_linux64.zip',
      path: bin + '/chromedriver'
    },
    ie: {}
  },
  darwin: {
    selenium,
    phantomjs: {
      url: 'https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-macosx.zip',
      path: bin + '/phantomjs-1.9.8-macosx/bin/phantomjs',
      downloadPath: bin + '/phantomjs'
    },
    chrome: {
      url: 'http://chromedriver.storage.googleapis.com/2.25/chromedriver_mac64.zip',
      path: bin + '/chromedriver'
    },
    ie: {}
  },
  win32: {
    selenium,
    phantomjs: {
      url: 'https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-windows.zip',
      path: bin + '/phantomjs-1.9.8-windows/phantomjs.exe',
      downloadPath: bin + '/phantomjs'
    },
    chrome: {
      url: 'http://chromedriver.storage.googleapis.com/2.25/chromedriver_win32.zip',
      path: bin + '/chromedriver.exe'
    },
    ie: {
      url: 'http://selenium-release.storage.googleapis.com/2.48/IEDriverServer_Win32_2.48.0.zip',
      path: bin + '/IEDriverServer.exe'
    }
  },
  win64: {
    selenium,
    phantomjs: {
      url: 'https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-windows.zip',
      path: bin + '/phantomjs-1.9.8-windows/phantomjs.exe',
      downloadPath: bin + '/phantomjs'
    },
    ie: {
      url: 'http://selenium-release.storage.googleapis.com/2.48/IEDriverServer_x64_2.48.0.zip',
      path: bin + '/IEDriverServer.exe'
    }
  }
};

module.exports = drivers[process.platform];
