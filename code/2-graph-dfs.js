const graphDFSTraversal = (vertex, graph, values, seen) => {
  values.push(vertex);
  vertex[seen] = true;
  const connections = graph[vertex];
  connections.forEach(connection =>{
      if(!seen[connection])
      graphDFSTraversal(connection, graph, values, seen);
  });
};

console.log(
  graphDFSTraversal([
    [1, 3],
    [0],
    [3, 8],
    [0, 2, 4, 5],
    [3, 6],
    [3],
    [4, 7],
    [6],
    [2],
  ]),
);
