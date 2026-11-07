// Topic: HEAP APPLICATIONS
// Pattern: Running Median With Two Heaps
// Use Cases: Median from a data stream, top k frequent, merge k
// sorted lists, shortest job first, k closest points.
//
// Example Problem: Median After Every Insertion
// Source: Classic two-heaps problem (LeetCode 295 / standard CP).
//
// node "HeapApplications.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;

        while (i > 0) {
            const parent = (i - 1) >> 1;

            if (this.heap[parent] >= this.heap[i]) {
                break;
            }

            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }

    pop() {
        const top = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length) {
            this.heap[0] = last;
            let i = 0;

            while (true) {
                const left = (i << 1) + 1;
                const right = left + 1;
                let best = i;

                if (left < this.heap.length && this.heap[left] > this.heap[best]) {
                    best = left;
                }

                if (right < this.heap.length && this.heap[right] > this.heap[best]) {
                    best = right;
                }

                if (best === i) {
                    break;
                }

                [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
                i = best;
            }
        }

        return top;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;

        while (i > 0) {
            const parent = (i - 1) >> 1;

            if (this.heap[parent] <= this.heap[i]) {
                break;
            }

            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }

    pop() {
        const top = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length) {
            this.heap[0] = last;
            let i = 0;

            while (true) {
                const left = (i << 1) + 1;
                const right = left + 1;
                let best = i;

                if (left < this.heap.length && this.heap[left] < this.heap[best]) {
                    best = left;
                }

                if (right < this.heap.length && this.heap[right] < this.heap[best]) {
                    best = right;
                }

                if (best === i) {
                    break;
                }

                [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
                i = best;
            }
        }

        return top;
    }
}

// Approach: lower half lives in a max-heap, upper half in a min-heap.
// Keeping their sizes within one makes the median come from one peek
// or from the average of the two roots.
function runningMedians(arr) {
    const lower = new MaxHeap();
    const upper = new MinHeap();
    const medians = [];

    for (const value of arr) {
        if (lower.size() === 0 || value <= lower.peek()) {
            lower.push(value);
        } else {
            upper.push(value);
        }

        if (lower.size() > upper.size() + 1) {
            upper.push(lower.pop());
        } else if (upper.size() > lower.size()) {
            lower.push(upper.pop());
        }

        if (lower.size() === upper.size()) {
            const median = (lower.peek() + upper.peek()) / 2;
            medians.push(Number.isInteger(median) ? median : median.toFixed(1));
        } else {
            medians.push(lower.peek());
        }
    }

    return medians;
}

function solve() {
    const n = Number(input[index++]);
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return runningMedians(arr).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
