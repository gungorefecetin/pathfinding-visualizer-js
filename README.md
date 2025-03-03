# Pathfinding Algorithm Visualizer

An interactive web application that visualizes various pathfinding algorithms. Built with pure JavaScript, this project helps understand how different pathfinding algorithms work by providing a visual representation of their execution.

## Features

- Multiple pathfinding algorithms:
  - A* (optimal path with heuristic)
  - Dijkstra's Algorithm (optimal path)
  - Breadth-First Search (optimal for unweighted graphs)
  - Depth-First Search (not optimal but interesting to visualize)
- Interactive grid system
- Real-time visualization
- Wall/obstacle creation
- Adjustable start and end points

## Live Demo

You can try the live demo by following the setup instructions below.

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repository-url>
cd pathfinding-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```bash
http://localhost:3000
```

## How to Use

1. **Draw Walls**: Click and drag on the grid to create walls/obstacles
2. **Set Start Point**: Press CTRL/CMD + click to place the start node (green)
3. **Set End Point**: Press SHIFT + click to place the end node (red)
4. **Choose Algorithm**: Select an algorithm from the dropdown menu
5. **Visualize**: Click the "Visualize" button to see the algorithm in action
6. **Clear Board**: Use this button to remove all walls and reset nodes
7. **Clear Path**: Use this button to keep walls but clear the visualization

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Express.js (for serving the application)

## Project Structure

```
pathfinding-visualizer/
├── index.html
├── styles/
│   └── style.css
├── src/
│   ├── main.js
│   ├── Grid.js
│   ├── Node.js
│   └── algorithms.js
├── server.js
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests! 