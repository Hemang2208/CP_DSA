// Topic: MONOTONIC QUEUE
// Pattern: Deque of Candidate Indices
// Use Cases: First negative in every window, sliding window minimum
// or maximum, constrained DP transitions, shortest subarray queries.
//
// Example Problem: First Negative Number in Every Window of Size K
// Source: Classic monotonic deque problem.

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

// Approach: store indices of negative values only. Remove indices that
// fall outside the window; the front index is the first negative value.
function firstNegativeInWindow(arr, k) {
    const deque = [];
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            deque.push(i);
        }

        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }

        if (i >= k - 1) {
            result.push(deque.length ? arr[deque[0]] : 0);
        }
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const arr = inputArray(n);

    return firstNegativeInWindow(arr, k).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
