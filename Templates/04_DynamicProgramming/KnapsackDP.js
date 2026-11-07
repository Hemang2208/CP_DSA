// Topic: KNAPSACK DP
// Pattern: 0/1 Knapsack
// Use Cases: Subset sum, equal partition, minimum coins,
// resource allocation, bounded choices.
//
// Example Problem: 0/1 Knapsack Maximum Value
// Source: Classic knapsack problem.
//
// node "KnapsackDP.js" < "Input.txt" > "Output.txt"

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

// Approach: process items one by one and iterate capacity downwards so
// each item is used at most once. dp[c] is the best value for capacity c.
function knapsack(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);

    for (let i = 0; i < weights.length; i++) {
        for (let c = capacity; c >= weights[i]; c--) {
            dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);
        }
    }

    return dp[capacity];
}

function solve() {
    const n = Number(input[index++]);
    const capacity = Number(input[index++]);
    const weights = inputArray(n);
    const values = inputArray(n);

    return knapsack(weights, values, capacity);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
