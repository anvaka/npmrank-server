/**
 * Provides higher level API to query npm graph.
 */
var fs = require('fs');
var fromjson = require('ngraph.fromjson');
var todot = require('ngraph.todot');
var createGraph = require('ngraph.graph');

var graphFile = require('../config.js').graphFile;

module.exports = loadGraph;

function loadGraph() {
  var graph = fromjson(fs.readFileSync(graphFile, 'utf8'));
  var api = {
    /**
     * Gets single node "as is".
     *
     * @example
     *
     * ``` tap
     * var node = api.getNode('lodash')
     *
     * t.equal(node.id, 'lodash', 'Has id');
     * t.ok(Array.isArray(node.data.maintainers), 'Has list of maintainers')
     * ```
     */
    getNode: getNode,

    /**
     * Gets transitive graph of dependents from given nodeId as a dot string.
     * Transitive graph is constructed by DFS traversal of the npm graph. Only
     * incoming edges (dependents) are visited.
     *
     * @see https://en.wikipedia.org/wiki/DOT_(graph_description_language)
     * @param {string} fromId node identifier where to start
     */
    getDependentsDot: getDot,

    /**
     * Gets statistics about transitive graph dependents
     *
     * @param {string} fromId node identifier where to start
     *
     * @example
     * ``` tap
     * var stats = api.getDependentsStats('lodash')
     *
     * t.equal(typeof(stats.edges), 'number', 'total number of edges in the graph');
     * t.equal(typeof(stats.nodes), 'number', 'total number of nodes in the graph')
     * ```
     */
    getDependentsStats: getStats,
  }

  return api;

  function getNode(nodeId) {
    return graph.getNode(nodeId);
  }

  function getDot(fromId) {
    var g = getSubgraph(fromId);
    return todot(g);
  }

  function getStats(fromId) {
    var g = getSubgraph(fromId);
    return {
      edges: g.getLinksCount(),
      nodes: g.getNodesCount()
    };
  }

  function getSubgraph(fromId) {
    var g = createGraph();
    traverse(fromId);

    return g;

    function traverse(fromId) {
      graph.forEachLinkedNode(fromId, saveNode);

      function saveNode(other, link) {
        if (link.toId !== fromId) {
          // todo: for now we are traversing only incoming links.
          // Could be useful to travers outgoing too..
          return;
        }
        var seen = g.getNode(link.fromId);
        g.addLink(link.fromId, link.toId, { v: link.data });
        if (!seen) {
          traverse(link.fromId);
        }
      }
    }
  }
}
