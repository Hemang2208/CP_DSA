// Topic: COORDINATE COMPRESSION
// Pattern: Sort + Unique + Binary Search
// Use Cases: Fenwick over large values, segment trees on ranks,
// inversion counting, offline queries, ordered sets.
//
// Example Problem: Rank Queries on Distinct Values
// Source: Standard coordinate compression problem.
//
// node "CoordinateCompression.js" < "Input.txt" > "Output.txt"

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

// Approach: replace every value by its rank among the sorted distinct
// values. Binary search maps any query value to that rank in O(log n).
function upperBound(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = (low + high) >> 1;

        if (arr[mid] <= target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);
    const values = Array.from(new Set(arr)).sort((a, b) => a - b);

    const q = Number(input[index++]);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const query = Number(input[index++]);
        answers.push(upperBound(values, query));
    }

    return answers.join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
