const graphBFSTraversal = (graph) => {
  if (!graph) return;

  const queue = [0];
  const values = [];
  const seen = {};
  while (queue.length) {
    const current = queue.shift();
    values.push(current);
    seen[current] = true;
    const connections = graph[current];
    connections.forEach((connection) => {
      if (!seen[connection]) {
        queue.push(connection);
      }
    });
  }
  return values;
};

console.log(graphBFSTraversal([[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]]));
