// Topic: LRU CACHE
// Pattern: Hash Map + Doubly Linked List
// Use Cases: Caching, page replacement, bounded key-value stores,
// O(1) get and put with least-recently-used eviction.
//
// Example Problem: LRU Cache Operations
// Source: Classic cache design problem (LeetCode 146).
//
// node "LRUCache.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.previous = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.nodes = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.previous = this.head;
    }

    get(key) {
        if (!this.nodes.has(key)) return -1;

        const node = this.nodes.get(key);
        this.moveToFront(node);
        return node.value;
    }

    put(key, value) {
        if (this.nodes.has(key)) {
            const node = this.nodes.get(key);
            node.value = value;
            this.moveToFront(node);
            return;
        }

        if (this.nodes.size === this.capacity) {
            const leastRecent = this.tail.previous;
            this.remove(leastRecent);
            this.nodes.delete(leastRecent.key);
        }

        const node = new Node(key, value);
        this.nodes.set(key, node);
        this.addToFront(node);
    }

    addToFront(node) {
        node.previous = this.head;
        node.next = this.head.next;
        this.head.next.previous = node;
        this.head.next = node;
    }

    remove(node) {
        node.previous.next = node.next;
        node.next.previous = node.previous;
    }

    moveToFront(node) {
        this.remove(node);
        this.addToFront(node);
    }
}

function solve() {
    const capacity = Number(nextStr());
    const cache = new LRUCache(capacity);
    const q = Number(nextStr());
    const answers = [];

    for (let i = 0; i < q; i++) {
        const operation = nextStr();

        if (operation === "put") {
            const key = Number(nextStr());
            const value = Number(nextStr());
            cache.put(key, value);
        } else {
            answers.push(cache.get(Number(nextStr())));
        }
    }

    return answers.join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
