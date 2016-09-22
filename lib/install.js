const fs = require('fs');
const path = require('path');
const download = require('download');
const drivers = require('./drivers.js');

const fetch = (item, callback) => {
  fs.exists(item.path, (exists) => {
    if (exists) {
      callback();
    } else {
      const isZip = /\.zip$|\.gz$/.test(item.url);
      const dir = item.downloadPath || item.path;
      const target = isZip ? path.dirname(dir) : dir;
      download(item.url, target, {extract: isZip}, callback);
    }
  });
};

const install = (callback) => {
  let counter = 0;
  Object.keys(drivers).forEach((name) => {
    if (drivers[name].url) {
      counter++;
      setImmediate(() => {
        fetch(drivers[name], () => {
          if (--counter === 0) {
            callback && callback(drivers);
          }
        });
      });
    }
  });
};

module.exports = install;
