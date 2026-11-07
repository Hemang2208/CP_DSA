// Topic: IMPLICIT SEGMENT TREE
// Pattern: Dynamic / Sparse Segment Tree
// Use Cases: Huge coordinate domains, point updates and range queries
// over 1..1e9, dynamic memory allocation per touched node.
//
// Example Problem: Point Add and Range Sum on a Large Domain
// Source: Classic dynamic segment tree problem.
//
// node "ImplicitSegmentTree.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: create nodes only when a position is touched. Node 0 is a
// null node whose children and sum are all zero.
class ImplicitSegmentTree {
    constructor(maxPosition) {
        this.maxPosition = maxPosition;
        this.left = [0];
        this.right = [0];
        this.sum = [0];
        this.root = 0;
    }

    update(node, left, right, position, value) {
        if (node === 0) {
            node = this.sum.length;
            this.left.push(0);
            this.right.push(0);
            this.sum.push(0);
        }

        this.sum[node] += value;

        if (left === right) {
            return node;
        }

        const mid = (left + right) >> 1;

        if (position <= mid) {
            this.left[node] = this.update(
                this.left[node],
                left,
                mid,
                position,
                value
            );
        } else {
            this.right[node] = this.update(
                this.right[node],
                mid + 1,
                right,
                position,
                value
            );
        }

        return node;
    }

    query(node, left, right, queryLeft, queryRight) {
        if (node === 0 || queryLeft > right || queryRight < left) {
            return 0;
        }

        if (queryLeft <= left && right <= queryRight) {
            return this.sum[node];
        }

        const mid = (left + right) >> 1;

        return (
            this.query(this.left[node], left, mid, queryLeft, queryRight) +
            this.query(this.right[node], mid + 1, right, queryLeft, queryRight)
        );
    }
}

function solve() {
    const q = Number(input[index++]);
    const tree = new ImplicitSegmentTree(1000000000);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const position = Number(input[index++]);
            const value = Number(input[index++]);
            tree.root = tree.update(tree.root, 1, tree.maxPosition, position, value);
        } else {
            const left = Number(input[index++]);
            const right = Number(input[index++]);
            answers.push(tree.query(tree.root, 1, tree.maxPosition, left, right));
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
