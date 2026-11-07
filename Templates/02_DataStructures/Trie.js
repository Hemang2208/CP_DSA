// Topic: TRIE
// Pattern: Prefix Tree
// Use Cases: Prefix counting, autocomplete, word search, maximum XOR,
// dictionary matching, Aho-Corasick preprocessing.
//
// Example Problem: Count Words With a Given Prefix
// Source: Standard trie problem.

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

class TrieNode {
    constructor() {
        this.children = new Map();
        this.prefixCount = 0;
        this.wordCount = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;

        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }

            node = node.children.get(char);
            node.prefixCount++;
        }

        node.wordCount++;
    }

    countPrefix(prefix) {
        let node = this.root;

        for (const char of prefix) {
            if (!node.children.has(char)) {
                return 0;
            }

            node = node.children.get(char);
        }

        return node.prefixCount;
    }
}

function solve() {
    const n = Number(nextStr());
    const trie = new Trie();

    for (let i = 0; i < n; i++) {
        trie.insert(nextStr());
    }

    const q = Number(nextStr());
    const answers = [];

    for (let i = 0; i < q; i++) {
        answers.push(trie.countPrefix(nextStr()));
    }

    return answers.join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
