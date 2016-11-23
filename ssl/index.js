const fs = require('fs');
const path = require('path');

module.exports = {
  ca: fs.readFileSync(path.resolve(__dirname, './ca.crt')),
  key: fs.readFileSync(path.resolve(__dirname, './server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './server.crt')),
  requestCert: true,
  rejectUnauthorized: false
};
