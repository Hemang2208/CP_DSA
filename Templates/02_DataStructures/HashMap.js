// Topic: HASH MAP
// Pattern: Separate Chaining
// Use Cases: Frequency maps, two-sum lookups, caching, grouping,
// coordinate mapping, prefix-sum counting.
//
// Example Problem: Two Sum
// Source: Classic hash map problem (LeetCode 1 / standard CP).

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

class HashMap {
    constructor(size = 10007) {
        this.size = size;
        this.buckets = Array.from({ length: size }, () => []);
    }

    _hash(key) {
        const text = String(key);
        let hash = 0;

        for (let i = 0; i < text.length; i++) {
            hash = (hash * 31 + text.charCodeAt(i)) % this.size;
        }

        return hash;
    }

    set(key, value) {
        const bucket = this.buckets[this._hash(key)];

        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
    }

    get(key) {
        const bucket = this.buckets[this._hash(key)];

        for (const pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }

        return undefined;
    }

    has(key) {
        return this.get(key) !== undefined;
    }
}

// Approach: store each value's index. For every value, check whether
// target - value was already seen; if so, both indices form the answer.
function twoSum(arr, target) {
    const map = new HashMap();

    for (let i = 0; i < arr.length; i++) {
        const need = target - arr[i];

        if (map.has(need)) {
            return [map.get(need) + 1, i + 1].join(" ");
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
