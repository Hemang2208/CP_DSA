// Topic: SHORTEST PATHS AND DAG ALGORITHMS
// Pattern: SPFA / Johnson / DAG DP / Lexicographic Topological Sort
// Use Cases: Negative edges, K-stop flights, A* search, path rebuild,
// longest DAG path, critical path, alien dictionary, course schedule.
//
// Example Problem: SPFA Single Source Shortest Paths
// Source: Classic SPFA exercise.
//
// node "ShortestPathDAG.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function readEdges(n, m) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const edges = [];

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        graph[u].push([v, w]);
        edges.push([u, v, w]);
    }

    return { graph, edges };
}

function spfa(n, graph, source) {
    const distance = new Array(n + 1).fill(Infinity);
    const inQueue = new Array(n + 1).fill(false);
    const relaxCount = new Array(n + 1).fill(0);
    const queue = [source];
    distance[source] = 0;
    inQueue[source] = true;

    for (let head = 0; head < queue.length; head++) {
        const node = queue[head];
        inQueue[node] = false;

        for (const [next, weight] of graph[node]) {
            if (distance[node] + weight < distance[next]) {
                distance[next] = distance[node] + weight;

                if (!inQueue[next]) {
                    queue.push(next);
                    inQueue[next] = true;
                    relaxCount[next]++;
                    if (relaxCount[next] > n) return { distance, negativeCycle: true };
                }
            }
        }
    }

    return { distance, negativeCycle: false };
}

function bellmanFord(n, edges, source) {
    const distance = new Array(n + 1).fill(Infinity);
    distance[source] = 0;

    for (let i = 1; i < n; i++) {
        for (const [u, v, w] of edges) {
            if (distance[u] !== Infinity && distance[u] + w < distance[v]) {
                distance[v] = distance[u] + w;
            }
        }
    }

    for (const [u, v, w] of edges) {
        if (distance[u] !== Infinity && distance[u] + w < distance[v]) {
            return { distance, negativeCycle: true };
        }
    }

    return { distance, negativeCycle: false };
}

function dagShortest(n, graph, source) {
    const indegree = new Array(n + 1).fill(0);
    const order = [];

    for (let u = 1; u <= n; u++) {
        for (const [v] of graph[u]) indegree[v]++;
    }

    const queue = [];

    for (let node = 1; node <= n; node++) {
        if (indegree[node] === 0) queue.push(node);
    }

    for (let head = 0; head < queue.length; head++) {
        const node = queue[head];
        order.push(node);

        for (const [next] of graph[node]) {
            indegree[next]--;
            if (indegree[next] === 0) queue.push(next);
        }
    }

    const distance = new Array(n + 1).fill(Infinity);
    distance[source] = 0;

    for (const node of order) {
        if (distance[node] === Infinity) continue;

        for (const [next, weight] of graph[node]) {
            if (distance[node] + weight < distance[next]) {
                distance[next] = distance[node] + weight;
            }
        }
    }

    return { distance, order };
}

function johnson(n, edges) {
    const augmented = edges.slice();

    for (let node = 1; node <= n; node++) augmented.push([0, node, 0]);

    const potentialResult = bellmanFord(n + 1, augmented, 0);

    if (potentialResult.negativeCycle) return null;

    const potential = potentialResult.distance;
    const graph = Array.from({ length: n + 1 }, () => []);

    for (const [u, v, w] of edges) {
        graph[u].push([v, w + potential[u] - potential[v]]);
    }

    const allPairs = [];

    for (let source = 1; source <= n; source++) {
        const { distance } = spfa(n, graph, source);

        allPairs.push(
            distance.slice(1).map((value, i) => (value === Infinity ? Infinity : value - potential[source] + potential[i + 1]))
        );
    }

    return allPairs;
}

function cheapestFlightsKStops(n, flights, source, destination, stops) {
    let distance = new Array(n).fill(Infinity);
    distance[source] = 0;

    for (let i = 0; i <= stops; i++) {
        const next = distance.slice();

        for (const [u, v, w] of flights) {
            if (distance[u] !== Infinity && distance[u] + w < next[v]) {
                next[v] = distance[u] + w;
            }
        }

        distance = next;
    }

    return distance[destination] === Infinity ? -1 : distance[destination];
}

function aStarGrid(grid, start, goal) {
    const rows = grid.length;
    const cols = grid[0].length;
    const key = (row, col) => row * cols + col;
    const heuristic = (row, col) => Math.abs(row - goal[0]) + Math.abs(col - goal[1]);
    const open = [[heuristic(start[0], start[1]), 0, start[0], start[1]]];
    const best = new Map([[key(start[0], start[1]), 0]]);

    while (open.length) {
        open.sort((a, b) => a[0] - b[0]);
        const [, cost, row, col] = open.shift();

        if (row === goal[0] && col === goal[1]) return cost;
        if (cost > (best.get(key(row, col)) ?? Infinity)) continue;

        for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0) {
                const nextCost = cost + 1;

                if (nextCost < (best.get(key(nr, nc)) ?? Infinity)) {
                    best.set(key(nr, nc), nextCost);
                    open.push([nextCost + heuristic(nr, nc), nextCost, nr, nc]);
                }
            }
        }
    }

    return -1;
}

