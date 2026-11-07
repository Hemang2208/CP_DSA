// Topic: EXTENDED EUCLIDEAN ALGORITHM
// Pattern: Bezout Coefficients
// Use Cases: Modular inverse, linear Diophantine equations, CRT,
// solving ax + by = gcd(a, b).
//
// Example Problem: Find X, Y, G Such That AX + BY = G
// Source: Classic extended Euclidean problem.
//
// node "ExtendedEuclidean.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextBig() {
    return BigInt(tokens[index++]);
}

// Approach: unwind the Euclidean recursion. If b = 0 then gcd = a and
// (x, y) = (1, 0). Otherwise swap coefficients and subtract.
function extendedGcd(a, b) {
    if (b === 0n) {
        return [1n, 0n, a];
    }

    const [x, y, g] = extendedGcd(b, a % b);

    return [y, x - (a / b) * y, g];
}

function solve() {
    const a = nextBig();
    const b = nextBig();
    const [x, y, g] = extendedGcd(a, b);

    return x + " " + y + " " + g;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
