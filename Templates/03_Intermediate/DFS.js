// Topic: DFS
// Pattern: Depth First Search / Connected Components
// Use Cases: Connected components, cycle detection, flood fill,
// bipartite checking, topological sort, articulation points.
//
// Example Problem: Number of Connected Components
// Source: Classic DFS problem.
//
// node "DFS.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: every unvisited node starts a new component. An explicit
// stack avoids recursion depth limits on large graphs.
function countComponents(n, graph) {
    const visited = new Array(n + 1).fill(false);
    let components = 0;

    for (let node = 1; node <= n; node++) {
        if (visited[node]) {
            continue;
        }

        components++;
        const stack = [node];
        visited[node] = true;

        while (stack.length) {
            const current = stack.pop();

            for (const next of graph[current]) {
                if (!visited[next]) {
                    visited[next] = true;
                    stack.push(next);
                }
            }
        }
    }

    return components;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        graph[v].push(u);
    }

    return countComponents(n, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
