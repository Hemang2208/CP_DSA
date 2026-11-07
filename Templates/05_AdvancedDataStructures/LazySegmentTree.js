// Topic: LAZY SEGMENT TREE
// Pattern: Range Update + Range Query
// Use Cases: Range add and range sum, range assignment, range min
// with lazy tags, interval painting, offline range updates.
//
// Example Problem: Range Add and Range Sum Query
// Source: Classic lazy propagation problem.
//
// node "LazySegmentTree.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class LazySegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.sum = new Array(4 * this.n).fill(0);
        this.lazy = new Array(4 * this.n).fill(0);
        this.build(1, 0, this.n - 1, arr);
    }

    build(node, left, right, arr) {
        if (left === right) {
            this.sum[node] = arr[left];
            return;
        }

        const mid = (left + right) >> 1;
        this.build(node << 1, left, mid, arr);
        this.build((node << 1) | 1, mid + 1, right, arr);
        this.sum[node] = this.sum[node << 1] + this.sum[(node << 1) | 1];
    }

    push(node, left, right) {
        if (this.lazy[node] === 0 || left === right) {
            return;
        }

        const mid = (left + right) >> 1;
        const value = this.lazy[node];

        this.sum[node << 1] += value * (mid - left + 1);
        this.sum[(node << 1) | 1] += value * (right - mid);
        this.lazy[node << 1] += value;
        this.lazy[(node << 1) | 1] += value;
        this.lazy[node] = 0;
    }

    update(node, left, right, queryLeft, queryRight, value) {
        if (queryLeft > right || queryRight < left) {
            return;
        }

        if (queryLeft <= left && right <= queryRight) {
            this.sum[node] += value * (right - left + 1);
            this.lazy[node] += value;
            return;
        }

        this.push(node, left, right);
        const mid = (left + right) >> 1;
        this.update(node << 1, left, mid, queryLeft, queryRight, value);
        this.update((node << 1) | 1, mid + 1, right, queryLeft, queryRight, value);
        this.sum[node] = this.sum[node << 1] + this.sum[(node << 1) | 1];
    }

    query(node, left, right, queryLeft, queryRight) {
        if (queryLeft > right || queryRight < left) {
            return 0;
        }

        if (queryLeft <= left && right <= queryRight) {
            return this.sum[node];
        }

        this.push(node, left, right);
        const mid = (left + right) >> 1;

        return (
            this.query(node << 1, left, mid, queryLeft, queryRight) +
            this.query((node << 1) | 1, mid + 1, right, queryLeft, queryRight)
        );
    }
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    const segmentTree = new LazySegmentTree(arr);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const left = Number(input[index++]) - 1;
            const right = Number(input[index++]) - 1;
            const value = Number(input[index++]);
            segmentTree.update(1, 0, n - 1, left, right, value);
        } else {
            const left = Number(input[index++]) - 1;
            const right = Number(input[index++]) - 1;
            answers.push(segmentTree.query(1, 0, n - 1, left, right));
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
