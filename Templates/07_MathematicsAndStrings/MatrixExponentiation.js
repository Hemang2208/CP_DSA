// Topic: MATRIX EXPONENTIATION
// Pattern: Binary Exponentiation of Matrices
// Use Cases: Nth Fibonacci, linear recurrences, counting walks of
// length k, linear transformations modulo a prime.
//
// Example Problem: Nth Fibonacci Number mod 1e9+7
// Source: Classic matrix exponentiation problem.
//
// node "MatrixExponentiation.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

const MOD = 1000000007n;
let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextBig() {
    return BigInt(tokens[index++]);
}

function multiply(a, b) {
    const result = [
        [0n, 0n],
        [0n, 0n],
    ];

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
                result[i][j] = (result[i][j] + a[i][k] * b[k][j]) % MOD;
            }
        }
    }

    return result;
}

// Approach: [[1,1],[1,0]]^n has F(n+1), F(n), F(n), F(n-1) as entries.
function fibonacci(n) {
    let result = [
        [1n, 0n],
        [0n, 1n],
    ];
    let base = [
        [1n, 1n],
        [1n, 0n],
    ];

    while (n > 0n) {
        if (n & 1n) {
            result = multiply(result, base);
        }

        base = multiply(base, base);
        n >>= 1n;
    }

    return result[0][1];
}

function solve() {
    const n = nextBig();

    return fibonacci(n).toString();
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
