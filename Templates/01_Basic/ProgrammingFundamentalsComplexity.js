// Topic: PROGRAMMING FUNDAMENTALS AND COMPLEXITY ANALYSIS
// Pattern: Language Basics / Operation Counting / Asymptotic Growth
// Use Cases: Type checks, overflow safety, loop analysis, recurrence
// classification, amortized reasoning, constraint-to-complexity mapping.
//
// Example Problem: Count Basic Operations and Classify a Recurrence
// Source: Classic complexity analysis exercise.
//
// node "ProgrammingFundamentalsComplexity.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function isPrimitive(value) {
    return value === null || (typeof value !== "object" && typeof value !== "function");
}

function safeAdd(a, b) {
    const result = a + b;
    return Number.isSafeInteger(result) ? result : null;
}

function loopOperations(n) {
    let count = 0;

    for (let i = 0; i < n; i++) {
        count++;
    }

    return count;
}

function nestedLoopOperations(n) {
    let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            count++;
        }
    }

    return count;
}

function logarithmicOperations(n) {
    let count = 0;

    for (let step = 1; step < n; step *= 2) {
        count++;
    }

    return count;
}

function recursionTreeOperations(n, branching, shrink) {
    if (n <= 1) {
        return 1;
    }

    return branching * recursionTreeOperations(Math.floor(n / shrink), branching, shrink);
}

// Solves T(n) = a * T(n / b) + O(n^p) using the Master Theorem.
function masterTheorem(a, b, p) {
    const critical = Math.log(a) / Math.log(b);

    if (p < critical - 1e-9) {
        return `O(n^${critical.toFixed(2)})`;
    }

    if (Math.abs(p - critical) <= 1e-9) {
        return `O(n^${critical.toFixed(2)} log n)`;
    }

    return `O(n^${p})`;
}

function amortizedDynamicArray(pushes) {
    let capacity = 1;
    let copies = 0;

    for (let i = 0; i < pushes; i++) {
        if (i === capacity) {
            copies += capacity;
            capacity *= 2;
        }
    }

    return copies;
}

function solve() {
    const n = Number(input[index++]);

    return [
        loopOperations(n),
        nestedLoopOperations(n),
        logarithmicOperations(n),
        masterTheorem(2, 2, 1),
        amortizedDynamicArray(n),
        safeAdd(n, Number.MAX_SAFE_INTEGER) === null,
        isPrimitive(n),
    ].join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
