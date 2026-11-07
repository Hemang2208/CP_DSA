// Topic: BFS
// Pattern: Breadth First Search on a Grid
// Use Cases: Shortest path in unweighted graphs, flood fill,
// multi-source BFS, level order, connected components.
//
// Example Problem: Shortest Path From S to E in a Grid
// Source: Standard BFS problem.
//
// node "BFS.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: BFS explores cells in increasing distance order. The first
// time E is reached, its distance is the shortest possible.
function shortestPath(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let startRow = 0;
    let startCol = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === "S") {
                startRow = i;
                startCol = j;
            }
        }
    }

    const distance = Array.from({ length: n }, () => new Array(m).fill(-1));
    const queue = [[startRow, startCol]];
    let head = 0;

    distance[startRow][startCol] = 0;

    while (head < queue.length) {
        const [row, col] = queue[head++];

        if (grid[row][col] === "E") {
            return distance[row][col];
        }

        for (const [dr, dc] of directions) {
            const nextRow = row + dr;
            const nextCol = col + dc;

            if (
                nextRow >= 0 &&
                nextRow < n &&
                nextCol >= 0 &&
                nextCol < m &&
                grid[nextRow][nextCol] !== "#" &&
                distance[nextRow][nextCol] === -1
            ) {
                distance[nextRow][nextCol] = distance[row][col] + 1;
                queue.push([nextRow, nextCol]);
            }
        }
    }

    return -1;
}

function solve() {
    const n = Number(nextStr());
    const m = Number(nextStr());
    const grid = [];

    for (let i = 0; i < n; i++) {
        grid.push(nextStr());
    }

    return shortestPath(grid);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
