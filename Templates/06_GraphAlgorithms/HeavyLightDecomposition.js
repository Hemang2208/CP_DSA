// Topic: HEAVY-LIGHT DECOMPOSITION
// Pattern: Path Queries via Chains + Segment Tree
// Use Cases: Path sum/min/max with updates, subtree queries,
// kth node on path, tree path aggregation.
//
// Example Problem: Point Update and Path Sum Query
// Source: Classic HLD problem.
//
// node "HeavyLightDecomposition.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class SegmentTree {
    constructor(base) {
        let size = 1;

        while (size < base.length) {
            size <<= 1;
        }

        this.size = size;
        this.tree = new Array(2 * size).fill(0);

        for (let i = 0; i < base.length; i++) {
            this.tree[size + i] = base[i];
        }

        for (let i = size - 1; i > 0; i--) {
            this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
        }
    }

    update(position, value) {
        let i = this.size + position;
        this.tree[i] = value;
        i >>= 1;

        while (i > 0) {
            this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
            i >>= 1;
        }
    }

    query(left, right) {
        let result = 0;
        left += this.size;
        right += this.size + 1;

        while (left < right) {
            if (left & 1) {
                result += this.tree[left++];
            }

            if (right & 1) {
                result += this.tree[--right];
            }

            left >>= 1;
            right >>= 1;
        }

        return result;
    }
}

function buildHLD(n, values, graph) {
    const parent = new Array(n + 1).fill(0);
    const depth = new Array(n + 1).fill(0);
    const order = [1];

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

    const size = new Array(n + 1).fill(1);
    const heavy = new Array(n + 1).fill(0);

    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];
        let bestSize = 0;

        for (const child of graph[node]) {
            if (parent[child] !== node) {
                continue;
            }

            size[node] += size[child];

            if (size[child] > bestSize) {
                bestSize = size[child];
                heavy[node] = child;
            }
        }
    }

    const head = new Array(n + 1).fill(0);
    const position = new Array(n + 1).fill(0);
    const base = new Array(n).fill(0);
    let currentPosition = 0;
    const stack = [[1, 1]];

    while (stack.length) {
        const [start, chainHead] = stack.pop();
        let node = start;

        while (node !== 0) {
            head[node] = chainHead;
            position[node] = currentPosition;
            base[currentPosition] = values[node];
            currentPosition++;

            for (const child of graph[node]) {
                if (parent[child] === node && child !== heavy[node]) {
                    stack.push([child, child]);
                }
            }

            node = heavy[node];
        }
    }

    return { parent, depth, head, position, base };
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const values = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        values[i] = Number(input[index++]);
    }

    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n - 1; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        graph[u].push(v);
        graph[v].push(u);
    }

    const hld = buildHLD(n, values, graph);
    const segmentTree = new SegmentTree(hld.base);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const node = Number(input[index++]);
            const value = Number(input[index++]);
            segmentTree.update(hld.position[node], value);
        } else {
            let u = Number(input[index++]);
            let v = Number(input[index++]);
            let pathSum = 0;

            while (hld.head[u] !== hld.head[v]) {
                if (hld.depth[hld.head[u]] < hld.depth[hld.head[v]]) {
                    [u, v] = [v, u];
                }

                pathSum += segmentTree.query(
                    hld.position[hld.head[u]],
                    hld.position[u]
                );
                u = hld.parent[hld.head[u]];
            }

            if (hld.depth[u] > hld.depth[v]) {
                [u, v] = [v, u];
            }

            pathSum += segmentTree.query(hld.position[u], hld.position[v]);
            answers.push(pathSum);
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
