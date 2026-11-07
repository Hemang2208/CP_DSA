// Topic: MO'S ALGORITHM
// Pattern: Offline Range Queries With Block Ordering
// Use Cases: Range distinct count, range frequency queries, range
// sum of frequencies, static-array offline queries.
//
// Example Problem: Number of Distinct Values in a Range
// Source: Classic Mo's algorithm problem.
//
// node "MoAlgorithm.js" < "Input.txt" > "Output.txt"

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

// Approach: sort queries by left block and alternate right direction.
// Moving the window by one position is O(1), giving about O((n + q) sqrt n).
function distinctQueries(arr, queries, n) {
    const values = Array.from(new Set(arr)).sort((a, b) => a - b);
    const rankMap = new Map();

    for (let i = 0; i < values.length; i++) {
        rankMap.set(values[i], i);
    }

    const rank = arr.map((value) => rankMap.get(value));
    const block = Math.max(1, Math.floor(Math.sqrt(n)));
    const order = queries.map(([left, right], index) => ({
        left: left - 1,
        right: right - 1,
        index,
    }));

    order.sort((a, b) => {
        const blockA = Math.floor(a.left / block);
        const blockB = Math.floor(b.left / block);

        if (blockA !== blockB) {
            return blockA - blockB;
        }

        return blockA % 2 === 0 ? (a.right - b.right) : (b.right - a.right);
    });

    const frequency = new Array(values.length).fill(0);
    const answers = new Array(queries.length).fill(0);
    let currentLeft = 0;
    let currentRight = -1;
    let distinct = 0;

    function add(position) {
        const value = rank[position];

        if (frequency[value] === 0) {
            distinct++;
        }

        frequency[value]++;
    }

    function remove(position) {
        const value = rank[position];
        frequency[value]--;

        if (frequency[value] === 0) {
            distinct--;
        }
    }

    for (const query of order) {
        while (currentLeft > query.left) {
            add(--currentLeft);
        }

        while (currentRight < query.right) {
            add(++currentRight);
        }

        while (currentLeft < query.left) {
            remove(currentLeft++);
        }

        while (currentRight > query.right) {
            remove(currentRight--);
        }

        answers[query.index] = distinct;
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
