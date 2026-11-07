// Topic: PERSISTENT SEGMENT TREE
// Pattern: Versioned Segment Tree
// Use Cases: Kth smallest in a range, persistent range queries,
// path queries on trees, historical versions.
//
// Example Problem: Kth Smallest Element in a Subarray
// Source: Classic persistent segment tree problem.
//
// node "PersistentSegmentTree.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class PersistentSegmentTree {
    constructor(arr) {
        this.values = Array.from(new Set(arr)).sort((a, b) => a - b);
        this.m = this.values.length;
        this.left = [0];
        this.right = [0];
        this.sum = [0];
        this.roots = new Array(arr.length + 1).fill(0);

        for (let i = 1; i <= arr.length; i++) {
            const rank = this.lowerBound(arr[i - 1]) + 1;
            this.roots[i] = this.update(this.roots[i - 1], 1, this.m, rank);
        }
    }

    lowerBound(target) {
        let low = 0;
        let high = this.values.length;

        while (low < high) {
            const mid = (low + high) >> 1;

            if (this.values[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }

    update(previous, left, right, position) {
        const node = this.sum.length;
        this.left.push(this.left[previous]);
        this.right.push(this.right[previous]);
        this.sum.push(this.sum[previous] + 1);

        if (left === right) {
            return node;
        }

        const mid = (left + right) >> 1;

        if (position <= mid) {
            this.left[node] = this.update(this.left[previous], left, mid, position);
        } else {
            this.right[node] = this.update(
                this.right[previous],
                mid + 1,
                right,
                position
            );
        }

        return node;
    }

    kth(rootRight, rootLeft, k) {
        let left = 1;
        let right = this.m;

        while (left < right) {
            const leftCount =
                this.sum[this.left[rootRight]] - this.sum[this.left[rootLeft]];
            const mid = (left + right) >> 1;

            if (k <= leftCount) {
                rootRight = this.left[rootRight];
                rootLeft = this.left[rootLeft];
                right = mid;
            } else {
                k -= leftCount;
                rootRight = this.right[rootRight];
                rootLeft = this.right[rootLeft];
                left = mid + 1;
            }
        }

        return this.values[left - 1];
    }
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    const tree = new PersistentSegmentTree(arr);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const left = Number(input[index++]);
        const right = Number(input[index++]);
        const k = Number(input[index++]);
        answers.push(tree.kth(tree.roots[right], tree.roots[left - 1], k));
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
