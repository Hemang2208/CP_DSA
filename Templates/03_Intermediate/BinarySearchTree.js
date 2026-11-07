// Topic: BINARY SEARCH TREE
// Pattern: Ordered Binary Tree
// Use Cases: Ordered insert/search/delete, floor and ceiling,
// kth smallest, range queries, BST iterators.
//
// Example Problem: Insert Values and Answer Search Queries
// Source: Standard BST problem.
//
// node "BinarySearchTree.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        const node = new TreeNode(val);

        if (!this.root) {
            this.root = node;
            return;
        }

        let current = this.root;

        while (true) {
            if (val === current.val) {
                return;
            }

            if (val < current.val) {
                if (!current.left) {
                    current.left = node;
                    return;
                }

                current = current.left;
            } else {
                if (!current.right) {
                    current.right = node;
                    return;
                }

                current = current.right;
            }
        }
    }

    search(val) {
        let current = this.root;

        while (current) {
            if (val === current.val) {
                return true;
            }

            current = val < current.val ? current.left : current.right;
        }

        return false;
    }
}

function solve() {
    const n = Number(input[index++]);
    const tree = new BinarySearchTree();

    for (let i = 0; i < n; i++) {
        tree.insert(Number(input[index++]));
    }

    const q = Number(input[index++]);
    const answers = [];

    for (let i = 0; i < q; i++) {
        answers.push(tree.search(Number(input[index++])) ? 1 : 0);
    }

    return answers.join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
