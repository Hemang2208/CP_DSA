// Topic: STACK
// Pattern: LIFO / Array-Based Stack / Min-Max Stack
// Use Cases: Balanced parentheses, expression parsing, backtracking,
// undo operations, monotonic stacks, range minimum tracking.
//
// Example Problem: Valid Parentheses
// Source: Classic stack problem (LeetCode 20 / standard CP).
//
// node "Stack.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

class Stack {
    constructor() {
        this.items = [];
    }

    push(value) {
        this.items.push(value);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    display() {
        return this.items.join(" ");
    }
}

class MinStack {
    constructor() {
        this.items = [];
        this.minimums = [];
    }

    push(value) {
        this.items.push(value);

        const minimum = this.minimums.length
            ? Math.min(value, this.minimums[this.minimums.length - 1])
            : value;

        this.minimums.push(minimum);
    }

    pop() {
        this.minimums.pop();
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    getMin() {
        return this.minimums[this.minimums.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

class MaxStack {
    constructor() {
        this.items = [];
        this.maximums = [];
    }

    push(value) {
        this.items.push(value);

        const maximum = this.maximums.length
            ? Math.max(value, this.maximums[this.maximums.length - 1])
            : value;

        this.maximums.push(maximum);
    }

    pop() {
        this.maximums.pop();
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    getMax() {
        return this.maximums[this.maximums.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// Approach: push every opening bracket. On a closing bracket, the stack
// top must be its matching opening bracket.
function isValidParentheses(text) {
    const stack = new Stack();
    const pairs = { ")": "(", "]": "[", "}": "{" };

    for (const ch of text) {
        if (ch === "(" || ch === "[" || ch === "{") {
            stack.push(ch);
        } else if (pairs[ch]) {
            if (stack.pop() !== pairs[ch]) return false;
        }
    }

    return stack.isEmpty();
}

function solve() {
    return isValidParentheses(nextStr()) ? "YES" : "NO";
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
