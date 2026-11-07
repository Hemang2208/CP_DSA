// Topic: LI CHAO TREE
// Pattern: Segment Tree of Lines
// Use Cases: Minimum of lines at arbitrary x, DP optimization with
// arbitrary query order, dynamic convex hull, range line queries.
//
// Example Problem: Minimum Value of m * x + b at Given Points
// Source: Classic Li Chao tree problem.
//
// node "LiChaoTree.js" < "Input.txt" > "Output.txt"

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

// Approach: Li Chao tree stores one line per segment tree node. Insertion
// keeps the line better at the midpoint and pushes the loser to the side
// where it may still win. Queries inspect one root-to-leaf path.
function minimumValues(lines, queries) {
    const coordinates = Array.from(new Set(queries)).sort((a, b) => a - b);
    const coordinateIndex = new Map();

    for (let i = 0; i < coordinates.length; i++) {
        coordinateIndex.set(coordinates[i], i);
    }

    const size = coordinates.length;
    const capacity = Math.max(1, size * 4 + 5);
    const lineSlope = new Array(capacity).fill(0);
    const lineIntercept = new Array(capacity).fill(0);
    const hasLine = new Array(capacity).fill(false);

    function valueAt(slope, intercept, x) {
        return slope * x + intercept;
    }

    function addLine(slope, intercept, node, left, right) {
        if (!hasLine[node]) {
            hasLine[node] = true;
            lineSlope[node] = slope;
            lineIntercept[node] = intercept;
            return;
        }

        const mid = (left + right) >> 1;
        const leftX = coordinates[left];
        const midX = coordinates[mid];
        const rightX = coordinates[right];

        const currentSlope = lineSlope[node];
        const currentIntercept = lineIntercept[node];

        const betterLeft =
            valueAt(slope, intercept, leftX) <
            valueAt(currentSlope, currentIntercept, leftX);
        const betterMid =
            valueAt(slope, intercept, midX) <
            valueAt(currentSlope, currentIntercept, midX);
        const betterRight =
            valueAt(slope, intercept, rightX) <
            valueAt(currentSlope, currentIntercept, rightX);

        if (betterMid) {
            lineSlope[node] = slope;
            lineIntercept[node] = intercept;
            slope = currentSlope;
            intercept = currentIntercept;
        }

        if (left === right) {
            return;
        }

        if (betterLeft !== betterMid) {
            addLine(slope, intercept, node * 2, left, mid);
        } else if (betterRight !== betterMid) {
            addLine(slope, intercept, node * 2 + 1, mid + 1, right);
        }
    }

    for (const [slope, intercept] of lines) {
        addLine(slope, intercept, 1, 0, size - 1);
    }

    const answers = new Array(queries.length);

    for (let i = 0; i < queries.length; i++) {
        const x = queries[i];
        let position = coordinateIndex.get(x);
        let left = 0;
        let right = size - 1;
        let node = 1;
        let best = Infinity;

        while (true) {
            if (hasLine[node]) {
                best = Math.min(
                    best,
                    valueAt(lineSlope[node], lineIntercept[node], x)
                );
            }

            if (left === right) {
                break;
            }

            const mid = (left + right) >> 1;

            if (position <= mid) {
                node *= 2;
                right = mid;
            } else {
                node = node * 2 + 1;
                left = mid + 1;
            }
        }

        answers[i] = best;
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

    return minimumValues(lines, queries).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
