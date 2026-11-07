// Topic: GCD AND LCM
// Pattern: Euclidean Algorithm
// Use Cases: Fraction reduction, LCM of intervals, coprime checks,
// number theory identities, extended Euclidean preprocessing.
//
// Example Problem: Compute GCD and LCM
// Source: Classic Euclidean algorithm problem.
//
// node "GCD_LCM.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: gcd(a, b) = gcd(b, a % b). Then lcm = a / gcd * b, and the
// division first keeps intermediate values smaller. BigInt keeps lcm
// exact for large inputs.
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return Math.abs(a);
}

function solve() {
    const a = Number(input[index++]);
    const b = Number(input[index++]);
    const g = gcd(a, b);
    const lcm = (BigInt(a) / BigInt(g)) * BigInt(b);

    return g + " " + lcm.toString();
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
