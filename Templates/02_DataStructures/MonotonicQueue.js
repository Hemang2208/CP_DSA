// Topic: MONOTONIC QUEUE
// Pattern: Deque of Candidate Indices
// Use Cases: First negative in every window, sliding window minimum
// or maximum, constrained DP transitions, shortest subarray queries.
//
// Example Problem: First Negative Number in Every Window of Size K
// Source: Classic monotonic deque problem.
//
// node "MonotonicQueue.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

function compact(deque, head) {
    if (head > 1000 || head * 2 > deque.length) {
        return { deque: deque.slice(head), head: 0 };
    }

    return { deque, head };
}

function slidingWindowMaximum(arr, k) {
    let deque = [];
    let head = 0;
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        while (head < deque.length && deque[head] <= i - k) head++;
        while (deque.length > head && arr[deque[deque.length - 1]] <= arr[i]) deque.pop();

        deque.push(i);

        const compacted = compact(deque, head);
        deque = compacted.deque;
        head = compacted.head;

        if (i >= k - 1) result.push(arr[deque[head]]);
    }

    return result;
}

function slidingWindowMinimum(arr, k) {
    let deque = [];
    let head = 0;
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        while (head < deque.length && deque[head] <= i - k) head++;
        while (deque.length > head && arr[deque[deque.length - 1]] >= arr[i]) deque.pop();

        deque.push(i);

        const compacted = compact(deque, head);
        deque = compacted.deque;
        head = compacted.head;

        if (i >= k - 1) result.push(arr[deque[head]]);
    }

    return result;
}

// Approach: store indices of negative values only. Remove indices that
// fall outside the window; the front index is the first negative value.
function firstNegativeInWindow(arr, k) {
    let deque = [];
    let head = 0;
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) deque.push(i);
        while (head < deque.length && deque[head] <= i - k) head++;

        const compacted = compact(deque, head);
        deque = compacted.deque;
        head = compacted.head;

        if (i >= k - 1) {
            result.push(deque.length > head ? arr[deque[head]] : 0);
        }
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const arr = inputArray(n);

    return `${firstNegativeInWindow(arr, k).join(" ")} | ${slidingWindowMaximum(arr, k).join(" ")}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
