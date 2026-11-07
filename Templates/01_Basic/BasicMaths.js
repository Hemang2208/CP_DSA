// Topic: BASIC MATHS
// Pattern: Divisibility / Ceiling Division / Modulo
// Use Cases: Minimum moves to reach a multiple, off-by-one counting,
// cyclic leftovers, digit and parity checks.
//
// Example Problem: Codeforces 1328A - Divisibility Problem
// https://codeforces.com/problemset/problem/1328/A
//
// node "BasicMaths.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: a is already a multiple of b when a % b === 0.
// Otherwise the next multiple is a + (b - a % b), so the number of
// increments needed is simply (b - a % b) % b.
function minimumMoves(a, b) {
    return (b - (a % b)) % b;
}

function solve() {
    const a = Number(input[index++]);
    const b = Number(input[index++]);

    return minimumMoves(a, b);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