function reconstructPath(previous, source, destination) {
    if (source === destination) return [source];
    if (!previous.has(destination)) return [];
    const path = [destination];
    let node = destination;

    while (node !== source) {
        node = previous.get(node);
        if (node === undefined) return [];
        path.push(node);
    }

    return path.reverse();
}

function lexicographicTopo(n, graph) {
    const indegree = new Array(n + 1).fill(0);

    for (let u = 1; u <= n; u++) {
        for (const [v] of graph[u]) indegree[v]++;
    }

    const heap = [];

    for (let node = 1; node <= n; node++) {
        if (indegree[node] === 0) {
            heap.push(node);
            heap.sort((a, b) => a - b);
        }
    }

    const order = [];

    while (heap.length) {
        const node = heap.shift();
        order.push(node);

        for (const [next] of graph[node]) {
            indegree[next]--;
            if (indegree[next] === 0) {
                heap.push(next);
                heap.sort((a, b) => a - b);
            }
        }
    }

    return order.length === n ? order : [];
}

function longestPathDAG(n, graph) {
    const indegree = new Array(n + 1).fill(0);

    for (let u = 1; u <= n; u++) {
        for (const [v] of graph[u]) indegree[v]++;
    }

    const queue = [];

    for (let node = 1; node <= n; node++) {
        if (indegree[node] === 0) queue.push(node);
    }

    const distance = new Array(n + 1).fill(-Infinity);
    for (let node = 1; node <= n; node++) {
        if (indegree[node] === 0) distance[node] = 0;
    }

    for (let head = 0; head < queue.length; head++) {
        const node = queue[head];

        for (const [next, weight] of graph[node]) {
            distance[next] = Math.max(distance[next], distance[node] + weight);
            indegree[next]--;
            if (indegree[next] === 0) queue.push(next);
        }
    }

    return Math.max(...distance.slice(1));
}

function alienDictionary(words) {
    const graph = new Map();

    for (const word of words) {
        for (const ch of word) if (!graph.has(ch)) graph.set(ch, new Set());
    }

    for (let i = 0; i + 1 < words.length; i++) {
        const a = words[i];
        const b = words[i + 1];
        const length = Math.min(a.length, b.length);
        let found = false;

        for (let j = 0; j < length; j++) {
            if (a[j] !== b[j]) {
                graph.get(a[j]).add(b[j]);
                found = true;
                break;
            }
        }

        if (!found && a.length > b.length) return "";
    }

    const indegree = new Map([...graph.keys()].map((ch) => [ch, 0]));

    for (const neighbours of graph.values()) {
        for (const ch of neighbours) indegree.set(ch, indegree.get(ch) + 1);
    }

    const queue = [...indegree.keys()].filter((ch) => indegree.get(ch) === 0).sort();

    const result = [];

    while (queue.length) {
        const ch = queue.shift();
        result.push(ch);

        for (const next of graph.get(ch)) {
            indegree.set(next, indegree.get(next) - 1);
            if (indegree.get(next) === 0) {
                queue.push(next);
                queue.sort();
            }
        }
    }

    return result.length === graph.size ? result.join("") : "";
}

function courseSchedule(n, prerequisites) {
    const graph = Array.from({ length: n }, () => []);
    const indegree = new Array(n).fill(0);

    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);
        indegree[course]++;
    }

    const queue = [];

    for (let course = 0; course < n; course++) {
        if (indegree[course] === 0) queue.push(course);
    }

    for (let head = 0; head < queue.length; head++) {
        const course = queue[head];

        for (const next of graph[course]) {
            indegree[next]--;
            if (indegree[next] === 0) queue.push(next);
        }
    }

    return queue.length === n;
}

function eventualSafeStates(graph) {
    const reverse = Array.from({ length: graph.length }, () => []);
    const indegree = new Array(graph.length).fill(0);

    for (let u = 0; u < graph.length; u++) {
        for (const v of graph[u]) {
            reverse[v].push(u);
            indegree[u]++;
        }
    }

    const queue = [];

    for (let node = 0; node < graph.length; node++) {
        if (indegree[node] === 0) queue.push(node);
    }

    const safe = new Array(graph.length).fill(false);

    for (let head = 0; head < queue.length; head++) {
        const node = queue[head];
        safe[node] = true;

        for (const previous of reverse[node]) {
            indegree[previous]--;
            if (indegree[previous] === 0) queue.push(previous);
        }
    }

    return safe.map((value, i) => (value ? i : -1)).filter((value) => value !== -1);
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const { graph } = readEdges(n, m);
    const { distance } = spfa(n, graph, 1);

    return distance
        .slice(1)
        .map((value) => (value === Infinity ? -1 : value))
        .join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
