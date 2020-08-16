import Heap from './Collections/Heap';
import HeapNode from './Collections/HeapNode';

class Dijkstra {

    constructor(grid, start, target){
        this.moveCost = 1;
        this.numRows = grid[0];
        this.numCols = grid[1];
        this.grid = [];
        for (let row = 0; row < this.numRows; row++) {
            const newRow = []
            for (let col = 0; col < this.numCols; col++) {
                newRow.push({
                    distance: Infinity,
                    visited: false,
                    previous: null
                });
            }
            this.grid.push(newRow);
        }
        this.start = start;
        this.target = target;
        this.connected = [[0, 1], [-1, 0], [1, 0], [0, -1]];
        this.openList = new Heap();
    }

    getValidConnections = (currentCell) => {
        const connections = [];
        for (let index = 0; index < this.connected.length; index++) {
            const connection = [currentCell[0] + this.connected[index][0], currentCell[1] + this.connected[index][1]]
            if(connection[0] >= 0 && connection[0] < this.numRows && connection[1] >= 0 && connection[1] < this.numCols){
                connections.push(connection);
            }
        }
        return connections;
    }

    solve = () => {
        const visitOrder = [];
        // Mark distance for Start cell as 0 and add
        const startCell = this.grid[this.start[0]][this.start[1]];
        startCell.distance = 0;
        this.openList.insert(new HeapNode(startCell.distance, this.start));
        while(!this.openList.isEmpty()){
            // Poll the cell with best distance
            const polled = this.openList.poll();
            const currentPos = polled.data;
            visitOrder.push(currentPos);
            const currentCell = this.grid[currentPos[0]][currentPos[1]];
            currentCell.visited = true;
            if(currentPos[0] === this.target[0] && currentPos[1] === this.target[1]){
                return visitOrder;
            }
            // Get valid connections from current cell
            const currentConnections = this.getValidConnections(currentPos);
            for (let index = 0; index < currentConnections.length; index++) {
                const connection = this.grid[ currentConnections[index][0] ][ currentConnections[index][1] ];
                // Compute distance to connections from current cell and update distance if better path found
                if(!connection.visited){
                    const newDistance = currentCell.distance + this.moveCost;
                    if(newDistance < connection.distance){
                        connection.distance = newDistance;
                        connection.previous = currentPos;
                        this.openList.insert(new HeapNode(newDistance, currentConnections[index]));
                    }
                }
            }
        }
        return visitOrder;
    }

    findShortestPath = () => {
        const visitOrder = this.solve();
        const shortestPath = [];
        if(this.grid[ this.target[0] ][ this.target[1] ].visited){
            let current = this.target;
            while(!(current[0] === this.start[0] && current[1] === this.start[1])){
                shortestPath.unshift(current);
                current = this.grid[ current[0] ][ current[1] ].previous;
            }
            shortestPath.unshift(current);
        }
        return {
            visitOrder: visitOrder,
            shortestPath: shortestPath
        }
    }
}

export default Dijkstra;