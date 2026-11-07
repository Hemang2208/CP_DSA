// Topic: LINKED LIST
// Pattern: Singly Linked List / Pointer Reversal
// Use Cases: Reversal, cycle detection, merge sorted lists,
// middle node, LRU cache, constant-time insert/delete with nodes.
//
// Example Problem: Reverse a Singly Linked List
// Source: Standard linked list problem (LeetCode 206 / classic CP).
//
// node "LinkedList.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(val) {
        const node = new ListNode(val);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
    }

    reverse() {
        let prev = null;
        let current = this.head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.tail = this.head;
        this.head = prev;
    }

    toArray() {
        const result = [];
        let current = this.head;

        while (current) {
            result.push(current.val);
            current = current.next;
        }

        return result;
    }
}

// Approach: walk forward while re-pointing every next pointer to the
// previous node. Three pointers (prev, current, next) are enough.
function solve() {
    const n = Number(input[index++]);
    const list = new LinkedList();

    for (let i = 0; i < n; i++) {
        list.append(Number(input[index++]));
    }

    list.reverse();

    return list.toArray().join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
