export function dijkstra(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        
        if (closestNode === endNode) return visitedNodesInOrder;
        
        updateUnvisitedNeighbors(closestNode, grid);
    }
    
    return visitedNodesInOrder;
}

export function astar(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristic = calculateManhattanDistance(startNode, endNode);
    startNode.totalDistance = startNode.distance + startNode.heuristic;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length) {
        sortNodesByTotalDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.totalDistance === Infinity) return visitedNodesInOrder;
        
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        
        if (closestNode === endNode) return visitedNodesInOrder;
        
        updateUnvisitedNeighborsAstar(closestNode, grid, endNode);
    }
    
    return visitedNodesInOrder;
}

export function bfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const queue = [startNode];
    startNode.isVisited = true;

    while (queue.length) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === endNode) return visitedNodesInOrder;

        const neighbors = grid.getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                queue.push(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}

export function dfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const stack = [startNode];
    startNode.isVisited = true;

    while (stack.length) {
        const currentNode = stack.pop();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === endNode) return visitedNodesInOrder;

        const neighbors = grid.getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

// Helper functions
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid.grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function sortNodesByTotalDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = grid.getNeighbors(node).filter(neighbor => !neighbor.isVisited);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function updateUnvisitedNeighborsAstar(node, grid, endNode) {
    const unvisitedNeighbors = grid.getNeighbors(node).filter(neighbor => !neighbor.isVisited);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.heuristic = calculateManhattanDistance(neighbor, endNode);
        neighbor.totalDistance = neighbor.distance + neighbor.heuristic;
        neighbor.previousNode = node;
    }
}

function calculateManhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
} 