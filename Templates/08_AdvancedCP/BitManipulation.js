// Topic: BIT MANIPULATION
// Pattern: XOR / Set Bits / Bit Tricks
// Use Cases: Single number problems, subset enumeration, parity,
// lowest set bit, bitmask state, fast arithmetic.
//
// Example Problem: Find the Element Appearing Once (Others Twice)
// Source: Classic single number problem.
//
// node "BitManipulation.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

function countSetBits(value) {
    let count = 0;

    while (value > 0) {
        value &= value - 1;
        count++;
    }

    return count;
}

function lowestSetBit(value) {
    return value & -value;
}

function isPowerOfTwo(value) {
    return value > 0 && (value & (value - 1)) === 0;
}

// Approach: every value appearing twice cancels under XOR, leaving only
// the unique value.
function singleNumber(arr) {
    let answer = 0;

    for (const value of arr) {
        answer ^= value;
    }

    return answer;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return singleNumber(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
