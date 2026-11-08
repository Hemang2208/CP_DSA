// Topic: BASIC MATHS
// Pattern: Divisibility / Ceiling Division / Modulo / Number Properties
// Use Cases: Minimum moves to reach a multiple, off-by-one counting,
// cyclic leftovers, digits, primes, factors, GCD/LCM, parity, AP/GP sums.
//
// Example Problem: Codeforces 1328A - Divisibility Problem
// https://codeforces.com/problemset/problem/1328/A
//
// node "BasicMaths.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: a is already a multiple of b when a % b === 0.
// Otherwise the next multiple is a + (b - a % b), so the number of
// increments needed is simply (b - a % b) % b.
function minimumMoves(a, b) {
    return (b - (a % b)) % b;
}

function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return Math.abs(a);
}

function lcm(a, b) {
    return Math.abs((a / gcd(a, b)) * b);
}

function floorDiv(a, b) {
    return Math.floor(a / b);
}

function ceilDiv(a, b) {
    return Math.floor((a + b - 1) / b);
}

function countDigits(n) {
    return String(Math.abs(n)).length;
}

function digitSum(n) {
    let sum = 0;
    n = Math.abs(n);

    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }

    return sum;
}

function digitalRoot(n) {
    if (n === 0) return 0;
    return 1 + ((Math.abs(n) - 1) % 9);
}

function reverseNumber(n) {
    let reversed = 0;
    n = Math.abs(n);

    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n = Math.floor(n / 10);
    }

    return reversed;
}

function isPalindromeNumber(n) {
    return n >= 0 && n === reverseNumber(n);
}

function isArmstrong(n) {
    const digits = countDigits(n);
    let total = 0;
    let value = n;

    while (value > 0) {
        total += (value % 10) ** digits;
        value = Math.floor(value / 10);
    }

    return total === n;
}

function isPerfectSquare(n) {
    if (n < 0) return false;
    const root = Math.floor(Math.sqrt(n));
    return root * root === n;
}

function isPrime(n) {
    if (n < 2) return false;
    if (n % 2 === 0) return n === 2;

    for (let divisor = 3; divisor * divisor <= n; divisor += 2) {
        if (n % divisor === 0) return false;
    }

    return true;
}

function primeFactors(n) {
    const factors = [];

    while (n % 2 === 0) {
        factors.push(2);
        n /= 2;
    }

    for (let divisor = 3; divisor * divisor <= n; divisor += 2) {
        while (n % divisor === 0) {
            factors.push(divisor);
            n /= divisor;
        }
    }

    if (n > 1) factors.push(n);
    return factors;
}

function divisors(n) {
    const result = [];

    for (let divisor = 1; divisor * divisor <= n; divisor++) {
        if (n % divisor === 0) {
            result.push(divisor);
            if (divisor * divisor !== n) result.push(n / divisor);
        }
    }

    return result.sort((a, b) => a - b);
}

function modPow(base, exponent, mod) {
    let result = 1n;
    let current = BigInt(base) % BigInt(mod);
    let power = BigInt(exponent);
    const modulus = BigInt(mod);

    while (power > 0n) {
        if (power & 1n) result = (result * current) % modulus;
        current = (current * current) % modulus;
        power >>= 1n;
    }

    return Number(result);
}

function trailingZerosFactorial(n) {
    let zeros = 0;

    while (n > 0) {
        n = Math.floor(n / 5);
        zeros += n;
    }

    return zeros;
}

function arithmeticSum(first, difference, terms) {
    return (terms * (2 * first + (terms - 1) * difference)) / 2;
}

function geometricSum(first, ratio, terms) {
    return ratio === 1 ? first * terms : (first * (ratio ** terms - 1)) / (ratio - 1);
}

function isLeapYear(year) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

function solve() {
    const a = Number(input[index++]);
    const b = Number(input[index++]);

    return minimumMoves(a, b);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
