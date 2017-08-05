const nr = require('../');

module.exports = nr.driver({

  onHttpRequest(req, res) {
    res.json(req.body);
  },

  onWebsocketConnection(connection) {
    connection.on('message', (message) => {
      connection.send(message);
    });
  },
});
