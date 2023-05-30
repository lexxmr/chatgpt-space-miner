// Define the A* algorithm

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.parent = null;
  }
}

function getNeighbors(node, map) {
  let neighbors = [];
  let x = node.x;
  let y = node.y;

  if (map[y - 1] && map[y - 1][x] && map[y - 1][x].type) {
    neighbors.push(new Node(x, y - 1));
  }
  if (map[y + 1] && map[y + 1][x] && map[y + 1][x].type) {
    neighbors.push(new Node(x, y + 1));
  }
  if (map[y][x - 1] && map[y][x - 1].type) {
    neighbors.push(new Node(x - 1, y));
  }
  if (map[y][x + 1] && map[y][x + 1].type) {
    neighbors.push(new Node(x + 1, y));
  }

  return neighbors;
}

function findPathToNearestOre(miner, map) {
  // A* algorithm implementation here...
  let start = new Node(miner.x, miner.y);
  let openList = [start];
  let closedList = [];
  let goal = null;
  let nearestDistance = Infinity;

  while (openList.length > 0) {
    // Sort the openList to get the node with the smallest f at the front
    openList.sort((a, b) => a.f - b.f);

    let current = openList.shift();
    closedList.push(current);

    // Check if the current node is an ore node
    if (map[current.y][current.x].type) {
      let distance = Math.abs(miner.x - current.x) + Math.abs(miner.y - current.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        goal = current;
      }
    }

    // Check all neighbors
    let neighbors = getNeighbors(current, map);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (closedList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
        // If it's in the closed list, ignore it
        continue;
      }

      // If it's not in the open list...
      if (!openList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
        // Compute its scores, set the parent
        neighbor.g = current.g + 1;
        neighbor.h = Math.abs(miner.x - neighbor.x) + Math.abs(miner.y - neighbor.y); // Here we use Manhattan distance for heuristic
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;

        // And add it to the open list
        openList.push(neighbor);
      }
    }
  }

  // Once we've found the goal, we can construct the path
  if (goal) {
    let path = [];
    let node = goal;
    while (node) {
      path.push({ x: node.x, y: node.y });
      node = node.parent;
    }
    return path.reverse();
  }
  return null;
}

module.exports = {
  findPathToNearestOre: findPathToNearestOre
};
