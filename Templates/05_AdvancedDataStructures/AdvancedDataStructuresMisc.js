// Topic: ADVANCED DATA STRUCTURES
// Pattern: Randomized BST / Rope / Skip List / Probabilistic Filters
// Use Cases: Order statistics, implicit sequences, interval queries,
// spatial trees, membership filters, frequency sketches, link-cut trees.
//
// Example Problem: Treap Order Statistics and Bloom Filter Membership
// Source: Classic randomized treap and bloom filter exercise.
//
// node "AdvancedDataStructuresMisc.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class TreapNode {
    constructor(value) {
        this.value = value;
        this.priority = Math.random();
        this.left = null;
        this.right = null;
        this.size = 1;
    }
}

class Treap {
    size(node) {
        return node ? node.size : 0;
    }

    update(node) {
        if (node) node.size = 1 + this.size(node.left) + this.size(node.right);
    }

    split(node, value) {
        if (!node) return [null, null];

        if (node.value < value) {
            const [left, right] = this.split(node.right, value);
            node.right = left;
            this.update(node);
            return [node, right];
        }

        const [left, right] = this.split(node.left, value);
        node.left = right;
        this.update(node);
        return [left, node];
    }

    merge(a, b) {
        if (!a || !b) return a || b;

        if (a.priority > b.priority) {
            a.right = this.merge(a.right, b);
            this.update(a);
            return a;
        }

        b.left = this.merge(a, b.left);
        this.update(b);
        return b;
    }

    insert(root, value) {
        const [left, right] = this.split(root, value);
        return this.merge(this.merge(left, new TreapNode(value)), right);
    }

    inorder(node, result = []) {
        if (!node) return result;
        this.inorder(node.left, result);
        result.push(node.value);
        this.inorder(node.right, result);
        return result;
    }

    kth(node, k) {
        const leftSize = this.size(node.left);

        if (k === leftSize + 1) return node.value;
        if (k <= leftSize) return this.kth(node.left, k);
        return this.kth(node.right, k - leftSize - 1);
    }
}

class ImplicitTreapNode {
    constructor(value) {
        this.value = value;
        this.priority = Math.random();
        this.left = null;
        this.right = null;
        this.size = 1;
    }
}

class ImplicitTreap {
    size(node) {
        return node ? node.size : 0;
    }

    update(node) {
        if (node) node.size = 1 + this.size(node.left) + this.size(node.right);
    }

    split(node, count) {
        if (!node) return [null, null];

        if (this.size(node.left) >= count) {
            const [left, right] = this.split(node.left, count);
            node.left = right;
            this.update(node);
            return [left, node];
        }

        const [left, right] = this.split(node.right, count - this.size(node.left) - 1);
        node.right = left;
        this.update(node);
        return [node, right];
    }

    merge(a, b) {
        if (!a || !b) return a || b;

        if (a.priority > b.priority) {
            a.right = this.merge(a.right, b);
            this.update(a);
            return a;
        }

        b.left = this.merge(a, b.left);
        this.update(b);
        return b;
    }

    toArray(node, result = []) {
        if (!node) return result;
        this.toArray(node.left, result);
        result.push(node.value);
        this.toArray(node.right, result);
        return result;
    }
}

class Rope {
    constructor(text = "") {
        this.parts = text ? [text] : [];
    }

    append(text) {
        this.parts.push(text);
    }

    concat(other) {
        this.parts.push(...other.parts);
    }

    charAt(index) {
        let offset = index;

        for (const part of this.parts) {
            if (offset < part.length) return part[offset];
            offset -= part.length;
        }

        return "";
    }

    toString() {
        return this.parts.join("");
    }
}

class SkipListNode {
    constructor(value, level) {
        this.value = value;
        this.next = new Array(level).fill(null);
    }
}

class SkipList {
    constructor(maxLevel = 8) {
        this.maxLevel = maxLevel;
        this.head = new SkipListNode(-Infinity, maxLevel);
        this.level = 1;
        this.sizeValue = 0;
    }

