// Topic: DSU VARIANTS AND MINIMUM SPANNING TREES
// Pattern: Rank/Size/Weighted DSU / Kruskal / Prim / Boruvka
// Use Cases: Provinces, redundant connection, accounts merge, stones,
// largest island, MST, second-best MST, critical edges, bottleneck MST.
//
// Example Problem: Kruskal, Boruvka and Connected Component Count
// Source: Classic MST and DSU exercise.
//
// node "DSUTypesMST.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.size = new Array(n + 1).fill(1);
        this.rank = new Array(n + 1).fill(0);
        this.components = n;
    }

    find(x) {
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }

    union(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);
        if (rootA === rootB) return false;

        if (this.rank[rootA] < this.rank[rootB]) [rootA, rootB] = [rootB, rootA];
        this.parent[rootB] = rootA;
        this.size[rootA] += this.size[rootB];
        if (this.rank[rootA] === this.rank[rootB]) this.rank[rootA]++;
        this.components--;
        return true;
    }

    same(a, b) {
        return this.find(a) === this.find(b);
    }
}

class WeightedDSU {
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.weight = new Array(n + 1).fill(0);
    }

    find(x) {
        if (this.parent[x] === x) return { root: x, weight: 0 };
        const result = this.find(this.parent[x]);
        this.weight[x] += result.weight;
        this.parent[x] = result.root;
        return { root: this.parent[x], weight: this.weight[x] };
    }

    union(a, b, difference) {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if (rootA.root === rootB.root) return rootA.weight - rootB.weight === difference;
        this.parent[rootB.root] = rootA.root;
        this.weight[rootB.root] = rootA.weight - rootB.weight - difference;
        return true;
    }
}

class BipartiteDSU {
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.parity = new Array(n + 1).fill(0);
    }

    find(x) {
        if (this.parent[x] === x) return { root: x, parity: 0 };
        const result = this.find(this.parent[x]);
        this.parity[x] ^= result.parity;
        this.parent[x] = result.root;
        return { root: this.parent[x], parity: this.parity[x] };
    }

    add(a, b) {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if (rootA.root === rootB.root) return rootA.parity !== rootB.parity;
        this.parent[rootB.root] = rootA.root;
        this.parity[rootB.root] = rootA.parity ^ rootB.parity ^ 1;
        return true;
    }
}

function kruskal(n, edges) {
    const dsu = new DSU(n);
    const sorted = edges.slice().sort((a, b) => a[2] - b[2]);
    let weight = 0;
    let used = 0;

    for (const [u, v, w] of sorted) {
        if (dsu.union(u, v)) {
            weight += w;
            used++;
        }
    }

    return used === n - 1 ? weight : -1;
}

function boruvka(n, edges) {
    const dsu = new DSU(n);
    let weight = 0;

    while (dsu.components > 1) {
        const cheapest = new Array(n + 1).fill(-1);

        for (let i = 0; i < edges.length; i++) {
            const [u, v] = edges[i];
            const rootU = dsu.find(u);
            const rootV = dsu.find(v);
            if (rootU === rootV) continue;

            if (cheapest[rootU] === -1 || edges[cheapest[rootU]][2] > edges[i][2]) cheapest[rootU] = i;
            if (cheapest[rootV] === -1 || edges[cheapest[rootV]][2] > edges[i][2]) cheapest[rootV] = i;
        }

        let merged = false;

        for (let root = 1; root <= n; root++) {
            if (cheapest[root] === -1) continue;
            const [u, v, w] = edges[cheapest[root]];
            if (dsu.union(u, v)) {
                weight += w;
                merged = true;
            }
        }

        if (!merged) return -1;
    }

    return weight;
}

function prim(n, graph) {
    const seen = new Array(n + 1).fill(false);
    const heap = [[0, 1]];
    let weight = 0;
    let used = 0;

    while (heap.length && used < n) {
        heap.sort((a, b) => a[0] - b[0]);
        const [cost, node] = heap.shift();
        if (seen[node]) continue;
        seen[node] = true;
        weight += cost;
        used++;

        for (const [next, w] of graph[node]) {
            if (!seen[next]) heap.push([w, next]);
        }
    }

    return used === n ? weight : -1;
}

