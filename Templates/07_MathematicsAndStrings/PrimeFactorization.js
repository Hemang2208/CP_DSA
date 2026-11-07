// Topic: PRIME FACTORIZATION
// Pattern: Trial Division
// Use Cases: Factorization, divisor generation, prime powers,
// totient computation, counting factors.
//
// Example Problem: Prime Factorization of N
// Source: Classic factorization problem.
//
// node "PrimeFactorization.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: divide out each factor up to sqrt(n). Any remainder greater
// than 1 is a prime factor larger than the original square root.
function factorize(n) {
    const factors = [];

    for (let divisor = 2; divisor * divisor <= n; divisor++) {
        if (n % divisor !== 0) {
            continue;
        }

        let exponent = 0;

        while (n % divisor === 0) {
            n /= divisor;
            exponent++;
        }

        factors.push(exponent === 1 ? String(divisor) : divisor + "^" + exponent);
    }

    if (n > 1) {
        factors.push(String(n));
    }

    return factors.length ? factors.join(" * ") : "1";
}

function solve() {
    const n = Number(input[index++]);

    return factorize(n);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
