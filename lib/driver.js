'use strict';

const autoBind = require('auto-bind');
const EventEmitter = require('events').EventEmitter;

/**
 * Utility class to drive a test server.
 */
class Driver extends EventEmitter {

  /**
   * Creates a server driver.
   */
  constructor() {
    super();
    autoBind(this);
  }

  /**
   * Handles a http request.
   */
  onHttpRequest(request, response) {
    throw new Error('onHttpRequest not implemented');
  }

  /**
   * Handles a websocket request.
   */
  onWebsocketRequest(request) {
    const connection = request.accept('protocol', request.origin);
    this.onWebsocketConnection(connection);
  }

  /**
   * Handles a websocket connection.
   */
  onWebsocketConnection(connection) {
    throw new Error('onWebsocketConnection not implemented');
  }
}

module.exports = (prototype) => {
  prototype = prototype || {};

  class CustomDriver extends Driver {
    constructor() {
      super();
      if (prototype.constructor) {
        prototype.constructor.call(this);
      }
    }
  };

  Object.keys(prototype).forEach(key => {
    if (key !== 'constructor') {
      CustomDriver.prototype[key] = prototype[key];
    }
  });

  return new CustomDriver();
};
