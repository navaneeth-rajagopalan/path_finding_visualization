import React, { Component } from 'react';
import Node from './Node/Node';
import Dijkstra from '../Algorithms/Dijkstra';
import classes from './PathfindingVisualizer.module.css';

class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        const grid = [];
        this.gridRows = 20;
        this.gridCols = 35;
        this.timeouts = [];
        this.startNode = [10, 5];
        this.targetNode = [10, 30];
        for (let row = 0; row < this.gridRows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.gridCols; col++) {
                currentRow.push({
                    rowId: row,
                    colId: col,
                    visited: false,
                    isInPath: false
                });
            }
            grid.push(currentRow);
        }
        this.state = {
            grid: grid,
            startNode: this.startNode,
            targetNode: this.targetNode
        };
    }

    visualizePathFind = () => {
        const dijkstra = new Dijkstra([this.gridRows, this.gridCols], this.startNode, this.targetNode);
        const { visitOrder, shortestPath } = dijkstra.findShortestPath();
        for (let index = 0; index < visitOrder.length; index++) {
            const currentVisit = visitOrder[index];
            this.timeouts.push(setTimeout(() => {
                this.animateVisited(currentVisit);
            }, 10));
        }
        for (let index = 0; index < shortestPath.length; index++) {
            const currentPathCell = shortestPath[index];
            this.timeouts.push(setTimeout(() => {
                this.animatePath(currentPathCell);
            }, 10));
        }
    }

    deepCloneGrid = (grid) => {
        return grid.map(cell => ({...cell}))
    }

    animateVisited = (currentCell) => {
        this.setState((currentState) => {
            const clonedGrid = this.deepCloneGrid(currentState.grid);
            clonedGrid[ currentCell[0] ][ currentCell[1] ].visited = true;
            return clonedGrid;
        })
    }

    animatePath = (currentCell) => {
        this.setState((currentState) => {
            const clonedGrid = this.deepCloneGrid(currentState.grid);
            clonedGrid[ currentCell[0] ][ currentCell[1] ].isInPath = true;
            return clonedGrid;
        })
    }

    pathVisualizationHandler = () => {
        this.visualizePathFind();
    }

    render (){
        const grid = this.state.grid.map((row, rowId) => (
            <div key={rowId} className={classes.GridRow}>
                {row.map((cell) => (
                    <Node
                        key={cell.colId}
                        visited={cell.visited}
                        isInPath={cell.isInPath}
                        isStartNode={cell.rowId === this.startNode[0] && cell.colId === this.startNode[1]}
                        isTargetNode={cell.rowId === this.targetNode[0] && cell.colId === this.targetNode[1]} />
                ))}
            </div>)
        );
        return (
            <div>
                <div>
                    <button
                        onClick={this.pathVisualizationHandler}>
                        Start
                    </button>
                </div>
                {grid}
            </div>
        );
    }
}

export default PathfindingVisualizer;