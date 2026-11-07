// Topic: HASH SET
// Pattern: Membership / Deduplication
// Use Cases: Duplicate detection, distinct counting, longest
// consecutive sequence, visited tracking in graph traversal.
//
// Example Problem: Longest Consecutive Sequence
// Source: Classic hash set problem (LeetCode 128 / standard CP).

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

class HashSet {
    constructor(size = 10007) {
        this.size = size;
        this.buckets = Array.from({ length: size }, () => []);
    }

    _hash(value) {
        const text = String(value);
        let hash = 0;

        for (let i = 0; i < text.length; i++) {
            hash = (hash * 31 + text.charCodeAt(i)) % this.size;
        }

        return hash;
    }

    add(value) {
        const bucket = this.buckets[this._hash(value)];

        for (const current of bucket) {
            if (current === value) {
                return;
            }
        }

        bucket.push(value);
    }

    has(value) {
        const bucket = this.buckets[this._hash(value)];

        for (const current of bucket) {
            if (current === value) {
                return true;
            }
        }

        return false;
    }
}

// Approach: start a sequence only at values with no predecessor. Then
// walk upward while consecutive values exist; track the longest run.
function longestConsecutive(arr) {
    const set = new HashSet();

    for (const value of arr) {
        set.add(value);
    }

    let best = 0;

    for (const value of arr) {
        if (set.has(value - 1)) {
            continue;
        }

        let current = value;
        let length = 1;

        while (set.has(current + 1)) {
            current++;
            length++;
        }

        if (length > best) {
            best = length;
        }
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return longestConsecutive(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
