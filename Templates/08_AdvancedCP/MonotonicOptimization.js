// Topic: MONOTONIC OPTIMIZATION
// Pattern: Monotonic Deque Over a Sliding Prefix Window
// Use Cases: Maximum subarray sum with length limits, DP with sliding
// minimum transition, constrained stock problems, queue optimization.
//
// Example Problem: Maximum Subarray Sum With Length Between L and R
// Source: Classic monotonic deque optimization problem.
//
// node "MonotonicOptimization.js" < "Input.txt" > "Output.txt"

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

// Approach: sum(l..r) = prefix[r] - prefix[l - 1]. For each right end,
// the best left end is the minimum prefix in [right - R, right - L].
// A monotonic deque gives that minimum in O(1) amortized.
function bestConstrainedSum(arr, minLength, maxLength) {
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + arr[i - 1];
    }

    const deque = [];
    let head = 0;
    let best = -Infinity;

    for (let right = 1; right <= n; right++) {
        const addIndex = right - minLength;

        if (addIndex >= 0) {
            while (
                deque.length > head &&
                prefix[deque[deque.length - 1]] >= prefix[addIndex]
            ) {
                deque.pop();
            }

            deque.push(addIndex);
        }

        const minimumIndex = right - maxLength;

        while (deque.length > head && deque[head] < minimumIndex) {
            head++;
        }

        if (deque.length > head) {
            best = Math.max(best, prefix[right] - prefix[deque[head]]);
        }
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const minLength = Number(input[index++]);
    const maxLength = Number(input[index++]);
    const arr = inputArray(n);

    return bestConstrainedSum(arr, minLength, maxLength);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
