// Topic: GRID AND IMPLICIT GRAPH PROBLEMS
// Pattern: Grid BFS/DFS / Multi-Source / State-Space Search
// Use Cases: Islands, flood fill, enclaves, surrounded regions, 01
// matrix, shortest binary path, knight moves, open lock, puzzles.
//
// Example Problem: Number of Islands and Maximum 01-Matrix Distance
// Source: Classic grid graph problems (LeetCode 200 / 542).
//
// node "GridGraphs.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

function readGrid(rows, cols) {
    const grid = [];

    for (let i = 0; i < rows; i++) {
        const row = [];

        for (let j = 0; j < cols; j++) {
            row.push(Number(nextStr()));
        }

        grid.push(row);
    }

    return grid;
}

const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function floodFill(grid, startRow, startCol, newColor) {
    const oldColor = grid[startRow][startCol];
    if (oldColor === newColor) return grid;
    const queue = [[startRow, startCol]];
    grid[startRow][startCol] = newColor;

    for (let head = 0; head < queue.length; head++) {
        const [row, col] = queue[head];

        for (const [dr, dc] of DIRECTIONS) {
            const nextRow = row + dr;
            const nextCol = col + dc;

            if (
                nextRow >= 0 && nextRow < grid.length &&
                nextCol >= 0 && nextCol < grid[0].length &&
                grid[nextRow][nextCol] === oldColor
            ) {
                grid[nextRow][nextCol] = newColor;
                queue.push([nextRow, nextCol]);
            }
        }
    }

    return grid;
}

function numberOfIslands(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const seen = Array.from({ length: rows }, () => new Array(cols).fill(false));
    let islands = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] !== 1 || seen[row][col]) continue;
            islands++;
            const queue = [[row, col]];
            seen[row][col] = true;

            for (let head = 0; head < queue.length; head++) {
                const [r, c] = queue[head];

                for (const [dr, dc] of DIRECTIONS) {
                    const nr = r + dr;
                    const nc = c + dc;

                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !seen[nr][nc] && grid[nr][nc] === 1) {
                        seen[nr][nc] = true;
                        queue.push([nr, nc]);
                    }
                }
            }
        }
    }

    return islands;
}

function distinctIslands(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const seen = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const shapes = new Set();

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] !== 1 || seen[row][col]) continue;
            const queue = [[row, col]];
            seen[row][col] = true;
            const shape = [];

            for (let head = 0; head < queue.length; head++) {
                const [r, c] = queue[head];
                shape.push([r - row, c - col]);

                for (const [dr, dc] of DIRECTIONS) {
                    const nr = r + dr;
                    const nc = c + dc;

                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !seen[nr][nc] && grid[nr][nc] === 1) {
                        seen[nr][nc] = true;
                        queue.push([nr, nc]);
                    }
                }
            }

            shapes.add(shape.map((point) => point.join(",")).sort().join(";"));
        }
    }

    return shapes.size;
}

function numberOfEnclaves(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const border = row === 0 || col === 0 || row === rows - 1 || col === cols - 1;
            if (border && grid[row][col] === 1) queue.push([row, col]);
        }
    }

    for (let head = 0; head < queue.length; head++) {
        const [row, col] = queue[head];

        for (const [dr, dc] of DIRECTIONS) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                grid[nr][nc] = 0;
                queue.push([nr, nc]);
            }
        }
    }

    let count = 0;
    for (const row of grid) for (const value of row) if (value === 1) count++;
    return count;
}

function surroundedRegions(board) {
    const rows = board.length;
    const cols = board[0].length;
    const queue = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const border = row === 0 || col === 0 || row === rows - 1 || col === cols - 1;
            if (border && board[row][col] === "O") queue.push([row, col]);
        }
    }

    for (let head = 0; head < queue.length; head++) {
        const [row, col] = queue[head];

        for (const [dr, dc] of DIRECTIONS) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === "O") {
                board[nr][nc] = "#";
                queue.push([nr, nc]);
            }
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === "O") board[row][col] = "X";
            else if (board[row][col] === "#") board[row][col] = "O";
        }
    }

    return board;
}

function updateMatrix(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const distance = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
    const queue = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 0) {
                distance[row][col] = 0;
                queue.push([row, col]);
            }
        }
    }

    for (let head = 0; head < queue.length; head++) {
        const [row, col] = queue[head];

        for (const [dr, dc] of DIRECTIONS) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && distance[nr][nc] > distance[row][col] + 1) {
                distance[nr][nc] = distance[row][col] + 1;
                queue.push([nr, nc]);
            }
        }
    }

    return distance;
}

function shortestBinaryPath(grid) {
    const n = grid.length;
    if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;
    const distance = Array.from({ length: n }, () => new Array(n).fill(-1));
    distance[0][0] = 1;
    const queue = [[0, 0]];
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (let head = 0; head < queue.length; head++) {
        const [row, col] = queue[head];
        if (row === n - 1 && col === n - 1) return distance[row][col];

        for (const [dr, dc] of directions) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0 && distance[nr][nc] === -1) {
                distance[nr][nc] = distance[row][col] + 1;
                queue.push([nr, nc]);
            }
        }
    }

    return -1;
}

