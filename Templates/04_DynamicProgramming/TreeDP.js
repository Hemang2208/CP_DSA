// Topic: TREE DP
// Pattern: DP on Rooted Trees
// Use Cases: Maximum weight independent set, tree matching, minimum
// vertex cover, subtree sums, diameter via DP.
//
// Example Problem: Maximum Weight Independent Set on a Tree
// Source: Classic tree DP problem.
//
// node "TreeDP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: for each node keep take[node] (node selected) and
// skip[node] (node not selected). Children cannot be selected when the
// parent is selected; otherwise each child contributes its better case.
function maximumIndependentSet(n, values, graph) {
    const parent = new Array(n + 1).fill(0);
    const order = [1];
    parent[1] = -1;

    for (let i = 0; i < order.length; i++) {
        const node = order[i];

        for (const next of graph[node]) {
            if (next !== parent[node]) {
                parent[next] = node;
                order.push(next);
            }
        }
    }

    const take = new Array(n + 1).fill(0);
    const skip = new Array(n + 1).fill(0);

    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];
        take[node] = values[node];
        skip[node] = 0;

        for (const child of graph[node]) {
            if (parent[child] !== node) {
                continue;
            }

            take[node] += skip[child];
            skip[node] += Math.max(take[child], skip[child]);
        }
    }

    return Math.max(take[1], skip[1]);
}

function solve() {
    const n = Number(input[index++]);
    const values = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        values[i] = Number(input[index++]);
    }

    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n - 1; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        graph[v].push(u);
    }

    return maximumIndependentSet(n, values, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
