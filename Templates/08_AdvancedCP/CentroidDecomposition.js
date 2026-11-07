// Topic: CENTROID DECOMPOSITION
// Pattern: Recursively Remove Centroids
// Use Cases: Path queries through centroids, distance counting,
// dynamic tree connectivity, closest marked node, subtree aggregates.
//
// Example Problem: Build the Centroid Decomposition Tree
// Source: Classic centroid decomposition problem.
//
// node "CentroidDecomposition.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: a centroid splits the component into parts of size at most
// half. Removing it recursively keeps depth O(log n). Each component is
// collected iteratively to avoid deep recursion during size finding.
function centroidDecomposition(n, graph) {
    const removed = new Array(n + 1).fill(false);
    const parent = new Array(n + 1).fill(0);
    const size = new Array(n + 1).fill(0);
    const centroidParent = new Array(n + 1).fill(0);

    function decompose(start, parentCentroid) {
        const nodes = [];
        const stack = [start];
        parent[start] = 0;

        while (stack.length) {
            const node = stack.pop();
            nodes.push(node);

            for (const next of graph[node]) {
                if (next !== parent[node] && !removed[next]) {
                    parent[next] = node;
                    stack.push(next);
                }
            }
        }

        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            size[node] = 1;

            for (const next of graph[node]) {
                if (!removed[next] && parent[next] === node) {
                    size[node] += size[next];
                }
            }
        }

        const total = nodes.length;
        let centroid = nodes[0];
        let bestLargestPart = Infinity;

        for (const node of nodes) {
            let largestPart = total - size[node];

            for (const next of graph[node]) {
                if (!removed[next] && parent[next] === node) {
                    largestPart = Math.max(largestPart, size[next]);
                }
            }

            if (largestPart < bestLargestPart) {
                bestLargestPart = largestPart;
                centroid = node;
            }
        }

        removed[centroid] = true;
        centroidParent[centroid] = parentCentroid;

        for (const next of graph[centroid]) {
            if (!removed[next]) {
                decompose(next, centroid);
            }
        }
    }

    decompose(1, 0);

    return centroidParent.slice(1).join(" ");
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

    return centroidDecomposition(n, graph);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
