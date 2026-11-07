// Topic: KNUTH-MORRIS-PRATT (KMP)
// Pattern: Prefix Function / Failure Links
// Use Cases: Pattern matching, string periodicity, prefix occurrences,
// Aho-Corasick preprocessing, shortest border.
//
// Example Problem: Find All Occurrences of a Pattern in a Text
// Source: Classic KMP problem.
//
// node "KMP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: prefix[i] is the longest proper prefix of pattern[0..i]
// that is also a suffix. On mismatch, fall back without rescanning text.
function buildPrefix(pattern) {
    const prefix = new Array(pattern.length).fill(0);
    let length = 0;

    for (let i = 1; i < pattern.length; i++) {
        while (length > 0 && pattern[i] !== pattern[length]) {
            length = prefix[length - 1];
        }

        if (pattern[i] === pattern[length]) {
            length++;
        }

        prefix[i] = length;
    }

    return prefix;
}

function kmpSearch(text, pattern) {
    if (pattern.length === 0) {
        return [];
    }

    const prefix = buildPrefix(pattern);
    const positions = [];
    let matched = 0;

    for (let i = 0; i < text.length; i++) {
        while (matched > 0 && text[i] !== pattern[matched]) {
            matched = prefix[matched - 1];
        }

        if (text[i] === pattern[matched]) {
            matched++;
        }

        if (matched === pattern.length) {
            positions.push(i - pattern.length + 1);
            matched = prefix[matched - 1];
        }
    }

    return positions;
}

function solve() {
    const text = nextStr();
    const pattern = nextStr();
    const positions = kmpSearch(text, pattern);

    return positions.length ? positions.join(" ") : "-1";
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
