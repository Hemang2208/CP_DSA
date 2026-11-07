// Topic: HASHING
// Pattern: Hash Set Membership / Union Coverage
// Use Cases: Checking presence, removing duplicates across lists,
// coverage tests, two-sum lookups.
//
// Example Problem: Codeforces 469A - I Wanna Be the Guy
// https://codeforces.com/problemset/problem/469/A
//
// node "Hashing.js" < "Input.txt" > "Output.txt"

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

// Approach: collect both players' levels into one Set, then verify that
// every level from 1 to n is present.
function canPassAllLevels(n, littleX, littleY) {
    const levels = new Set();

    for (const level of littleX) {
        levels.add(level);
    }

    for (const level of littleY) {
        levels.add(level);
    }

    for (let level = 1; level <= n; level++) {
        if (!levels.has(level)) {
            return "Oh, my keyboard!";
        }
    }

    return "I become the guy.";
}

function solve() {
    const n = Number(input[index++]);
    const p = Number(input[index++]);
    const littleX = inputArray(p);
    const q = Number(input[index++]);
    const littleY = inputArray(q);

    return canPassAllLevels(n, littleX, littleY);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
