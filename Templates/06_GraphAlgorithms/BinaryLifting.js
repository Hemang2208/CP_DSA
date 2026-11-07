// Topic: BINARY LIFTING
// Pattern: 2^k Ancestor Tables
// Use Cases: Kth ancestor queries, LCA, path jumps, functional graphs,
// tree distance and kth node on a path.
//
// Example Problem: Kth Ancestor Queries
// Source: Classic binary lifting problem.
//
// node "BinaryLifting.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: up[j][v] is the 2^j-th ancestor of v. Any k decomposes
// into set bits, so a query takes O(log k).
function buildLifting(n, root, graph) {
    const LOG = 31;
    const parent = new Array(n + 1).fill(0);
    const depth = new Array(n + 1).fill(0);
    const order = [root];

    for (let i = 0; i < order.length; i++) {
        const node = order[i];

        for (const next of graph[node]) {
            if (next !== parent[node]) {
                parent[next] = node;
                depth[next] = depth[node] + 1;
                order.push(next);
            }
        }
    }

    const up = Array.from({ length: LOG }, () => new Array(n + 1).fill(0));
    up[0] = parent.slice();

    for (let j = 1; j < LOG; j++) {
        for (let node = 1; node <= n; node++) {
            up[j][node] = up[j - 1][up[j - 1][node]];
        }
    }

    return { up, depth, LOG };
}

function kthAncestor(lifting, node, k) {
    for (let j = 0; j < lifting.LOG; j++) {
        if (k & (1 << j)) {
            node = lifting.up[j][node];
        }
    }

    return node === 0 ? -1 : node;
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const root = Number(input[index++]);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n - 1; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        graph[v].push(u);
    }

    const lifting = buildLifting(n, root, graph);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const node = Number(input[index++]);
        const k = Number(input[index++]);
        answers.push(kthAncestor(lifting, node, k));
    }

    return answers.join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
