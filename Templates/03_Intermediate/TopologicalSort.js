// Topic: TOPOLOGICAL SORT
// Pattern: Kahn's Algorithm
// Use Cases: Dependency ordering, course scheduling, DAG DP,
// detecting cycles in directed graphs, build systems.
//
// Example Problem: Topological Ordering of a DAG
// Source: Classic Kahn algorithm problem.
//
// node "TopologicalSort.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: repeatedly take a node with indegree 0. Decreasing the
// indegree of its neighbours may unlock more nodes. If fewer than n
// nodes are emitted, the graph contains a cycle.
function topologicalSort(n, graph) {
    const indegree = new Array(n + 1).fill(0);

    for (let node = 1; node <= n; node++) {
        for (const next of graph[node]) {
            indegree[next]++;
        }
    }

    const queue = [];
    let head = 0;

    for (let node = 1; node <= n; node++) {
        if (indegree[node] === 0) {
            queue.push(node);
        }
    }

    const order = [];

    while (head < queue.length) {
        const node = queue[head++];
        order.push(node);

        for (const next of graph[node]) {
            indegree[next]--;

            if (indegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return order.length === n ? order.join(" ") : "-1";
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
    }

    return topologicalSort(n, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
