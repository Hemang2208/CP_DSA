// Topic: CONVEX HULL TRICK
// Pattern: Monotonic Slopes and Queries
// Use Cases: DP optimization with linear transitions, minimum cost
// problems, max-plus convolution, lines with monotone slopes.
//
// Example Problem: Minimum Value of m * x + b Among Given Lines
// Source: Classic convex hull trick problem.
//
// node "ConvexHullTrick.js" < "Input.txt" > "Output.txt"

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

// Approach: add lines in strictly decreasing slope order and answer
// queries in increasing x. The best line only moves forward, so a
// deque gives amortized O(1) per operation.
function minimumLineValues(lines, queries) {
    const sortedLines = lines
        .slice()
        .sort((a, b) => (a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]));
    const slopes = [];
    const intercepts = [];
    let head = 0;

    function valueAt(position, x) {
        return slopes[position] * x + intercepts[position];
    }

    function isBad(first, second, newSlope, newIntercept) {
        return (
            (intercepts[second] - intercepts[first]) *
                (slopes[second] - newSlope) >=
            (newIntercept - intercepts[second]) *
                (slopes[first] - slopes[second])
        );
    }

    for (const [slope, intercept] of sortedLines) {
        if (
            slopes.length &&
            slopes[slopes.length - 1] === slope
        ) {
            if (intercepts[intercepts.length - 1] <= intercept) {
                continue;
            }

            slopes.pop();
            intercepts.pop();

            if (head > slopes.length) {
                head = slopes.length;
            }
        }

        while (
            slopes.length - head >= 2 &&
            isBad(
                slopes.length - 2,
                slopes.length - 1,
                slope,
                intercept
            )
        ) {
            slopes.pop();
            intercepts.pop();
        }

        slopes.push(slope);
        intercepts.push(intercept);
    }

    const order = queries.map((x, index) => ({ x, index }));
    order.sort((a, b) => a.x - b.x);

    const answers = new Array(queries.length);

    for (const query of order) {
        while (
            head + 1 < slopes.length &&
            valueAt(head + 1, query.x) <= valueAt(head, query.x)
        ) {
            head++;
        }

        answers[query.index] = valueAt(head, query.x);
    }

    return answers;
}

function solve() {
    const n = Number(input[index++]);
    const q = Number(input[index++]);
    const lines = [];

    for (let i = 0; i < n; i++) {
        const slope = Number(input[index++]);
        const intercept = Number(input[index++]);
        lines.push([slope, intercept]);
    }

    const queries = inputArray(q);

    return minimumLineValues(lines, queries).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
