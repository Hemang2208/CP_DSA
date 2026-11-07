// Topic: FENWICK TREE (BINARY INDEXED TREE)
// Pattern: Point Update + Prefix Sum
// Use Cases: Range sum queries, inversion counting, order statistics,
// coordinate compression with Fenwick, 2D Fenwick.
//
// Example Problem: Point Updates and Range Sum Queries
// Source: Classic Fenwick tree problem.
//
// node "FenwickTree.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class FenwickTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }

    add(position, value) {
        for (let i = position; i <= this.n; i += i & -i) {
            this.tree[i] += value;
        }
    }

    prefixSum(position) {
        let sum = 0;

        for (let i = position; i > 0; i -= i & -i) {
            sum += this.tree[i];
        }

        return sum;
    }

    rangeSum(left, right) {
        return this.prefixSum(right) - this.prefixSum(left - 1);
    }
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const fenwick = new FenwickTree(n);
    const answers = [];

    for (let i = 1; i <= n; i++) {
        fenwick.add(i, Number(input[index++]));
    }

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const position = Number(input[index++]);
            const value = Number(input[index++]);
            fenwick.add(position, value);
        } else {
            const left = Number(input[index++]);
            const right = Number(input[index++]);
            answers.push(fenwick.rangeSum(left, right));
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
