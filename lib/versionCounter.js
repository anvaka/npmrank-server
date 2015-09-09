/**
 * Counts version usage of a given package.
 */
module.exports = getVersionUsage;

function getVersionUsage(graph, nodeId, includeNames) {
  // TODO: extract this into its own file
  var counts = new Map();
  graph.forEachLinkedNode(nodeId, countVersions);

  return toString(counts);

  function countVersions(node, link) {
    if (link.fromId === nodeId) return; // count only dependents, not dependencies
    increaseCounter(link.data, link.fromId);
  }

  function increaseCounter(version, currentPackage) {
    // we will either increase a number or record current package name into
    // associated array. This behavior is driven by --print-names argument
    var versionCounter = counts.get(version);
    if (!versionCounter) {
      versionCounter = includeNames ? [currentPackage] : 1;
      counts.set(version, versionCounter);
    } else {
      if (includeNames) {
        versionCounter.push(currentPackage);
      } else {
        counts.set(version, versionCounter + 1);
      }
    }
  }

  function toString(counts) {
    var results = [];
    var total = 0;
    counts.forEach(function(dependents, version) {
      results.push({
        version: version,
        dependents: dependents
      });
      if (Array.isArray(dependents)) total += dependents.length;
      else total += dependents;
    });

    results.sort(byDependents)

    return JSON.stringify(results);
  }

  function byDependents(x, y) {
    if (includeNames) {
      return y.dependents.length - x.dependents.length;
    }

    return y.dependents - x.dependents;
  }
}
