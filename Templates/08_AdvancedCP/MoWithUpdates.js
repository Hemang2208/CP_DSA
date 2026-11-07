// Topic: MO'S ALGORITHM WITH UPDATES
// Pattern: 3D Mo Ordering (Left Block, Right Block, Time)
// Use Cases: Range distinct count with point updates, dynamic offline
// range queries, frequency queries with modifications.
//
// Example Problem: Distinct Values in a Range With Point Updates
// Source: Classic Mo's algorithm with modifications problem.
//
// node "MoWithUpdates.js" < "Input.txt" > "Output.txt"

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

// Approach: queries are sorted by left block, right block, then time.
// Time moves by applying or rolling back updates. A point update only
// changes the answer when its position is inside the current window.
function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const arr = inputArray(n);
    const operations = [];
    const changedValues = [];

    for (let i = 0; i < q; i++) {
        const type = Number(input[index++]);

        if (type === 1) {
            const position = Number(input[index++]) - 1;
            const value = Number(input[index++]);
            operations.push({ type, position, value });
            changedValues.push(value);
        } else {
            const left = Number(input[index++]) - 1;
            const right = Number(input[index++]) - 1;
            operations.push({ type, left, right });
        }
    }

    const values = Array.from(new Set(arr.concat(changedValues))).sort(
        (a, b) => a - b
    );
    const rankMap = new Map();

    for (let i = 0; i < values.length; i++) {
        rankMap.set(values[i], i);
    }

    const initialRank = arr.map((value) => rankMap.get(value));
    const currentRank = initialRank.slice();
    const temporary = arr.slice();
    const updates = [];
    const queries = [];

    for (const operation of operations) {
        if (operation.type === 1) {
            const oldRank = rankMap.get(temporary[operation.position]);
            const newRank = rankMap.get(operation.value);
            updates.push({
                position: operation.position,
                oldRank,
                newRank,
            });
            temporary[operation.position] = operation.value;
        } else {
            queries.push({
                left: operation.left,
                right: operation.right,
                time: updates.length,
                index: queries.length,
            });
        }
    }

    const block = Math.max(1, Math.floor(Math.pow(n, 2 / 3)));

    queries.sort((a, b) => {
        const leftA = Math.floor(a.left / block);
        const leftB = Math.floor(b.left / block);

        if (leftA !== leftB) {
            return leftA - leftB;
        }

        const rightA = Math.floor(a.right / block);
        const rightB = Math.floor(b.right / block);

        if (rightA !== rightB) {
            return rightA - rightB;
        }

        return rightA % 2 === 0 ? a.time - b.time : b.time - a.time;
    });

    const frequency = new Array(values.length).fill(0);
    const answers = new Array(queries.length).fill(0);
    let currentLeft = 0;
    let currentRight = -1;
    let currentTime = 0;
    let distinct = 0;

    function add(position) {
        const value = currentRank[position];

        if (frequency[value] === 0) {
            distinct++;
        }

        frequency[value]++;
    }

    function remove(position) {
        const value = currentRank[position];
        frequency[value]--;

        if (frequency[value] === 0) {
            distinct--;
        }
    }

    function applyUpdate(time) {
        const update = updates[time];
        const position = update.position;
        const inside = position >= currentLeft && position <= currentRight;

        if (inside) {
            remove(position);
        }

        currentRank[position] = update.newRank;

        if (inside) {
            add(position);
        }
    }

    function undoUpdate(time) {
        const update = updates[time];
        const position = update.position;
        const inside = position >= currentLeft && position <= currentRight;

        if (inside) {
            remove(position);
        }

        currentRank[position] = update.oldRank;

        if (inside) {
            add(position);
        }
    }

    for (const query of queries) {
        while (currentTime < query.time) {
            applyUpdate(currentTime++);
        }

        while (currentTime > query.time) {
            undoUpdate(--currentTime);
        }

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

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
