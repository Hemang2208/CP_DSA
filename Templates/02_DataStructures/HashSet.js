// Topic: HASH SET
// Pattern: Membership / Deduplication
// Use Cases: Duplicate detection, distinct counting, longest
// consecutive sequence, visited tracking in graph traversal.
//
// Example Problem: Longest Consecutive Sequence
// Source: Classic hash set problem (LeetCode 128 / standard CP).
//
// node "HashSet.js" < "Input.txt" > "Output.txt"

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

class HashSet {
    constructor(size = 10007) {
        this.size = size;
        this.count = 0;
        this.buckets = Array.from({ length: size }, () => []);
    }

    hash(value) {
        const text = String(value);
        let hash = 0;

        for (let i = 0; i < text.length; i++) {
            hash = (hash * 31 + text.charCodeAt(i)) % this.size;
        }

        return hash;
    }

    add(value) {
        const bucket = this.buckets[this.hash(value)];

        for (const current of bucket) {
            if (current === value) return false;
        }

        bucket.push(value);
        this.count++;
        return true;
    }

    has(value) {
        const bucket = this.buckets[this.hash(value)];

        for (const current of bucket) {
            if (current === value) return true;
        }

        return false;
    }

    delete(value) {
        const bucket = this.buckets[this.hash(value)];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === value) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }

        return false;
    }

    values() {
        return this.buckets.flat();
    }

    clear() {
        this.buckets = Array.from({ length: this.size }, () => []);
        this.count = 0;
    }

    isEmpty() {
        return this.count === 0;
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
        if (set.has(value - 1)) continue;

        let current = value;
        let length = 1;

        while (set.has(current + 1)) {
            current++;
            length++;
        }

        best = Math.max(best, length);
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
