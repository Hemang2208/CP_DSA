// Topic: SORTING
// Pattern: Greedy After Sorting
// Use Cases: Minimize or maximize a value by consuming largest/smallest
// elements first, pair problems, prefix-based greedy choices.
//
// Example Problem: Codeforces 160A - Twins
// https://codeforces.com/problemset/problem/160/A
//
// node "Sorting.js" < "Input.txt" > "Output.txt"

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

// Approach: sort coins from largest to smallest. Taking larger coins
// first reaches more than half of the total with the fewest coins.
function minimumCoins(arr) {
    const total = arr.reduce((sum, value) => sum + value, 0);
    arr.sort((a, b) => b - a);

    let taken = 0;

    for (let i = 0; i < arr.length; i++) {
        taken += arr[i];

        if (taken * 2 > total) {
            return i + 1;
        }
    }

    return arr.length;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return minimumCoins(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
