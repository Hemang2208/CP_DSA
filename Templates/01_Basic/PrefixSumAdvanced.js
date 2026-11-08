// Topic: PREFIX SUMS (ADVANCED)
// Pattern: Prefix XOR / 2D Prefix / Prefix Product / Modulo Counting
// Use Cases: Subarray sum equals K, XOR subarrays, equal 0/1 subarrays,
// 2D matrix queries, divisibility by K, prefix products.
//
// Example Problem: Subarray Sum K, Equal 0/1 Subarray and Prefix XOR
// Source: Classic prefix-sum problems (LeetCode 560 / 525).
//
// node "PrefixSumAdvanced.js" < "Input.txt" > "Output.txt"

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

function prefixXor(arr) {
    const prefix = new Array(arr.length + 1).fill(0);

    for (let i = 0; i < arr.length; i++) {
        prefix[i + 1] = prefix[i] ^ arr[i];
    }

    return prefix;
}

function prefixProduct(arr) {
    const prefix = new Array(arr.length + 1).fill(1);

    for (let i = 0; i < arr.length; i++) {
        prefix[i + 1] = prefix[i] * arr[i];
    }

    return prefix;
}

function prefix2D(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const prefix = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            prefix[i + 1][j + 1] =
                matrix[i][j] +
                prefix[i][j + 1] +
                prefix[i + 1][j] -
                prefix[i][j];
        }
    }

    return prefix;
}

function rangeSum2D(prefix, r1, c1, r2, c2) {
    return (
        prefix[r2 + 1][c2 + 1] -
        prefix[r1][c2 + 1] -
        prefix[r2 + 1][c1] +
        prefix[r1][c1]
    );
}

function subarraySumK(arr, target) {
    const prefix = new Map([[0, 1]]);
    let sum = 0;
    let count = 0;

    for (const value of arr) {
        sum += value;
        count += prefix.get(sum - target) || 0;
        prefix.set(sum, (prefix.get(sum) || 0) + 1);
    }

    return count;
}

function subarraySumsDivisibleByK(arr, k) {
    const counts = new Map([[0, 1]]);
    let sum = 0;
    let count = 0;

    for (const value of arr) {
        sum += value;
        const remainder = ((sum % k) + k) % k;
        count += counts.get(remainder) || 0;
        counts.set(remainder, (counts.get(remainder) || 0) + 1);
    }

    return count;
}

function contiguousEqual01(arr) {
    const counts = new Map([[0, 1]]);
    let balance = 0;
    let best = 0;

    for (let i = 0; i < arr.length; i++) {
        balance += arr[i] === 1 ? 1 : -1;

        if (counts.has(balance)) {
            best = Math.max(best, i - counts.get(balance));
        } else {
            counts.set(balance, i);
        }
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const target = Number(input[index++]);
    const arr = inputArray(n);

    return `${subarraySumK(arr, target)} ${contiguousEqual01(arr)} ${prefixXor(arr).join(" ")}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
