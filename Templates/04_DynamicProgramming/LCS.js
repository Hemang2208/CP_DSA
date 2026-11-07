// Topic: LONGEST COMMON SUBSEQUENCE
// Pattern: Two-String DP
// Use Cases: LCS length, edit distance, longest palindromic
// subsequence, diff tools, DNA alignment.
//
// Example Problem: Longest Common Subsequence Length
// Source: Classic LCS problem.
//
// node "LCS.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: dp[i][j] is the LCS of the first i characters of a and the
// first j characters of b. Matching characters extend the diagonal.
function lcsLength(a, b) {
    const n = a.length;
    const m = b.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[n][m];
}

function solve() {
    const a = nextStr();
    const b = nextStr();

    return lcsLength(a, b);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
