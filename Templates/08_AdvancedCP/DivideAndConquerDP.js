// Topic: DIVIDE AND CONQUER DP
// Pattern: Monotonic Optimum Split With Recursive Search
// Use Cases: Partition array into k groups, post office problem,
// minimizing sum of squared group sums, quadrangle-inequality DP.
//
// Example Problem: Partition Array Into K Groups Minimizing Squared Sum
// Source: Classic divide and conquer DP optimization problem.
//
// node "DivideAndConquerDP.js" < "Input.txt" > "Output.txt"

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

// Approach: dp[groups][i] = min over split j of
// dp[groups - 1][j] + (prefix[i] - prefix[j])^2.
// The best split is monotone, so each layer is computed in
// O(n log n) with a recursive range search.
function minimumCost(arr, groups) {
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + arr[i - 1];
    }

    let previous = new Array(n + 1).fill(Infinity);
    previous[0] = 0;

    for (let group = 1; group <= groups; group++) {
        const current = new Array(n + 1).fill(Infinity);

        function compute(left, right, optLeft, optRight) {
            if (left > right) {
                return;
            }

            const mid = (left + right) >> 1;
            let best = Infinity;
            let bestSplit = optLeft;
            const limit = Math.min(mid - 1, optRight);

            for (let split = optLeft; split <= limit; split++) {
                const cost =
                    previous[split] +
                    (prefix[mid] - prefix[split]) *
                        (prefix[mid] - prefix[split]);

                if (cost < best) {
                    best = cost;
                    bestSplit = split;
                }
            }

            current[mid] = best;
            compute(left, mid - 1, optLeft, bestSplit);
            compute(mid + 1, right, bestSplit, optRight);
        }

        compute(group, n, group - 1, n - 1);
        previous = current;
    }

    return previous[n];
}

function solve() {
    const n = Number(input[index++]);
    const groups = Number(input[index++]);
    const arr = inputArray(n);

    return minimumCost(arr, groups);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
