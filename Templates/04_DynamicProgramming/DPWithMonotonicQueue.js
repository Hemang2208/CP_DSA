// Topic: DP WITH MONOTONIC QUEUE
// Pattern: Sliding Window Maximum Transition
// Use Cases: Jump game with maximum jump length, constrained LIS,
// DP transitions over the last k states, partition optimization.
//
// Example Problem: Jump Game VI
// Source: Classic monotonic deque DP problem (LeetCode 1696).
//
// node "DPWithMonotonicQueue.js" < "Input.txt" > "Output.txt"

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

// Approach: dp[i] = arr[i] + max(dp[j]) for j in [i - k, i - 1].
// A decreasing deque of indices keeps that maximum at the front.
function maxJumpScore(arr, k) {
    const n = arr.length;
    const dp = new Array(n).fill(0);
    const deque = [];
    let head = 0;

    dp[0] = arr[0];
    deque.push(0);

    for (let i = 1; i < n; i++) {
        while (head < deque.length && deque[head] < i - k) {
            head++;
        }

        dp[i] = arr[i] + dp[deque[head]];

        while (deque.length > head && dp[deque[deque.length - 1]] <= dp[i]) {
            deque.pop();
        }

        deque.push(i);
    }

    return dp[n - 1];
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const arr = inputArray(n);

    return maxJumpScore(arr, k);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
