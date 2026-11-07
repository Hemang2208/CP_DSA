// Topic: DIFFERENCE ARRAY
// Pattern: Range Update, Final Array
// Use Cases: Many range additions/updates followed by one final read,
// offline range updates, 2D rectangle updates.
//
// Example Problem: Standard CP problem - Range Addition Queries
// Source: Classic difference array exercise (no direct beginner CF mirror).
//
// node "DifferenceArray.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: diff[l] += value and diff[r + 1] -= value for every update.
// Taking the prefix sum of diff gives the final value at every position.
function applyRangeUpdates(n, updates) {
    const diff = new Array(n + 1).fill(0);

    for (const [left, right, value] of updates) {
        diff[left] += value;
        diff[right + 1] -= value;
    }

    const result = new Array(n).fill(0);
    let running = 0;

    for (let i = 1; i <= n; i++) {
        running += diff[i];
        result[i - 1] = running;
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const updates = [];

    for (let i = 0; i < q; i++) {
        const left = Number(input[index++]);
        const right = Number(input[index++]);
        const value = Number(input[index++]);
        updates.push([left, right, value]);
    }

    return applyRangeUpdates(n, updates).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
