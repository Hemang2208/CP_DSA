// Topic: ALGORITHM ANALYSIS AND THEORETICAL MODELS
// Pattern: Master Theorem / Amortized Analysis / Approximation / Lower Bounds
// Use Cases: Recurrence classification, dynamic-array cost, potential
// method, randomized analysis, approximation guarantees, reductions.
//
// Example Problem: Dynamic Array Copies And Master Theorem Case
// Source: Classic amortized analysis and recurrence classification.
//
// node "AnalysisTheoryModels.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function masterTheorem(a, b, fPower) {
    const critical = Math.log(a) / Math.log(b);

    if (fPower < critical - 1e-9) {
        return fPower === 0 ? "log n" : `n^${fPower}`;
    }

    if (Math.abs(fPower - critical) < 1e-9) {
        return fPower === 1 ? "n log n" : `n^${fPower} log n`;
    }

    const exponent = Number(critical.toFixed(6));
    return exponent === 1 ? "n" : `n^${exponent}`;
}

function amortizedDynamicArray(n) {
    let size = 0;
    let capacity = 1;
    let copies = 0;

    for (let i = 0; i < n; i++) {
        if (size === capacity) {
            copies += capacity;
            capacity *= 2;
        }
        size++;
    }

    const amortized = n === 0 ? 0 : copies / n;
    return { copies, amortized: Number(amortized.toFixed(6)) };
}

function potentialStack(n) {
    const stack = [];
    let pushCost = 0;
    let popCost = 0;

    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            stack.push(i);
            pushCost++;
        } else if (stack.length) {
            stack.pop();
            popCost++;
        }
    }

    return { pushCost, popCost, potential: stack.length };
}

function binarySearchLowerBound(array, target) {
    let left = 0;
    let right = array.length;

    while (left < right) {
        const middle = Math.floor((left + right) / 2);
        if (array[middle] < target) left = middle + 1;
        else right = middle;
    }

    return left;
}

function twoApproxVertexCover(edges) {
    const selected = new Set();

    for (const [u, v] of edges) {
        if (!selected.has(u) && !selected.has(v)) {
            selected.add(u);
            selected.add(v);
        }
    }

    return [...selected];
}

function expectedQuickSortComparisons(n) {
    let harmonic = 0;

    for (let i = 1; i <= n; i++) harmonic += 1 / i;

    return 2 * n * harmonic;
}

function adversarialLowerBound(sortedArray) {
    let comparisons = 0;
    const target = sortedArray[Math.floor(sortedArray.length / 2)];

    function lowerBound(left, right) {
        while (left < right) {
            comparisons++;
            const middle = Math.floor((left + right) / 2);
            if (sortedArray[middle] < target) left = middle + 1;
            else right = middle;
        }

        return left;
    }

    return { index: lowerBound(0, sortedArray.length), comparisons };
}

function npReductionWitness(graph) {
    return {
        model: "3-SAT to independent set",
        mapping: graph.map((edges, node) => [node, edges.length]),
    };
}

function solve() {
    const n = Number(input[index++]);
    const a = Number(input[index++]);
    const b = Number(input[index++]);
    const fPower = Number(input[index++]);
    const dynamicArray = amortizedDynamicArray(n);

    return `${dynamicArray.copies} ${dynamicArray.amortized} ${masterTheorem(a, b, fPower)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
