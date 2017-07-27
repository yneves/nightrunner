'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const autoBind = require('auto-bind');
const bodyParser = require('body-parser');
const WebSocketServer = require('websocket').server;

const createCors = () => cors({
  credentials: true,
  optionsSuccessStatus: 200,
  origin(domain, callback) {
    callback(null, true);
  },
});

/**
 * Utility class to create and configure test servers.
 */
class Server {
  /**
   * Creates a test server.
   */
  constructor() {
    autoBind(this);
    this.urls = {};
    this.hostname = 'localhost';
    this.bindAddress = '0.0.0.0';
    this.createExpress();
  }

  /**
   * Serves a static directory.
   * @param {String} uri
   * @param {String} dir
   */
  static(uri, dir) {
    this.express.use(uri, express.static(dir, {index: false}));
    if (fs.existsSync(path.resolve(dir, 'index.html'))) {
      this.express.use(uri, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(fs.readFileSync(path.resolve(dir, 'index.html')).toString());
      });
    }
  }

  /**
   * Links an uri to a server driver.
   * @param {String} uri
   * @param {Driver} driver
   */
  driveHttp(uri, driver) {
    if (arguments.length === 1) {
      driver = uri;
      uri = '*';
    }
    this.express.use(uri, driver.onHttpRequest);
  }

  /**
   * Links the websocket server to a server driver.
   * @param {Driver} driver
   */
  driveWebsocket(driver) {
    if (this.ws) {
      this.ws.on('request', driver.onWebsocketRequest);
      this.ws.on('connect', driver.onWebsocketConnection);
    }
    if (this.wss) {
      this.wss.on('request', driver.onWebsocketRequest);
      this.wss.on('connect', driver.onWebsocketConnection);
    }
  }

  /**
   * Stops listening http and/or https ports.
   */
  close() {
    if (this.http) {
      this.http.close();
    }
    if (this.https) {
      this.https.close();
    }
  }

  /**
   * Starts listening http and/or https ports.
   * @param {Object} ports
   * @param {Function} callback
   */
  listenHttp(ports, callback) {
    if (arguments.length === 1 && typeof ports === 'function') {
      callback = ports;
      ports = {http: 0};
    }
    if (typeof ports === 'number') {
      ports = {http: ports};
    }
    this.http = this.createHttp(http, ports.http || 0, (port) => {
      this.urls.http = 'http://' + this.hostname + ':' + port;
      if (typeof ports.https === 'number') {
        this.https = this.createHttp(https, ports.https, (port) => {
          this.urls.https = 'https://' + this.hostname + ':' + port;
          callback && callback(this);
        });
      } else {
        callback && callback(this);
      }
    });
  }

  /**
   * Starts a websocket server on top of existing http and/or https servers.
   * @param {Object} options
   * @param {Function} callback
   */
  listenWebsocket(options, callback) {
    if (arguments.length === 1 && typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (this.http) {
      this.ws = this.createWebsocket(this.http, options);
      this.urls.ws = this.urls.http.replace(/^http:/, 'ws:');
      if (typeof callback === 'function') {
        callback(this.ws);
      }
    }
    if (this.https) {
      this.wss = this.createWebsocket(this.https, options);
      this.urls.wss = this.urls.https.replace(/^https:/, 'wss:');
      if (typeof callback === 'function') {
        callback(this.wss);
      }
    }
  }

  /**
   * Creates an express server.
   */
  createExpress() {
    this.express = express();
    this.express.set('trust proxy', true);
    this.express.options('*', createCors());
    this.express.use(createCors());
    this.express.use(helmet());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(bodyParser.json());
  }

  /**
   * @private
   * Creates a http server.
   * @param {Object} protocol
   * @param {Number} port
   * @param {Function} callback
   * @return {HTTPServer}
   */
  createHttp(protocol, port, callback) {
    const httpServer = protocol.createServer(this.express);
    httpServer.listen(port, this.bindAddress, 511, () => {
      const address = this.http.address();
      callback && callback(address.port);
    });
    return httpServer;
  }

  /**
   * @private
   * Creates a websocket server.
   * @param {HttpServer} httpServer
   * @param {Object} options
   * @return {WebsocketServer} wsServer
   */
  createWebsocket(httpServer, options) {
    return new WebSocketServer(Object.assign({httpServer}, options));
  }
}

module.exports = () => new Server();
