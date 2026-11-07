// Topic: BELLMAN-FORD
// Pattern: Edge Relaxation
// Use Cases: Shortest paths with negative edges, negative cycle
// detection, difference constraints, SPFA variants.
//
// Example Problem: Single Source Shortest Paths With Negative Edges
// Source: Classic Bellman-Ford problem.
//
// node "BellmanFord.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: n - 1 full passes are enough for any shortest simple path.
// If an edge can still be relaxed afterwards, a negative cycle exists.
function bellmanFord(n, edges, source) {
    const INF = Infinity;
    const distance = new Array(n + 1).fill(INF);
    distance[source] = 0;

    for (let pass = 0; pass < n - 1; pass++) {
        let changed = false;

        for (const [u, v, w] of edges) {
            if (distance[u] !== INF && distance[u] + w < distance[v]) {
                distance[v] = distance[u] + w;
                changed = true;
            }
        }

        if (!changed) {
            break;
        }
    }

    for (const [u, v, w] of edges) {
        if (distance[u] !== INF && distance[u] + w < distance[v]) {
            return "NEGATIVE CYCLE";
        }
    }

    return distance
        .slice(1)
        .map((value) => (value === INF ? -1 : value))
        .join(" ");
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const source = Number(input[index++]);
    const edges = [];

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        edges.push([u, v, w]);
    }

    return bellmanFord(n, edges, source);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
