// Topic: NETWORK FLOW AND MATCHING
// Pattern: Max Flow / Min Cut / Bipartite Matching / Assignment
// Use Cases: Dinic, Edmonds-Karp, min cut, min-cost flow, Kuhn,
// Hopcroft-Karp, Hungarian, stable marriage, global min cut.
//
// Example Problem: Maximum Flow With Dinic's Algorithm
// Source: Classic max-flow problem.
//
// node "NetworkFlowMatching.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Dinic {
    constructor(n) {
        this.n = n;
        this.graph = Array.from({ length: n + 1 }, () => []);
    }

    addEdge(u, v, capacity) {
        const forward = { to: v, capacity, flow: 0, reverse: this.graph[v].length };
        const backward = { to: u, capacity: 0, flow: 0, reverse: this.graph[u].length };
        this.graph[u].push(forward);
        this.graph[v].push(backward);
    }

    bfs(source, sink) {
        this.level = new Array(this.n + 1).fill(-1);
        this.level[source] = 0;
        const queue = [source];

        for (let head = 0; head < queue.length; head++) {
            const node = queue[head];

            for (const edge of this.graph[node]) {
                if (edge.capacity - edge.flow > 0 && this.level[edge.to] === -1) {
                    this.level[edge.to] = this.level[node] + 1;
                    queue.push(edge.to);
                }
            }
        }

        return this.level[sink] !== -1;
    }

    dfs(node, sink, pushed) {
        if (node === sink || pushed === 0) return pushed;

        for (; this.pointer[node] < this.graph[node].length; this.pointer[node]++) {
            const edge = this.graph[node][this.pointer[node]];
            if (this.level[edge.to] !== this.level[node] + 1) continue;
            const flow = this.dfs(edge.to, sink, Math.min(pushed, edge.capacity - edge.flow));

            if (flow) {
                edge.flow += flow;
                this.graph[edge.to][edge.reverse].flow -= flow;
                return flow;
            }
        }

        return 0;
    }

    maxFlow(source, sink) {
        let flow = 0;

        while (this.bfs(source, sink)) {
            this.pointer = new Array(this.n + 1).fill(0);

            while (true) {
                const pushed = this.dfs(source, sink, Infinity);
                if (!pushed) break;
                flow += pushed;
            }
        }

        return flow;
    }
}

function edmondsKarp(n, edges, source, sink) {
    const capacity = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (const [u, v, c] of edges) capacity[u][v] += c;

    let flow = 0;

    while (true) {
        const parent = new Array(n + 1).fill(-1);
        parent[source] = source;
        const queue = [source];

        for (let head = 0; head < queue.length && parent[sink] === -1; head++) {
            const node = queue[head];

            for (let next = 1; next <= n; next++) {
                if (parent[next] === -1 && capacity[node][next] > 0) {
                    parent[next] = node;
                    queue.push(next);
                }
            }
        }

        if (parent[sink] === -1) break;

        let pushed = Infinity;

        for (let node = sink; node !== source; node = parent[node]) {
            pushed = Math.min(pushed, capacity[parent[node]][node]);
        }

        for (let node = sink; node !== source; node = parent[node]) {
            capacity[parent[node]][node] -= pushed;
            capacity[node][parent[node]] += pushed;
        }

        flow += pushed;
    }

    return flow;
}

function minCutReachable(n, edges, source, sink) {
    const capacity = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (const [u, v, c] of edges) capacity[u][v] += c;

    while (true) {
        const parent = new Array(n + 1).fill(-1);
        parent[source] = source;
        const queue = [source];

        for (let head = 0; head < queue.length && parent[sink] === -1; head++) {
            const node = queue[head];

            for (let next = 1; next <= n; next++) {
                if (parent[next] === -1 && capacity[node][next] > 0) {
                    parent[next] = node;
                    queue.push(next);
                }
            }
        }

        if (parent[sink] === -1) break;

        let pushed = Infinity;

        for (let node = sink; node !== source; node = parent[node]) {
            pushed = Math.min(pushed, capacity[parent[node]][node]);
        }

        for (let node = sink; node !== source; node = parent[node]) {
            capacity[parent[node]][node] -= pushed;
            capacity[node][parent[node]] += pushed;
        }
    }

    const reachable = new Array(n + 1).fill(false);
    const stack = [source];
    reachable[source] = true;

    while (stack.length) {
        const node = stack.pop();

        for (let next = 1; next <= n; next++) {
            if (!reachable[next] && capacity[node][next] > 0) {
                reachable[next] = true;
                stack.push(next);
            }
        }
    }

    const cut = [];

    for (const [u, v, c] of edges) {
        if (reachable[u] && !reachable[v]) cut.push([u, v, c]);
    }

    return cut;
}

