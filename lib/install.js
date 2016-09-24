const fs = require('fs');
const path = require('path');
const download = require('download');
const drivers = require('./drivers.js');
const spinner = require('loading-spinner');

const fetch = (item, callback) => {
  fs.exists(item.path, (exists) => {
    if (exists) {
      setTimeout(callback, 10);
    } else {
      const isZip = /\.zip$|\.gz$|\.bz2$/.test(item.url);
      const dir = item.downloadPath || item.path;
      const target = isZip ? path.dirname(dir) : dir;
      spinner.start(100, {
        clearChar: true,
        clearLine: true,
        doNotBlock: true,
        hideCursor: true
      });
      download(item.url, target, {extract: isZip}).then(() => {
        spinner.stop();
        setTimeout(callback, 10);
      });
    }
  });
};

const install = (callback) => {
  let counter = 0;
  Object.keys(drivers).forEach((name) => {
    if (drivers[name].url) {
      counter++;
      setTimeout(() => {
        fetch(drivers[name], () => {
          if (--counter === 0) {
            callback && callback(drivers);
          }
        });
      }, 10);
    }
  });
};

module.exports = install;
