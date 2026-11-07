// Topic: MULTI-SOURCE BFS
// Pattern: BFS From All Sources at Once
// Use Cases: Distance to nearest source, rotten oranges, fire spread,
// nearest exit, flood fill from many starting points.
//
// Example Problem: Distance of Every Cell to the Nearest Source
// Source: Classic multi-source BFS problem.
//
// node "MultiSourceBFS.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: put every source in the queue at distance 0. BFS then
// computes the nearest-source distance for every reachable cell.
function multiSourceDistance(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const distance = Array.from({ length: n }, () => new Array(m).fill(-1));
    const queue = [];
    let head = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === "1") {
                distance[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }

    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (head < queue.length) {
        const [row, col] = queue[head++];

        for (const [dr, dc] of directions) {
            const nextRow = row + dr;
            const nextCol = col + dc;

            if (
                nextRow >= 0 &&
                nextRow < n &&
                nextCol >= 0 &&
                nextCol < m &&
                distance[nextRow][nextCol] === -1
            ) {
                distance[nextRow][nextCol] = distance[row][col] + 1;
                queue.push([nextRow, nextCol]);
            }
        }
    }

    return distance.map((row) => row.join(" ")).join("\n");
}

function solve() {
    const n = Number(nextStr());
    const m = Number(nextStr());
    const grid = [];

    for (let i = 0; i < n; i++) {
        grid.push(nextStr());
    }

    return multiSourceDistance(grid);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
