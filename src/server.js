const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');

const root = path.resolve(__dirname, '.');
const index = path.resolve(root, 'index.html');

const server = express();
server.set('trust proxy', true);
server.use(helmet());
server.use(express.static(root, {index: false}));
server.use((req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync(index).toString());
});
server.listen(process.env.SERVER_PORT);
