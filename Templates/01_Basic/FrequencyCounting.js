// Topic: FREQUENCY COUNTING
// Pattern: Hash Map Counting
// Use Cases: Counting occurrences, distinct values, duplicate detection,
// majority element, most frequent value, first unique value.
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
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

function buildFrequency(arr) {
    const frequency = new Map();

    for (const value of arr) {
        frequency.set(value, (frequency.get(value) || 0) + 1);
    }

    return frequency;
}

function distinctCount(arr) {
    return new Set(arr).size;
}

function hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
}

function mostFrequent(arr) {
    let bestValue = -1;
    let bestCount = 0;

    for (const [value, count] of buildFrequency(arr)) {
        if (count > bestCount) {
            bestValue = value;
            bestCount = count;
        }
    }

    return bestValue;
}

function firstUnique(arr) {
    const frequency = buildFrequency(arr);

    for (const value of arr) {
        if (frequency.get(value) === 1) return value;
    }

    return -1;
}

function majorityElement(arr) {
    const threshold = Math.floor(arr.length / 2);

    for (const [value, count] of buildFrequency(arr)) {
        if (count > threshold) return value;
    }

    return -1;
}

// Approach: only four horseshoes exist. Counting distinct colours tells
// us how many of the four are unique; the rest must be bought again.
function minimumNewHorseshoes(arr) {
    return arr.length - distinctCount(arr);
}

function solve() {
    const arr = inputArray(4);

    return minimumNewHorseshoes(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
