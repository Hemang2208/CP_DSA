// Topic: GRAPH FUNDAMENTALS
// Pattern: Adjacency List / BFS / DFS / Coloring / Cycle Detection
// Use Cases: Connected components, bipartite checks, cycle detection,
// clone graph, word ladder, discovery/finishing times.
//
// Example Problem: Components, Bipartiteness and Undirected Cycle
// Source: Classic graph traversal exercise.
//
// node "GraphFundamentals.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function buildGraph(n, m, directed = false) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        if (!directed) graph[v].push(u);
    }

    return graph;
}

function adjacencyMatrix(n, graph) {
    const matrix = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let u = 1; u <= n; u++) {
        for (const v of graph[u]) matrix[u][v] = 1;
    }

    return matrix;
}

function bfs(graph, source) {
    const distance = new Array(graph.length).fill(-1);
    const queue = [source];
    distance[source] = 0;

    for (let head = 0; head < queue.length; head++) {
        const node = queue[head];

        for (const neighbour of graph[node]) {
            if (distance[neighbour] === -1) {
                distance[neighbour] = distance[node] + 1;
                queue.push(neighbour);
            }
        }
    }

    return distance;
}

function dfsRecursive(graph, node, visited = new Set()) {
    visited.add(node);

    for (const neighbour of graph[node]) {
        if (!visited.has(neighbour)) dfsRecursive(graph, neighbour, visited);
    }

    return visited;
}

function dfsIterative(graph, source) {
    const visited = new Set();
    const stack = [source];

    while (stack.length) {
        const node = stack.pop();
        if (visited.has(node)) continue;
        visited.add(node);

        for (const neighbour of graph[node]) stack.push(neighbour);
    }

    return visited;
}

function connectedComponents(graph) {
    const visited = new Set();
    let components = 0;

    for (let node = 1; node < graph.length; node++) {
        if (visited.has(node)) continue;
        components++;
        dfsRecursive(graph, node, visited);
    }

    return components;
}

function hasUndirectedCycle(graph) {
    const visited = new Set();

    function dfs(node, parent) {
        visited.add(node);

        for (const neighbour of graph[node]) {
            if (!visited.has(neighbour)) {
                if (dfs(neighbour, node)) return true;
            } else if (neighbour !== parent) {
                return true;
            }
        }

        return false;
    }

    for (let node = 1; node < graph.length; node++) {
        if (!visited.has(node) && dfs(node, 0)) return true;
    }

    return false;
}

function hasDirectedCycle(graph) {
    const state = new Array(graph.length).fill(0);

    function dfs(node) {
        state[node] = 1;

        for (const neighbour of graph[node]) {
            if (state[neighbour] === 1) return true;
            if (state[neighbour] === 0 && dfs(neighbour)) return true;
        }

        state[node] = 2;
        return false;
    }

    for (let node = 1; node < graph.length; node++) {
        if (state[node] === 0 && dfs(node)) return true;
    }

    return false;
}

function isBipartite(graph) {
    const color = new Array(graph.length).fill(-1);

    for (let start = 1; start < graph.length; start++) {
        if (color[start] !== -1) continue;
        color[start] = 0;
        const queue = [start];

        for (let head = 0; head < queue.length; head++) {
            const node = queue[head];

            for (const neighbour of graph[node]) {
                if (color[neighbour] === -1) {
                    color[neighbour] = 1 - color[node];
                    queue.push(neighbour);
                } else if (color[neighbour] === color[node]) {
                    return false;
                }
            }
        }
    }

    return true;
}

function dfsTimes(graph, source) {
    const discovery = new Array(graph.length).fill(-1);
    const finish = new Array(graph.length).fill(-1);
    let timer = 0;

    function dfs(node) {
        discovery[node] = timer++;

        for (const neighbour of graph[node]) {
            if (discovery[neighbour] === -1) dfs(neighbour);
        }

        finish[node] = timer++;
    }

    dfs(source);
    return { discovery, finish };
}

function cloneGraph(node, map = new Map()) {
    if (!node) return null;
    if (map.has(node)) return map.get(node);
    const copy = { value: node.value, neighbours: [] };
    map.set(node, copy);

    for (const neighbour of node.neighbours) {
        copy.neighbours.push(cloneGraph(neighbour, map));
    }

    return copy;
}

function wordLadder(begin, end, words) {
    const set = new Set(words);
    if (!set.has(end)) return 0;
    const queue = [[begin, 1]];
    set.delete(begin);

    for (let head = 0; head < queue.length; head++) {
        const [word, distance] = queue[head];

        if (word === end) return distance;

        for (let i = 0; i < word.length; i++) {
            for (let code = 97; code <= 122; code++) {
                const next = word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1);

                if (set.has(next)) {
                    set.delete(next);
                    queue.push([next, distance + 1]);
                }
            }
        }
    }

    return 0;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const graph = buildGraph(n, m);

    return `${connectedComponents(graph)} ${isBipartite(graph)} ${hasUndirectedCycle(graph)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
