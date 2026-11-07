// Topic: SUFFIX ARRAY
// Pattern: Doubling + Rank Sorting / Kasai LCP
// Use Cases: Lexicographic suffix order, LCP queries, distinct
// substrings, longest repeated substring, pattern search.
//
// Example Problem: Build Suffix Array and LCP Array
// Source: Classic suffix array problem.
//
// node "SuffixArray.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: sort suffixes by the first 2^k characters. Ranks from the
// previous round make each comparison O(1). Kasai then builds the LCP
// array in linear time.
function buildSuffixArray(s) {
    const n = s.length;
    const suffixArray = Array.from({ length: n }, (_, i) => i);
    let rank = new Array(n);

    for (let i = 0; i < n; i++) {
        rank[i] = s.charCodeAt(i);
    }

    let step = 1;

    while (true) {
        suffixArray.sort((a, b) => {
            if (rank[a] !== rank[b]) {
                return rank[a] - rank[b];
            }

            const rankA = a + step < n ? rank[a + step] : -1;
            const rankB = b + step < n ? rank[b + step] : -1;

            return rankA - rankB;
        });

        const newRank = new Array(n).fill(0);

        for (let i = 1; i < n; i++) {
            const previous = suffixArray[i - 1];
            const current = suffixArray[i];
            const previousFirst = rank[previous];
            const currentFirst = rank[current];
            const previousSecond = previous + step < n ? rank[previous + step] : -1;
            const currentSecond = current + step < n ? rank[current + step] : -1;

            const different =
                previousFirst !== currentFirst || previousSecond !== currentSecond;

            newRank[current] = newRank[previous] + (different ? 1 : 0);
        }

        rank = newRank;

        if (rank[suffixArray[n - 1]] === n - 1) {
            break;
        }

        step <<= 1;
    }

    return suffixArray;
}

function buildLCP(s, suffixArray) {
    const n = s.length;
    const rank = new Array(n);
    const lcp = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        rank[suffixArray[i]] = i;
    }

    let matched = 0;

    for (let i = 0; i < n; i++) {
        if (rank[i] === 0) {
            continue;
        }

        const previous = suffixArray[rank[i] - 1];

        while (
            i + matched < n &&
            previous + matched < n &&
            s[i + matched] === s[previous + matched]
        ) {
            matched++;
        }

        lcp[rank[i]] = matched;

        if (matched > 0) {
            matched--;
        }
    }

    return lcp;
}

function solve() {
    const s = nextStr();
    const suffixArray = buildSuffixArray(s);
    const lcp = buildLCP(s, suffixArray);
    const lines = [suffixArray.join(" ")];

    if (s.length > 1) {
        lines.push(lcp.slice(1).join(" "));
    }

    return lines.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
