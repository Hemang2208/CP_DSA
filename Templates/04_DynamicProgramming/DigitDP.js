// Topic: DIGIT DP
// Pattern: Count Numbers by Digit Constraints
// Use Cases: Digit sum counts, numbers without repeated digits,
// numbers avoiding a pattern, counting in a range [L, R].
//
// Example Problem: Count Numbers in [L, R] With Digit Sum S
// Source: Classic digit DP problem.
//
// node "DigitDP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: process digits left to right while tracking whether the
// prefix is still tight to the bound. Memoize by position, tight flag,
// and current digit sum. Counts fit in Number for R up to about 1e15.
function countUpTo(limit, target) {
    if (limit < 0 || target < 0) {
        return 0;
    }

    const digits = String(limit).split("").map(Number);
    const memo = new Map();

    function dfs(position, tight, sum) {
        if (sum > target) {
            return 0;
        }

        if (position === digits.length) {
            return sum === target ? 1 : 0;
        }

        const key = position + "|" + tight + "|" + sum;

        if (memo.has(key)) {
            return memo.get(key);
        }

        const upper = tight ? digits[position] : 9;
        let total = 0;

        for (let digit = 0; digit <= upper; digit++) {
            total += dfs(position + 1, tight && digit === upper, sum + digit);
        }

        memo.set(key, total);

        return total;
    }

    return dfs(0, true, 0);
}

function solve() {
    const left = Number(input[index++]);
    const right = Number(input[index++]);
    const target = Number(input[index++]);

    return countUpTo(right, target) - countUpTo(left - 1, target);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