    randomLevel() {
        let level = 1;
        while (Math.random() < 0.5 && level < this.maxLevel) level++;
        return level;
    }

    insert(value) {
        const update = new Array(this.maxLevel).fill(this.head);
        let current = this.head;

        for (let i = this.level - 1; i >= 0; i--) {
            while (current.next[i] && current.next[i].value < value) current = current.next[i];
            update[i] = current;
        }

        const level = this.randomLevel();
        if (level > this.level) {
            for (let i = this.level; i < level; i++) update[i] = this.head;
            this.level = level;
        }

        const node = new SkipListNode(value, level);
        for (let i = 0; i < level; i++) {
            node.next[i] = update[i].next[i];
            update[i].next[i] = node;
        }

        this.sizeValue++;
    }

    contains(value) {
        let current = this.head;

        for (let i = this.level - 1; i >= 0; i--) {
            while (current.next[i] && current.next[i].value < value) current = current.next[i];
        }

        current = current.next[0];
        return !!current && current.value === value;
    }
}

class IntervalTree {
    constructor(intervals) {
        this.intervals = intervals.slice().sort((a, b) => a[0] - b[0]);
    }

    overlapping(left, right) {
        return this.intervals.filter((interval) => interval[0] <= right && left <= interval[1]);
    }
}

class KDTree {
    constructor(points, depth = 0) {
        if (!points.length) {
            this.point = null;
            return;
        }

        const axis = depth % 2;
        const sorted = points.slice().sort((a, b) => a[axis] - b[axis]);
        const middle = Math.floor(sorted.length / 2);
        this.point = sorted[middle];
        this.left = new KDTree(sorted.slice(0, middle), depth + 1);
        this.right = new KDTree(sorted.slice(middle + 1), depth + 1);
    }

    nearest(target, best = null) {
        if (!this.point) return best;
        const distance = Math.hypot(this.point[0] - target[0], this.point[1] - target[1]);

        if (!best || distance < best.distance) best = { point: this.point, distance };

        const axis = target[0] < this.point[0] ? 0 : 1;
        const first = axis === 0 ? this.left : this.right;
        const second = axis === 0 ? this.right : this.left;
        best = first.nearest(target, best);

        if (second && second.point) {
            const splitDistance = Math.abs(target[axis] - this.point[axis]);
            if (splitDistance < best.distance) best = second.nearest(target, best);
        }

        return best;
    }
}

class Quadtree {
    constructor(boundary, capacity = 4) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    insert(point) {
        if (!this.contains(point)) return false;

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if (!this.divided) this.subdivide();
        return this.northWest.insert(point) || this.northEast.insert(point) ||
            this.southWest.insert(point) || this.southEast.insert(point);
    }

    contains(point) {
        return point[0] >= this.boundary[0] && point[0] <= this.boundary[2] &&
            point[1] >= this.boundary[1] && point[1] <= this.boundary[3];
    }

    subdivide() {
        const [x1, y1, x2, y2] = this.boundary;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        this.northWest = new Quadtree([x1, y1, mx, my], this.capacity);
        this.northEast = new Quadtree([mx, y1, x2, my], this.capacity);
        this.southWest = new Quadtree([x1, my, mx, y2], this.capacity);
        this.southEast = new Quadtree([mx, my, x2, y2], this.capacity);
        this.divided = true;
    }
}

class BloomFilter {
    constructor(size = 1024, hashCount = 3) {
        this.size = size;
        this.hashCount = hashCount;
        this.bits = new Uint8Array(size);
    }

    hash(value, seed) {
        let hash = seed;

        for (const ch of String(value)) {
            hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
        }

        return hash % this.size;
    }

    add(value) {
        for (let i = 0; i < this.hashCount; i++) {
            this.bits[this.hash(value, i + 7)] = 1;
        }
    }

    has(value) {
        for (let i = 0; i < this.hashCount; i++) {
            if (!this.bits[this.hash(value, i + 7)]) return false;
        }

        return true;
    }
}

