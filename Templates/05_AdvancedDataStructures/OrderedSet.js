// Topic: ORDERED SET
// Pattern: Fenwick Tree Over Compressed Values
// Use Cases: Kth smallest, count less than x, order statistics,
// dynamic ranks, balanced BST replacement in JavaScript.
//
// Example Problem: Order Statistics With Insert, Erase, Kth, Count Less
// Source: Classic ordered set problem.
//
// node "OrderedSet.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Fenwick {
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

    kth(k) {
        let position = 0;
        let bit = 1;

        while ((bit << 1) <= this.n) {
            bit <<= 1;
        }

        for (; bit > 0; bit >>= 1) {
            const next = position + bit;

            if (next <= this.n && this.tree[next] < k) {
                position = next;
                k -= this.tree[next];
            }
        }

        return position + 1;
    }
}

function lowerBound(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = (low + high) >> 1;

        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

function solve() {
    const q = Number(input[index++]);
    const operations = [];
    const collected = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);
        const value = Number(input[index++]);
        operations.push([type, value]);

        if (type === 1 || type === 2 || type === 4) {
            collected.push(value);
        }
    }

    const values = Array.from(new Set(collected)).sort((a, b) => a - b);
    const fenwick = new Fenwick(values.length);
    const count = new Map();
    const answers = [];
    let total = 0;

    for (const [type, value] of operations) {
        if (type === 1) {
            const position = lowerBound(values, value) + 1;
            fenwick.add(position, 1);
            count.set(value, (count.get(value) || 0) + 1);
            total++;
        } else if (type === 2) {
            if ((count.get(value) || 0) > 0) {
                const position = lowerBound(values, value) + 1;
                fenwick.add(position, -1);
                count.set(value, count.get(value) - 1);
                total--;
            }
        } else if (type === 3) {
            if (value < 1 || value > total) {
                answers.push(-1);
            } else {
                answers.push(values[fenwick.kth(value) - 1]);
            }
        } else {
            const position = lowerBound(values, value);
            answers.push(fenwick.prefixSum(position));
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
