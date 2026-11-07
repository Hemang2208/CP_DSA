// Topic: GRID DP
// Pattern: Path DP on a Matrix
// Use Cases: Minimum or maximum path sum, unique paths, obstacle
// grids, triangle DP, dungeon games.
//
// Example Problem: Minimum Path Sum
// Source: Classic grid DP problem (LeetCode 64 / standard CP).
//
// node "GridDP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: dp[i][j] is the cheapest cost to reach (i, j). It is the
// cell cost plus the cheaper of the top and left neighbours.
function minimumPathSum(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const dp = Array.from({ length: n }, () => new Array(m).fill(0));
    dp[0][0] = grid[0][0];

    for (let i = 1; i < n; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    for (let j = 1; j < m; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[n - 1][m - 1];
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const grid = [];

    for (let i = 0; i < n; i++) {
        const row = [];

        for (let j = 0; j < m; j++) {
            row.push(Number(input[index++]));
        }

        grid.push(row);
    }

    return minimumPathSum(grid);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
