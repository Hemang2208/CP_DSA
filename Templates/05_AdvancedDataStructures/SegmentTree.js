// Topic: SEGMENT TREE
// Pattern: Point Update + Range Query
// Use Cases: Range minimum/maximum/sum, point assignment, iterative
// segment tree, merge sort tree, segment tree beats.
//
// Example Problem: Point Update and Range Minimum Query
// Source: Classic segment tree problem.
//
// node "SegmentTree.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: the iterative segment tree stores leaves at [size, 2 * size).
// Point updates rebuild ancestors; range queries combine O(log n) nodes.
class SegmentTree {
    constructor(arr) {
        const n = arr.length;
        let size = 1;

        while (size < n) {
            size <<= 1;
        }

        this.size = size;
        this.tree = new Array(2 * size).fill(Infinity);

        for (let i = 0; i < n; i++) {
            this.tree[size + i] = arr[i];
        }

        for (let i = size - 1; i > 0; i--) {
            this.tree[i] = Math.min(this.tree[i << 1], this.tree[(i << 1) | 1]);
        }
    }

    update(position, value) {
        let i = this.size + position;
        this.tree[i] = value;
        i >>= 1;

        while (i > 0) {
            this.tree[i] = Math.min(this.tree[i << 1], this.tree[(i << 1) | 1]);
            i >>= 1;
        }
    }

    query(left, right) {
        let result = Infinity;
        left += this.size;
        right += this.size + 1;

        while (left < right) {
            if (left & 1) {
                result = Math.min(result, this.tree[left]);
                left++;
            }

            if (right & 1) {
                right--;
                result = Math.min(result, this.tree[right]);
            }

            left >>= 1;
            right >>= 1;
        }

        return result;
    }
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    const segmentTree = new SegmentTree(arr);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const position = Number(input[index++]) - 1;
            const value = Number(input[index++]);
            segmentTree.update(position, value);
        } else {
            const left = Number(input[index++]) - 1;
            const right = Number(input[index++]) - 1;
            answers.push(segmentTree.query(left, right));
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
