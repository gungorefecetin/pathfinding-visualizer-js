import { Node } from './Node.js';

export class Grid {
    constructor(rows = 25, cols = 50) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
        this.isMousePressed = false;
        this.currentTool = 'wall'; // 'wall', 'start', 'end'
        this.initialize();
    }

    initialize() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';

        // Create grid
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const node = new Node(row, col);
                this.grid[row][col] = node;
                gridElement.appendChild(node.element);

                // Add event listeners
                node.element.addEventListener('mousedown', (e) => this.handleMouseDown(e, node));
                node.element.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, node));
                node.element.addEventListener('mouseup', () => this.handleMouseUp());
            }
        }

        // Set default start and end nodes
        this.setStartNode(this.grid[12][10]);
        this.setEndNode(this.grid[12][40]);

        // Add global mouse up listener
        document.addEventListener('mouseup', () => this.handleMouseUp());
    }

    handleMouseDown(event, node) {
        event.preventDefault();
        this.isMousePressed = true;

        if (event.ctrlKey || event.metaKey) {
            this.currentTool = 'start';
            this.setStartNode(node);
        } else if (event.shiftKey) {
            this.currentTool = 'end';
            this.setEndNode(node);
        } else {
            this.currentTool = 'wall';
            node.setAsWall();
        }
    }

    handleMouseEnter(event, node) {
        if (!this.isMousePressed) return;

        if (this.currentTool === 'wall') {
            node.setAsWall();
        } else if (this.currentTool === 'start') {
            this.setStartNode(node);
        } else if (this.currentTool === 'end') {
            this.setEndNode(node);
        }
    }

    handleMouseUp() {
        this.isMousePressed = false;
    }

    setStartNode(node) {
        if (this.startNode) {
            this.startNode.reset();
        }
        this.startNode = node;
        node.setAsStart();
    }

    setEndNode(node) {
        if (this.endNode) {
            this.endNode.reset();
        }
        this.endNode = node;
        node.setAsEnd();
    }

    resetPath() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.grid[row][col];
                if (!node.isWall && !node.isStart && !node.isEnd) {
                    node.reset();
                }
            }
        }
    }

    clearBoard() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.grid[row][col];
                node.isWall = false;
                node.reset();
            }
        }
        // Reset start and end nodes
        this.setStartNode(this.grid[12][10]);
        this.setEndNode(this.grid[12][40]);
    }

    getNeighbors(node) {
        const neighbors = [];
        const { row, col } = node;
        
        if (row > 0) neighbors.push(this.grid[row - 1][col]); // up
        if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]); // down
        if (col > 0) neighbors.push(this.grid[row][col - 1]); // left
        if (col < this.cols - 1) neighbors.push(this.grid[row][col + 1]); // right
        
        return neighbors.filter(neighbor => !neighbor.isWall);
    }

    async animateVisitedNodes(visitedNodesInOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                return new Promise(resolve => setTimeout(resolve, 10));
            }
            const node = visitedNodesInOrder[i];
            await new Promise(resolve => setTimeout(resolve, 10));
            node.setAsVisited();
        }
    }

    async animatePath(path) {
        for (const node of path) {
            await new Promise(resolve => setTimeout(resolve, 30));
            node.setAsPath();
        }
    }
} 