class CountMinSketch {
    constructor(width = 64, depth = 4) {
        this.width = width;
        this.depth = depth;
        this.table = Array.from({ length: depth }, () => new Array(width).fill(0));
    }

    hash(value, seed) {
        let hash = seed;

        for (const ch of String(value)) {
            hash = (hash * 37 + ch.charCodeAt(0)) >>> 0;
        }

        return hash % this.width;
    }

    add(value, count = 1) {
        for (let i = 0; i < this.depth; i++) {
            this.table[i][this.hash(value, i + 11)] += count;
        }
    }

    estimate(value) {
        let best = Infinity;

        for (let i = 0; i < this.depth; i++) {
            best = Math.min(best, this.table[i][this.hash(value, i + 11)]);
        }

        return best;
    }
}

class HyperLogLog {
    constructor(bits = 10) {
        this.bits = bits;
        this.registers = new Array(1 << bits).fill(0);
    }

    hash(value) {
        let hash = 2166136261;

        for (const ch of String(value)) {
            hash ^= ch.charCodeAt(0);
            hash = Math.imul(hash, 16777619);
        }

        return hash >>> 0;
    }

    add(value) {
        const hash = this.hash(value);
        const index = hash >>> (32 - this.bits);
        const remaining = hash & ((1 << (32 - this.bits)) - 1);
        const rank = remaining === 0 ? 32 : Math.clz32(remaining) + 1;
        this.registers[index] = Math.max(this.registers[index], rank);
    }

    estimate() {
        const m = this.registers.length;
        const sum = this.registers.reduce((total, value) => total + 2 ** -value, 0);
        const alpha = 0.7213 / (1 + 1.079 / m);
        return Math.round(alpha * m * m / sum);
    }
}

class LinkCutTree {
    constructor(n) {
        this.parent = new Array(n + 1).fill(0);
        this.left = new Array(n + 1).fill(0);
        this.right = new Array(n + 1).fill(0);
        this.value = new Array(n + 1).fill(0);
        this.sum = new Array(n + 1).fill(0);
    }

    isRoot(x) {
        return !this.parent[x] ||
            (this.left[this.parent[x]] !== x && this.right[this.parent[x]] !== x);
    }

    update(x) {
        this.sum[x] = this.sum[this.left[x]] + this.sum[this.right[x]] + this.value[x];
    }

    rotate(x) {
        const p = this.parent[x];
        const g = this.parent[p];

        if (!this.isRoot(p)) {
            if (this.left[g] === p) this.left[g] = x;
            else this.right[g] = x;
        }

        this.parent[x] = g;

        if (this.left[p] === x) {
            this.left[p] = this.right[x];
            if (this.right[x]) this.parent[this.right[x]] = p;
            this.right[x] = p;
        } else {
            this.right[p] = this.left[x];
            if (this.left[x]) this.parent[this.left[x]] = p;
            this.left[x] = p;
        }

        this.parent[p] = x;
        this.update(p);
        this.update(x);
    }

    splay(x) {
        while (!this.isRoot(x)) {
            const p = this.parent[x];
            const g = this.parent[p];

            if (!this.isRoot(p)) {
                if ((this.left[p] === x) === (this.left[g] === p)) this.rotate(p);
                else this.rotate(x);
            }

            this.rotate(x);
        }
    }

    access(x) {
        let last = 0;

        for (let y = x; y; y = this.parent[y]) {
            this.splay(y);
            this.right[y] = last;
            this.update(y);
            last = y;
        }

        this.splay(x);
    }

    link(x, y) {
        this.access(x);
        this.parent[x] = y;
    }

    pathSum(x, y) {
        this.access(x);
        this.access(y);
        return this.sum[x];
    }
}

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);
    const treap = new Treap();
    let root = null;

    for (const value of arr) root = treap.insert(root, value);

    const bloom = new BloomFilter();
    for (const value of arr) bloom.add(value);

    return `${treap.inorder(root).join(" ")} ${treap.kth(root, 2)} ${bloom.has(arr[0])}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
