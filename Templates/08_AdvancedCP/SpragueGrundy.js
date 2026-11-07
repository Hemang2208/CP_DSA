// Topic: SPRAGUE-GRUNDY THEOREM
// Pattern: Grundy Numbers and MEX
// Use Cases: Impartial games, subtraction games, sums of independent
// games, combinatorial game analysis.
//
// Example Problem: Winner of a Subtraction Game With Multiple Piles
// Source: Classic Sprague-Grundy problem.
//
// node "SpragueGrundy.js" < "Input.txt" > "Output.txt"

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

// Approach: grundy[x] is the MEX of grundy[x - move] over all legal
// moves. Independent piles combine with XOR, just like Nim.
function buildGrundy(moves, maximum) {
    const grundy = new Array(maximum + 1).fill(0);

    for (let value = 1; value <= maximum; value++) {
        const reachable = new Set();

        for (const move of moves) {
            if (move <= value) {
                reachable.add(grundy[value - move]);
            }
        }

        let mex = 0;

        while (reachable.has(mex)) {
            mex++;
        }

        grundy[value] = mex;
    }

    return grundy;
}

function solve() {
    const moveCount = Number(input[index++]);
    const moves = inputArray(moveCount);
    const pileCount = Number(input[index++]);
    const piles = inputArray(pileCount);
    const maximum = Math.max(...piles);
    const grundy = buildGrundy(moves, maximum);
    let xorSum = 0;

    for (const pile of piles) {
        xorSum ^= grundy[pile];
    }

    return xorSum !== 0 ? "First" : "Second";
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
