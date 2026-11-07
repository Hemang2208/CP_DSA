// Topic: PRIM MST
// Pattern: Grow Tree From a Node Using a Min-Heap
// Use Cases: Minimum spanning tree on dense graphs, online MST,
// minimum cost to connect points.
//
// Example Problem: Minimum Spanning Tree Total Weight
// Source: Classic Prim problem.
//
// node "PrimMST.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        let i = this.heap.length - 1;

        while (i > 0) {
            const parent = (i - 1) >> 1;

            if (this.heap[parent][0] <= this.heap[i][0]) {
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

                if (left < this.heap.length && this.heap[left][0] < this.heap[best][0]) {
                    best = left;
                }

                if (right < this.heap.length && this.heap[right][0] < this.heap[best][0]) {
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

    isEmpty() {
        return this.heap.length === 0;
    }
}

// Approach: start from node 1 and repeatedly add the cheapest edge that
// connects the growing tree to an unvisited node.
function prim(n, graph) {
    const visited = new Array(n + 1).fill(false);
    const heap = new MinHeap();

    heap.push([0, 1]);
    let total = 0;
    let used = 0;

    while (!heap.isEmpty()) {
        const [weight, node] = heap.pop();

        if (visited[node]) {
            continue;
        }

        visited[node] = true;
        total += weight;
        used++;

        for (const [next, nextWeight] of graph[node]) {
            if (!visited[next]) {
                heap.push([nextWeight, next]);
            }
        }
    }

    return used === n ? total : -1;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    return prim(n, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
