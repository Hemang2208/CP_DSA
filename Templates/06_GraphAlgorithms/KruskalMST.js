// Topic: KRUSKAL MST
// Pattern: Sort Edges + DSU
// Use Cases: Minimum spanning tree, minimum cost connectivity,
// maximum spanning tree (reverse sort), clustering.
//
// Example Problem: Minimum Spanning Tree Total Weight
// Source: Classic Kruskal problem.
//
// node "KruskalMST.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class DSU {
    constructor(n) {
        this.parent = new Array(n + 1);
        this.size = new Array(n + 1).fill(1);

        for (let i = 0; i <= n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        while (this.parent[x] !== x) {
            this.parent[x] = this.parent[this.parent[x]];
            x = this.parent[x];
        }

        return x;
    }

    union(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);

        if (rootA === rootB) {
            return false;
        }

        if (this.size[rootA] < this.size[rootB]) {
            [rootA, rootB] = [rootB, rootA];
        }

        this.parent[rootB] = rootA;
        this.size[rootA] += this.size[rootB];

        return true;
    }
}

// Approach: take edges from cheapest to most expensive, skipping any
// edge whose endpoints are already connected. A spanning tree has n - 1
// edges; fewer means the graph is disconnected.
function kruskal(n, edges) {
    edges.sort((a, b) => a[2] - b[2]);

    const dsu = new DSU(n);
    let total = 0;
    let used = 0;

    for (const [u, v, w] of edges) {
        if (dsu.union(u, v)) {
            total += w;
            used++;
        }
    }

    return used === n - 1 ? total : -1;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const edges = [];

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        edges.push([u, v, w]);
    }

    return kruskal(n, edges);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
