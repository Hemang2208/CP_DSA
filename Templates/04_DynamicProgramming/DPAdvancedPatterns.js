// Topic: ADVANCED DP PATTERNS AND OPTIMIZATIONS
// Pattern: Interval DP / Game DP / Profile DP / DP Optimization
// Use Cases: Burst balloons, egg drop, boolean parenthesization,
// optimal BST, stone games, profile tiling, Knuth, Aliens, slope trick.
//
// Example Problem: Burst Balloons and Egg Drop
// Source: Classic advanced DP problems (LeetCode 312 / 887).
//
// node "DPAdvancedPatterns.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

function burstBalloons(arr) {
    const values = [1, ...arr, 1];
    const n = values.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let length = 2; length < n; length++) {
        for (let left = 0; left + length < n; left++) {
            const right = left + length;

            for (let k = left + 1; k < right; k++) {
                dp[left][right] = Math.max(
                    dp[left][right],
                    dp[left][k] + dp[k][right] + values[left] * values[k] * values[right]
                );
            }
        }
    }

    return dp[0][n - 1];
}

function eggDrop(floors, eggs) {
    const dp = Array.from({ length: eggs + 1 }, () => new Array(floors + 1).fill(0));

    for (let e = 1; e <= eggs; e++) {
        for (let f = 1; f <= floors; f++) {
            dp[e][f] = Infinity;

            for (let x = 1; x <= f; x++) {
                const worst = 1 + Math.max(dp[e - 1][x - 1], dp[e][f - x]);
                dp[e][f] = Math.min(dp[e][f], worst);
            }
        }
    }

    return dp[eggs][floors];
}

function booleanParenthesization(symbols, operators) {
    const n = symbols.length;
    const trueDP = Array.from({ length: n }, () => new Array(n).fill(0));
    const falseDP = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        trueDP[i][i] = symbols[i] === "T" ? 1 : 0;
        falseDP[i][i] = symbols[i] === "F" ? 1 : 0;
    }

    for (let length = 2; length <= n; length++) {
        for (let left = 0; left + length - 1 < n; left++) {
            const right = left + length - 1;

            for (let k = left; k < right; k++) {
                const totalTrue = trueDP[left][k] * trueDP[k + 1][right];
                const totalFalse = falseDP[left][k] * falseDP[k + 1][right];
                const mixed1 = trueDP[left][k] * falseDP[k + 1][right];
                const mixed2 = falseDP[left][k] * trueDP[k + 1][right];

                if (operators[k] === "&") {
                    trueDP[left][right] += totalTrue;
                    falseDP[left][right] += totalFalse + mixed1 + mixed2;
                } else if (operators[k] === "|") {
                    trueDP[left][right] += totalTrue + mixed1 + mixed2;
                    falseDP[left][right] += totalFalse;
                } else {
                    trueDP[left][right] += mixed1 + mixed2;
                    falseDP[left][right] += totalTrue + totalFalse;
                }
            }
        }
    }

    return trueDP[0][n - 1];
}

function optimalBST(keys, frequencies) {
    const n = keys.length;
    const prefix = new Array(n + 1).fill(0);
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + frequencies[i];

    for (let length = 1; length <= n; length++) {
        for (let left = 0; left + length - 1 < n; left++) {
            const right = left + length - 1;
            dp[left][right] = Infinity;
            const weight = prefix[right + 1] - prefix[left];

            for (let root = left; root <= right; root++) {
                const cost = (root > left ? dp[left][root - 1] : 0) +
                    (root < right ? dp[root + 1][right] : 0) + weight;
                dp[left][right] = Math.min(dp[left][right], cost);
            }
        }
    }

    return dp[0][n - 1];
}

function stoneGame(piles) {
    const n = piles.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) dp[i][i] = piles[i];

    for (let length = 2; length <= n; length++) {
        for (let left = 0; left + length - 1 < n; left++) {
            const right = left + length - 1;
            dp[left][right] = Math.max(
                piles[left] - dp[left + 1][right],
                piles[right] - dp[left][right - 1]
            );
        }
    }

    return dp[0][n - 1] > 0;
}

function profileTiling(columns) {
    const dp = new Array(1 << 2).fill(0);
    dp[0] = 1;

    for (let col = 0; col < columns; col++) {
        const next = new Array(1 << 2).fill(0);
        next[0] += dp[0];
        next[1] += dp[0];
        next[2] += dp[0];
        next[3] += dp[3];
        next[3] += dp[0];
        next[0] += dp[3];
        for (let mask = 0; mask < 4; mask++) dp[mask] = next[mask];
    }

    return dp[0];
}

function expectedDiceValue(faces) {
    let total = 0;

    for (let value = 1; value <= faces; value++) total += value;

    return total / faces;
}

function bitmaskAssignment(cost) {
    const n = cost.length;
    const dp = new Array(1 << n).fill(Infinity);
    dp[0] = 0;

    for (let mask = 0; mask < (1 << n); mask++) {
        const person = mask.toString(2).split("1").length - 1;

        for (let task = 0; task < n; task++) {
            if (mask & (1 << task)) continue;
            dp[mask | (1 << task)] = Math.min(dp[mask | (1 << task)], dp[mask] + cost[person][task]);
        }
    }

    return dp[(1 << n) - 1];
}

function knuthOptimization(keys, frequencies) {
    return optimalBST(keys, frequencies);
}

function aliensTrick(costs, groups) {
    function feasibility(penalty) {
        let count = 1;
        let sum = 0;

        for (const cost of costs) {
            if (sum + cost > penalty) {
                count++;
                sum = 0;
            }
            sum += cost;
        }

        return count <= groups;
    }

    let left = Math.max(...costs);
    let right = costs.reduce((sum, value) => sum + value, 0);

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (feasibility(mid)) right = mid;
        else left = mid + 1;
    }

    return left;
}

function slopeTrick(values) {
    const sorted = values.slice().sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
}

function smawk(rowCost) {
    const rows = rowCost.length;
    const cols = rowCost[0].length;
    const result = [];

    for (let i = 0; i < rows; i++) {
        let best = 0;

        for (let j = 1; j < cols; j++) {
            if (rowCost[i][j] < rowCost[i][best]) best = j;
        }

        result.push(best);
    }

    return result;
}

function bitsetSubsetSum(arr, target) {
    let bits = 1n;

    for (const value of arr) {
        bits |= bits << BigInt(value);
    }

    return ((bits >> BigInt(target)) & 1n) === 1n;
}

function minPlusConvolution(a, b) {
    const result = new Array(a.length + b.length - 1).fill(Infinity);

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            result[i + j] = Math.min(result[i + j], a[i] + b[j]);
        }
    }

    return result;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return `${burstBalloons(arr)} ${eggDrop(n, 2)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
