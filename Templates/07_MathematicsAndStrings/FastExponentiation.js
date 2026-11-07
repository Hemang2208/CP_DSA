// Topic: FAST EXPONENTIATION
// Pattern: Binary Exponentiation
// Use Cases: Modular powers, matrix powers, modular inverse via
// Fermat, exponentiation of large exponents.
//
// Example Problem: Compute A^B mod M
// Source: Classic fast power problem.
//
// node "FastExponentiation.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextBig() {
    return BigInt(tokens[index++]);
}

// Approach: square the base each step and multiply it into the answer
// whenever the current exponent bit is set. O(log B) multiplications.
function power(base, exponent, mod) {
    base %= mod;

    let result = 1n;

    while (exponent > 0n) {
        if (exponent & 1n) {
            result = (result * base) % mod;
        }

        base = (base * base) % mod;
        exponent >>= 1n;
    }

    return result % mod;
}

function solve() {
    const base = nextBig();
    const exponent = nextBig();
    const mod = nextBig();

    return power(base, exponent, mod).toString();
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
