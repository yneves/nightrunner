const fs = require('fs');
const path = require('path');
const express = require('express');
const autoBind = require('auto-bind');

class ServerDriver {

  constructor() {
    autoBind(this);
    this.server = express();
    this.server.set('trust proxy', true);
  }

  static(uri, dir) {
    this.server.use(uri, express.static(dir, {index: false}));
    if (fs.existsSync(path.resolve(dir, 'index.html'))) {
      this.server.use(uri, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(fs.readFileSync(path.resolve(dir, 'index.html')).toString());
      });
    }
    return this;
  }

  listen(port, callback) {
    this._close = this.server.listen(port, undefined, undefined, callback);
    return this;
  }

  close() {
    this._close && this._close.close();
    return this;
  }

  extend(methods) {
    const _this = this;
    const wrap = (func) => {
      return function() {
        const ret = func.apply(_this, arguments);
        if (typeof ret === 'undefined') {
          return _this;
        }
        return ret;
      };
    };
    Object.keys(methods).forEach(name => {
      this[name] = wrap(methods[name]);
    });
    return this;
  }

};

module.exports = () => new ServerDriver();
