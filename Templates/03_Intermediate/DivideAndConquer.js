// Topic: DIVIDE AND CONQUER
// Pattern: Split, Solve, Merge
// Use Cases: Merge sort, inversion counting, closest pair of points,
// maximum subarray, FFT, divide and conquer DP.
//
// Example Problem: Count Inversions
// Source: Classic divide and conquer problem.
//
// node "DivideAndConquer.js" < "Input.txt" > "Output.txt"

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

// Approach: while merging two sorted halves, every time an element from
// the right half is taken, all remaining left-half values are inversions
// with it.
function mergeAndCount(left, right) {
    const merged = [];
    let inversions = 0;
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            inversions += left.length - i;
            j++;
        }
    }

    while (i < left.length) {
        merged.push(left[i]);
        i++;
    }

    while (j < right.length) {
        merged.push(right[j]);
        j++;
    }

    return [merged, inversions];
}

function countInversions(arr) {
    if (arr.length <= 1) {
        return [arr, 0];
    }

    const mid = arr.length >> 1;
    const [left, leftCount] = countInversions(arr.slice(0, mid));
    const [right, rightCount] = countInversions(arr.slice(mid));
    const [merged, crossCount] = mergeAndCount(left, right);

    return [merged, leftCount + rightCount + crossCount];
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return countInversions(arr)[1];
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
