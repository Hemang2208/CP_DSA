// Topic: MODULAR ARITHMETIC
// Pattern: Normalized BigInt Operations
// Use Cases: Counting under a modulus, combinatorics, hashing,
// avoiding JavaScript precision loss in modular multiplication.
//
// Example Problem: Modular Addition, Subtraction, Multiplication
// Source: Standard modular arithmetic exercise.
//
// node "ModularArithmetic.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextBig() {
    return BigInt(tokens[index++]);
}

function normalize(value, mod) {
    const remainder = value % mod;
    return remainder < 0n ? remainder + mod : remainder;
}

function solve() {
    const a = nextBig();
    const b = nextBig();
    const mod = nextBig();

    const addition = normalize(a + b, mod);
    const subtraction = normalize(a - b, mod);
    const multiplication = normalize(a * b, mod);

    return addition + " " + subtraction + " " + multiplication;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