function minimumEffortPath(heights) {
    const rows = heights.length;
    const cols = heights[0].length;
    const effort = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
    effort[0][0] = 0;
    const heap = [[0, 0, 0]];

    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]);
        const [cost, row, col] = heap.shift();
        if (cost > effort[row][col]) continue;
        if (row === rows - 1 && col === cols - 1) return cost;

        for (const [dr, dc] of DIRECTIONS) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const nextCost = Math.max(cost, Math.abs(heights[nr][nc] - heights[row][col]));
                if (nextCost < effort[nr][nc]) {
                    effort[nr][nc] = nextCost;
                    heap.push([nextCost, nr, nc]);
                }
            }
        }
    }

    return 0;
}

function swimInRisingWater(grid) {
    const n = grid.length;
    const best = Array.from({ length: n }, () => new Array(n).fill(Infinity));
    best[0][0] = grid[0][0];
    const heap = [[grid[0][0], 0, 0]];

    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]);
        const [time, row, col] = heap.shift();
        if (time > best[row][col]) continue;
        if (row === n - 1 && col === n - 1) return time;

        for (const [dr, dc] of DIRECTIONS) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                const nextTime = Math.max(time, grid[nr][nc]);
                if (nextTime < best[nr][nc]) {
                    best[nr][nc] = nextTime;
                    heap.push([nextTime, nr, nc]);
                }
            }
        }
    }

    return best[n - 1][n - 1];
}

function bidirectionalBfs(graph, start, goal) {
    if (start === goal) return 0;
    const front = new Set([start]);
    const back = new Set([goal]);
    const visited = new Set([start, goal]);
    let distance = 0;

    while (front.size && back.size) {
        const smaller = front.size <= back.size ? front : back;
        const other = smaller === front ? back : front;
        const next = new Set();
        distance++;

        for (const node of smaller) {
            for (const neighbour of graph[node]) {
                if (other.has(neighbour)) return distance;
                if (!visited.has(neighbour)) {
                    visited.add(neighbour);
                    next.add(neighbour);
                }
            }
        }

        if (smaller === front) {
            for (const node of next) front.add(node);
            for (const node of smaller) front.delete(node);
        } else {
            for (const node of next) back.add(node);
            for (const node of smaller) back.delete(node);
        }
    }

    return -1;
}

function knightMoves(n, start, target) {
    const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
    const distance = Array.from({ length: n }, () => new Array(n).fill(-1));
    distance[start[0]][start[1]] = 0;
    const queue = [start];

    for (let head = 0; head < queue.length; head++) {
        const [row, col] = queue[head];

        for (const [dr, dc] of moves) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < n && nc >= 0 && nc < n && distance[nr][nc] === -1) {
                distance[nr][nc] = distance[row][col] + 1;
                queue.push([nr, nc]);
            }
        }
    }

    return distance[target[0]][target[1]];
}

function openLock(deadends, target) {
    const blocked = new Set(deadends);
    if (blocked.has("0000")) return -1;
    const queue = [["0000", 0]];
    const seen = new Set(["0000"]);

    for (let head = 0; head < queue.length; head++) {
        const [state, distance] = queue[head];
        if (state === target) return distance;

        for (let i = 0; i < 4; i++) {
            for (const delta of [-1, 1]) {
                const digit = (Number(state[i]) + delta + 10) % 10;
                const next = state.slice(0, i) + digit + state.slice(i + 1);

                if (!blocked.has(next) && !seen.has(next)) {
                    seen.add(next);
                    queue.push([next, distance + 1]);
                }
            }
        }
    }

    return -1;
}

function slidingPuzzle(board) {
    const target = "123450";
    const start = board.flat().join("");
    const moves = [[1, 3], [0, 2, 4], [1, 5], [0, 4], [1, 3, 5], [2, 4]];
    const queue = [[start, 0]];
    const seen = new Set([start]);

    for (let head = 0; head < queue.length; head++) {
        const [state, distance] = queue[head];
        if (state === target) return distance;
        const zero = state.indexOf("0");

        for (const nextIndex of moves[zero]) {
            const chars = state.split("");
            [chars[zero], chars[nextIndex]] = [chars[nextIndex], chars[zero]];
            const next = chars.join("");

            if (!seen.has(next)) {
                seen.add(next);
                queue.push([next, distance + 1]);
            }
        }
    }

    return -1;
}

function graphValidTree(n, edges) {
    if (edges.length !== n - 1) return false;
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const seen = new Set([0]);
    const stack = [0];

    while (stack.length) {
        const node = stack.pop();

        for (const neighbour of graph[node]) {
            if (!seen.has(neighbour)) {
                seen.add(neighbour);
                stack.push(neighbour);
            }
        }
    }

    return seen.size === n;
}

function solve() {
    const rows = Number(nextStr());
    const cols = Number(nextStr());
    const grid = readGrid(rows, cols);
    const islands = numberOfIslands(grid);
    const distance = updateMatrix(grid);
    const maximum = Math.max(...distance.flat());

    return `${islands} ${maximum}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
