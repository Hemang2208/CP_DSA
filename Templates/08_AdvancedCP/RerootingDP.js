// Topic: REROOTING DP
// Pattern: Down DP + Up DP
// Use Cases: Sum of distances from every node, tree diameter from all
// roots, subtree contribution rerooting, all-root tree DP.
//
// Example Problem: Sum of Distances From Every Node
// Source: Classic rerooting problem.
//
// node "RerootingDP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: first compute subtree sizes and distance sums toward
// children. Then move the root across an edge: the child gains the
// outside part and loses its own subtree.
function sumDistances(n, graph) {
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

    const size = new Array(n + 1).fill(1);
    const down = new Array(n + 1).fill(0);

    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];

        for (const child of graph[node]) {
            if (parent[child] === node) {
                size[node] += size[child];
                down[node] += down[child] + size[child];
            }
        }
    }

    const answer = new Array(n + 1).fill(0);
    answer[1] = down[1];

    for (let i = 1; i < order.length; i++) {
        const node = order[i];
        const p = parent[node];
        answer[node] = answer[p] + n - 2 * size[node];
    }

    return answer.slice(1).join(" ");
}

function solve() {
    const n = Number(input[index++]);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n - 1; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        graph[v].push(u);
    }

    return sumDistances(n, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
