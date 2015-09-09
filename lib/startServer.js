/**
 * Main file for the npmrank server
 */
var express = require('express');
var config = require('../config.js');

module.exports = startServer

/**
 * Starts new express server
 *
 * @param {Object} graph - a graph model constructed by ./loadGraph.js script
 */
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

    res.send(graph.getDependentsDot(nodeId));
  });

  app.get('/graph/dependent/:pkg/stats', function (req, res) {
    // TODO: remove duplcate checks
    var nodeId = req.params.pkg;
    if (!graph.getNode(nodeId)) {
      res.status(404).send('Package is not found');
      return;
    }

    res.send(graph.getDependentsStats(nodeId));
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
