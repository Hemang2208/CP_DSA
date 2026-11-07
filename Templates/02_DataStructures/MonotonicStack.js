// Topic: MONOTONIC STACK
// Pattern: Increasing / Decreasing Stack
// Use Cases: Next greater or smaller element, previous greater or
// smaller, stock span, largest rectangle in histogram.
//
// Example Problem: Next Smaller Element
// Source: Classic monotonic stack problem.

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

// Approach: scan right to left while keeping a strictly increasing stack
// from top to bottom. Pop values >= arr[i]; the remaining top is the
// nearest smaller element on the right.
function nextSmaller(arr) {
    const stack = [];
    const result = new Array(arr.length).fill(-1);

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stack.length && stack[stack.length - 1] >= arr[i]) {
            stack.pop();
        }

        if (stack.length) {
            result[i] = stack[stack.length - 1];
        }

        stack.push(arr[i]);
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return nextSmaller(arr).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
