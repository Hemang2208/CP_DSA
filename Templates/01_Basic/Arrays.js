// Topic: ARRAYS
// Pattern: Linear Traversal / Running Maximum and Minimum
// Use Cases: Record breaking values, counting extremes, single-pass scans.
//
// Example Problem: Codeforces 155A - I_love_%username%
// https://codeforces.com/problemset/problem/155/A
//
// node "Arrays.js" < "Arrays_Input.txt" > "Arrays_Output.txt"

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

// Approach: fix the first score as both current max and min.
// Every later score that is strictly greater than max or strictly
// smaller than min is a record, then update the corresponding bound.
function countRecords(arr) {
    let best = arr[0];
    let worst = arr[0];
    let records = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > best) {
            best = arr[i];
            records++;
        } else if (arr[i] < worst) {
            worst = arr[i];
            records++;
        }
    }

    return records;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return countRecords(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
