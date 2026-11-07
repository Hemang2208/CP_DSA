// Topic: DP WITH PREFIX SUM
// Pattern: Prefix-Sum Optimized Transitions
// Use Cases: Counting ways with a step range, subarray DP,
// k-step jumps, partition counts, range-sum transitions.
//
// Example Problem: Ways to Climb N Stairs Using Steps 1..K
// Source: Classic prefix-sum DP problem.
//
// node "DPWithPrefixSum.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

const MOD = 1000000007;
let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: dp[i] = dp[i - 1] + ... + dp[i - k]. Prefix sums answer
// that window in O(1), so the whole DP is O(n) instead of O(nk).
function countWays(n, k) {
    const dp = new Array(n + 1).fill(0);
    const prefix = new Array(n + 1).fill(0);
    dp[0] = 1;
    prefix[0] = 1;

    for (let i = 1; i <= n; i++) {
        const excluded = i - k - 1 >= 0 ? prefix[i - k - 1] : 0;
        dp[i] = (prefix[i - 1] - excluded + MOD) % MOD;
        prefix[i] = (prefix[i - 1] + dp[i]) % MOD;
    }

    return dp[n];
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);

    return countWays(n, k);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
