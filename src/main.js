import { Grid } from './Grid.js';
import { dijkstra, astar, bfs, dfs, getNodesInShortestPathOrder } from './algorithms.js';

// Initialize the grid
const grid = new Grid();

// Get DOM elements
const algorithmSelect = document.getElementById('algorithm-select');
const startButton = document.getElementById('start-btn');
const clearButton = document.getElementById('clear-btn');
const clearPathButton = document.getElementById('clear-path-btn');

// Add event listeners
startButton.addEventListener('click', visualizeAlgorithm);
clearButton.addEventListener('click', () => grid.clearBoard());
clearPathButton.addEventListener('click', () => grid.resetPath());

let isVisualizing = false;

async function visualizeAlgorithm() {
    if (isVisualizing) return;
    isVisualizing = true;
    
    grid.resetPath();
    const startNode = grid.startNode;
    const endNode = grid.endNode;
    
    let visitedNodesInOrder;
    
    switch (algorithmSelect.value) {
        case 'astar':
            visitedNodesInOrder = astar(grid, startNode, endNode);
            break;
        case 'dijkstra':
            visitedNodesInOrder = dijkstra(grid, startNode, endNode);
            break;
        case 'bfs':
            visitedNodesInOrder = bfs(grid, startNode, endNode);
            break;
        case 'dfs':
            visitedNodesInOrder = dfs(grid, startNode, endNode);
            break;
        default:
            visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    }
    
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    
    await grid.animateVisitedNodes(visitedNodesInOrder);
    await grid.animatePath(nodesInShortestPathOrder);
    
    isVisualizing = false;
}

// Add instructions to the page
const header = document.querySelector('header');
const instructions = document.createElement('div');
instructions.className = 'instructions';
instructions.innerHTML = `
    <p>
        <strong>Instructions:</strong><br>
        Click and drag to draw walls<br>
        Press CTRL/CMD + click to place start node<br>
        Press SHIFT + click to place end node<br>
        Select an algorithm and click 'Visualize' to start
    </p>
`;
header.insertBefore(instructions, document.querySelector('.legend')); 