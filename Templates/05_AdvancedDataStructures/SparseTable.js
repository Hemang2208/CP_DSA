// Topic: SPARSE TABLE
// Pattern: Static Range Query With Logarithms
// Use Cases: Range minimum/maximum/gcd queries without updates,
// LCA preprocessing, offline range statistics.
//
// Example Problem: Static Range Minimum Query
// Source: Classic sparse table problem.
//
// node "SparseTable.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: st[k][i] stores the minimum over 2^k elements starting at
// i. Any range is covered by two overlapping power-of-two blocks.
function buildSparseTable(arr) {
    const n = arr.length;
    const log = new Array(n + 1).fill(0);

    for (let i = 2; i <= n; i++) {
        log[i] = log[i >> 1] + 1;
    }

    const levels = log[n] + 1;
    const st = [arr.slice()];

    for (let k = 1; k < levels; k++) {
        const length = n - (1 << k) + 1;
        st[k] = new Array(length);

        for (let i = 0; i < length; i++) {
            st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
        }
    }

    return { st, log };
}

function sparseQuery(table, left, right) {
    const length = right - left + 1;
    const k = table.log[length];
    const offset = right - (1 << k) + 1;

    return Math.min(table.st[k][left], table.st[k][offset]);
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    const table = buildSparseTable(arr);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const left = Number(input[index++]) - 1;
        const right = Number(input[index++]) - 1;
        answers.push(sparseQuery(table, left, right));
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
