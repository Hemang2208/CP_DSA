// Topic: BINARY TREES AND BALANCED TREES
// Pattern: Traversal / Tree DP / BST Ordering / AVL Rotations
// Use Cases: Views, diameter, width, path sum, LCA, serialization,
// balanced checks, AVL insert/delete, kth smallest, floor and ceiling.
//
// Example Problem: Inorder, Height, Diameter and AVL Insertion
// Source: Classic binary tree and AVL exercises.
//
// node "BinaryTreeAlgorithms.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function buildTree(values) {
    if (!values.length || values[0] === -1) return null;

    const root = new TreeNode(values[0]);
    const queue = [root];
    let i = 1;

    while (queue.length && i < values.length) {
        const node = queue.shift();

        if (i < values.length && values[i] !== -1) {
            node.left = new TreeNode(values[i]);
            queue.push(node.left);
        }
        i++;

        if (i < values.length && values[i] !== -1) {
            node.right = new TreeNode(values[i]);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

function inorder(node, result = []) {
    if (!node) return result;
    inorder(node.left, result);
    result.push(node.value);
    inorder(node.right, result);
    return result;
}

function preorder(node, result = []) {
    if (!node) return result;
    result.push(node.value);
    preorder(node.left, result);
    preorder(node.right, result);
    return result;
}

function postorder(node, result = []) {
    if (!node) return result;
    postorder(node.left, result);
    postorder(node.right, result);
    result.push(node.value);
    return result;
}

function levelOrder(node) {
    if (!node) return [];
    const result = [];
    const queue = [node];

    while (queue.length) {
        const level = [];
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const current = queue.shift();
            level.push(current.value);
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }

        result.push(level);
    }

    return result;
}

function zigzagOrder(node) {
    return levelOrder(node).map((level, i) => (i % 2 ? level.reverse() : level));
}

function verticalOrder(node) {
    const columns = new Map();
    const queue = [[node, 0]];

    while (queue.length) {
        const [current, column] = queue.shift();
        if (!current) continue;
        if (!columns.has(column)) columns.set(column, []);
        columns.get(column).push(current.value);
        queue.push([current.left, column - 1]);
        queue.push([current.right, column + 1]);
    }

    return [...columns.keys()].sort((a, b) => a - b).map((key) => columns.get(key));
}

function height(node) {
    if (!node) return -1;
    return 1 + Math.max(height(node.left), height(node.right));
}

function diameter(node) {
    let best = 0;

    function depth(current) {
        if (!current) return -1;
        const left = depth(current.left);
        const right = depth(current.right);
        best = Math.max(best, left + right + 2);
        return 1 + Math.max(left, right);
    }

    depth(node);
    return best;
}

function width(node) {
    if (!node) return 0;
    const queue = [[node, 0]];
    let best = 0;

    while (queue.length) {
        const size = queue.length;
        let first = Infinity;
        let last = -Infinity;

        for (let i = 0; i < size; i++) {
            const [current, position] = queue.shift();
            first = Math.min(first, position);
            last = Math.max(last, position);
            if (current.left) queue.push([current.left, position * 2]);
            if (current.right) queue.push([current.right, position * 2 + 1]);
        }

        best = Math.max(best, last - first + 1);
    }

    return best;
}

function maxPathSum(node) {
    let best = -Infinity;

    function gain(current) {
        if (!current) return 0;
        const left = Math.max(0, gain(current.left));
        const right = Math.max(0, gain(current.right));
        best = Math.max(best, current.value + left + right);
        return current.value + Math.max(left, right);
    }

    gain(node);
    return best;
}

function isBalanced(node) {
    function check(current) {
        if (!current) return 0;
        const left = check(current.left);
        if (left === -1) return -1;
        const right = check(current.right);
        if (right === -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }

    return check(node) !== -1;
}

function isSymmetric(node) {
    function mirror(a, b) {
        if (!a && !b) return true;
        if (!a || !b || a.value !== b.value) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);
    }

    return !node || mirror(node.left, node.right);
}

function isIdentical(a, b) {
    if (!a && !b) return true;
    if (!a || !b || a.value !== b.value) return false;
    return isIdentical(a.left, b.left) && isIdentical(a.right, b.right);
}

function invertTree(node) {
    if (!node) return null;
    [node.left, node.right] = [invertTree(node.right), invertTree(node.left)];
    return node;
}

function lowestCommonAncestor(root, a, b) {
    if (!root || root.value === a || root.value === b) return root;
    const left = lowestCommonAncestor(root.left, a, b);
    const right = lowestCommonAncestor(root.right, a, b);
    if (left && right) return root;
    return left || right;
}

function nodesAtDistanceK(root, target, k) {
    const parent = new Map();

    function build(current, previous) {
        if (!current) return;
        parent.set(current, previous);
        build(current.left, current);
        build(current.right, current);
    }

    build(root, null);
    let targetNode = null;

    function find(current) {
        if (!current) return;
        if (current.value === target) targetNode = current;
        find(current.left);
        find(current.right);
    }

    find(root);
    const seen = new Set([targetNode]);
    let frontier = [targetNode];

    for (let distance = 0; distance < k; distance++) {
        const next = [];

        for (const node of frontier) {
            for (const neighbour of [node.left, node.right, parent.get(node)]) {
                if (neighbour && !seen.has(neighbour)) {
                    seen.add(neighbour);
                    next.push(neighbour);
                }
            }
        }

        frontier = next;
    }

    return frontier.map((node) => node.value);
}

function serialize(node) {
    if (!node) return "#";
    return `${node.value},${serialize(node.left)},${serialize(node.right)}`;
}

function deserialize(data) {
    const tokens = data.split(",");
    let cursor = 0;

    function build() {
        const token = tokens[cursor++];
        if (token === "#") return null;
        const node = new TreeNode(Number(token));
        node.left = build();
        node.right = build();
        return node;
    }

    return build();
}

function buildFromPreorderInorder(preorder, inorderValues) {
    if (!preorder.length) return null;
    const root = new TreeNode(preorder[0]);
    const middle = inorderValues.indexOf(preorder[0]);
    root.left = buildFromPreorderInorder(preorder.slice(1, middle + 1), inorderValues.slice(0, middle));
    root.right = buildFromPreorderInorder(preorder.slice(middle + 1), inorderValues.slice(middle + 1));
    return root;
}

class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    height(node) {
        return node ? node.height : 0;
    }

    balance(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    rotateRight(y) {
        const x = y.left;
        const middle = x.right;
        x.right = y;
        y.left = middle;
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const middle = y.left;
        y.left = x;
        x.right = middle;
        x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
        y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
        return y;
    }

    insert(node, value) {
        if (!node) return new AVLNode(value);
        if (value < node.value) node.left = this.insert(node.left, value);
        else if (value > node.value) node.right = this.insert(node.right, value);
        else return node;

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.balance(node);

        if (balance > 1 && value < node.left.value) return this.rotateRight(node);
        if (balance < -1 && value > node.right.value) return this.rotateLeft(node);
        if (balance > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    min(node) {
        while (node.left) node = node.left;
        return node;
    }

    delete(node, value) {
        if (!node) return null;
        if (value < node.value) node.left = this.delete(node.left, value);
        else if (value > node.value) node.right = this.delete(node.right, value);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            const successor = this.min(node.right);
            node.value = successor.value;
            node.right = this.delete(node.right, successor.value);
        }

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.balance(node);

        if (balance > 1 && this.balance(node.left) >= 0) return this.rotateRight(node);
        if (balance > 1 && this.balance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && this.balance(node.right) <= 0) return this.rotateLeft(node);
        if (balance < -1 && this.balance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
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
    const values = inputArray(n);
    const root = buildTree(values);
    const avl = new AVLTree();
    let avlRoot = null;

    for (const value of values) {
        if (value !== -1) avlRoot = avl.insert(avlRoot, value);
    }

    return `${inorder(root).join(" ")}\n${height(root)} ${diameter(root)} ${width(root)}\n${inorder(avlRoot).join(" ")} ${height(avlRoot)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
