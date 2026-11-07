// Topic: BITMASK DP
// Pattern: DP Over Subsets
// Use Cases: Travelling salesman, assignment problem, Hamiltonian
// path, minimum cost matching, subset enumeration.
//
// Example Problem: Travelling Salesman Problem (return to start)
// Source: Classic bitmask DP problem.
//
// node "BitmaskDP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: dp[mask][i] is the minimum cost to visit exactly the nodes
// in mask and finish at i. Add an unvisited node j from any state.
function tsp(cost) {
    const n = cost.length;
    const full = (1 << n) - 1;
    const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity));
    dp[1][0] = 0;

    for (let mask = 1; mask <= full; mask++) {
        for (let last = 0; last < n; last++) {
            if (dp[mask][last] === Infinity || !(mask & (1 << last))) {
                continue;
            }

            for (let next = 0; next < n; next++) {
                if (mask & (1 << next)) {
                    continue;
                }

                const nextMask = mask | (1 << next);
                const nextCost = dp[mask][last] + cost[last][next];

                if (nextCost < dp[nextMask][next]) {
                    dp[nextMask][next] = nextCost;
                }
            }
        }
    }

    let answer = Infinity;

    for (let last = 0; last < n; last++) {
        answer = Math.min(answer, dp[full][last] + cost[last][0]);
    }

    return answer;
}

function solve() {
    const n = Number(input[index++]);
    const cost = [];

    for (let i = 0; i < n; i++) {
        const row = [];

        for (let j = 0; j < n; j++) {
            row.push(Number(input[index++]));
        }

        cost.push(row);
    }

    return tsp(cost);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
