// Topic: RECURSION FUNDAMENTALS
// Pattern: Base Case + Recursive Case / Call Stack
// Use Cases: Factorial, Fibonacci, power, digit sums, Tower of Hanoi,
// recursion on arrays and strings, recursion-to-iteration conversion.
//
// Example Problem: Factorial, Fibonacci, Digit Sum and Hanoi Moves
// Source: Classic recursion exercise.
//
// node "RecursionFundamentals.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function power(base, exponent) {
    if (exponent === 0) return 1;
    if (exponent % 2 === 0) {
        const half = power(base, exponent / 2);
        return half * half;
    }
    return base * power(base, exponent - 1);
}

function sumDigits(n) {
    if (n === 0) return 0;
    return (n % 10) + sumDigits(Math.floor(n / 10));
}

function reverseNumber(n, result = 0) {
    if (n === 0) return result;
    return reverseNumber(Math.floor(n / 10), result * 10 + (n % 10));
}

function isPalindromeNumber(n) {
    return n === reverseNumber(n);
}

function hanoiMoves(n) {
    if (n === 0) return 0;
    return hanoiMoves(n - 1) + 1 + hanoiMoves(n - 1);
}

function hanoiSteps(n, from = "A", via = "B", to = "C", steps = []) {
    if (n === 0) return steps;
    hanoiSteps(n - 1, from, to, via, steps);
    steps.push(`${from}->${to}`);
    hanoiSteps(n - 1, via, from, to, steps);
    return steps;
}

function sumArray(arr, i = 0) {
    if (i === arr.length) return 0;
    return arr[i] + sumArray(arr, i + 1);
}

function isPalindromeString(s, left = 0, right = s.length - 1) {
    if (left >= right) return true;
    if (s[left] !== s[right]) return false;
    return isPalindromeString(s, left + 1, right - 1);
}

function solve() {
    const n = Number(input[index++]);

    return `${factorial(n)} ${fibonacci(n)} ${sumDigits(n)} ${hanoiMoves(n)} ${isPalindromeNumber(n)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
