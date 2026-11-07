// Topic: COMBINATORICS
// Pattern: Factorials + Inverse Factorials
// Use Cases: Binomial coefficients, permutations, paths on grids,
// counting selections, Pascal's triangle modulo a prime.
//
// Example Problem: Compute C(N, R) mod 1e9+7
// Source: Classic combinatorics problem.
//
// node "Combinatorics.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

const MOD = 1000000007;
let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function mulmod(a, b) {
    return ((((a >>> 16) * b) % MOD) * 65536 + (a & 65535) * b) % MOD;
}

function modPow(base, exponent) {
    let result = 1;

    while (exponent > 0) {
        if (exponent & 1) {
            result = mulmod(result, base);
        }

        base = mulmod(base, base);
        exponent >>= 1;
    }

    return result;
}

function solve() {
    const queries = [];
    let maxN = 0;

    for (let i = 0; i < t; i++) {
        const n = Number(input[index++]);
        const r = Number(input[index++]);
        queries.push([n, r]);

        if (n > maxN) {
            maxN = n;
        }
    }

    const factorial = new Array(maxN + 1).fill(1);
    const inverseFactorial = new Array(maxN + 1).fill(1);

    for (let i = 1; i <= maxN; i++) {
        factorial[i] = (factorial[i - 1] * i) % MOD;
    }

    inverseFactorial[maxN] = modPow(factorial[maxN], MOD - 2);

    for (let i = maxN; i >= 1; i--) {
        inverseFactorial[i - 1] = (inverseFactorial[i] * i) % MOD;
    }

    for (const [n, r] of queries) {
        if (r < 0 || r > n) {
            outcomes.push(0);
            continue;
        }

        const numerator = mulmod(factorial[n], inverseFactorial[r]);
        outcomes.push(mulmod(numerator, inverseFactorial[n - r]));
    }

    return outcomes.join("\n");
}

console.log(solve());
