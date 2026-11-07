// Topic: SIEVE OF ERATOSTHENES
// Pattern: Mark Multiples
// Use Cases: Prime counting, smallest prime factor, factorization
// preprocessing, segmented sieve, number theory queries.
//
// Example Problem: Count Primes Up To N
// Source: Classic sieve problem.
//
// node "Sieve.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: assume every number is prime, then mark multiples of each
// prime starting at p * p. Remaining marked entries are primes.
function countPrimes(n) {
    if (n < 2) {
        return 0;
    }

    const isPrime = new Uint8Array(n + 1).fill(1);
    isPrime[0] = 0;
    isPrime[1] = 0;

    for (let value = 2; value * value <= n; value++) {
        if (!isPrime[value]) {
            continue;
        }

        for (let multiple = value * value; multiple <= n; multiple += value) {
            isPrime[multiple] = 0;
        }
    }

    let count = 0;

    for (let value = 2; value <= n; value++) {
        count += isPrime[value];
    }

    return count;
}

function solve() {
    const n = Number(input[index++]);

    return countPrimes(n);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
