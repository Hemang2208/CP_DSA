// Topic: PREFIX SUM
// Pattern: Prefix Sum Queries
// Use Cases: Range sum queries, subarray sum equals k, repeated
// interval sums, prefix XOR, 2D matrix sums.
//
// Example Problem: Codeforces 433B - Kuriyama Mirai's Stones
// https://codeforces.com/problemset/problem/433/B
//
// node "PrefixSum.js" < "Input.txt" > "Output.txt"

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

// Approach: prefix[i] = prefix[i - 1] + arr[i - 1]. A range sum is then
// prefix[r] - prefix[l - 1]. Keep one prefix array for the original
// order and another for the sorted order.
function buildPrefix(arr) {
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + arr[i - 1];
    }

    return prefix;
}

function rangeSum(prefix, left, right) {
    return prefix[right] - prefix[left - 1];
}

function solve() {
    const n = Number(input[index++]);
    const stones = inputArray(n);
    const sorted = stones.slice().sort((a, b) => a - b);

    const originalPrefix = buildPrefix(stones);
    const sortedPrefix = buildPrefix(sorted);

    const m = Number(input[index++]);
    const answers = [];

    for (let i = 0; i < m; i++) {
        const type = Number(input[index++]);
        const left = Number(input[index++]);
        const right = Number(input[index++]);

        if (type === 1) {
            answers.push(rangeSum(originalPrefix, left, right));
        } else {
            answers.push(rangeSum(sortedPrefix, left, right));
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