function minimumCostMaximumFlow(n, edges, source, sink) {
    const graph = Array.from({ length: n + 1 }, () => []);

    edges.forEach(([u, v, capacity, cost]) => {
        graph[u].push({ to: v, capacity, cost, flow: 0, reverse: graph[v].length });
        graph[v].push({ to: u, capacity: 0, cost: -cost, flow: 0, reverse: graph[u].length - 1 });
    });

    let flow = 0;
    let cost = 0;

    while (true) {
        const distance = new Array(n + 1).fill(Infinity);
        const parent = new Array(n + 1).fill(null);
        distance[source] = 0;
        const queue = [source];
        const inQueue = new Array(n + 1).fill(false);
        inQueue[source] = true;

        for (let head = 0; head < queue.length; head++) {
            const node = queue[head];
            inQueue[node] = false;

            for (let i = 0; i < graph[node].length; i++) {
                const edge = graph[node][i];

                if (edge.capacity - edge.flow > 0 && distance[node] + edge.cost < distance[edge.to]) {
                    distance[edge.to] = distance[node] + edge.cost;
                    parent[edge.to] = [node, i];

                    if (!inQueue[edge.to]) {
                        queue.push(edge.to);
                        inQueue[edge.to] = true;
                    }
                }
            }
        }

        if (distance[sink] === Infinity) break;

        let pushed = Infinity;

        for (let node = sink; node !== source; node = parent[node][0]) {
            const [previous, edgeIndex] = parent[node];
            const edge = graph[previous][edgeIndex];
            pushed = Math.min(pushed, edge.capacity - edge.flow);
        }

        for (let node = sink; node !== source; node = parent[node][0]) {
            const [previous, edgeIndex] = parent[node];
            const edge = graph[previous][edgeIndex];
            edge.flow += pushed;
            graph[node][edge.reverse].flow -= pushed;
            cost += pushed * edge.cost;
        }

        flow += pushed;
    }

    return { flow, cost };
}

function kuhnMatching(graph, leftSize) {
    const matchRight = new Array(graph.length).fill(0);

    function tryKuhn(node, seen) {
        for (const next of graph[node]) {
            if (seen[next]) continue;
            seen[next] = true;

            if (!matchRight[next] || tryKuhn(matchRight[next], seen)) {
                matchRight[next] = node;
                return true;
            }
        }

        return false;
    }

    let matching = 0;

    for (let node = 1; node <= leftSize; node++) {
        if (tryKuhn(node, new Array(graph.length).fill(false))) matching++;
    }

    return matching;
}

function hopcroftKarp(graph, leftSize, rightSize) {
    const pairLeft = new Array(leftSize + 1).fill(0);
    const pairRight = new Array(rightSize + 1).fill(0);
    const distance = new Array(leftSize + 1).fill(0);
    let matching = 0;

    function bfs() {
        const queue = [];

        for (let u = 1; u <= leftSize; u++) {
            if (!pairLeft[u]) {
                distance[u] = 0;
                queue.push(u);
            } else {
                distance[u] = Infinity;
            }
        }

        let found = false;

        for (let head = 0; head < queue.length; head++) {
            const u = queue[head];

            for (const v of graph[u]) {
                const next = pairRight[v];

                if (!next) {
                    found = true;
                } else if (distance[next] === Infinity) {
                    distance[next] = distance[u] + 1;
                    queue.push(next);
                }
            }
        }

        return found;
    }

    function dfs(u) {
        for (const v of graph[u]) {
            const next = pairRight[v];

            if (!next || (distance[next] === distance[u] + 1 && dfs(next))) {
                pairLeft[u] = v;
                pairRight[v] = u;
                return true;
            }
        }

        distance[u] = Infinity;
        return false;
    }

    while (bfs()) {
        for (let u = 1; u <= leftSize; u++) {
            if (!pairLeft[u] && dfs(u)) matching++;
        }
    }

    return matching;
}

