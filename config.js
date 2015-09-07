var path = require('path');

module.exports = {
  graphFile: path.join(__dirname, 'data', 'dependenciesGraph.out.graph'),
  port: process.env.PORT || 3000
};
