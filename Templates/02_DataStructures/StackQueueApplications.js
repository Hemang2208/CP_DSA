// Topic: STACK AND QUEUE APPLICATIONS
// Pattern: Parentheses / Expression Parsing / FIFO Simulation
// Use Cases: Minimum additions for valid parentheses, longest valid
// parentheses, infix/postfix evaluation, queue using stacks, binary
// generation, moving average, task scheduling, asteroid collision.
//
// Example Problem: Moving Average from Data Stream
// Source: Classic queue problem (LeetCode 346).
//
// node "StackQueueApplications.js" < "Input.txt" > "Output.txt"

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

function minAddToMakeValid(text) {
    let open = 0;
    let additions = 0;

    for (const ch of text) {
        if (ch === "(") open++;
        else if (open > 0) open--;
        else additions++;
    }

    return additions + open;
}

function longestValidParentheses(text) {
    const stack = [-1];
    let best = 0;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "(") {
            stack.push(i);
        } else {
            stack.pop();

            if (!stack.length) stack.push(i);
            else best = Math.max(best, i - stack[stack.length - 1]);
        }
    }

    return best;
}

function precedence(operator) {
    if (operator === "^") return 3;
    if (operator === "*" || operator === "/") return 2;
    if (operator === "+" || operator === "-") return 1;
    return 0;
}

function infixToPostfix(expression) {
    const output = [];
    const stack = [];

    for (const token of expression.split(" ")) {
        if (/^[a-zA-Z0-9]+$/.test(token)) {
            output.push(token);
        } else if (token === "(") {
            stack.push(token);
        } else if (token === ")") {
            while (stack.length && stack[stack.length - 1] !== "(") {
                output.push(stack.pop());
            }

            stack.pop();
        } else {
            while (stack.length && precedence(stack[stack.length - 1]) >= precedence(token)) {
                output.push(stack.pop());
            }

            stack.push(token);
        }
    }

    while (stack.length) output.push(stack.pop());

    return output.join(" ");
}

function evaluatePostfix(expression) {
    const stack = [];

    for (const token of expression.split(" ")) {
        if (!"+-*/^".includes(token)) {
            stack.push(Number(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();

            if (token === "+") stack.push(a + b);
            if (token === "-") stack.push(a - b);
            if (token === "*") stack.push(a * b);
            if (token === "/") stack.push(Math.trunc(a / b));
            if (token === "^") stack.push(a ** b);
        }
    }

    return stack[0];
}

function asteroidCollision(asteroids) {
    const stack = [];

    for (const asteroid of asteroids) {
        let alive = true;

        while (alive && asteroid < 0 && stack.length && stack[stack.length - 1] > 0) {
            const top = stack[stack.length - 1];

            if (top < -asteroid) {
                stack.pop();
            } else if (top === -asteroid) {
                stack.pop();
                alive = false;
            } else {
                alive = false;
            }
        }

        if (alive) stack.push(asteroid);
    }

    return stack;
}

function decodeString(text) {
    const counts = [];
    const strings = [];
    let current = "";
    let number = 0;

    for (const ch of text) {
        if (ch >= "0" && ch <= "9") {
            number = number * 10 + Number(ch);
        } else if (ch === "[") {
            counts.push(number);
            strings.push(current);
            number = 0;
            current = "";
        } else if (ch === "]") {
            current = strings.pop() + current.repeat(counts.pop());
        } else {
            current += ch;
        }
    }

    return current;
}

function simplifyPath(path) {
    const stack = [];

    for (const part of path.split("/")) {
        if (!part || part === ".") continue;
        if (part === "..") stack.pop();
        else stack.push(part);
    }

    return "/" + stack.join("/");
}

function queueUsingStacks(operations) {
    const inputStack = [];
    const outputStack = [];
    const results = [];

    for (const [type, value] of operations) {
        if (type === "push") {
            inputStack.push(value);
        } else if (type === "pop") {
            if (!outputStack.length) {
                while (inputStack.length) outputStack.push(inputStack.pop());
            }

            results.push(outputStack.pop());
        } else {
            if (!outputStack.length) {
                while (inputStack.length) outputStack.push(inputStack.pop());
            }

            results.push(outputStack[outputStack.length - 1]);
        }
    }

    return results;
}

function generateBinaryNumbers(n) {
    const queue = ["1"];
    const result = [];

    for (let i = 0; i < n; i++) {
        const value = queue.shift();
        result.push(value);
        queue.push(value + "0");
        queue.push(value + "1");
    }

    return result;
}

function movingAverage(stream, size) {
    const queue = [];
    let sum = 0;
    const result = [];

    for (const value of stream) {
        queue.push(value);
        sum += value;

        if (queue.length > size) sum -= queue.shift();
        result.push(sum / queue.length);
    }

    return result;
}

function taskScheduler(tasks, cooldown) {
    const counts = new Map();

    for (const task of tasks) {
        counts.set(task, (counts.get(task) || 0) + 1);
    }

    const frequencies = [...counts.values()].sort((a, b) => b - a);
    const maxFrequency = frequencies[0] || 0;
    const maxCount = frequencies.filter((value) => value === maxFrequency).length;

    return Math.max(tasks.length, (maxFrequency - 1) * (cooldown + 1) + maxCount);
}

function solve() {
    const n = Number(input[index++]);
    const size = Number(input[index++]);
    const stream = inputArray(n);

    return movingAverage(stream, size).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
