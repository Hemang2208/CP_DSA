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
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

class Deque {
    constructor() {
        this.items = [];
        this.head = 0;
    }

    pushBack(val) {
        this.items.push(val);
    }

    popBack() {
        if (this.size() === 0) {
            return undefined;
        }

        return this.items.pop();
    }

    pushFront(val) {
        if (this.head > 0) {
            this.head--;
            this.items[this.head] = val;
        } else {
            this.items.unshift(val);
        }
    }

    popFront() {
        if (this.size() === 0) {
            return undefined;
        }

        const val = this.items[this.head];
        this.head++;

        return val;
    }

    front() {
        return this.items[this.head];
    }

    back() {
        return this.items[this.items.length - 1];
    }

    size() {
        return this.items.length - this.head;
    }
}

// Approach: keep indices in a deque whose values decrease from front to
// back. Expired indices leave from the front, smaller values leave from
// the back, so the front is always the window maximum.
function slidingWindowMaximum(arr, k) {
    const deque = new Deque();
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        while (deque.size() && deque.front() <= i - k) {
            deque.popFront();
        }

        while (deque.size() && arr[deque.back()] <= arr[i]) {
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
