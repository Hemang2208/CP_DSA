// Topic: MONOTONIC STACK
// Pattern: Increasing / Decreasing Stack
// Use Cases: Next greater or smaller element, previous greater or
// smaller, stock span, largest rectangle, daily temperatures,
// remove K digits, sum of subarray minimums.
//
// Example Problem: Next Smaller Element
// Source: Classic monotonic stack problem.
//
// node "MonotonicStack.js" < "Input.txt" > "Output.txt"

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

function nextGreater(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stack.length && stack[stack.length - 1] <= arr[i]) stack.pop();
        if (stack.length) result[i] = stack[stack.length - 1];
        stack.push(arr[i]);
    }

    return result;
}

function nextSmaller(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stack.length && stack[stack.length - 1] >= arr[i]) stack.pop();
        if (stack.length) result[i] = stack[stack.length - 1];
        stack.push(arr[i]);
    }

    return result;
}

function previousGreater(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && stack[stack.length - 1] <= arr[i]) stack.pop();
        if (stack.length) result[i] = stack[stack.length - 1];
        stack.push(arr[i]);
    }

    return result;
}

function previousSmaller(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && stack[stack.length - 1] >= arr[i]) stack.pop();
        if (stack.length) result[i] = stack[stack.length - 1];
        stack.push(arr[i]);
    }

    return result;
}

function stockSpan(prices) {
    const result = [];
    const stack = [];

    for (let i = 0; i < prices.length; i++) {
        while (stack.length && prices[stack[stack.length - 1]] <= prices[i]) stack.pop();
        result.push(stack.length ? i - stack[stack.length - 1] : i + 1);
        stack.push(i);
    }

    return result;
}

function largestRectangle(heights) {
    const stack = [];
    let best = 0;

    for (let i = 0; i <= heights.length; i++) {
        const height = i === heights.length ? 0 : heights[i];

        while (stack.length && heights[stack[stack.length - 1]] > height) {
            const current = heights[stack.pop()];
            const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
            best = Math.max(best, current * width);
        }

        stack.push(i);
    }

    return best;
}

function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];

    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const day = stack.pop();
            result[day] = i - day;
        }

        stack.push(i);
    }

    return result;
}

function removeKDigits(number, k) {
    const stack = [];

    for (const digit of number) {
        while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }

        stack.push(digit);
    }

    while (k-- > 0) stack.pop();

    const result = stack.join("").replace(/^0+/, "");
    return result || "0";
}

function sumSubarrayMinimums(arr) {
    const stack = [];
    let total = 0;

    for (let i = 0; i <= arr.length; i++) {
        const current = i === arr.length ? -Infinity : arr[i];

        while (stack.length && arr[stack[stack.length - 1]] > current) {
            const minimumIndex = stack.pop();
            const left = stack.length ? stack[stack.length - 1] : -1;
            const right = i;
            total += arr[minimumIndex] * (minimumIndex - left) * (right - minimumIndex);
        }

        stack.push(i);
    }

    return total;
}

// Approach: scan right to left while keeping a strictly increasing stack
// from top to bottom. Pop values >= arr[i]; the remaining top is the
// nearest smaller element on the right.
function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return `${nextSmaller(arr).join(" ")} | ${nextGreater(arr).join(" ")} | ${largestRectangle(arr)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
