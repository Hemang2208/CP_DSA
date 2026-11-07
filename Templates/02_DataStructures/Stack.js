// https://codeforces.com/problemset/problem/
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Stack {
    constructor() {
        this.items = [];
    }

    push(val) {
        this.items.push(val);
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

function nextGreater(arr, n) {
    const stack = [];
    const result = new Array(n).fill(-1);

    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && stack[stack.length - 1] <= arr[i]) {
            stack.pop();
        }

        if (stack.length) {
            result[i] = stack[stack.length - 1];
        }

        stack.push(arr[i]);
    }

    return result;
}

function inputArray(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

for (let i = 0; i < t; i++) {
    const n = Number(input[index++]);

    let arr = inputArray(n);

    arr.sort((a, b) => a - b);

    const result = nextGreater(arr, n);

    outcomes.push(result.join(" "));
}

console.log(outcomes.join("\n"));