// Topic: DSU WITH ROLLBACK
// Pattern: Union Without Path Compression + History Stack
// Use Cases: Offline dynamic connectivity, divide and conquer on time,
// rollback queries, segment tree over time, persistent connectivity.
//
// Example Problem: Union, Rollback, Component Size Query
// Source: Classic rollback DSU problem.
//
// node "DSUWithRollback.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: no path compression, so every union changes only two
// values. A history entry can restore them exactly.
class DSUWithRollback {
    constructor(n) {
        this.parent = new Array(n + 1);
        this.size = new Array(n + 1).fill(1);
        this.history = [];

        for (let i = 0; i <= n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        while (this.parent[x] !== x) {
            x = this.parent[x];
        }

        return x;
    }

    union(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);

        if (rootA === rootB) {
            this.history.push(null);
            return;
        }

        if (this.size[rootA] < this.size[rootB]) {
            [rootA, rootB] = [rootB, rootA];
        }

        this.history.push([rootB, this.parent[rootB], rootA, this.size[rootA]]);
        this.parent[rootB] = rootA;
        this.size[rootA] += this.size[rootB];
    }

    rollback() {
        if (this.history.length === 0) {
            return;
        }

        const change = this.history.pop();

        if (change === null) {
            return;
        }

        const [rootB, parentB, rootA, sizeA] = change;
        this.parent[rootB] = parentB;
        this.size[rootA] = sizeA;
    }

    componentSize(node) {
        return this.size[this.find(node)];
    }
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const dsu = new DSUWithRollback(n);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const u = Number(input[index++]);
            const v = Number(input[index++]);
            dsu.union(u, v);
        } else if (type === 2) {
            dsu.rollback();
        } else {
            const u = Number(input[index++]);
            answers.push(dsu.componentSize(u));
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
