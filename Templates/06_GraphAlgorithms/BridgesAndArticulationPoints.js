// Topic: BRIDGES AND ARTICULATION POINTS
// Pattern: DFS Low-Link Values
// Use Cases: Critical network edges, cut vertices, biconnected
// components, fault-tolerant connectivity.
//
// Example Problem: Count Bridges and Articulation Points
// Source: Classic Tarjan low-link problem.
//
// node "BridgesAndArticulationPoints.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: tin is discovery time and low is the earliest reachable
// time. An edge is a bridge when low[child] > tin[parent]. A non-root
// node is an articulation point when low[child] >= tin[node].
function countCritical(n, graph) {
    const tin = new Array(n + 1).fill(-1);
    const low = new Array(n + 1).fill(0);
    const parent = new Array(n + 1).fill(0);
    const childCount = new Array(n + 1).fill(0);
    const isArticulation = new Array(n + 1).fill(false);
    let timer = 0;
    let bridges = 0;

    for (let root = 1; root <= n; root++) {
        if (tin[root] !== -1) {
            continue;
        }

        tin[root] = low[root] = timer++;
        const stack = [[root, 0]];

        while (stack.length) {
            const frame = stack[stack.length - 1];
            const node = frame[0];

            if (frame[1] < graph[node].length) {
                const next = graph[node][frame[1]++];

                if (next === parent[node]) {
                    continue;
                }

                if (tin[next] === -1) {
                    parent[next] = node;
                    childCount[node]++;
                    tin[next] = low[next] = timer++;
                    stack.push([next, 0]);
                } else {
                    low[node] = Math.min(low[node], tin[next]);
                }
            } else {
                stack.pop();

                if (stack.length) {
                    const previous = stack[stack.length - 1][0];
                    low[previous] = Math.min(low[previous], low[node]);

                    if (low[node] > tin[previous]) {
                        bridges++;
                    }

                    if (parent[previous] !== 0 && low[node] >= tin[previous]) {
                        isArticulation[previous] = true;
                    }
                }
            }
        }
    }

    let articulationPoints = 0;

    for (let node = 1; node <= n; node++) {
        if (parent[node] === 0 && childCount[node] > 1) {
            isArticulation[node] = true;
        }

        if (isArticulation[node]) {
            articulationPoints++;
        }
    }

    return bridges + " " + articulationPoints;
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

    return countCritical(n, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
