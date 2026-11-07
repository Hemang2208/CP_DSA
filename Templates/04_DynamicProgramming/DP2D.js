// Topic: DP 2D
// Pattern: Two-Dimensional State
// Use Cases: Unique paths, edit distance, LCS, grid counting,
// partition DP, knapsack with two constraints.
//
// Example Problem: Unique Paths With Obstacles
// Source: Classic 2D DP problem (LeetCode 63 / standard CP).
//
// node "DP2D.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: dp[i][j] = number of ways to reach cell (i, j). Ways come
// from above and from the left. Obstacles (1) have zero ways.
function uniquePaths(grid) {
    const n = grid.length;
    const m = grid[0].length;

    if (grid[0][0] === 1) {
        return 0;
    }

    const dp = Array.from({ length: n }, () => new Array(m).fill(0));
    dp[0][0] = 1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1 || (i === 0 && j === 0)) {
                continue;
            }

            if (i > 0) {
                dp[i][j] += dp[i - 1][j];
            }

            if (j > 0) {
                dp[i][j] += dp[i][j - 1];
            }
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

    return uniquePaths(grid);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
