// Topic: GRAPH CONNECTIVITY AND SPECIAL GRAPH TOPICS
// Pattern: Euler/Hamiltonian / Biconnected / 2-SAT / Min-Cut
// Use Cases: Euler tours, graph coloring, 2-SAT, dominators, k shortest,
// minimum mean cycle, randomized min-cut, iterative deepening.
//
// Example Problem: Eulerian Circuit (Hierholzer's Algorithm)
// Source: Classic Eulerian circuit problem.
//
// node "GraphConnectivitySpecial.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function readGraph(n, m, directed = false) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        if (!directed) graph[v].push(u);
    }

    return graph;
}

function isConnected(graph, n, ignore = -1) {
    const seen = new Set();
    const start = n > 0 ? 1 : 0;
    const stack = [start];
    seen.add(start);

    while (stack.length) {
        const node = stack.pop();

        for (const neighbour of graph[node]) {
            if (neighbour === ignore || seen.has(neighbour)) continue;
            seen.add(neighbour);
            stack.push(neighbour);
        }
    }

    for (let node = 1; node <= n; node++) {
        if (graph[node].length && !seen.has(node)) return false;
    }

    return true;
}

function eulerianCircuit(graph, n) {
    let odd = 0;

    for (let node = 1; node <= n; node++) {
        if (graph[node].length % 2 === 1) odd++;
    }

    if (odd !== 0 || !isConnected(graph, n)) return [];

    const copy = graph.map((neighbours) => neighbours.slice());
    const stack = [1];
    const circuit = [];

    while (stack.length) {
        const node = stack[stack.length - 1];

        if (copy[node].length) {
            const next = copy[node].pop();
            const position = copy[next].indexOf(node);
            if (position !== -1) copy[next].splice(position, 1);
            stack.push(next);
        } else {
            circuit.push(stack.pop());
        }
    }

    return circuit.reverse();
}

function eulerianPath(graph, n) {
    let odd = 0;
    let start = 1;

    for (let node = 1; node <= n; node++) {
        if (graph[node].length % 2 === 1) {
            odd++;
            start = node;
        }
    }

    if (odd !== 0 && odd !== 2) return [];

    const copy = graph.map((neighbours) => neighbours.slice());
    const stack = [start];
    const path = [];

    while (stack.length) {
        const node = stack[stack.length - 1];

        if (copy[node].length) {
            const next = copy[node].pop();
            const position = copy[next].indexOf(node);
            if (position !== -1) copy[next].splice(position, 1);
            stack.push(next);
        } else {
            path.push(stack.pop());
        }
    }

    return path.reverse();
}

function biconnectedComponents(graph, n) {
    const discovery = new Array(n + 1).fill(-1);
    const low = new Array(n + 1).fill(0);
    const stack = [];
    const components = [];
    let timer = 0;

    function dfs(node, parent) {
        discovery[node] = low[node] = timer++;
        let children = 0;

        for (const neighbour of graph[node]) {
            if (neighbour === parent) continue;

            if (discovery[neighbour] === -1) {
                stack.push([node, neighbour]);
                children++;
                dfs(neighbour, node);
                low[node] = Math.min(low[node], low[neighbour]);

                if (low[neighbour] >= discovery[node]) {
                    const component = [];
                    let edge;

                    do {
                        edge = stack.pop();
                        component.push(edge);
                    } while (!(edge[0] === node && edge[1] === neighbour));

                    components.push(component);
                }
            } else if (discovery[neighbour] < discovery[node]) {
                stack.push([node, neighbour]);
                low[node] = Math.min(low[node], discovery[neighbour]);
            }
        }

        return children;
    }

    for (let node = 1; node <= n; node++) {
        if (discovery[node] === -1) dfs(node, 0);
    }

    return components;
}

function hamiltonianPath(graph, n) {
    const path = [];
    const visited = new Array(n + 1).fill(false);

    function backtrack(node) {
        path.push(node);
        visited[node] = true;

        if (path.length === n) return true;

        for (const neighbour of graph[node]) {
            if (!visited[neighbour] && backtrack(neighbour)) return true;
        }

        path.pop();
        visited[node] = false;
        return false;
    }

    for (let node = 1; node <= n; node++) {
        if (backtrack(node)) return path;
    }

    return [];
}

function greedyColoring(graph, n) {
    const color = new Array(n + 1).fill(0);

    for (let node = 1; node <= n; node++) {
        const used = new Set();

        for (const neighbour of graph[node]) {
            if (color[neighbour]) used.add(color[neighbour]);
        }

        let c = 1;
        while (used.has(c)) c++;
        color[node] = c;
    }

    return color.slice(1);
}

function chromaticNumber(graph, n) {
    const order = Array.from({ length: n }, (_, i) => i + 1)
        .sort((a, b) => graph[b].length - graph[a].length);
    const color = new Array(n + 1).fill(0);

    function canColor(node, c) {
        return graph[node].every((neighbour) => color[neighbour] !== c);
    }

    function backtrack(index) {
        if (index === n) return true;

        for (let c = 1; ; c++) {
            if (canColor(order[index], c)) {
                color[order[index]] = c;
                if (backtrack(index + 1)) return true;
                color[order[index]] = 0;
            }

            if (c > n) return false;
        }
    }

    backtrack(0);
    return Math.max(...color);
}

