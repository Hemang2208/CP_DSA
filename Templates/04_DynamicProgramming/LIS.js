// Topic: LONGEST INCREASING SUBSEQUENCE
// Pattern: Patience Sorting / Binary Search on Tails
// Use Cases: LIS length, minimum deletions to sort, Russian doll
// envelopes, longest chain problems.
//
// Example Problem: Longest Increasing Subsequence Length
// Source: Classic LIS problem.
//
// node "LIS.js" < "Input.txt" > "Output.txt"

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

// Approach: tails[len] is the smallest possible tail of an increasing
// subsequence of length len + 1. Binary search replaces the first tail
// that is >= value, giving O(n log n).
function lowerBound(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = (low + high) >> 1;

        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

function lisLength(arr) {
    const tails = [];

    for (const value of arr) {
        const position = lowerBound(tails, value);

        if (position === tails.length) {
            tails.push(value);
        } else {
            tails[position] = value;
        }
    }

    return tails.length;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return lisLength(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
