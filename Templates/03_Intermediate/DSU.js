// Topic: DISJOINT SET UNION (DSU)
// Pattern: Union by Size + Path Compression
// Use Cases: Connected components, Kruskal MST, cycle detection,
// dynamic connectivity, grouping queries.
//
// Example Problem: Count Connected Components After Unions
// Source: Classic DSU problem.
//
// node "DSU.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class DSU {
    constructor(n) {
        this.parent = new Array(n + 1);
        this.size = new Array(n + 1).fill(1);
        this.components = n;

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
        this.components--;

        return true;
    }
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const dsu = new DSU(n);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        dsu.union(u, v);
    }

    return dsu.components;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
