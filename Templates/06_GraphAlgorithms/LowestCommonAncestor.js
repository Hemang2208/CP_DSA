// Topic: LOWEST COMMON ANCESTOR
// Pattern: Binary Lifting on a Tree
// Use Cases: LCA queries, tree path distance, kth node on a path,
// offline tree queries, virtual trees.
//
// Example Problem: Lowest Common Ancestor Queries
// Source: Classic LCA problem.
//
// node "LowestCommonAncestor.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function buildTree(n, root, graph) {
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

// Approach: lift the deeper node to the same depth, then lift both
// nodes together while their 2^j ancestors differ.
function lowestCommonAncestor(tree, a, b) {
    if (tree.depth[a] < tree.depth[b]) {
        [a, b] = [b, a];
    }

    let difference = tree.depth[a] - tree.depth[b];

    for (let j = 0; j < tree.LOG; j++) {
        if (difference & (1 << j)) {
            a = tree.up[j][a];
        }
    }

    if (a === b) {
        return a;
    }

    for (let j = tree.LOG - 1; j >= 0; j--) {
        if (tree.up[j][a] !== tree.up[j][b]) {
            a = tree.up[j][a];
            b = tree.up[j][b];
        }
    }

    return tree.up[0][a];
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

    const tree = buildTree(n, root, graph);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        answers.push(lowestCommonAncestor(tree, u, v));
    }

    return answers.join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
