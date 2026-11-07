// Topic: SEARCHING
// Pattern: Linear Search / Position Mapping
// Use Cases: Finding an element, building an inverse permutation,
// locating first or last occurrences in unsorted data.
//
// Example Problem: Codeforces 136A - Presents
// https://codeforces.com/problemset/problem/136/A
//
// node "Searching.js" < "Input.txt" > "Output.txt"

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

// Approach: a linear scan records where every value lives. Since the
// input is a permutation, position[value] gives the inverse permutation.
function inversePermutation(arr) {
    const n = arr.length;
    const position = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        position[arr[i]] = i + 1;
    }

    const result = new Array(n);

    for (let value = 1; value <= n; value++) {
        result[value - 1] = position[value];
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return inversePermutation(arr).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
