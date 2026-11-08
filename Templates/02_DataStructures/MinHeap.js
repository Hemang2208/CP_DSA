// Topic: MIN HEAP
// Pattern: Heapify Up / Heapify Down
// Use Cases: Minimum cost merging, Huffman coding, Dijkstra,
// k smallest elements, scheduling by smallest key.
//
// Example Problem: Minimum Cost to Connect Ropes
// Source: Classic min-heap greedy problem.
//
// node "MinHeap.js" < "Input.txt" > "Output.txt"

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

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
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

    extractMin() {
        if (this.heap.length === 0) {
            return undefined;
        }

        const min = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            let i = 0;

            while (true) {
                const left = (i << 1) + 1;
                const right = left + 1;
                let smallest = i;

                if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                    smallest = left;
                }

                if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                    smallest = right;
                }

                if (smallest === i) {
                    break;
                }

                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                i = smallest;
            }
        }

        return min;
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

// Approach: always merge the two shortest ropes. Each merge adds the
// merged length to the total, which is optimal by exchange argument.
function minimumCostToConnectRopes(ropes) {
    const heap = new MinHeap();

    for (const rope of ropes) {
        heap.insert(rope);
    }

    let totalCost = 0;

    while (heap.size() > 1) {
        const first = heap.extractMin();
        const second = heap.extractMin();
        const merged = first + second;

        totalCost += merged;
        heap.insert(merged);
    }

    return totalCost;
}

function solve() {
    const n = Number(input[index++]);
    const ropes = inputArray(n);

    return minimumCostToConnectRopes(ropes);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
