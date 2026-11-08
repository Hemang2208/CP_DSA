// Topic: HEAPS, PRIORITY QUEUES AND TRIES
// Pattern: Top-K / K-Way Merge / Prefix Tree / Wildcards
// Use Cases: Top K frequent, K closest, merge sorted streams, median,
// autocomplete, word search, replace words, maximum XOR pair.
//
// Example Problem: Top K Frequent Elements and Maximum XOR Pair
// Source: Classic heap and trie problems (LeetCode 347 / 421).
//
// node "HeapAndTrieApplications.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

class MinHeap {
    constructor() {
        this.items = [];
    }

    push(value) {
        this.items.push(value);
        this.up(this.items.length - 1);
    }

    pop() {
        if (!this.items.length) return undefined;
        const top = this.items[0];
        const last = this.items.pop();

        if (this.items.length) {
            this.items[0] = last;
            this.down(0);
        }

        return top;
    }

    peek() {
        return this.items[0];
    }

    size() {
        return this.items.length;
    }

    up(i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.items[parent] <= this.items[i]) break;
            [this.items[parent], this.items[i]] = [this.items[i], this.items[parent]];
            i = parent;
        }
    }

    down(i) {
        const n = this.items.length;

        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < n && this.items[left] < this.items[smallest]) smallest = left;
            if (right < n && this.items[right] < this.items[smallest]) smallest = right;
            if (smallest === i) break;
            [this.items[smallest], this.items[i]] = [this.items[i], this.items[smallest]];
            i = smallest;
        }
    }
}

class MaxHeap {
    constructor() {
        this.heap = new MinHeap();
    }

    push(value) {
        this.heap.push(-value);
    }

    pop() {
        return -this.heap.pop();
    }

    peek() {
        return -this.heap.peek();
    }

    size() {
        return this.heap.size();
    }
}

class MedianFinder {
    constructor() {
        this.lower = new MaxHeap();
        this.upper = new MinHeap();
    }

    add(value) {
        this.lower.push(value);
        this.upper.push(this.lower.pop());

        if (this.upper.size() > this.lower.size()) {
            this.lower.push(this.upper.pop());
        }
    }

    median() {
        if (this.lower.size() > this.upper.size()) return this.lower.peek();
        return (this.lower.peek() + this.upper.peek()) / 2;
    }
}

function topKFrequent(arr, k) {
    const counts = new Map();

    for (const value of arr) counts.set(value, (counts.get(value) || 0) + 1);

    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0] - b[0])
        .slice(0, k)
        .map((entry) => entry[0]);
}

function topKFrequentWords(words, k) {
    const counts = new Map();

    for (const word of words) counts.set(word, (counts.get(word) || 0) + 1);

    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, k)
        .map((entry) => entry[0]);
}

function kClosestPoints(points, k) {
    return points
        .slice()
        .sort((a, b) => a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]))
        .slice(0, k);
}

function mergeKSorted(arrays) {
    const heap = new MinHeap();

    arrays.forEach((arr, arrayIndex) => {
        if (arr.length) heap.push([arr[0], arrayIndex, 0]);
    });

    const result = [];

    while (heap.size()) {
        const [value, arrayIndex, elementIndex] = heap.pop();
        result.push(value);
        const nextIndex = elementIndex + 1;
        if (nextIndex < arrays[arrayIndex].length) {
            heap.push([arrays[arrayIndex][nextIndex], arrayIndex, nextIndex]);
        }
    }

    return result;
}

function slidingWindowMedian(arr, k) {
    const result = [];

    for (let i = 0; i + k <= arr.length; i++) {
        const window = arr.slice(i, i + k).sort((a, b) => a - b);
        const middle = Math.floor(k / 2);
        result.push(k % 2 ? window[middle] : (window[middle - 1] + window[middle]) / 2);
    }

    return result;
}

class DaryHeap {
    constructor(d = 3) {
        this.d = d;
        this.items = [];
    }

    push(value) {
        this.items.push(value);
        let i = this.items.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / this.d);
            if (this.items[parent] <= this.items[i]) break;
            [this.items[parent], this.items[i]] = [this.items[i], this.items[parent]];
            i = parent;
        }
    }

    pop() {
        if (!this.items.length) return undefined;
        const top = this.items[0];
        const last = this.items.pop();

        if (this.items.length) {
            this.items[0] = last;
            let i = 0;

            while (true) {
                let smallest = i;

                for (let child = 1; child <= this.d; child++) {
                    const index = this.d * i + child;
                    if (index < this.items.length && this.items[index] < this.items[smallest]) {
                        smallest = index;
                    }
                }

                if (smallest === i) break;
                [this.items[smallest], this.items[i]] = [this.items[i], this.items[smallest]];
                i = smallest;
            }
        }

        return top;
    }
}

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;

        for (const ch of word) {
            if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
            node = node.children.get(ch);
        }

        node.isEnd = true;
    }

    search(word) {
        let node = this.root;

        for (const ch of word) {
            if (!node.children.has(ch)) return false;
            node = node.children.get(ch);
        }

        return node.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;

        for (const ch of prefix) {
            if (!node.children.has(ch)) return false;
            node = node.children.get(ch);
        }

        return true;
    }

    collect(node, prefix, result) {
        if (node.isEnd) result.push(prefix);

        for (const [ch, child] of node.children) {
            this.collect(child, prefix + ch, result);
        }
    }

    autocomplete(prefix) {
        let node = this.root;

        for (const ch of prefix) {
            if (!node.children.has(ch)) return [];
            node = node.children.get(ch);
        }

        const result = [];
        this.collect(node, prefix, result);
        return result;
    }

    delete(word) {
        function remove(node, i) {
            if (i === word.length) {
                if (!node.isEnd) return false;
                node.isEnd = false;
                return node.children.size === 0;
            }

            const child = node.children.get(word[i]);
            if (!child) return false;
            const shouldDelete = remove(child, i + 1);
            if (shouldDelete) node.children.delete(word[i]);
            return node.children.size === 0 && !node.isEnd;
        }

        remove(this.root, 0);
    }

    searchWildcard(word) {
        function match(node, i) {
            if (!node) return false;
            if (i === word.length) return node.isEnd;
            if (word[i] === ".") {
                for (const child of node.children.values()) {
                    if (match(child, i + 1)) return true;
                }
                return false;
            }
            return match(node.children.get(word[i]), i + 1);
        }

        return match(this.root, 0);
    }
}

function maximumXorPair(arr) {
    const trie = new Trie();

    function insertBits(value) {
        let node = trie.root;

        for (let bit = 30; bit >= 0; bit--) {
            const b = (value >> bit) & 1;
            if (!node.children.has(b)) node.children.set(b, new TrieNode());
            node = node.children.get(b);
        }
    }

    function query(value) {
        let node = trie.root;
        let result = 0;

        for (let bit = 30; bit >= 0; bit--) {
            const b = (value >> bit) & 1;
            const wanted = 1 - b;

            if (node.children.has(wanted)) {
                result |= 1 << bit;
                node = node.children.get(wanted);
            } else {
                node = node.children.get(b);
            }
        }

        return result;
    }

    let best = 0;

    for (const value of arr) {
        insertBits(value);
        best = Math.max(best, query(value));
    }

    return best;
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const arr = inputArray(n);

    return `${topKFrequent(arr, k).join(" ")} ${maximumXorPair(arr)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
