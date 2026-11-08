// Topic: OFFLINE ARRAY ALGORITHMS
// Pattern: Mo's Algorithm / Sqrt Decomposition / Parallel Binary Search
// Use Cases: Range queries, distinct counts, offline updates, dynamic
// connectivity, CDQ divide and conquer, sweep-line intervals.
//
// Example Problem: Range Sum Queries Using Mo's Algorithm
// Source: Classic offline range-query exercise.
//
// node "OfflineArrayAdvanced.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function moRangeSum(array, queries) {
    const n = array.length;
    const block = Math.max(1, Math.floor(Math.sqrt(n)));
    const ordered = queries.map(([left, right], id) => [left, right, id]);

    ordered.sort((a, b) => {
        const blockA = Math.floor(a[0] / block);
        const blockB = Math.floor(b[0] / block);
        if (blockA !== blockB) return blockA - blockB;
        return blockA % 2 === 0 ? a[1] - b[1] : b[1] - a[1];
    });

    const answers = new Array(queries.length).fill(0);
    let currentLeft = 0;
    let currentRight = -1;
    let currentSum = 0;

    function add(position) {
        currentSum += array[position];
    }

    function remove(position) {
        currentSum -= array[position];
    }

    for (const [left, right, id] of ordered) {
        while (currentLeft > left) add(--currentLeft);
        while (currentRight < right) add(++currentRight);
        while (currentLeft < left) remove(currentLeft++);
        while (currentRight > right) remove(currentRight--);
        answers[id] = currentSum;
    }

    return answers;
}

class SqrtDecomposition {
    constructor(array) {
        this.array = array.slice();
        this.blockSize = Math.max(1, Math.floor(Math.sqrt(array.length)));
        this.blocks = new Array(Math.ceil(array.length / this.blockSize)).fill(0);

        for (let i = 0; i < array.length; i++) {
            this.blocks[Math.floor(i / this.blockSize)] += array[i];
        }
    }

    query(left, right) {
        let sum = 0;

        while (left <= right && left % this.blockSize !== 0) sum += this.array[left++];

        while (left + this.blockSize - 1 <= right) {
            sum += this.blocks[Math.floor(left / this.blockSize)];
            left += this.blockSize;
        }

        while (left <= right) sum += this.array[left++];
        return sum;
    }

    update(position, value) {
        const block = Math.floor(position / this.blockSize);
        this.blocks[block] += value - this.array[position];
        this.array[position] = value;
    }
}

function offlineDistinctQueries(array, queries) {
    const last = new Map();
    const sortedQueries = queries
        .map(([left, right], id) => [right, left, id])
        .sort((a, b) => a[0] - b[0]);
    const bit = new Array(array.length + 1).fill(0);
    const answers = new Array(queries.length).fill(0);

    function add(position, value) {
        for (let i = position + 1; i <= array.length; i += i & -i) bit[i] += value;
    }

    function sum(position) {
        let result = 0;
        for (let i = position + 1; i > 0; i -= i & -i) result += bit[i];
        return result;
    }

    let processed = -1;

    for (const [right, left, id] of sortedQueries) {
        while (processed < right) {
            processed++;
            if (last.has(array[processed])) add(last.get(array[processed]), -1);
            add(processed, 1);
            last.set(array[processed], processed);
        }

        answers[id] = sum(right) - sum(left - 1);
    }

    return answers;
}

function parallelBinarySearch(n, queries) {
    let low = new Array(n).fill(0);
    let high = new Array(n).fill(1e9);

    for (let iteration = 0; iteration < 60; iteration++) {
        const mids = low.map((value, i) => Math.floor((value + high[i]) / 2));
        const updatesByMid = new Map();

        mids.forEach((mid, i) => {
            if (!updatesByMid.has(mid)) updatesByMid.set(mid, []);
            updatesByMid.get(mid).push(i);
        });

        for (const [mid, indices] of [...updatesByMid].sort((a, b) => a[0] - b[0])) {
            for (const i of indices) {
                if (queries(i, mid)) high[i] = mid;
                else low[i] = mid + 1;
            }
        }
    }

    return low;
}

class RollbackDSU {
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.size = new Array(n + 1).fill(1);
        this.history = [];
    }

    find(x) {
        while (this.parent[x] !== x) x = this.parent[x];
        return x;
    }

    union(a, b) {
        let ra = this.find(a);
        let rb = this.find(b);

        if (ra === rb) {
            this.history.push(null);
            return false;
        }

        if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
        this.history.push([rb, ra, this.size[ra]]);
        this.parent[rb] = ra;
        this.size[ra] += this.size[rb];
        return true;
    }

    snapshot() {
        return this.history.length;
    }

    rollback(snapshot) {
        while (this.history.length > snapshot) {
            const change = this.history.pop();
            if (!change) continue;
            const [child, root, previousSize] = change;
            this.parent[child] = child;
            this.size[root] = previousSize;
        }
    }
}

function sweepMaximumOverlap(intervals) {
    const events = [];

    for (const [left, right] of intervals) {
        events.push([left, 1]);
        events.push([right + 1, -1]);
    }

    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let current = 0;
    let best = 0;

    for (const [, delta] of events) {
        current += delta;
        best = Math.max(best, current);
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const array = [];
    const queries = [];

    for (let i = 0; i < n; i++) array.push(Number(input[index++]));

    for (let i = 0; i < q; i++) {
        const left = Number(input[index++]) - 1;
        const right = Number(input[index++]) - 1;
        queries.push([left, right]);
    }

    return moRangeSum(array, queries).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
