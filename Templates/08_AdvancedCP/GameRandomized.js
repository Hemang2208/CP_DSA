// Topic: GAME THEORY AND RANDOMIZED ALGORITHMS
// Pattern: Nim / Grundy / Minimax / Randomized Data Structures
// Use Cases: Impartial games, alpha-beta pruning, treaps, reservoir
// sampling, randomized quickselect, Las Vegas algorithms.
//
// Example Problem: Standard Nim Winner
// Source: Classic Nim XOR criterion.
//
// node "GameRandomized.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function nimWinner(piles) {
    let xor = 0;
    for (const pile of piles) xor ^= pile;
    return xor !== 0;
}

function misereNimWinner(piles) {
    const allOnes = piles.every((pile) => pile === 1);
    let xor = 0;

    for (const pile of piles) xor ^= pile;

    if (allOnes) return piles.length % 2 === 0;
    return xor !== 0;
}

function grundyNumber(state, moves, memo = new Map()) {
    if (memo.has(state)) return memo.get(state);

    const reachable = new Set();

    for (const next of moves(state)) {
        reachable.add(grundyNumber(next, moves, memo));
    }

    let mex = 0;
    while (reachable.has(mex)) mex++;

    memo.set(state, mex);
    return mex;
}

function minimax(state, depth, maximizing, getMoves, evaluate, alpha = -Infinity, beta = Infinity) {
    const moves = getMoves(state);

    if (depth === 0 || moves.length === 0) return evaluate(state);

    if (maximizing) {
        let best = -Infinity;

        for (const next of moves) {
            best = Math.max(best, minimax(next, depth - 1, false, getMoves, evaluate, alpha, beta));
            alpha = Math.max(alpha, best);
            if (beta <= alpha) break;
        }

        return best;
    }

    let best = Infinity;

    for (const next of moves) {
        best = Math.min(best, minimax(next, depth - 1, true, getMoves, evaluate, alpha, beta));
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
    }

    return best;
}

class TreapNode {
    constructor(key) {
        this.key = key;
        this.priority = Math.random();
        this.left = null;
        this.right = null;
        this.size = 1;
    }
}

class Treap {
    constructor() {
        this.root = null;
    }

    size(node) {
        return node ? node.size : 0;
    }

    update(node) {
        if (node) node.size = 1 + this.size(node.left) + this.size(node.right);
    }

    split(node, key) {
        if (!node) return [null, null];

        if (node.key < key) {
            const [left, right] = this.split(node.right, key);
            node.right = left;
            this.update(node);
            return [node, right];
        }

        const [left, right] = this.split(node.left, key);
        node.left = right;
        this.update(node);
        return [left, node];
    }

    merge(left, right) {
        if (!left || !right) return left || right;

        if (left.priority > right.priority) {
            left.right = this.merge(left.right, right);
            this.update(left);
            return left;
        }

        right.left = this.merge(left, right.left);
        this.update(right);
        return right;
    }

    insert(key) {
        const [left, right] = this.split(this.root, key);
        this.root = this.merge(this.merge(left, new TreapNode(key)), right);
    }

    erase(key) {
        const [left, middle] = this.split(this.root, key);
        const [, right] = this.split(middle, key + 1);
        this.root = this.merge(left, right);
    }

    kth(node, k) {
        const leftSize = this.size(node.left);

        if (k === leftSize + 1) return node.key;
        if (k <= leftSize) return this.kth(node.left, k);
        return this.kth(node.right, k - leftSize - 1);
    }
}

function reservoirSample(values, k) {
    const sample = values.slice(0, k);

    for (let i = k; i < values.length; i++) {
        const position = Math.floor(Math.random() * (i + 1));
        if (position < k) sample[position] = values[i];
    }

    return sample;
}

function randomizedQuickselect(values, k) {
    const arr = values.slice();

    function select(left, right) {
        if (left === right) return arr[left];

        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
        const pivot = arr[right];
        let store = left;

        for (let i = left; i < right; i++) {
            if (arr[i] < pivot) {
                [arr[store], arr[i]] = [arr[i], arr[store]];
                store++;
            }
        }

        [arr[store], arr[right]] = [arr[right], arr[store]];

        if (store === k) return arr[store];
        if (k < store) return select(left, store - 1);
        return select(store + 1, right);
    }

    return select(0, arr.length - 1);
}

function randomShuffle(values) {
    const arr = values.slice();

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function solve() {
    const n = Number(input[index++]);
    const piles = [];

    for (let i = 0; i < n; i++) piles.push(Number(input[index++]));

    return nimWinner(piles) ? "first" : "second";
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
