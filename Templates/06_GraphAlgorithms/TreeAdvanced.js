// Topic: TREES - ADVANCED ALGORITHMS
// Pattern: Diameter / Centers / LCA / Euler Tour / Small-to-Large
// Use Cases: Tree centers, distance queries, offline LCA, virtual trees,
// tree hashing, subtree queries, DSU on tree, rerooting, link-cut trees.
//
// Example Problem: Diameter, Centers and Distance Between Two Nodes
// Source: Classic tree diameter and LCA exercise.
//
// node "TreeAdvanced.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function buildTree(n) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n - 1; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        graph[v].push(u);
    }

    return graph;
}

function farthestFrom(graph, start) {
    const distance = new Array(graph.length).fill(-1);
    const parent = new Array(graph.length).fill(0);
    const queue = [start];
    distance[start] = 0;
    let farthest = start;

    for (let head = 0; head < queue.length; head++) {
        const node = queue[head];

        if (distance[node] > distance[farthest]) farthest = node;

        for (const neighbour of graph[node]) {
            if (distance[neighbour] === -1) {
                distance[neighbour] = distance[node] + 1;
                parent[neighbour] = node;
                queue.push(neighbour);
            }
        }
    }

    return { farthest, distance, parent };
}

function treeDiameter(graph) {
    const first = farthestFrom(graph, 1);
    const second = farthestFrom(graph, first.farthest);
    return { length: second.distance[second.farthest], a: first.farthest, b: second.farthest, parent: second.parent };
}

function pathBetween(parent, source, destination) {
    const path = [destination];
    let node = destination;

    while (node !== source) {
        node = parent[node];
        path.push(node);
    }

    return path.reverse();
}

function treeCenters(graph) {
    const { a, b, parent } = treeDiameter(graph);
    const path = pathBetween(parent, a, b);
    const middle = Math.floor(path.length / 2);

    return path.length % 2 === 1 ? [path[middle]] : [path[middle - 1], path[middle]].sort((x, y) => x - y);
}

function buildLCA(graph, root) {
    const levels = Math.ceil(Math.log2(graph.length)) + 1;
    const up = Array.from({ length: levels }, () => new Array(graph.length).fill(0));
    const depth = new Array(graph.length).fill(0);
    const stack = [root];
    const seen = new Array(graph.length).fill(false);
    seen[root] = true;

    while (stack.length) {
        const node = stack.pop();

        for (const neighbour of graph[node]) {
            if (seen[neighbour]) continue;
            seen[neighbour] = true;
            depth[neighbour] = depth[node] + 1;
            up[0][neighbour] = node;
            stack.push(neighbour);
        }
    }

    for (let level = 1; level < levels; level++) {
        for (let node = 1; node < graph.length; node++) {
            up[level][node] = up[level - 1][up[level - 1][node]];
        }
    }

    function lca(a, b) {
        if (depth[a] < depth[b]) [a, b] = [b, a];
        let difference = depth[a] - depth[b];

        for (let level = 0; difference; level++, difference >>= 1) {
            if (difference & 1) a = up[level][a];
        }

        if (a === b) return a;

        for (let level = levels - 1; level >= 0; level--) {
            if (up[level][a] !== up[level][b]) {
                a = up[level][a];
                b = up[level][b];
            }
        }

        return up[0][a];
    }

    function distance(a, b) {
        return depth[a] + depth[b] - 2 * depth[lca(a, b)];
    }

    return { lca, distance, depth, up };
}

function eulerTourLCA(graph, root) {
    const tour = [];
    const first = new Array(graph.length).fill(-1);
    const depth = new Array(graph.length).fill(0);
    const seen = new Array(graph.length).fill(false);

    function dfs(node) {
        seen[node] = true;
        first[node] = tour.length;
        tour.push(node);

        for (const neighbour of graph[node]) {
            if (seen[neighbour]) continue;
            depth[neighbour] = depth[node] + 1;
            dfs(neighbour);
            tour.push(node);
        }
    }

    dfs(root);

    return {
        query(a, b) {
            let left = Math.min(first[a], first[b]);
            let right = Math.max(first[a], first[b]);
            let best = tour[left];

            for (let i = left; i <= right; i++) {
                if (depth[tour[i]] < depth[best]) best = tour[i];
            }

            return best;
        },
    };
}

function tarjanOfflineLCA(graph, root, queries) {
    const parent = Array.from({ length: graph.length }, (_, i) => i);
    const ancestor = new Array(graph.length).fill(0);
    const visited = new Array(graph.length).fill(false);
    const answer = new Array(queries.length).fill(-1);

    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }

    function union(a, b) {
        parent[b] = a;
    }

    function dfs(node) {
        visited[node] = true;
        ancestor[node] = node;

        for (const neighbour of graph[node]) {
            if (visited[neighbour]) continue;
            dfs(neighbour);
            union(node, neighbour);
            ancestor[find(node)] = node;
        }

        queries.forEach(([a, b], i) => {
            if (a === node && visited[b]) answer[i] = ancestor[find(b)];
            if (b === node && visited[a]) answer[i] = ancestor[find(a)];
        });
    }

    dfs(root);
    return answer;
}

function treeHash(graph, root) {
    const seen = new Array(graph.length).fill(false);

    function dfs(node, parent) {
        const children = [];

        for (const neighbour of graph[node]) {
            if (neighbour !== parent) children.push(dfs(neighbour, node));
        }

        children.sort();
        return `(${children.join("")})`;
    }

    return dfs(root, 0);
}

function smallToLarge(graph, root) {
    const answers = new Array(graph.length).fill(0);

    function dfs(node, parent) {
        let heavySet = new Set([node]);

        for (const neighbour of graph[node]) {
            if (neighbour === parent) continue;
            const childSet = dfs(neighbour, node);

            if (childSet.size > heavySet.size) [heavySet, childSet] = [childSet, heavySet];

            for (const value of childSet) heavySet.add(value);
        }

        answers[node] = heavySet.size;
        return heavySet;
    }

    dfs(root, 0);
    return answers;
}

function virtualTree(nodes, lca) {
    const sorted = nodes.slice().sort((a, b) => a - b);
    const stack = [];
    const edges = [];

    for (const node of sorted) {
        if (!stack.length) {
            stack.push(node);
            continue;
        }

        const ancestor = lca(stack[stack.length - 1], node);
        const last = stack[stack.length - 1];

        if (ancestor === last) {
            stack.push(node);
            continue;
        }

        while (stack.length > 1 && stack[stack.length - 2] >= ancestor) {
            edges.push([stack[stack.length - 2], stack.pop()]);
        }

        if (stack[stack.length - 1] !== ancestor) {
            edges.push([ancestor, stack.pop()]);
            stack.push(ancestor);
        }

        stack.push(node);
    }

    while (stack.length > 1) edges.push([stack.pop(), stack[stack.length - 1]]);
    return edges;
}

function solve() {
    const n = Number(input[index++]);
    const graph = buildTree(n);
    const diameter = treeDiameter(graph);
    const lca = buildLCA(graph, 1);
    const a = Number(input[index++]);
    const b = Number(input[index++]);

    return `${diameter.length} ${treeCenters(graph).join(" ")} ${lca.distance(a, b)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
