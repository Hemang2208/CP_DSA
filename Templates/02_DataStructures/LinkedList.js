// Topic: LINKED LIST
// Pattern: Singly Linked List / Pointer Reversal
// Use Cases: Reversal, insertion and deletion by position, searching,
// cycle detection, merge sorted lists, middle node, LRU cache.
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
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const node = new ListNode(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
    }

    prepend(value) {
        const node = new ListNode(value);
        node.next = this.head;
        this.head = node;

        if (!this.tail) this.tail = node;
        this.length++;
    }

    insertAt(position, value) {
        if (position <= 0) {
            this.prepend(value);
            return true;
        }

        if (position >= this.length) {
            this.append(value);
            return true;
        }

        let previous = this.head;

        for (let i = 0; i < position - 1; i++) {
            previous = previous.next;
        }

        const node = new ListNode(value);
        node.next = previous.next;
        previous.next = node;
        this.length++;

        return true;
    }

    deleteAt(position) {
        if (position < 0 || position >= this.length) return null;

        let removed;

        if (position === 0) {
            removed = this.head;
            this.head = this.head.next;

            if (this.length === 1) this.tail = null;
        } else {
            let previous = this.head;

            for (let i = 0; i < position - 1; i++) {
                previous = previous.next;
            }

            removed = previous.next;
            previous.next = removed.next;

            if (removed === this.tail) this.tail = previous;
        }

        this.length--;
        return removed.value;
    }

    deleteValue(value) {
        let previous = null;
        let current = this.head;

        while (current) {
            if (current.value === value) {
                if (previous) previous.next = current.next;
                else this.head = current.next;

                if (current === this.tail) this.tail = previous;
                this.length--;
                return true;
            }

            previous = current;
            current = current.next;
        }

        return false;
    }

    search(value) {
        let current = this.head;

        for (let i = 0; current; i++) {
            if (current.value === value) return i;
            current = current.next;
        }

        return -1;
    }

    reverse() {
        let previous = null;
        let current = this.head;

        while (current) {
            const next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        this.tail = this.head;
        this.head = previous;
    }

    toArray() {
        const result = [];
        let current = this.head;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }
}

// Approach: walk forward while re-pointing every next pointer to the
// previous node. Three pointers (previous, current, next) are enough.
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
