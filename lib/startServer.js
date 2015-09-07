var express = require('express');
var config = require('../config.js');

module.exports = startServer

function startServer(graph) {
  var app = express();
  var port = config.port;

  app.use(cors);
  app.get('/graph/dependent/:pkg', function (req, res) {
    var nodeId = req.params.pkg;
    if (!graph.getNode(nodeId)) {
      res.status(404).send('Package is not found');
      return;
    }
    res.send(graph.getSubgraph(nodeId));
  });

  var server = app.listen(port, function () {
      var host = server.address().address;
      var port = server.address().port;

      console.log('App listening at http://%s:%s', host, port);
  });
}

function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
