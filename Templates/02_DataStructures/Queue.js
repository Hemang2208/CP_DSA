// Topic: QUEUE
// Pattern: Circular Array Queue / FIFO Simulation
// Use Cases: BFS layers, scheduling, buffering, Josephus elimination,
// level-order processing, rolling windows.
//
// Example Problem: Josephus Problem
// Source: Classic queue simulation problem.
//
// node "Queue.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class CircularQueue {
    constructor(capacity = 8) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }

    enqueue(value) {
        if (this.count === this.capacity) this.resize();

        this.items[this.tail] = value;
        this.tail = (this.tail + 1) % this.capacity;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) return undefined;

        const value = this.items[this.head];
        this.head = (this.head + 1) % this.capacity;
        this.count--;

        return value;
    }

    front() {
        return this.items[this.head];
    }

    rear() {
        return this.items[(this.tail - 1 + this.capacity) % this.capacity];
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    resize() {
        const previous = this.items;
        const previousCapacity = this.capacity;
        this.capacity *= 2;
        this.items = new Array(this.capacity);

        for (let i = 0; i < this.count; i++) {
            this.items[i] = previous[(this.head + i) % previousCapacity];
        }

        this.head = 0;
        this.tail = this.count;
    }
}

// Approach: rotate the first k - 1 people to the back, then remove the
// k-th person. The last remaining person is the survivor.
function josephus(n, k) {
    const queue = new CircularQueue();

    for (let person = 1; person <= n; person++) {
        queue.enqueue(person);
    }

    while (queue.size() > 1) {
        for (let step = 0; step < k - 1; step++) {
            queue.enqueue(queue.dequeue());
        }

        queue.dequeue();
    }

    return queue.front();
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
