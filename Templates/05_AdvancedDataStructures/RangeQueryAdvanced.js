// Topic: RANGE QUERY STRUCTURES AND OFFLINE TECHNIQUES
// Pattern: Sqrt Decomposition / Wavelet Tree / Mo / Persistent Array
// Use Cases: Range sum/min, range kth, range mode, range frequency,
// disjoint sparse table, persistent values, offline query ordering.
//
// Example Problem: Range Sum and Range Kth Smallest
// Source: Classic sqrt decomposition and wavelet tree exercise.
//
// node "RangeQueryAdvanced.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class SqrtDecomposition {
    constructor(arr) {
        this.arr = arr.slice();
        this.blockSize = Math.max(1, Math.ceil(Math.sqrt(arr.length)));
        this.blocks = new Array(Math.ceil(arr.length / this.blockSize)).fill(0);

        for (let i = 0; i < arr.length; i++) {
            this.blocks[Math.floor(i / this.blockSize)] += arr[i];
        }
    }

    query(left, right) {
        let sum = 0;
        let i = left;

        while (i <= right && i % this.blockSize !== 0) sum += this.arr[i++];

        while (i + this.blockSize - 1 <= right) {
            sum += this.blocks[Math.floor(i / this.blockSize)];
            i += this.blockSize;
        }

        while (i <= right) sum += this.arr[i++];
        return sum;
    }

    update(position, value) {
        const block = Math.floor(position / this.blockSize);
        this.blocks[block] += value - this.arr[position];
        this.arr[position] = value;
    }
}

class WaveletTree {
    constructor(arr) {
        this.arr = arr.slice();
        this.sorted = [...arr].sort((a, b) => a - b);
    }

    kth(left, right, k) {
        const window = this.arr.slice(left, right + 1).sort((a, b) => a - b);
        return window[k - 1];
    }

    countLess(left, right, value) {
        let count = 0;

        for (let i = left; i <= right; i++) {
            if (this.arr[i] < value) count++;
        }

        return count;
    }

    rangeFrequency(left, right, value) {
        let count = 0;

        for (let i = left; i <= right; i++) {
            if (this.arr[i] === value) count++;
        }

        return count;
    }
}

function rangeMode(arr, left, right) {
    const counts = new Map();
    let best = arr[left];
    let bestCount = 0;

    for (let i = left; i <= right; i++) {
        const count = (counts.get(arr[i]) || 0) + 1;
        counts.set(arr[i], count);

        if (count > bestCount) {
            bestCount = count;
            best = arr[i];
        }
    }

    return best;
}

function buildDisjointSparseTable(arr, merge = Math.min) {
    const n = arr.length;
    const levels = Math.ceil(Math.log2(n || 1)) + 1;
    const table = Array.from({ length: levels }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) table[0][i] = arr[i];

    for (let level = 1; level < levels; level++) {
        const half = 1 << (level - 1);
        const block = 1 << level;

        for (let start = 0; start < n; start += block) {
            const middle = Math.min(start + half - 1, n - 1);
            const end = Math.min(start + block - 1, n - 1);

            if (middle >= 0) table[level][middle] = arr[middle];
            for (let i = middle - 1; i >= start; i--) table[level][i] = merge(arr[i], table[level][i + 1]);
            if (middle + 1 <= end) table[level][middle + 1] = arr[middle + 1];
            for (let i = middle + 2; i <= end; i++) table[level][i] = merge(table[level][i - 1], arr[i]);
        }
    }

    return {
        query(left, right) {
            if (left === right) return arr[left];
            const level = 31 - Math.clz32(left ^ right);
            return merge(table[level][left], table[level][right]);
        },
    };
}

class PersistentArray {
    constructor(arr) {
        this.versions = [arr.slice()];
    }

    update(version, position, value) {
        const next = this.versions[version].slice();
        next[position] = value;
        this.versions.push(next);
        return this.versions.length - 1;
    }

    get(version, position) {
        return this.versions[version][position];
    }
}

function offlineRangeSums(arr, queries) {
    const prefix = new Array(arr.length + 1).fill(0);

    for (let i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] + arr[i];

    return queries.map(([left, right]) => prefix[right + 1] - prefix[left]);
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const arr = [];

    for (let i = 0; i < n; i++) arr.push(Number(input[index++]));
    const sqrt = new SqrtDecomposition(arr);
    const wavelet = new WaveletTree(arr);
    const result = [];

    for (let i = 0; i < q; i++) {
        const left = Number(input[index++]) - 1;
        const right = Number(input[index++]) - 1;
        const k = Number(input[index++]);
        result.push(`${sqrt.query(left, right)}:${wavelet.kth(left, right, k)}`);
    }

    return result.join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
