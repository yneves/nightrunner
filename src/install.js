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
      const target = isZip ? path.dirname(item.path) : item.path;
      download(item.url, target, { extract: isZip }, callback);
    }
  });
};

const install = (callback) => {
  fetch(drivers.selenium, () => {
    const driver = drivers[process.argv[2]];
    if (driver) {
      fetch(driver, () => {
        callback(drivers);
      });
    } else {
      callback(drivers);
    }
  });
};

module.exports = install;
