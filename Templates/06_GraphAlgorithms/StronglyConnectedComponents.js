// Topic: STRONGLY CONNECTED COMPONENTS
// Pattern: Kosaraju Two-Pass DFS
// Use Cases: SCC counting, condensation graphs, 2-SAT,
// reachability between groups, cycle analysis.
//
// Example Problem: Count Strongly Connected Components
// Source: Classic Kosaraju problem.
//
// node "StronglyConnectedComponents.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function finishingOrder(n, graph) {
    const visited = new Array(n + 1).fill(false);
    const order = [];

    for (let start = 1; start <= n; start++) {
        if (visited[start]) {
            continue;
        }

        const stack = [[start, 0]];
        visited[start] = true;

        while (stack.length) {
            const frame = stack[stack.length - 1];
            const node = frame[0];

            if (frame[1] < graph[node].length) {
                const next = graph[node][frame[1]++];

                if (!visited[next]) {
                    visited[next] = true;
                    stack.push([next, 0]);
                }
            } else {
                order.push(node);
                stack.pop();
            }
        }
    }

    return order;
}

// Approach: first pass records finishing order on the original graph.
// Second pass on the reversed graph in reverse finishing order peels
// off one SCC at a time.
function countComponents(n, graph, reversed) {
    const order = finishingOrder(n, graph);
    const visited = new Array(n + 1).fill(false);
    let components = 0;

    for (let i = order.length - 1; i >= 0; i--) {
        const start = order[i];

        if (visited[start]) {
            continue;
        }

        components++;
        const stack = [start];
        visited[start] = true;

        while (stack.length) {
            const node = stack.pop();

            for (const next of reversed[node]) {
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
    const reversed = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        reversed[v].push(u);
    }

    return countComponents(n, graph, reversed);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
