// Topic: CHINESE REMAINDER THEOREM
// Pattern: Combine Congruences
// Use Cases: Systems of congruences, reconstructing a number from
// residues, CRT with coprime moduli, number theory puzzles.
//
// Example Problem: Solve X = R_i (mod M_i)
// Source: Classic CRT problem.
//
// node "ChineseRemainderTheorem.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextBig() {
    return BigInt(tokens[index++]);
}

function extendedGcd(a, b) {
    if (b === 0n) {
        return [1n, 0n, a];
    }

    const [x, y, g] = extendedGcd(b, a % b);

    return [y, x - (a / b) * y, g];
}

function modInverse(value, mod) {
    const [x, , g] = extendedGcd(((value % mod) + mod) % mod, mod);

    if (g !== 1n) {
        return null;
    }

    return ((x % mod) + mod) % mod;
}

// Approach: merge congruences one at a time. If x is the answer for the
// current modulus M, solve M * t = r - x (mod m) for t, then update.
function chineseRemainder(congruences) {
    let x = 0n;
    let modulusProduct = 1n;

    for (const [remainder, modulus] of congruences) {
        const normalizedRemainder = ((remainder % modulus) + modulus) % modulus;
        const difference =
            ((normalizedRemainder - (x % modulus)) % modulus + modulus) % modulus;
        const inverse = modInverse(modulusProduct % modulus, modulus);

        if (inverse === null) {
            return "-1";
        }

        const multiplier = (difference * inverse) % modulus;
        x += modulusProduct * multiplier;
        modulusProduct *= modulus;
        x %= modulusProduct;
    }

    return x.toString();
}

function solve() {
    const k = Number(nextBig());
    const congruences = [];

    for (let i = 0; i < k; i++) {
        const remainder = nextBig();
        const modulus = nextBig();
        congruences.push([remainder, modulus]);
    }

    return chineseRemainder(congruences);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
