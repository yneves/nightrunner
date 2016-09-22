const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');

module.exports = () => {

  const server = express();
  server.set('trust proxy', true);

  server.static = (uri, dir) => {
    server.use(uri, express.static(dir, {index: false}));
    if (fs.existsSync(path.resolve(dir, 'index.html'))) {
      server.use(uri, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(fs.readFileSync(path.resolve(dir, 'index.html')).toString());
      });
    }
    return server;
  };

  server.listen = (port, callback) => {
    server.httpServer = http.createServer(server)
      .listen(port, undefined, undefined, callback);
    return server;
  };

  server.close = () => {
    server.httpServer && server.httpServer.close();
    return server;
  };

  server.extend = (methods) => {
    const wrap = (func) => {
      return ;
    };
    Object.keys(methods).forEach(name => {
      this[name] = function() {
        const ret = func.apply(server, arguments);
        if (typeof ret === 'undefined') {
          return server;
        }
        return server;
      };
    });
    return this;
  };

  return server;
};
