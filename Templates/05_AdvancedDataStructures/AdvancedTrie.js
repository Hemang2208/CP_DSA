// Topic: ADVANCED TRIE
// Pattern: Binary Trie / Maximum XOR
// Use Cases: Maximum XOR pair, XOR queries, maximum XOR subarray,
// bitwise greedy matching, persistent binary trie.
//
// Example Problem: Maximum XOR Query
// Source: Classic binary trie problem.
//
// node "AdvancedTrie.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: insert every number bit by bit from bit 30 down to 0.
// For a query, greedily take the opposite bit whenever it exists.
class BinaryTrie {
    constructor() {
        this.child0 = [-1];
        this.child1 = [-1];
    }

    insert(value) {
        let node = 0;

        for (let bit = 30; bit >= 0; bit--) {
            const currentBit = (value >> bit) & 1;

            if (currentBit === 0) {
                if (this.child0[node] === -1) {
                    this.child0[node] = this.child0.length;
                    this.child0.push(-1);
                    this.child1.push(-1);
                }

                node = this.child0[node];
            } else {
                if (this.child1[node] === -1) {
                    this.child1[node] = this.child0.length;
                    this.child0.push(-1);
                    this.child1.push(-1);
                }

                node = this.child1[node];
            }
        }
    }

    maximumXor(value) {
        let node = 0;
        let result = 0;

        for (let bit = 30; bit >= 0; bit--) {
            const currentBit = (value >> bit) & 1;

            if (currentBit === 0) {
                if (this.child1[node] !== -1) {
                    result |= 1 << bit;
                    node = this.child1[node];
                } else {
                    node = this.child0[node];
                }
            } else {
                if (this.child0[node] !== -1) {
                    result |= 1 << bit;
                    node = this.child0[node];
                } else {
                    node = this.child1[node];
                }
            }
        }

        return result;
    }
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const trie = new BinaryTrie();

    for (let i = 0; i < n; i++) {
        trie.insert(Number(input[index++]));
    }

    const answers = [];

    for (let i = 0; i < q; i++) {
        const query = Number(input[index++]);
        answers.push(trie.maximumXor(query));
    }

    return answers.join("\n");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
