const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');

const createServer = (dirs = {}) => {

  const server = express();
  server.set('trust proxy', true);
  server.use(helmet());

  Object.keys(dirs).forEach((key) => {
    const dir = dirs[key];
    server.use(key, express.static(dir, {index: false}));
    if (fs.existsSync(path.resolve(dir, 'index.html'))) {
      server.use(key, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(fs.readFileSync(path.resolve(dir, 'index.html')).toString());
      });
    }
  });

  return server;
};

module.exports = createServer;
