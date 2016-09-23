const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');

const wrap = (obj, func) => {
  return function() {
    const ret = func.apply(server, arguments);
    if (typeof ret === 'undefined') {
      return obj;
    }
    return obj;
  };
};

module.exports = () => {

  const server = express();
  server.set('trust proxy', true);

  server.extend = (methods) => {
    Object.keys(methods).forEach(name => {
      server[name] = wrap(server, methods[name]);
    });
    return server;
  };

  server.extend({

    static(uri, dir) {
      this.use(uri, express.static(dir, {index: false}));
      if (fs.existsSync(path.resolve(dir, 'index.html'))) {
        this.use(uri, (req, res) => {
          res.set('Content-Type', 'text/html');
          res.send(fs.readFileSync(path.resolve(dir, 'index.html')).toString());
        });
      }
    },

    listen(port, callback) {
      this.httpServer = http.createServer(server)
        .listen(port, undefined, undefined, callback);
    },

    close() {
      this.httpServer && this.httpServer.close();
    }
  });

  return server;
};
