// Topic: BINARY SEARCH
// Pattern: Binary Search on Sorted Array (Upper Bound)
// Use Cases: Counting elements <= x, lower/upper bound, first or last
// occurrence, search in rotated arrays, binary search on the answer.
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
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

// Approach: sort the prices. upperBound returns the first index whose
// value is greater than x; that index is exactly how many prices are
// affordable with x coins.
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
