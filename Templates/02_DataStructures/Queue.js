// Topic: QUEUE
// Pattern: FIFO Simulation
// Use Cases: BFS layers, scheduling, buffering, Josephus elimination,
// level-order processing.
//
// Example Problem: Josephus Problem (standard CP simulation)
// Source: Classic queue simulation problem.
//
// node "Queue.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Queue {
    constructor() {
        this.items = [];
        this.head = 0;
    }

    push(val) {
        this.items.push(val);
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }

        const val = this.items[this.head];
        this.head++;

        if (this.head > 100000) {
            this.items = this.items.slice(this.head);
            this.head = 0;
        }

        return val;
    }

    peek() {
        return this.items[this.head];
    }

    isEmpty() {
        return this.head >= this.items.length;
    }

    size() {
        return this.items.length - this.head;
    }
}

// Approach: rotate the first k - 1 people to the back, then remove the
// k-th person. The last remaining person is the survivor.
function josephus(n, k) {
    const queue = new Queue();

    for (let person = 1; person <= n; person++) {
        queue.push(person);
    }

    while (queue.size() > 1) {
        for (let step = 0; step < k - 1; step++) {
            queue.push(queue.pop());
        }

        queue.pop();
    }

    return queue.peek();
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);

    return josephus(n, k);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
