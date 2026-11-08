// Topic: SORTING
// Pattern: Comparison Sorting (Bubble / Selection / Insertion)
// Use Cases: Small arrays, nearly sorted data, stable ordering,
// interview fundamentals, and greedy-after-sorting problems.
//
// Example Problem: Codeforces 160A - Twins
// https://codeforces.com/problemset/problem/160/A
//
// node "Sorting.js" < "Input.txt" > "Output.txt"

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

function bubbleSort(arr) {
    const result = arr.slice();

    for (let i = 0; i < result.length; i++) {
        let swapped = false;

        for (let j = 0; j + 1 < result.length - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return result;
}

function selectionSort(arr) {
    const result = arr.slice();

    for (let i = 0; i < result.length; i++) {
        let minimum = i;

        for (let j = i + 1; j < result.length; j++) {
            if (result[j] < result[minimum]) minimum = j;
        }

        [result[i], result[minimum]] = [result[minimum], result[i]];
    }

    return result;
}

function insertionSort(arr) {
    const result = arr.slice();

    for (let i = 1; i < result.length; i++) {
        const value = result[i];
        let j = i - 1;

        while (j >= 0 && result[j] > value) {
            result[j + 1] = result[j];
            j--;
        }

        result[j + 1] = value;
    }

    return result;
}

// Approach: sort the coins in ascending order, then take coins from the
// largest end until the collected sum is strictly more than half.
function minimumCoins(arr) {
    const total = arr.reduce((sum, value) => sum + value, 0);
    const sorted = insertionSort(arr);
    let taken = 0;

    for (let i = sorted.length - 1; i >= 0; i--) {
        taken += sorted[i];

        if (taken * 2 > total) {
            return sorted.length - i;
        }
    }

    return sorted.length;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return minimumCoins(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
