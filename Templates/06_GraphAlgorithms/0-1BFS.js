// Topic: 0-1 BFS
// Pattern: Deque Shortest Path With 0/1 Weights
// Use Cases: Graphs with edge weights 0 or 1, minimum flips, binary
// cost paths, grid problems with free and paid moves.
//
// Example Problem: Shortest Path With 0/1 Edge Weights
// Source: Classic 0-1 BFS problem.
//
// node "0-1BFS.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Deque {
    constructor() {
        this.frontStack = [];
        this.backStack = [];
    }

    pushFront(value) {
        this.frontStack.push(value);
    }

    pushBack(value) {
        this.backStack.push(value);
    }

    popFront() {
        if (this.frontStack.length === 0) {
            while (this.backStack.length) {
                this.frontStack.push(this.backStack.pop());
            }
        }

        return this.frontStack.pop();
    }

    isEmpty() {
        return this.frontStack.length === 0 && this.backStack.length === 0;
    }
}

// Approach: a 0-weight edge is as good as the current distance, so its
// target goes to the front; a 1-weight edge goes to the back.
function zeroOneBfs(n, graph, source) {
    const distance = new Array(n + 1).fill(Infinity);
    const deque = new Deque();

    distance[source] = 0;
    deque.pushFront([source, 0]);

    while (!deque.isEmpty()) {
        const [node, currentDistance] = deque.popFront();

        if (currentDistance !== distance[node]) {
            continue;
        }

        for (const [next, weight] of graph[node]) {
            const candidate = currentDistance + weight;

            if (candidate < distance[next]) {
                distance[next] = candidate;

                if (weight === 0) {
                    deque.pushFront([next, candidate]);
                } else {
                    deque.pushBack([next, candidate]);
                }
            }
        }
    }

    return distance;
}

function solve() {
    const n = Number(input[index++]);
    const m = Number(input[index++]);
    const source = Number(input[index++]);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < m; i++) {
        const u = Number(input[index++]);
        const v = Number(input[index++]);
        const w = Number(input[index++]);
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    const distance = zeroOneBfs(n, graph, source);

    return distance
        .slice(1)
        .map((value) => (value === Infinity ? -1 : value))
        .join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