function hungarian(cost) {
    const n = cost.length;
    const u = new Array(n + 1).fill(0);
    const v = new Array(n + 1).fill(0);
    const p = new Array(n + 1).fill(0);
    const way = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        p[0] = i;
        let j0 = 0;
        const minv = new Array(n + 1).fill(Infinity);
        const used = new Array(n + 1).fill(false);

        do {
            used[j0] = true;
            const i0 = p[j0];
            let delta = Infinity;
            let j1 = 0;

            for (let j = 1; j <= n; j++) {
                if (used[j]) continue;
                const current = cost[i0 - 1][j - 1] - u[i0] - v[j];

                if (current < minv[j]) {
                    minv[j] = current;
                    way[j] = j0;
                }

                if (minv[j] < delta) {
                    delta = minv[j];
                    j1 = j;
                }
            }

            for (let j = 0; j <= n; j++) {
                if (used[j]) {
                    u[p[j]] += delta;
                    v[j] -= delta;
                } else {
                    minv[j] -= delta;
                }
            }

            j0 = j1;
        } while (p[j0] !== 0);

        do {
            const j1 = way[j0];
            p[j0] = p[j1];
            j0 = j1;
        } while (j0);
    }

    return -v[0];
}

function galeShapley(menPreferences, womenPreferences) {
    const n = menPreferences.length;
    const womenRank = womenPreferences.map((preferences) => {
        const rank = new Array(n).fill(0);
        preferences.forEach((man, index) => {
            rank[man] = index;
        });
        return rank;
    });
    const engagedTo = new Array(n).fill(-1);
    const nextChoice = new Array(n).fill(0);
    const freeMen = Array.from({ length: n }, (_, i) => i);

    while (freeMen.length) {
        const man = freeMen.shift();
        const woman = menPreferences[man][nextChoice[man]++];

        if (engagedTo[woman] === -1) {
            engagedTo[woman] = man;
        } else {
            const current = engagedTo[woman];

            if (womenRank[woman][man] < womenRank[woman][current]) {
                engagedTo[woman] = man;
                freeMen.push(current);
            } else {
                freeMen.push(man);
            }
        }
    }

    return engagedTo;
}

function stoerWagner(n, edges) {
    const weight = Array.from({ length: n }, () => new Array(n).fill(0));

    for (const [u, v, w] of edges) {
        weight[u - 1][v - 1] += w;
        weight[v - 1][u - 1] += w;
    }

    let best = Infinity;
    const vertices = Array.from({ length: n }, (_, i) => i);

    while (vertices.length > 1) {
        const added = [];
        const connectedWeight = new Array(n).fill(0);

        for (let i = 0; i < vertices.length; i++) {
            let selected = -1;

            for (const vertex of vertices) {
                if (added.includes(vertex)) continue;
                if (selected === -1 || connectedWeight[vertex] > connectedWeight[selected]) selected = vertex;
            }

            added.push(selected);

            if (i === vertices.length - 1) {
                best = Math.min(best, connectedWeight[selected]);
                const previous = added[added.length - 2];

                for (const vertex of vertices) {
                    weight[previous][vertex] += weight[selected][vertex];
                    weight[vertex][previous] = weight[previous][vertex];
                }

                vertices.splice(vertices.indexOf(selected), 1);
            } else {
                for (const vertex of vertices) connectedWeight[vertex] += weight[selected][vertex];
            }
        }
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const source = Number(input[index++]);
    const sink = Number(input[index++]);
    const edges = [];
    const dinic = new Dinic(n);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const capacity = Number(input[index++]);
        edges.push([u, v, capacity]);
        dinic.addEdge(u, v, capacity);
    }

    return dinic.maxFlow(source, sink);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
