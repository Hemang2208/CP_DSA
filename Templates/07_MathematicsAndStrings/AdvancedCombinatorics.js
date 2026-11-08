// Topic: ADVANCED COMBINATORICS
// Pattern: Catalan / Stirling / Bell / Derangements / Inclusion-Exclusion
// Use Cases: Balanced sequences, set partitions, permutations with
// restrictions, necklace counting, Lucas theorem, rank and unrank.
//
// Example Problem: Catalan, Derangements, Bell And Partitions
// Source: Classic combinatorial sequence calculation.
//
// node "AdvancedCombinatorics.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function factorial(n) {
    let result = 1n;
    for (let i = 2n; i <= BigInt(n); i++) result *= i;
    return result;
}

function binomial(n, k) {
    if (k < 0 || k > n) return 0n;
    k = Math.min(k, n - k);
    let result = 1n;

    for (let i = 1; i <= k; i++) {
        result = (result * BigInt(n - k + i)) / BigInt(i);
    }

    return result;
}

function catalan(n) {
    return binomial(2 * n, n) / BigInt(n + 1);
}

function derangements(n) {
    if (n === 0) return 1n;
    if (n === 1) return 0n;
    let previous = 1n;
    let current = 0n;

    for (let i = 2; i <= n; i++) {
        const next = BigInt(i - 1) * (previous + current);
        previous = current;
        current = next;
    }

    return current;
}

function stirlingSecond(n, k) {
    const dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0n));
    dp[0][0] = 1n;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, k); j++) {
            dp[i][j] = dp[i - 1][j - 1] + BigInt(j) * dp[i - 1][j];
        }
    }

    return dp[n][k];
}

function bellNumbers(n) {
    const result = [];

    for (let i = 0; i <= n; i++) {
        let total = 0n;
        for (let j = 0; j <= i; j++) total += stirlingSecond(i, j);
        result.push(total);
    }

    return result;
}

function integerPartitions(n) {
    const dp = new Array(n + 1).fill(0n);
    dp[0] = 1n;

    for (let part = 1; part <= n; part++) {
        for (let value = part; value <= n; value++) {
            dp[value] += dp[value - part];
        }
    }

    return dp[n];
}

function nCrMod(n, r, mod) {
    if (r < 0 || r > n) return 0;

    let numerator = 1;
    let denominator = 1;

    for (let i = 1; i <= r; i++) {
        numerator = (numerator * ((n - r + i) % mod)) % mod;
        denominator = (denominator * i) % mod;
    }

    return (numerator * powMod(denominator, mod - 2, mod)) % mod;
}

function powMod(base, exponent, mod) {
    let result = 1;
    base %= mod;

    while (exponent > 0) {
        if (exponent & 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exponent >>= 1;
    }

    return result;
}

function lucas(n, r, prime) {
    if (r === 0) return 1;

    const ni = n % prime;
    const ri = r % prime;

    if (ri > ni) return 0;

    return (lucas(Math.floor(n / prime), Math.floor(r / prime), prime) * nCrMod(ni, ri, prime)) % prime;
}

function permutationsRank(permutation) {
    const n = permutation.length;
    let rank = 0;
    const sorted = permutation.slice().sort((a, b) => a - b);

    for (let i = 0; i < n; i++) {
        const position = sorted.indexOf(permutation[i]);
        rank += position * Number(factorial(n - i - 1));
        sorted.splice(position, 1);
    }

    return rank;
}

function inversePermutationRank(rank, n) {
    const available = Array.from({ length: n }, (_, i) => i + 1);
    const permutation = [];

    for (let i = 0; i < n; i++) {
        const block = Number(factorial(n - i - 1));
        const position = Math.floor(rank / block);
        rank %= block;
        permutation.push(available.splice(position, 1)[0]);
    }

    return permutation;
}

function burnsideNecklaces(beads, colors) {
    let total = 0n;

    for (let shift = 0; shift < beads; shift++) {
        total += BigInt(colors) ** BigInt(gcd(shift, beads));
    }

    return total / BigInt(beads);
}

function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
}

function solve() {
    const n = Number(input[index++]);
    const bell = bellNumbers(n)[n];

    return [
        catalan(n).toString(),
        derangements(n).toString(),
        bell.toString(),
        integerPartitions(n).toString(),
    ].join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
