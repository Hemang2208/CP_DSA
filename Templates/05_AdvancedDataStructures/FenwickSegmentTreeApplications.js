// Topic: FENWICK TREE AND SEGMENT TREE APPLICATIONS
// Pattern: Point/Range Updates / Order Statistics / Merge Sort Tree
// Use Cases: Inversion count, count smaller after self, 2D BIT, range
// update range query, kth element, segment tree descent, lazy assign.
//
// Example Problem: Inversion Count and Count Smaller Elements After Self
// Source: Classic Fenwick tree problems (LeetCode 315 / inversion count).
//
// node "FenwickSegmentTreeApplications.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Fenwick {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }

    add(i, delta) {
        for (; i <= this.n; i += i & -i) this.tree[i] += delta;
    }

    prefix(i) {
        let sum = 0;
        for (; i > 0; i -= i & -i) sum += this.tree[i];
        return sum;
    }

    range(left, right) {
        return this.prefix(right) - this.prefix(left - 1);
    }

    kth(k) {
        let position = 0;
        let step = 1;

        while (step * 2 <= this.n) step *= 2;

        for (; step; step = Math.floor(step / 2)) {
            if (position + step <= this.n && this.tree[position + step] < k) {
                position += step;
                k -= this.tree[position];
            }
        }

        return position + 1;
    }
}

class RangeUpdateFenwick {
    constructor(n) {
        this.n = n;
        this.bit1 = new Fenwick(n);
        this.bit2 = new Fenwick(n);
    }

    update(left, right, value) {
        this.bit1.add(left, value);
        this.bit1.add(right + 1, -value);
        this.bit2.add(left, value * (left - 1));
        this.bit2.add(right + 1, -value * right);
    }

    prefix(i) {
        return this.bit1.prefix(i) * i - this.bit2.prefix(i);
    }

    range(left, right) {
        return this.prefix(right) - this.prefix(left - 1);
    }
}

class Fenwick2D {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.tree = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
    }

    add(row, col, delta) {
        for (let i = row; i <= this.rows; i += i & -i) {
            for (let j = col; j <= this.cols; j += j & -j) {
                this.tree[i][j] += delta;
            }
        }
    }

    prefix(row, col) {
        let sum = 0;

        for (let i = row; i > 0; i -= i & -i) {
            for (let j = col; j > 0; j -= j & -j) {
                sum += this.tree[i][j];
            }
        }

        return sum;
    }
}

function compress(arr) {
    const sorted = [...new Set(arr)].sort((a, b) => a - b);
    return arr.map((value) => sorted.indexOf(value) + 1);
}

function inversionCount(arr) {
    const ranks = compress(arr);
    const bit = new Fenwick(ranks.length);
    let inversions = 0;

    for (let i = ranks.length - 1; i >= 0; i--) {
        inversions += bit.prefix(ranks[i] - 1);
        bit.add(ranks[i], 1);
    }

    return inversions;
}

function countSmallerAfterSelf(arr) {
    const ranks = compress(arr);
    const bit = new Fenwick(ranks.length);
    const result = new Array(arr.length).fill(0);

    for (let i = ranks.length - 1; i >= 0; i--) {
        result[i] = bit.prefix(ranks[i] - 1);
        bit.add(ranks[i], 1);
    }

    return result;
}

function kthSmallest(arr, k) {
    const ranks = compress(arr);
    const bit = new Fenwick(ranks.length);
    for (const rank of ranks) bit.add(rank, 1);
    return [...new Set(arr)].sort((a, b) => a - b)[bit.kth(k) - 1];
}

class SegmentTree {
    constructor(arr, merge = (a, b) => a + b, identity = 0) {
        this.n = arr.length;
        this.merge = merge;
        this.identity = identity;
        this.size = 1;

        while (this.size < this.n) this.size *= 2;
        this.tree = new Array(2 * this.size).fill(identity);

        for (let i = 0; i < this.n; i++) this.tree[this.size + i] = arr[i];
        for (let i = this.size - 1; i > 0; i--) this.tree[i] = this.merge(this.tree[2 * i], this.tree[2 * i + 1]);
    }

    update(position, value) {
        let i = position + this.size;
        this.tree[i] = value;

        for (i = Math.floor(i / 2); i > 0; i = Math.floor(i / 2)) {
            this.tree[i] = this.merge(this.tree[2 * i], this.tree[2 * i + 1]);
        }
    }

    query(left, right) {
        let resultLeft = this.identity;
        let resultRight = this.identity;
        left += this.size;
        right += this.size + 1;

        while (left < right) {
            if (left & 1) resultLeft = this.merge(resultLeft, this.tree[left++]);
            if (right & 1) resultRight = this.merge(this.tree[--right], resultRight);
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }

        return this.merge(resultLeft, resultRight);
    }
}

class MergeSortTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = Array.from({ length: 4 * this.n }, () => []);
        this.build(0, 0, this.n - 1, arr);
    }

    build(node, left, right, arr) {
        if (left === right) {
            this.tree[node] = [arr[left]];
            return;
        }

        const mid = Math.floor((left + right) / 2);
        this.build(2 * node + 1, left, mid, arr);
        this.build(2 * node + 2, mid + 1, right, arr);
        this.tree[node] = [...this.tree[2 * node + 1], ...this.tree[2 * node + 2]].sort((a, b) => a - b);
    }

    countLess(node, left, right, queryLeft, queryRight, value) {
        if (queryRight < left || right < queryLeft) return 0;
        if (queryLeft <= left && right <= queryRight) {
            const values = this.tree[node];
            let low = 0;
            let high = values.length;
            while (low < high) {
                const mid = Math.floor((low + high) / 2);
                if (values[mid] < value) low = mid + 1;
                else high = mid;
            }
            return low;
        }

        const mid = Math.floor((left + right) / 2);
        return this.countLess(2 * node + 1, left, mid, queryLeft, queryRight, value) +
            this.countLess(2 * node + 2, mid + 1, right, queryLeft, queryRight, value);
    }
}

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return `${inversionCount(arr)} ${countSmallerAfterSelf(arr).join(" ")}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
