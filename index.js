var config = require('./config.js');
var loadGraph = require('./lib/loadGraph.js');
var startServer = require('./lib/startServer.js');

console.log('Loading graph...');
var graph = loadGraph();
if (global.gc) {
  // Run garbage collector before reporting memory usage
  // It is only available with node --expose-gc flag
  global.gc();
}
console.log('Done. Memory Usage:');
console.log(process.memoryUsage());

startServer(graph);