function twoSat(numVariables, clauses) {
    const nodes = 2 * numVariables;
    const graph = Array.from({ length: nodes }, () => []);
    const reverse = Array.from({ length: nodes }, () => []);
    const literal = (variable, value) => 2 * (variable - 1) + (value ? 0 : 1);

    for (const [a, av, b, bv] of clauses) {
        const x = literal(a, av);
        const y = literal(b, bv);
        graph[x ^ 1].push(y);
        reverse[y].push(x ^ 1);
        graph[y ^ 1].push(x);
        reverse[x].push(y ^ 1);
    }

    const seen = new Array(nodes).fill(false);
    const order = [];

    function dfs(node) {
        seen[node] = true;

        for (const next of graph[node]) {
            if (!seen[next]) dfs(next);
        }

        order.push(node);
    }

    for (let node = 0; node < nodes; node++) {
        if (!seen[node]) dfs(node);
    }

    const component = new Array(nodes).fill(-1);
    let id = 0;

    function rdfs(node) {
        component[node] = id;

        for (const next of reverse[node]) {
            if (component[next] === -1) rdfs(next);
        }
    }

    for (let i = nodes - 1; i >= 0; i--) {
        const node = order[i];
        if (component[node] === -1) {
            rdfs(node);
            id++;
        }
    }

    const assignment = [];

    for (let variable = 1; variable <= numVariables; variable++) {
        const a = literal(variable, true);
        const b = literal(variable, false);
        if (component[a] === component[b]) return null;
        assignment.push(component[a] > component[b]);
    }

    return assignment;
}

function dominatorSets(graph, n, source) {
    const reachable = new Set();
    const stack = [source];

    while (stack.length) {
        const node = stack.pop();
        if (reachable.has(node)) continue;
        reachable.add(node);

        for (const next of graph[node]) stack.push(next);
    }

    const dominators = new Map();

    for (const node of reachable) dominators.set(node, new Set(reachable));

    dominators.get(source).clear();
    dominators.get(source).add(source);
    let changed = true;

    while (changed) {
        changed = false;

        for (const node of reachable) {
            if (node === source) continue;
            let intersection = null;

            for (let parent = 1; parent <= n; parent++) {
                if (!reachable.has(parent) || !graph[parent].includes(node)) continue;
                if (intersection === null) intersection = new Set(dominators.get(parent));
                else intersection = new Set([...intersection].filter((value) => dominators.get(parent).has(value)));
            }

            if (intersection === null) continue;
            intersection.add(node);
            const previous = dominators.get(node);

            if (intersection.size !== previous.size) {
                dominators.set(node, intersection);
                changed = true;
            }
        }
    }

    return dominators;
}

function yenKShortestPaths(n, graph, source, destination, k) {
    const paths = [];

    function dfs(node, path, cost) {
        if (paths.length >= k && cost > paths[paths.length - 1][0]) return;
        if (node === destination) {
            paths.push([cost, path.slice()]);
            paths.sort((a, b) => a[0] - b[0]);
            if (paths.length > k) paths.pop();
            return;
        }

        for (const [next, weight] of graph[node]) {
            if (path.includes(next)) continue;
            path.push(next);
            dfs(next, path, cost + weight);
            path.pop();
        }
    }

    dfs(source, [source], 0);
    return paths;
}

function karpMinimumMeanCycle(n, edges) {
    const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(Infinity));
    dp[0][1] = 0;

    for (let length = 1; length <= n; length++) {
        for (const [u, v, w] of edges) {
            if (dp[length - 1][u] !== Infinity) {
                dp[length][v] = Math.min(dp[length][v], dp[length - 1][u] + w);
            }
        }
    }

    let best = Infinity;

    for (let node = 1; node <= n; node++) {
        if (dp[n][node] === Infinity) continue;
        let value = -Infinity;

        for (let length = 0; length < n; length++) {
            if (dp[length][node] !== Infinity) {
                value = Math.max(value, (dp[n][node] - dp[length][node]) / (n - length));
            }
        }

        best = Math.min(best, value);
    }

    return best;
}

function kargerMinCut(n, edges) {
    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    function find(x) {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    function union(a, b) {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) parent[rb] = ra;
    }

    let remaining = n;

    while (remaining > 2) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        if (find(edge[0]) !== find(edge[1])) {
            union(edge[0], edge[1]);
            remaining--;
        }
    }

    let cut = 0;

    for (const [u, v] of edges) {
        if (find(u) !== find(v)) cut++;
    }

    return cut;
}

function iterativeDeepeningDfs(graph, source, target, maxDepth) {
    function dfs(node, depth, seen) {
        if (node === target) return true;
        if (depth === 0) return false;

        for (const next of graph[node]) {
            if (!seen.has(next)) {
                seen.add(next);
                if (dfs(next, depth - 1, seen)) return true;
                seen.delete(next);
            }
        }

        return false;
    }

    for (let limit = 0; limit <= maxDepth; limit++) {
        if (dfs(source, limit, new Set([source]))) return limit;
    }

    return -1;
}

function graphIsomorphismBasic(a, b) {
    if (a.length !== b.length) return false;
    const degreeA = a.map((edges) => edges.length).sort((x, y) => x - y);
    const degreeB = b.map((edges) => edges.length).sort((x, y) => x - y);
    return degreeA.every((value, i) => value === degreeB[i]);
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const graph = readGraph(n, m);
    const circuit = eulerianCircuit(graph, n);

    return circuit.length ? circuit.join(" ") : "none";
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
