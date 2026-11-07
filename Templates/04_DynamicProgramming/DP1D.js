// Topic: DP 1D
// Pattern: One-Dimensional State
// Use Cases: Climbing stairs, frog jump, house robber, minimum cost,
// maximum sum of non-adjacent elements.
//
// Example Problem: House Robber
// Source: Classic 1D DP problem (LeetCode 198 / standard CP).
//
// node "DP1D.js" < "Input.txt" > "Output.txt"

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

// Approach: dp[i] is the best loot using the first i houses. Either
// skip house i (dp[i - 1]) or rob it plus the best up to i - 2.
function houseRobber(arr) {
    if (arr.length === 0) {
        return 0;
    }

    if (arr.length === 1) {
        return arr[0];
    }

    let twoBack = arr[0];
    let oneBack = Math.max(arr[0], arr[1]);

    for (let i = 2; i < arr.length; i++) {
        const current = Math.max(oneBack, twoBack + arr[i]);
        twoBack = oneBack;
        oneBack = current;
    }

    return oneBack;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return houseRobber(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
