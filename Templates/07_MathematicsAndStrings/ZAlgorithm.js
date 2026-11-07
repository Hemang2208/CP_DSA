// Topic: Z ALGORITHM
// Pattern: Z-Array of Prefix Matches
// Use Cases: Pattern matching, counting prefix occurrences,
// string periodicity, distinct substrings, string compression.
//
// Example Problem: Find All Occurrences of a Pattern in a Text
// Source: Classic Z-algorithm problem.
//
// node "ZAlgorithm.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: z[i] is the length of the longest substring starting at i
// that matches a prefix of the string. Keep the current rightmost
// matched segment [left, right] to reuse previous work.
function zFunction(s) {
    const n = s.length;
    const z = new Array(n).fill(0);
    let left = 0;
    let right = 0;

    for (let i = 1; i < n; i++) {
        if (i <= right) {
            z[i] = Math.min(right - i + 1, z[i - left]);
        }

        while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
            z[i]++;
        }

        if (i + z[i] - 1 > right) {
            left = i;
            right = i + z[i] - 1;
        }
    }

    return z;
}

function solve() {
    const text = nextStr();
    const pattern = nextStr();
    const combined = pattern + "#" + text;
    const z = zFunction(combined);
    const positions = [];
    const offset = pattern.length + 1;

    for (let i = offset; i < combined.length; i++) {
        if (z[i] >= pattern.length) {
            positions.push(i - offset);
        }
    }

    return positions.length ? positions.join(" ") : "-1";
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
