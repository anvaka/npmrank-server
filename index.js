var config = require('./config.js');
var loadGraph = require('./lib/loadGraph.js');
var startServer = require('./lib/startServer.js');

console.log('Loading graph...');
var graph = loadGraph();
//var graph;
console.log('Done');

startServer(graph);
