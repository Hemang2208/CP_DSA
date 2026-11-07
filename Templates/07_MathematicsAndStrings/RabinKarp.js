// Topic: RABIN-KARP
// Pattern: Rolling Hash Pattern Matching
// Use Cases: Pattern matching, multiple pattern search, plagiarism
// detection, substring equality, hashing-based deduplication.
//
// Example Problem: Find All Occurrences of a Pattern in a Text
// Source: Classic Rabin-Karp problem.
//
// node "RabinKarp.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

const BASE = 31;
const MOD = 1000000007;
let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: hash the pattern and every window of the same length.
// When hashes match, compare the actual substring to rule out collision.
function rabinKarp(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    if (m > n) {
        return [];
    }

    let patternHash = 0;
    let windowHash = 0;
    let power = 1;

    for (let i = 0; i < m - 1; i++) {
        power = (power * BASE) % MOD;
    }

    for (let i = 0; i < m; i++) {
        patternHash = (patternHash * BASE + pattern.charCodeAt(i)) % MOD;
        windowHash = (windowHash * BASE + text.charCodeAt(i)) % MOD;
    }

    const positions = [];

    for (let start = 0; start + m <= n; start++) {
        if (windowHash === patternHash && text.slice(start, start + m) === pattern) {
            positions.push(start);
        }

        if (start + m < n) {
            windowHash =
                (windowHash -
                    (text.charCodeAt(start) * power) % MOD +
                    MOD) %
                MOD;
            windowHash =
                (windowHash * BASE + text.charCodeAt(start + m)) % MOD;
        }
    }

    return positions;
}

function solve() {
    const text = nextStr();
    const pattern = nextStr();
    const positions = rabinKarp(text, pattern);

    return positions.length ? positions.join(" ") : "-1";
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
