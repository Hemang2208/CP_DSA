// Topic: BINARY SEARCH
// Pattern: Binary Search on a Sorted Array
// Use Cases: Exact lookup, lower/upper bound, first or last occurrence,
// occurrence counting, and binary search on the answer.
//
// Example Problem: Codeforces 706B - Interesting drink
// https://codeforces.com/problemset/problem/706/B
//
// node "BinarySearch.js" < "Input.txt" > "Output.txt"

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

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const middle = (left + right) >> 1;

        if (arr[middle] === target) return middle;
        if (arr[middle] < target) left = middle + 1;
        else right = middle - 1;
    }

    return -1;
}

function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const middle = (left + right) >> 1;

        if (arr[middle] >= target) right = middle;
        else left = middle + 1;
    }

    return left;
}

function upperBound(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const middle = (left + right) >> 1;

        if (arr[middle] > target) right = middle;
        else left = middle + 1;
    }

    return left;
}

function countOccurrences(arr, target) {
    return upperBound(arr, target) - lowerBound(arr, target);
}

// Approach: sort the prices. upperBound returns the first index whose
// value is greater than x; that index is exactly how many prices are
// affordable with x coins.
function solve() {
    const n = Number(input[index++]);
    const prices = inputArray(n);
    prices.sort((a, b) => a - b);

    const q = Number(input[index++]);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const coins = Number(input[index++]);
        answers.push(upperBound(prices, coins));
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
