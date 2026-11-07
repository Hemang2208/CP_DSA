// Topic: GREEDY
// Pattern: Sort by Ending Time / Exchange Argument
// Use Cases: Activity selection, interval scheduling, meeting rooms,
// minimum platforms, maximum non-overlapping intervals.
//
// Example Problem: Activity Selection
// Source: Classic greedy problem.
//
// node "Greedy.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: sort activities by finishing time. Picking the earliest
// finishing compatible activity leaves the most room for the rest.
function maxActivities(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let lastEnd = -Infinity;

    for (const [start, end] of intervals) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }

    return count;
}

function solve() {
    const n = Number(input[index++]);
    const intervals = [];

    for (let i = 0; i < n; i++) {
        const start = Number(input[index++]);
        const end = Number(input[index++]);
        intervals.push([start, end]);
    }

    return maxActivities(intervals);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
