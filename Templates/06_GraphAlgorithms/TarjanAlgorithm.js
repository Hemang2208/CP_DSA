// Topic: TARJAN ALGORITHM
// Pattern: Low-Link Values / SCC Stack
// Use Cases: Strongly connected components, condensation, bridges,
// articulation points, biconnected components.
//
// Example Problem: Strongly Connected Component Sizes
// Source: Classic Tarjan problem.
//
// node "TarjanAlgorithm.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: iterative Tarjan. Each node gets an index and a low-link.
// When low[node] === index[node], pop the SCC stack down to node.
function tarjan(n, graph) {
    const indices = new Array(n + 1).fill(-1);
    const low = new Array(n + 1).fill(0);
    const onStack = new Array(n + 1).fill(false);
    const stack = [];
    const sizes = [];
    let timer = 0;

    for (let start = 1; start <= n; start++) {
        if (indices[start] !== -1) {
            continue;
        }

        const callStack = [[start, 0]];

        while (callStack.length) {
            const frame = callStack[callStack.length - 1];
            const node = frame[0];

            if (frame[1] === 0) {
                indices[node] = timer;
                low[node] = timer;
                timer++;
                stack.push(node);
                onStack[node] = true;
            }

            if (frame[1] < graph[node].length) {
                const next = graph[node][frame[1]++];

                if (indices[next] === -1) {
                    callStack.push([next, 0]);
                } else if (onStack[next]) {
                    low[node] = Math.min(low[node], indices[next]);
                }
            } else {
                callStack.pop();

                if (callStack.length) {
                    const parent = callStack[callStack.length - 1][0];
                    low[parent] = Math.min(low[parent], low[node]);
                }

                if (low[node] === indices[node]) {
                    let size = 0;

                    while (true) {
                        const member = stack.pop();
                        onStack[member] = false;
                        size++;

                        if (member === node) {
                            break;
                        }
                    }

                    sizes.push(size);
                }
            }
        }
    }

    sizes.sort((a, b) => a - b);

    return sizes.length + "\n" + sizes.join(" ");
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

    return tarjan(n, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
