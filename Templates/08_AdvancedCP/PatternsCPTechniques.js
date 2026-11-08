// Topic: COMPETITIVE PROGRAMMING TECHNIQUES
// Pattern: Coordinate Compression / Contribution / Bitset / Meet In Middle
// Use Cases: Inversion counting, subarray contributions, subset sums,
// offline queries, difference arrays, two-sum counting, sliding maximum.
//
// Example Problem: Count Inversions With A Fenwick Tree
// Source: Classic inversion-count exercise.
//
// node "PatternsCPTechniques.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function coordinateCompress(values) {
    const sorted = [...new Set(values)].sort((a, b) => a - b);
    const rank = new Map();
    sorted.forEach((value, i) => rank.set(value, i + 1));
    return values.map((value) => rank.get(value));
}

class Fenwick {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }

    add(position, value) {
        for (let i = position; i <= this.n; i += i & -i) this.tree[i] += value;
    }

    sum(position) {
        let result = 0;
        for (let i = position; i > 0; i -= i & -i) result += this.tree[i];
        return result;
    }
}

function inversionCount(values) {
    if (!values.length) return 0;
    const ranks = coordinateCompress(values);
    const bit = new Fenwick(Math.max(...ranks));
    let inversions = 0;

    for (let i = values.length - 1; i >= 0; i--) {
        inversions += bit.sum(ranks[i] - 1);
        bit.add(ranks[i], 1);
    }

    return inversions;
}

function twoSumCount(values, target) {
    const frequency = new Map();
    let count = 0;

    for (const value of values) {
        count += frequency.get(target - value) || 0;
        frequency.set(value, (frequency.get(value) || 0) + 1);
    }

    return count;
}

function slidingWindowMaximum(values, k) {
    const deque = [];
    const result = [];

    for (let i = 0; i < values.length; i++) {
        while (deque.length && deque[0] <= i - k) deque.shift();
        while (deque.length && values[deque[deque.length - 1]] <= values[i]) deque.pop();
        deque.push(i);
        if (i >= k - 1) result.push(values[deque[0]]);
    }

    return result;
}

function meetInMiddleSubsetSum(values, target) {
    const middle = Math.floor(values.length / 2);

    function sums(array) {
        const result = [];

        for (let mask = 0; mask < 1 << array.length; mask++) {
            let total = 0;
            for (let bit = 0; bit < array.length; bit++) {
                if (mask & (1 << bit)) total += array[bit];
            }
            result.push(total);
        }

        return result;
    }

    const left = sums(values.slice(0, middle)).sort((a, b) => a - b);
    const right = sums(values.slice(middle));
    let count = 0;

    for (const value of right) {
        const needed = target - value;
        let low = 0;
        let high = left.length;

        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (left[mid] < needed) low = mid + 1;
            else high = mid;
        }

        let upper = low;
        high = left.length;

        while (upper < high) {
            const mid = Math.floor((upper + high) / 2);
            if (left[mid] <= needed) upper = mid + 1;
            else high = mid;
        }

        count += upper - low;
    }

    return count;
}

function differenceArrayRangeUpdate(n, updates) {
    const diff = new Array(n + 1).fill(0);

    for (const [left, right, value] of updates) {
        diff[left] += value;
        if (right + 1 < n) diff[right + 1] -= value;
    }

    const result = [];
    let current = 0;

    for (let i = 0; i < n; i++) {
        current += diff[i];
        result.push(current);
    }

    return result;
}

function sumOfSubarrayMinimums(values) {
    const mod = 1_000_000_007;
    const n = values.length;
    const left = new Array(n).fill(0);
    const right = new Array(n).fill(0);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length && values[stack[stack.length - 1]] > values[i]) stack.pop();
        left[i] = stack.length ? i - stack[stack.length - 1] : i + 1;
        stack.push(i);
    }

    stack.length = 0;

    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && values[stack[stack.length - 1]] >= values[i]) stack.pop();
        right[i] = stack.length ? stack[stack.length - 1] - i : n - i;
        stack.push(i);
    }

    let total = 0;

    for (let i = 0; i < n; i++) {
        total = (total + values[i] * left[i] * right[i]) % mod;
    }

    return total;
}

function offlineQueryOrdering(queries) {
    queries.sort((a, b) => a[1] - b[1]);
    const answers = [];
    let processed = 0;

    for (const [left, right, id] of queries) {
        while (processed <= right) processed++;
        answers[id] = processed - left;
    }

    return answers;
}

function solve() {
    const n = Number(input[index++]);
    const values = [];

    for (let i = 0; i < n; i++) values.push(Number(input[index++]));

    return inversionCount(values);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
