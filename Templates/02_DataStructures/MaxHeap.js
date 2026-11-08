// Topic: MAX HEAP
// Pattern: Heapify Up / Heapify Down
// Use Cases: Largest-first processing, k largest elements,
// scheduling by priority, repeated pairing of maximum values.
//
// Example Problem: Last Stone Weight
// Source: Standard max-heap problem (LeetCode 1046 / classic CP).
//
// node "MaxHeap.js" < "Input.txt" > "Output.txt"

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

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
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

    extractMax() {
        if (this.heap.length === 0) {
            return undefined;
        }

        const max = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            let i = 0;

            while (true) {
                const left = (i << 1) + 1;
                const right = left + 1;
                let largest = i;

                if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
                    largest = left;
                }

                if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
                    largest = right;
                }

                if (largest === i) {
                    break;
                }

                [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
                i = largest;
            }
        }

        return max;
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
}

// Approach: repeatedly take the two heaviest stones. If they differ,
// push the difference back. The final stone (or 0) is the answer.
function lastStoneWeight(stones) {
    const heap = new MaxHeap();

    for (const stone of stones) {
        heap.insert(stone);
    }

    while (heap.size() > 1) {
        const first = heap.extractMax();
        const second = heap.extractMax();

        if (first !== second) {
            heap.insert(first - second);
        }
    }

    return heap.size() === 0 ? 0 : heap.extractMax();
}

function solve() {
    const n = Number(input[index++]);
    const stones = inputArray(n);

    return lastStoneWeight(stones);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
