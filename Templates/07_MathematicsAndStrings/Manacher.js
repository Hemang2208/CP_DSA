// Topic: MANACHER'S ALGORITHM
// Pattern: Palindrome Radii in Linear Time
// Use Cases: Longest palindromic substring, count palindromic
// substrings, palindrome queries, palindromic tree preprocessing.
//
// Example Problem: Longest Palindromic Substring Length
// Source: Classic Manacher problem.
//
// node "Manacher.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: insert separators so odd and even palindromes are handled
// uniformly. Reuse the mirror radius inside the current right boundary.
function longestPalindromeLength(s) {
    const text = "#" + s.split("").join("#") + "#";
    const radius = new Array(text.length).fill(0);
    let center = 0;
    let right = 0;
    let best = 0;

    for (let i = 0; i < text.length; i++) {
        const mirror = 2 * center - i;

        if (i < right) {
            radius[i] = Math.min(right - i, radius[mirror]);
        }

        while (
            i - radius[i] - 1 >= 0 &&
            i + radius[i] + 1 < text.length &&
            text[i - radius[i] - 1] === text[i + radius[i] + 1]
        ) {
            radius[i]++;
        }

        if (i + radius[i] > right) {
            center = i;
            right = i + radius[i];
        }

        if (radius[i] > best) {
            best = radius[i];
        }
    }

    return best;
}

function solve() {
    const s = nextStr();

    return longestPalindromeLength(s);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
