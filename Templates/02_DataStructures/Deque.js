// Topic: DEQUE
// Pattern: Double-Ended Queue / Monotonic Deque
// Use Cases: Sliding window maximum or minimum, first negative in a
// window, 0-1 BFS, palindrome checks, undo operations.
//
// Example Problem: Sliding Window Maximum
// Source: Classic deque problem (LeetCode 239 / standard CP).
//
// node "Deque.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

class Deque {
    constructor(capacity = 8) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.head = 0;
        this.count = 0;
    }

    pushBack(value) {
        if (this.count === this.capacity) this.resize();

        this.items[(this.head + this.count) % this.capacity] = value;
        this.count++;
    }

    popBack() {
        if (this.isEmpty()) return undefined;

        this.count--;
        return this.items[(this.head + this.count) % this.capacity];
    }

    pushFront(value) {
        if (this.count === this.capacity) this.resize();

        this.head = (this.head - 1 + this.capacity) % this.capacity;
        this.items[this.head] = value;
        this.count++;
    }

    popFront() {
        if (this.isEmpty()) return undefined;

        const value = this.items[this.head];
        this.head = (this.head + 1) % this.capacity;
        this.count--;

        return value;
    }

    front() {
        return this.items[this.head];
    }

    back() {
        return this.items[(this.head + this.count - 1) % this.capacity];
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
    }
}

// Approach: keep indices in a deque whose values decrease from front to
// back. Expired indices leave from the front, smaller values leave from
// the back, so the front is always the window maximum.
function slidingWindowMaximum(arr, k) {
    const deque = new Deque();
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        while (!deque.isEmpty() && deque.front() <= i - k) {
            deque.popFront();
        }

        while (!deque.isEmpty() && arr[deque.back()] <= arr[i]) {
            deque.popBack();
        }

        deque.pushBack(i);

        if (i >= k - 1) {
            result.push(arr[deque.front()]);
        }
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const arr = inputArray(n);

    return slidingWindowMaximum(arr, k).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
