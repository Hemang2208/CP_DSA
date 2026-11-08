// Topic: SEARCHING
// Pattern: Linear Search
// Use Cases: Finding an element in unsorted data, first and last
// occurrence, counting matches, minimum and maximum scans.
//
// Example Problem: Find the First, Last and Count of a Target
// Source: Classic linear-search exercise.
//
// node "Searching.js" < "Input.txt" > "Output.txt"

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

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }

    return -1;
}

function firstOccurrence(arr, target) {
    return linearSearch(arr, target);
}

function lastOccurrence(arr, target) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === target) return i;
    }

    return -1;
}

function countOccurrences(arr, target) {
    let count = 0;

    for (const value of arr) {
        if (value === target) count++;
    }

    return count;
}

function findMinimum(arr) {
    let minimum = Infinity;

    for (const value of arr) {
        minimum = Math.min(minimum, value);
    }

    return minimum;
}

function findMaximum(arr) {
    let maximum = -Infinity;

    for (const value of arr) {
        maximum = Math.max(maximum, value);
    }

    return maximum;
}

function solve() {
    const n = Number(input[index++]);
    const target = Number(input[index++]);
    const arr = inputArray(n);

    return `${firstOccurrence(arr, target)} ${lastOccurrence(arr, target)} ${countOccurrences(arr, target)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
