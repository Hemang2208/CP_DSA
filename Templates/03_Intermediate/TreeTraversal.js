// Topic: TREE TRAVERSAL
// Pattern: Preorder, Postorder, Level Order
// Use Cases: Tree DP, subtree queries, ancestor checks, Euler tour,
// serialization, level-based processing.
//
// Example Problem: Output Tree Traversals of a Rooted Tree
// Source: Standard tree traversal problem.
//
// node "TreeTraversal.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: root the tree at node 1, then run iterative traversals.
// Postorder uses an enter/exit marker so a node is emitted after its
// children without recursion.
function traversals(n, graph) {
    const parent = new Array(n + 1).fill(0);
    const children = Array.from({ length: n + 1 }, () => []);
    const queue = [1];
    let head = 0;
    parent[1] = -1;

    while (head < queue.length) {
        const node = queue[head++];

        for (const next of graph[node]) {
            if (next !== parent[node]) {
                parent[next] = node;
                children[node].push(next);
                queue.push(next);
            }
        }
    }

    const preorder = [];
    const stack = [1];

    while (stack.length) {
        const node = stack.pop();
        preorder.push(node);

        for (let i = children[node].length - 1; i >= 0; i--) {
            stack.push(children[node][i]);
        }
    }

    const postorder = [];
    const events = [[1, false]];

    while (events.length) {
        const [node, processed] = events.pop();

        if (processed) {
            postorder.push(node);
            continue;
        }

        events.push([node, true]);

        for (let i = children[node].length - 1; i >= 0; i--) {
            events.push([children[node][i], false]);
        }
    }

    const levelOrder = [];
    const levelQueue = [1];
    let levelHead = 0;

    while (levelHead < levelQueue.length) {
        const node = levelQueue[levelHead++];
        levelOrder.push(node);

        for (const child of children[node]) {
            levelQueue.push(child);
        }
    }

    return [preorder.join(" "), postorder.join(" "), levelOrder.join(" ")];
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

    return traversals(n, graph).join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
