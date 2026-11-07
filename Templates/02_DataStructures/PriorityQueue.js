// Topic: PRIORITY QUEUE
// Pattern: Binary Heap
// Use Cases: Dijkstra, greedy scheduling, k largest/smallest,
// merging sorted streams, running median.
//
// Example Problem: Kth Largest Element
// Source: Standard heap problem (LeetCode 215 / classic CP).
//
// node "PriorityQueue.js" < "Input.txt" > "Output.txt"

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

class PriorityQueue {
    constructor(compareFn = (a, b) => a - b) {
        this.heap = [];
        this.compare = compareFn;
    }

    push(val) {
        this.heap.push(val);
        this._up(this.heap.length - 1);
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }

        const top = this.heap[0];
        const bottom = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._down(0);
        }

        return top;
    }

    peek() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }

    _up(i) {
        while (i > 0) {
            const parent = (i - 1) >> 1;

            if (this.compare(this.heap[i], this.heap[parent]) >= 0) {
                break;
            }

            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }

    _down(i) {
        const n = this.heap.length;

        while ((i << 1) + 1 < n) {
            const left = (i << 1) + 1;
            const right = left + 1;
            let best = left;

            if (right < n && this.compare(this.heap[right], this.heap[left]) < 0) {
                best = right;
            }

            if (this.compare(this.heap[best], this.heap[i]) >= 0) {
                break;
            }

            [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
            i = best;
        }
    }
}

// Approach: keep a min-heap of only the k largest values seen so far.
// The heap root is the kth largest once all numbers are processed.
function kthLargest(arr, k) {
    const pq = new PriorityQueue((a, b) => a - b);

    for (const value of arr) {
        pq.push(value);

        if (pq.size() > k) {
            pq.pop();
        }
    }

    return pq.peek();
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const arr = inputArray(n);

    return kthLargest(arr, k);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
