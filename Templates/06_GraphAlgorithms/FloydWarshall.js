// Topic: FLOYD-WARSHALL
// Pattern: All-Pairs Shortest Paths
// Use Cases: Small dense graphs, transitive closure, minimum cycle,
// distance matrix queries, negative edge detection.
//
// Example Problem: All-Pairs Shortest Paths
// Source: Classic Floyd-Warshall problem.
//
// node "FloydWarshall.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: dp[i][j] is the best known distance. Allowing node k as an
// intermediate gives dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).
function floydWarshall(n, edges) {
    const INF = Infinity;
    const distance = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(INF));

    for (let i = 1; i <= n; i++) {
        distance[i][i] = 0;
    }

    for (const [u, v, w] of edges) {
        distance[u][v] = Math.min(distance[u][v], w);
        distance[v][u] = Math.min(distance[v][u], w);
    }

    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            if (distance[i][k] === INF) {
                continue;
            }

            for (let j = 1; j <= n; j++) {
                const candidate = distance[i][k] + distance[k][j];

                if (candidate < distance[i][j]) {
                    distance[i][j] = candidate;
                }
            }
        }
    }

    return distance;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const edges = [];

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        edges.push([u, v, w]);
    }

    const distance = floydWarshall(n, edges);
    const lines = [];

    for (let i = 1; i <= n; i++) {
        const row = [];

        for (let j = 1; j <= n; j++) {
            row.push(distance[i][j] === Infinity ? "INF" : distance[i][j]);
        }

        lines.push(row.join(" "));
    }

    return lines.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
