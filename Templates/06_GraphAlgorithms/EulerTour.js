// Topic: EULER TOUR
// Pattern: Flatten Tree Into an Array
// Use Cases: Subtree sum queries, subtree updates, LCA via RMQ,
// tree path queries with Fenwick, offline tree problems.
//
// Example Problem: Point Update and Subtree Sum Query
// Source: Classic Euler tour problem.
//
// node "EulerTour.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Fenwick {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }

    add(position, value) {
        for (let i = position; i <= this.n; i += i & -i) {
            this.tree[i] += value;
        }
    }

    prefixSum(position) {
        let sum = 0;

        for (let i = position; i > 0; i -= i & -i) {
            sum += this.tree[i];
        }

        return sum;
    }

    rangeSum(left, right) {
        return this.prefixSum(right) - this.prefixSum(left - 1);
    }
}

// Approach: every subtree becomes a contiguous interval [tin, tout].
// A Fenwick tree over tin order answers subtree sums in O(log n).
function eulerTour(n, values, graph) {
    const parent = new Array(n + 1).fill(0);
    const tin = new Array(n + 1).fill(0);
    const tout = new Array(n + 1).fill(0);
    const euler = new Array(n + 1).fill(0);
    let timer = 0;
    const stack = [[1, false]];

    while (stack.length) {
        const [node, exit] = stack.pop();

        if (exit) {
            tout[node] = timer;
            continue;
        }

        timer++;
        tin[node] = timer;
        euler[timer] = values[node];
        stack.push([node, true]);

        for (const next of graph[node]) {
            if (next !== parent[node]) {
                parent[next] = node;
                stack.push([next, false]);
            }
        }
    }

    return { tin, tout, euler };
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

    const tour = eulerTour(n, values, graph);
    const fenwick = new Fenwick(n);

    for (let i = 1; i <= n; i++) {
        fenwick.add(i, tour.euler[i]);
    }

    const answers = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const node = Number(input[index++]);
            const value = Number(input[index++]);
            const delta = value - values[node];
            values[node] = value;
            fenwick.add(tour.tin[node], delta);
        } else {
            const node = Number(input[index++]);
            answers.push(
                fenwick.rangeSum(tour.tin[node], tour.tout[node])
            );
        }
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
