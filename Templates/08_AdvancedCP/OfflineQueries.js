// Topic: OFFLINE QUERIES
// Pattern: Sort by Right Endpoint + Fenwick Tree
// Use Cases: Distinct values in range, counting active intervals,
// queries processed in a favorable order, sweep line counting.
//
// Example Problem: Number of Distinct Values in a Range
// Source: Classic offline Fenwick tree problem.
//
// node "OfflineQueries.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

// Approach: sweep the right endpoint. Keep a Fenwick tree with 1 at the
// latest occurrence of each value. A range distinct query is then the
// number of latest occurrences inside that range.
function distinctQueries(arr, queries, n) {
    const order = queries.map(([left, right], index) => ({
        left,
        right,
        index,
    }));

    order.sort((a, b) => a.right - b.right);

    const tree = new Array(n + 1).fill(0);
    const answers = new Array(queries.length).fill(0);
    const lastOccurrence = new Map();
    let pointer = 0;

    function add(position, delta) {
        while (position <= n) {
            tree[position] += delta;
            position += position & -position;
        }
    }

    function prefixSum(position) {
        let sum = 0;

        while (position > 0) {
            sum += tree[position];
            position -= position & -position;
        }

        return sum;
    }

    for (const query of order) {
        while (pointer < query.right) {
            pointer++;
            const value = arr[pointer - 1];

            if (lastOccurrence.has(value)) {
                add(lastOccurrence.get(value), -1);
            }

            add(pointer, 1);
            lastOccurrence.set(value, pointer);
        }

        answers[query.index] =
            prefixSum(query.right) - prefixSum(query.left - 1);
    }

    return answers.join(" ");
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const arr = inputArray(n);
    const queries = [];

    for (let i = 0; i < q; i++) {
        const left = Number(input[index++]);
        const right = Number(input[index++]);
        queries.push([left, right]);
    }

    return distinctQueries(arr, queries, n);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
