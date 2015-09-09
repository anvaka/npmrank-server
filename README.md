# npmrank-server

A server which answers queries regarding npm graph metrics.

# install

```
git clone https://github.com/anvaka/npmrank-server
cd npmrank-server
npm install
```

Download the npm graph from npm:

```
./01_get_graph.sh
```

This will download graph from skimdb and save it to data folder.
Convert it to `ngraph.graph` format for further analysis

```
node convertToGraph.js
```

You are ready to start the server:

```
npm start
```

# routes

I'll keep adding routes here. For now these routes are enabled:

* `/graph/dependent/:pkg-name` - Print a dot file with all transitive depents
of `pkg-name`
* `/graph/dependent/:pkg-name/stats` - Print graph summary for `pkg-name`. Summary
includes number of edges and nodes in transitive dependents graph.
* `/graph/version/:pkg-name` - Print all direct dependents of `pkg-name`
grouped by required version of the `pkg-name`.
* `/graph/version/:pkg-name/stats` - Print number of direct dependents of `pkg-name`
grouped by required version of the `pkg-name`.


# license

MIT
