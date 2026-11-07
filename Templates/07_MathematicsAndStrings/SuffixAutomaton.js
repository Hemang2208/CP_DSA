// Topic: SUFFIX AUTOMATON
// Pattern: Minimal DFA of All Substrings
// Use Cases: Distinct substrings, longest common substring, substring
// occurrences, lexicographic kth substring, string matching.
//
// Example Problem: Count Distinct Substrings
// Source: Classic suffix automaton problem.
//
// node "SuffixAutomaton.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

// Approach: each SAM state represents a set of substrings of lengths
// (len[link], len[state]]. Summing len[state] - len[link[state]] counts
// every distinct substring exactly once.
function countDistinctSubstrings(s) {
    const length = [0];
    const link = [-1];
    const next = [new Map()];
    let last = 0;

    for (const char of s) {
        const current = length.length;
        length.push(length[last] + 1);
        link.push(0);
        next.push(new Map());

        let state = last;

        while (state !== -1 && !next[state].has(char)) {
            next[state].set(char, current);
            state = link[state];
        }

        if (state === -1) {
            link[current] = 0;
        } else {
            const target = next[state].get(char);

            if (length[state] + 1 === length[target]) {
                link[current] = target;
            } else {
                const clone = length.length;
                length.push(length[state] + 1);
                link.push(link[target]);
                next.push(new Map(next[target]));

                while (state !== -1 && next[state].get(char) === target) {
                    next[state].set(char, clone);
                    state = link[state];
                }

                link[target] = clone;
                link[current] = clone;
            }
        }

        last = current;
    }

    let total = 0;

    for (let state = 1; state < length.length; state++) {
        total += length[state] - length[link[state]];
    }

    return total;
}

function solve() {
    const s = nextStr();

    return countDistinctSubstrings(s);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
