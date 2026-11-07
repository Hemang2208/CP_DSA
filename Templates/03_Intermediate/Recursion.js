// Topic: RECURSION
// Pattern: Base Case + Recursive Case
// Use Cases: Divide and conquer, tree traversal, permutations,
// Tower of Hanoi, recursive counting and generation.
//
// Example Problem: Tower of Hanoi
// Source: Classic recursion problem.
//
// node "Recursion.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: move n - 1 disks to the auxiliary rod, move the largest
// disk to the target, then move n - 1 disks on top of it.
function hanoi(n, from, to, aux, moves) {
    if (n === 0) {
        return;
    }

    hanoi(n - 1, from, aux, to, moves);
    moves.push(from + "->" + to);
    hanoi(n - 1, aux, to, from, moves);
}

function solve() {
    const n = Number(input[index++]);
    const moves = [];

    hanoi(n, 1, 3, 2, moves);

    return moves.length + "\n" + moves.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
