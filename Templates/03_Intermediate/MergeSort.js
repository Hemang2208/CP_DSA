// Topic: MERGE SORT
// Pattern: Stable Divide and Conquer Sorting
// Use Cases: Stable sorting, inversion counting, external sorting,
// merge-based divide and conquer problems.
//
// Example Problem: Sort an Array
// Source: Standard merge sort problem.
//
// node "MergeSort.js" < "Input.txt" > "Output.txt"

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

// Approach: recursively sort both halves, then merge them in linear
// time. The merge always takes the smaller front element, so the sort
// is stable.
function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = arr.length >> 1;
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return mergeSort(arr).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
