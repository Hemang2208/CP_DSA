// Topic: HASHING (ADVANCED PATTERNS)
// Pattern: Prefix XOR + Hash Map / Grouping / Window Frequency Maps
// Use Cases: Group anagrams, subarray XOR equals K, distinct elements
// in every window, frequency-based window tracking.
//
// Example Problem: Count Subarrays With XOR K and Distinct Window Sizes
// Source: Classic prefix-hash and window-frequency problems.
//
// node "HashingAdvanced.js" < "Input.txt" > "Output.txt"

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

function groupAnagrams(words) {
    const groups = new Map();

    for (const word of words) {
        const key = word.split("").sort().join("");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(word);
    }

    return [...groups.values()];
}

function subarrayXorK(arr, target) {
    const prefix = new Map([[0, 1]]);
    let xor = 0;
    let count = 0;

    for (const value of arr) {
        xor ^= value;
        count += prefix.get(xor ^ target) || 0;
        prefix.set(xor, (prefix.get(xor) || 0) + 1);
    }

    return count;
}

function distinctInWindow(arr, k) {
    const counts = new Map();
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        counts.set(arr[i], (counts.get(arr[i]) || 0) + 1);

        if (i >= k) {
            const old = arr[i - k];
            counts.set(old, counts.get(old) - 1);
            if (counts.get(old) === 0) counts.delete(old);
        }

        if (i >= k - 1) result.push(counts.size);
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const target = Number(input[index++]);
    const arr = inputArray(n);

    return `${subarrayXorK(arr, target)} ${distinctInWindow(arr, target).join(" ")}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
