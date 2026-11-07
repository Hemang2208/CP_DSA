// Topic: FREQUENCY COUNTING
// Pattern: Hash Map / Hash Set Counting
// Use Cases: Counting occurrences, number of distinct values,
// majority element, duplicate detection, anagrams.
//
// Example Problem: Codeforces 228A - Is your horseshoe on the other hoof?
// https://codeforces.com/problemset/problem/228/A
//
// node "FrequencyCounting.js" < "Input.txt" > "Output.txt"

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

// Approach: only four horseshoes exist. Counting distinct colours tells
// us how many of the four are unique; the rest must be bought again.
function minimumNewHorseshoes(arr) {
    const distinct = new Set(arr);

    return arr.length - distinct.size;
}

function solve() {
    const arr = inputArray(4);

    return minimumNewHorseshoes(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
