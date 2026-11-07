// Topic: DIJKSTRA
// Pattern: Greedy Shortest Path With Min-Heap
// Use Cases: Non-negative weighted shortest paths, multi-source
// shortest paths, path reconstruction, grid weighted paths.
//
// Example Problem: Single Source Shortest Paths
// Source: Classic Dijkstra problem.
//
// node "Dijkstra.js" < "Input.txt" > "Output.txt"

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

// Approach: repeatedly settle the closest unsettled node. Relax all of
// its outgoing edges; the heap keeps candidate distances ordered.
function dijkstra(n, graph, source) {
    const INF = Infinity;
    const distance = new Array(n + 1).fill(INF);
    const heap = new MinHeap();

    distance[source] = 0;
    heap.push([0, source]);

    while (!heap.isEmpty()) {
        const [currentDistance, node] = heap.pop();

        if (currentDistance !== distance[node]) {
            continue;
        }

        for (const [next, weight] of graph[node]) {
            const candidate = currentDistance + weight;

            if (candidate < distance[next]) {
                distance[next] = candidate;
                heap.push([candidate, next]);
            }
        }
    }

    return distance;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const source = Number(input[index++]);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    const distance = dijkstra(n, graph, source);

    return distance
        .slice(1)
        .map((value) => (value === Infinity ? -1 : value))
        .join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
