// Topic: KOSARAJU ALGORITHM
// Pattern: DFS Finishing Order + Reversed Graph
// Use Cases: SCC labeling, condensation graph construction,
// reachability reduction, 2-SAT implications.
//
// Example Problem: Label Every Node With Its SCC Id
// Source: Classic Kosaraju problem.
//
// node "KosarajuAlgorithm.js" < "Input.txt" > "Output.txt"

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

// Approach: process nodes in reverse finishing order on the reversed
// graph. Every traversal covers exactly one SCC, so assign a fresh id.
function labelComponents(n, graph, reversed) {
    const order = finishingOrder(n, graph);
    const component = new Array(n + 1).fill(-1);
    let currentId = 0;

    for (let i = order.length - 1; i >= 0; i--) {
        const start = order[i];

        if (component[start] !== -1) {
            continue;
        }

        currentId++;
        const stack = [start];
        component[start] = currentId;

        while (stack.length) {
            const node = stack.pop();

            for (const next of reversed[node]) {
                if (component[next] === -1) {
                    component[next] = currentId;
                    stack.push(next);
                }
            }
        }
    }

    return component.slice(1).join(" ");
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

    return labelComponents(n, graph, reversed);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
