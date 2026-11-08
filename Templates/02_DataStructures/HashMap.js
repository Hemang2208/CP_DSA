// Topic: HASH MAP
// Pattern: Separate Chaining
// Use Cases: Frequency maps, two-sum lookups, caching, grouping,
// coordinate mapping, prefix-sum counting.
//
// Example Problem: Two Sum
// Source: Classic hash map problem (LeetCode 1 / standard CP).
//
// node "HashMap.js" < "Input.txt" > "Output.txt"

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

class HashMap {
    constructor(size = 10007) {
        this.size = size;
        this.count = 0;
        this.buckets = Array.from({ length: size }, () => []);
    }

    hash(key) {
        const text = String(key);
        let value = 0;

        for (let i = 0; i < text.length; i++) {
            value = (value * 31 + text.charCodeAt(i)) % this.size;
        }

        return value;
    }

    set(key, value) {
        const bucket = this.buckets[this.hash(key)];

        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.count++;
    }

    get(key) {
        const bucket = this.buckets[this.hash(key)];

        for (const pair of bucket) {
            if (pair[0] === key) return pair[1];
        }

        return undefined;
    }

    has(key) {
        const bucket = this.buckets[this.hash(key)];

        for (const pair of bucket) {
            if (pair[0] === key) return true;
        }

        return false;
    }

    delete(key) {
        const bucket = this.buckets[this.hash(key)];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }

        return false;
    }

    keys() {
        return this.buckets.flatMap((bucket) => bucket.map((pair) => pair[0]));
    }

    values() {
        return this.buckets.flatMap((bucket) => bucket.map((pair) => pair[1]));
    }

    entries() {
        return this.buckets.flatMap((bucket) => bucket.map((pair) => pair.slice()));
    }

    clear() {
        this.buckets = Array.from({ length: this.size }, () => []);
        this.count = 0;
    }

    isEmpty() {
        return this.count === 0;
    }
}

// Approach: store each value's index. For every value, check whether
// target - value was already seen; if so, both indices form the answer.
function twoSum(arr, target) {
    const map = new HashMap();

    for (let i = 0; i < arr.length; i++) {
        const need = target - arr[i];

        if (map.has(need)) {
            return `${map.get(need) + 1} ${i + 1}`;
        }

        map.set(arr[i], i);
    }

    return "-1";
}

function solve() {
    const n = Number(input[index++]);
    const target = Number(input[index++]);
    const arr = inputArray(n);

    return twoSum(arr, target);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
