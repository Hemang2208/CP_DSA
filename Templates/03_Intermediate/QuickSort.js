// Topic: QUICK SORT
// Pattern: Partition Around Pivot / Three-Way Partition
// Use Cases: In-place sorting, kth order statistics, Dutch national
// flag, duplicate-heavy arrays.
//
// Example Problem: Sort an Array With Many Duplicates
// Source: Standard three-way quicksort problem.
//
// node "QuickSort.js" < "Input.txt" > "Output.txt"

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

// Approach: partition into < pivot, == pivot, > pivot. Equal elements
// are skipped in recursive calls, which keeps duplicate-heavy arrays fast.
function quickSort(arr, low, high) {
    while (low < high) {
        const pivot = arr[low + ((high - low) >> 1)];
        let less = low;
        let i = low;
        let greater = high;

        while (i <= greater) {
            if (arr[i] < pivot) {
                [arr[less], arr[i]] = [arr[i], arr[less]];
                less++;
                i++;
            } else if (arr[i] > pivot) {
                [arr[i], arr[greater]] = [arr[greater], arr[i]];
                greater--;
            } else {
                i++;
            }
        }

        if (less - low < high - greater) {
            quickSort(arr, low, less - 1);
            low = greater + 1;
        } else {
            quickSort(arr, greater + 1, high);
            high = less - 1;
        }
    }

    return arr;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return quickSort(arr, 0, n - 1).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
