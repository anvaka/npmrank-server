var fs = require('fs');
var fromjson = require('ngraph.fromjson');
var todot = require('ngraph.todot');
var createGraph = require('ngraph.graph');

var graphFile = require('../config.js').graphFile;

module.exports = loadGraph;

function loadGraph() {
  var graph = fromjson(fs.readFileSync(graphFile, 'utf8'));
  var api = {
    getNode: getNode,
    getSubgraph: getSubgraph
  }

  return api;

  function getNode(nodeId) {
    return graph.getNode(nodeId);
  }

  function getSubgraph(fromId) {
    var g = createGraph();
    traverse(fromId);

    return todot(g);

    function traverse(fromId) {
      graph.forEachLinkedNode(fromId, saveNode);

      function saveNode(other, link) {
        if (link.toId !== fromId) {
          // todo: for now we are traversing only incoming links.
          // Could be useful to travers outgoing too..
          return;
        }
        var seen = g.getNode(link.fromId);
        g.addLink(link.fromId, link.toId, link.data);
        if (!seen) {
          traverse(link.fromId);
        }
      }
    }
  }
}
