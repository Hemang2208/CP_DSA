// Topic: KADANE ALGORITHM
// Pattern: Maximum Subarray Sum
// Use Cases: Maximum subarray sum, maximum product subarray,
// best trading window, circular subarray, prefix-sum variants.
//
// Example Problem: Maximum Subarray Sum
// Source: Classic Kadane problem.
//
// node "KadaneAlgorithm.js" < "Input.txt" > "Output.txt"

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

// Approach: keep the best sum ending at the current position. Either
// extend the previous subarray or start fresh at arr[i].
function maximumSubarraySum(arr) {
    let best = arr[0];
    let current = arr[0];

    for (let i = 1; i < arr.length; i++) {
        current = Math.max(arr[i], current + arr[i]);

        if (current > best) {
            best = current;
        }
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return maximumSubarraySum(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
