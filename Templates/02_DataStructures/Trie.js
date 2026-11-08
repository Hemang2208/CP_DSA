// Topic: TRIE
// Pattern: Prefix Tree
// Use Cases: Prefix counting, autocomplete, word search, maximum XOR,
// dictionary matching, delete word operations.
//
// Example Problem: Count Words With a Given Prefix
// Source: Standard trie problem.
//
// node "Trie.js" < "Input.txt" > "Output.txt"

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

        for (const ch of word) {
            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode());
            }

            node = node.children.get(ch);
            node.prefixCount++;
        }

        node.wordCount++;
    }

    search(word) {
        let node = this.root;

        for (const ch of word) {
            if (!node.children.has(ch)) return false;
            node = node.children.get(ch);
        }

        return node.wordCount > 0;
    }

    startsWith(prefix) {
        let node = this.root;

        for (const ch of prefix) {
            if (!node.children.has(ch)) return false;
            node = node.children.get(ch);
        }

        return true;
    }

    countPrefix(prefix) {
        let node = this.root;

        for (const ch of prefix) {
            if (!node.children.has(ch)) return 0;
            node = node.children.get(ch);
        }

        return node.prefixCount;
    }

    delete(word) {
        const path = [];
        let node = this.root;

        for (const ch of word) {
            if (!node.children.has(ch)) return false;
            path.push([node, ch]);
            node = node.children.get(ch);
        }

        if (node.wordCount === 0) return false;

        if (node.wordCount > 1) {
            node.wordCount--;

            for (const [parent, ch] of path) {
                parent.children.get(ch).prefixCount--;
            }

            return true;
        }

        node.wordCount = 0;

        for (const [parent, ch] of path) {
            const child = parent.children.get(ch);
            child.prefixCount--;

            if (child.prefixCount === 0) {
                parent.children.delete(ch);
            }
        }

        return true;
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
