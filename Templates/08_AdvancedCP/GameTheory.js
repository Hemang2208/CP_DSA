// Topic: GAME THEORY
// Pattern: Nim XOR Invariant
// Use Cases: Normal play impartial games, Nim variants, XOR strategy,
// proving first/second player wins.
//
// Example Problem: Nim Game Winner
// Source: Classic Nim problem.
//
// node "GameTheory.js" < "Input.txt" > "Output.txt"

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

// Approach: a Nim position is losing exactly when the XOR of all pile
// sizes is zero. Any nonzero XOR can be made zero in one move.
function nimWinner(piles) {
    let xorSum = 0;

    for (const pile of piles) {
        xorSum ^= pile;
    }

    return xorSum !== 0 ? "First" : "Second";
}

function solve() {
    const n = Number(input[index++]);
    const piles = inputArray(n);

    return nimWinner(piles);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