function secondBestMST(n, edges) {
    const best = kruskal(n, edges);
    let second = Infinity;

    for (let skip = 0; skip < edges.length; skip++) {
        const subset = edges.filter((_, i) => i !== skip);
        const value = kruskal(n, subset);
        if (value !== -1 && value > best) second = Math.min(second, value);
    }

    return second === Infinity ? -1 : second;
}

function criticalAndPseudoCriticalEdges(n, edges) {
    const best = kruskal(n, edges);
    const critical = [];
    const pseudo = [];

    for (let i = 0; i < edges.length; i++) {
        const without = kruskal(n, edges.filter((_, j) => j !== i));
        if (without !== best) {
            critical.push(i);
        } else {
            const forced = [edges[i], ...edges.filter((_, j) => j !== i)];
            if (kruskal(n, forced) === best) pseudo.push(i);
        }
    }

    return { critical, pseudo };
}

function maximumSpanningTree(n, edges) {
    const dsu = new DSU(n);
    const sorted = edges.slice().sort((a, b) => b[2] - a[2]);
    let weight = 0;

    for (const [u, v, w] of sorted) {
        if (dsu.union(u, v)) weight += w;
    }

    return weight;
}

function minimumBottleneckMST(n, edges) {
    const dsu = new DSU(n);
    const sorted = edges.slice().sort((a, b) => a[2] - b[2]);
    let bottleneck = 0;

    for (const [u, v, w] of sorted) {
        if (dsu.union(u, v)) bottleneck = Math.max(bottleneck, w);
        if (dsu.components === 1) break;
    }

    return bottleneck;
}

function numberOfProvinces(matrix) {
    const n = matrix.length;
    const dsu = new DSU(n);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (matrix[i][j] === 1) dsu.union(i + 1, j + 1);
        }
    }

    return dsu.components;
}

function redundantConnection(edges) {
    const dsu = new DSU(edges.length);

    for (const [u, v] of edges) {
        if (!dsu.union(u, v)) return [u, v];
    }

    return [];
}

function accountsMerge(accounts) {
    const dsu = new DSU(accounts.length);
    const emailOwner = new Map();

    accounts.forEach((account, i) => {
        for (let j = 1; j < account.length; j++) {
            if (emailOwner.has(account[j])) dsu.union(i + 1, emailOwner.get(account[j]) + 1);
            else emailOwner.set(account[j], i);
        }
    });

    const groups = new Map();

    accounts.forEach((account, i) => {
        const root = dsu.find(i + 1);
        if (!groups.has(root)) groups.set(root, new Set([account[0]]));
        for (let j = 1; j < account.length; j++) groups.get(root).add(account[j]);
    });

    return [...groups.values()].map((group) => {
        const values = [...group];
        const name = values.shift();
        return [name, ...values.sort()];
    });
}

function mostStonesRemoved(stones) {
    const dsu = new DSU(20001);

    for (const [x, y] of stones) dsu.union(x, y + 10000);

    const roots = new Set(stones.map(([x]) => dsu.find(x)));
    return stones.length - roots.size;
}

function largestIsland(grid) {
    const n = grid.length;
    const dsu = new DSU(n * n);
    const key = (row, col) => row * n + col + 1;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] !== 1) continue;

            for (const [dr, dc] of [[0, 1], [1, 0]]) {
                const nr = row + dr;
                const nc = col + dc;
                if (nr < n && nc < n && grid[nr][nc] === 1) dsu.union(key(row, col), key(nr, nc));
            }
        }
    }

    const sizes = new Map();

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) {
                const root = dsu.find(key(row, col));
                sizes.set(root, (sizes.get(root) || 0) + 1);
            }
        }
    }

    let best = Math.max(0, ...sizes.values());

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) continue;
            const roots = new Set();

            for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const nr = row + dr;
                const nc = col + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    roots.add(dsu.find(key(nr, nc)));
                }
            }

            let size = 1;
            for (const root of roots) size += sizes.get(root) || 0;
            best = Math.max(best, size);
        }
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const edges = [];
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        edges.push([u, v, w]);
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    return `${kruskal(n, edges)} ${boruvka(n, edges)} ${prim(n, graph)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
