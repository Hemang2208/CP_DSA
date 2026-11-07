// Topic: STRINGS
// Pattern: Character Set / Distinct Characters
// Use Cases: Unique character counting, anagram checks,
// frequency problems, string validation.
//
// Example Problem: Codeforces 236A - Boy or Girl
// https://codeforces.com/problemset/problem/236/A
//
// node "Strings.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: insert every character into a Set. The number of distinct
// characters decides whether the username is male or female.
function genderFromName(name) {
    const distinct = new Set(name);

    return distinct.size % 2 === 0 ? "CHAT WITH HER!" : "IGNORE HIM!";
}

function solve() {
    const name = nextStr();

    return genderFromName(name);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
