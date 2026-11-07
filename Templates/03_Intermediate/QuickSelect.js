// Topic: QUICK SELECT
// Pattern: Partition and Recurse on One Side
// Use Cases: Kth smallest or largest element, order statistics,
// median finding, top-k selection.
//
// Example Problem: Kth Smallest Element
// Source: Classic quickselect problem.
//
// node "QuickSelect.js" < "Input.txt" > "Output.txt"

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

// Approach: partition around a random pivot. Only the side containing
// index k - 1 is explored, giving O(n) expected time.
function partition(arr, low, high) {
    const pivotIndex = low + Math.floor(Math.random() * (high - low + 1));
    [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];

    const pivot = arr[high];
    let store = low;

    for (let i = low; i < high; i++) {
        if (arr[i] < pivot) {
            [arr[i], arr[store]] = [arr[store], arr[i]];
            store++;
        }
    }

    [arr[store], arr[high]] = [arr[high], arr[store]];

    return store;
}

function quickSelect(arr, low, high, k) {
    while (low <= high) {
        const pivot = partition(arr, low, high);

        if (pivot === k) {
            return arr[pivot];
        }

        if (pivot < k) {
            low = pivot + 1;
        } else {
            high = pivot - 1;
        }
    }

    return arr[low];
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const arr = inputArray(n);

    return quickSelect(arr, 0, n - 1, k - 1);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
