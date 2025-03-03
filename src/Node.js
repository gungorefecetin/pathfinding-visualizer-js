export class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.distance = Infinity;
        this.heuristic = 0;
        this.totalDistance = Infinity;
        this.previousNode = null;
        this.isVisited = false;
        this.element = this.createElement();
    }

    createElement() {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = this.row;
        cell.dataset.col = this.col;
        return cell;
    }

    reset() {
        this.distance = Infinity;
        this.heuristic = 0;
        this.totalDistance = Infinity;
        this.previousNode = null;
        this.isVisited = false;
        this.element.className = 'cell';
        if (this.isStart) this.element.classList.add('start');
        if (this.isEnd) this.element.classList.add('end');
        if (this.isWall) this.element.classList.add('wall');
    }

    setAsStart() {
        this.isStart = true;
        this.isEnd = false;
        this.isWall = false;
        this.element.className = 'cell start';
    }

    setAsEnd() {
        this.isEnd = true;
        this.isStart = false;
        this.isWall = false;
        this.element.className = 'cell end';
    }

    setAsWall() {
        if (!this.isStart && !this.isEnd) {
            this.isWall = !this.isWall;
            this.element.classList.toggle('wall');
        }
    }

    setAsVisited() {
        if (!this.isStart && !this.isEnd) {
            this.element.classList.add('visited');
        }
    }

    setAsPath() {
        if (!this.isStart && !this.isEnd) {
            this.element.classList.add('path');
        }
    }
} 