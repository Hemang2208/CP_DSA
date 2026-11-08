// Topic: LINKED LIST ALGORITHMS
// Pattern: Pointer Rewiring / Fast and Slow Pointers
// Use Cases: Reversal, middle node, cycle detection, merge, palindrome,
// remove nth from end, reverse in K groups, add numbers.
//
// Example Problem: Reverse, Middle, Palindrome and Sort a Linked List
// Source: Classic linked list problems (LeetCode 206 / 876 / 234 / 148).
//
// node "LinkedListAlgorithms.js" < "Input.txt" > "Output.txt"

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

function buildList(arr) {
    const dummy = new ListNode(0);
    let tail = dummy;

    for (const value of arr) {
        tail.next = new ListNode(value);
        tail = tail.next;
    }

    return dummy.next;
}

function toArray(head) {
    const result = [];

    while (head) {
        result.push(head.value);
        head = head.next;
    }

    return result;
}

function reverseList(head) {
    let previous = null;

    while (head) {
        const next = head.next;
        head.next = previous;
        previous = head;
        head = next;
    }

    return previous;
}

function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }

    return false;
}

function cycleStart(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            let pointer = head;

            while (pointer !== slow) {
                pointer = pointer.next;
                slow = slow.next;
            }

            return pointer;
        }
    }

    return null;
}

function removeCycle(head) {
    const start = cycleStart(head);
    if (!start) return head;

    let pointer = start;

    while (pointer.next !== start) pointer = pointer.next;
    pointer.next = null;

    return head;
}

function nthFromEnd(head, n) {
    let slow = head;
    let fast = head;

    for (let i = 0; i < n; i++) {
        if (!fast) return null;
        fast = fast.next;
    }

    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;

    for (let i = 0; i <= n; i++) fast = fast.next;

    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
}

function mergeSorted(a, b) {
    const dummy = new ListNode(0);
    let tail = dummy;

    while (a && b) {
        if (a.value <= b.value) {
            tail.next = a;
            a = a.next;
        } else {
            tail.next = b;
            b = b.next;
        }

        tail = tail.next;
    }

    tail.next = a || b;
    return dummy.next;
}

function sortList(head) {
    if (!head || !head.next) return head;

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    const second = slow.next;
    slow.next = null;

    return mergeSorted(sortList(head), sortList(second));
}

function isPalindromeList(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let left = head;
    let right = reverseList(slow);

    while (right) {
        if (left.value !== right.value) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}

function reverseKGroup(head, k) {
    let node = head;
    let count = 0;

    while (node && count < k) {
        node = node.next;
        count++;
    }

    if (count < k) return head;

    let previous = null;
    let current = head;

    for (let i = 0; i < k; i++) {
        const next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }

    head.next = reverseKGroup(current, k);
    return previous;
}

function rotateRight(head, k) {
    const values = toArray(head);
    if (!values.length) return null;
    k %= values.length;
    const rotated = values.slice(-k).concat(values.slice(0, -k));
    return buildList(rotated);
}

function addTwoNumbers(a, b) {
    const dummy = new ListNode(0);
    let tail = dummy;
    let carry = 0;

    while (a || b || carry) {
        const sum = (a ? a.value : 0) + (b ? b.value : 0) + carry;
        tail.next = new ListNode(sum % 10);
        tail = tail.next;
        carry = Math.floor(sum / 10);
        a = a ? a.next : null;
        b = b ? b.next : null;
    }

    return dummy.next;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);
    const head = buildList(arr);
    const reversed = toArray(reverseList(buildList(arr)));
    const middle = middleNode(head).value;
    const palindrome = isPalindromeList(head);
    const sorted = toArray(sortList(buildList(arr)));

    return `${reversed.join(" ")}\n${middle}\n${palindrome}\n${sorted.join(" ")}`;
}

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
