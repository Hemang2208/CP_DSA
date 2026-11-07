// Topic: INTERVAL DP
// Pattern: DP Over Subintervals
// Use Cases: Matrix chain multiplication, burst balloons,
// palindrome partitioning, optimal polygon triangulation.
//
// Example Problem: Matrix Chain Multiplication
// Source: Classic interval DP problem.
//
// node "IntervalDP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

// Approach: dp[l][r] is the minimum cost to multiply matrices l..r.
// Try every split point k, paying left cost + right cost + the merge
// cost p[l] * p[k + 1] * p[r + 1].
function matrixChainOrder(p) {
    const n = p.length - 1;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let len = 2; len <= n; len++) {
        for (let l = 0; l + len - 1 < n; l++) {
            const r = l + len - 1;
            dp[l][r] = Infinity;

            for (let k = l; k < r; k++) {
                const cost =
                    dp[l][k] + dp[k + 1][r] + p[l] * p[k + 1] * p[r + 1];

                if (cost < dp[l][r]) {
                    dp[l][r] = cost;
                }
            }
        }
    }

    return dp[0][n - 1];
}

function solve() {
    const n = Number(input[index++]);
    const dimensions = inputArray(n + 1);

    return matrixChainOrder(dimensions);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
