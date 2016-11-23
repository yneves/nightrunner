const fs = require('fs');
const path = require('path');
const homeDir = require('home-dir');

const bin = path.resolve(homeDir(), '.nightrunner');

if (!fs.existsSync(bin)) {
  fs.mkdirSync(bin);
}

const selenium = {
  url: 'http://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar',
  path: bin + '/selenium-server-standalone-3.0.1.jar/selenium-server-standalone-3.0.1.jar',
  downloadPath: bin + '/selenium-server-standalone-3.0.1.jar'
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
    firefox: {
      url: 'https://github.com/mozilla/geckodriver/releases/download/v0.11.1/geckodriver-v0.11.1-linux64.tar.gz',
      path: bin + '/geckodriver'
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
    firefox: {
      url: 'https://github.com/mozilla/geckodriver/releases/download/v0.11.1/geckodriver-v0.11.1-macos.tar.gz',
      path: bin + '/geckodriver'
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
    firefox: {
      url: 'https://github.com/mozilla/geckodriver/releases/download/v0.11.1/geckodriver-v0.11.1-win32.zip',
      path: bin + '/geckodriver.exe'
    },
    ie: {
      url: 'http://selenium-release.storage.googleapis.com/2.48/IEDriverServer_Win32_2.48.0.zip',
      path: bin + '/IEDriverServer.exe'
    },
    edge: {
      url: 'https://download.microsoft.com/download/3/2/D/32D3E464-F2EF-490F-841B-05D53C848D15/MicrosoftWebDriver.exe',
      path: 'MicrosoftWebDriver.exe'
    }
  },
  win64: {
    selenium,
    phantomjs: {
      url: 'https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-windows.zip',
      path: bin + '/phantomjs-1.9.8-windows/phantomjs.exe',
      downloadPath: bin + '/phantomjs'
    },
    firefox: {
      url: 'https://github.com/mozilla/geckodriver/releases/download/v0.11.1/geckodriver-v0.11.1-win64.zip',
      path: bin + '/geckodriver.exe'
    },
    ie: {
      url: 'http://selenium-release.storage.googleapis.com/2.48/IEDriverServer_x64_2.48.0.zip',
      path: bin + '/IEDriverServer.exe'
    },
    edge: {
      url: 'https://download.microsoft.com/download/3/2/D/32D3E464-F2EF-490F-841B-05D53C848D15/MicrosoftWebDriver.exe',
      path: 'MicrosoftWebDriver.exe'
    }
  }
};

module.exports = drivers[process.platform];
