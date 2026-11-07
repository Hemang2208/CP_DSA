// Topic: SLIDING WINDOW
// Pattern: Fixed Size Window Sum
// Use Cases: Maximum or minimum sum/average of k consecutive elements,
// fixed-length substring checks, running window statistics.
//
// Example Problem: Codeforces 363B - Fence
// https://codeforces.com/problemset/problem/363/B
//
// node "SlidingWindow.js" < "Input.txt" > "Output.txt"

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

// Approach: build the first window sum, then slide it by removing the
// outgoing element and adding the incoming one. Track the smallest sum.
function minimumWindowStart(heights, k) {
    let windowSum = 0;

    for (let i = 0; i < k; i++) {
        windowSum += heights[i];
    }

    let bestSum = windowSum;
    let bestStart = 1;

    for (let i = k; i < heights.length; i++) {
        windowSum += heights[i] - heights[i - k];

        if (windowSum < bestSum) {
            bestSum = windowSum;
            bestStart = i - k + 2;
        }
    }

    return bestStart;
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const heights = inputArray(n);

    return minimumWindowStart(heights, k);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
