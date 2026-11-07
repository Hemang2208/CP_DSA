// Topic: ROLLING HASH
// Pattern: Prefix Polynomial Hash
// Use Cases: Substring equality, longest common substring, palindrome
// checks, plagiarism detection, dictionary lookups.
//
// Example Problem: Substring Equality Queries
// Source: Classic rolling hash problem.
//
// node "RollingHash.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

const BASE = 137;
const MOD1 = 1000000007;
const MOD2 = 1000000009;
let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

function mulmod(a, b, mod) {
    return ((((a >>> 16) * b) % mod) * 65536 + (a & 65535) * b) % mod;
}

// Approach: build two independent polynomial hashes. Comparing both
// makes collision probability negligible while keeping multiplication
// inside JavaScript's safe integer range.
function buildHash(s, mod) {
    const n = s.length;
    const prefix = new Array(n + 1).fill(0);
    const power = new Array(n + 1).fill(1);

    for (let i = 1; i <= n; i++) {
        prefix[i] =
            (mulmod(prefix[i - 1], BASE, mod) + s.charCodeAt(i - 1)) % mod;
        power[i] = mulmod(power[i - 1], BASE, mod);
    }

    return { prefix, power };
}

function substringHash(hash, left, right, mod) {
    const length = right - left + 1;
    const removed = mulmod(hash.prefix[left - 1], hash.power[length], mod);

    return (hash.prefix[right] - removed + mod) % mod;
}

function solve() {
    const s = nextStr();
    const q = Number(nextStr());
    const hash1 = buildHash(s, MOD1);
    const hash2 = buildHash(s, MOD2);
    const answers = [];

    for (let i = 0; i < q; i++) {
        const l1 = Number(nextStr());
        const r1 = Number(nextStr());
        const l2 = Number(nextStr());
        const r2 = Number(nextStr());

        if (r1 - l1 !== r2 - l2) {
            answers.push("NO");
            continue;
        }

        const first1 = substringHash(hash1, l1, r1, MOD1);
        const second1 = substringHash(hash1, l2, r2, MOD1);
        const first2 = substringHash(hash2, l1, r1, MOD2);
        const second2 = substringHash(hash2, l2, r2, MOD2);

        answers.push(first1 === second1 && first2 === second2 ? "YES" : "NO");
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
