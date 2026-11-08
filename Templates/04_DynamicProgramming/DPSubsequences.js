// Topic: DP ON SUBSEQUENCES AND STRINGS
// Pattern: Knapsack / LCS / LIS / Edit Distance
// Use Cases: Subset sum, partition, coin change, LCS, LIS in O(n log n),
// edit distance, wildcard and regex matching, word break.
//
// Example Problem: Edit Distance, LCS and Shortest Common Supersequence
// Source: Classic two-string DP problems (LeetCode 72 / 1143 / 1092).
//
// node "DPSubsequences.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

function subsetSum(arr, target) {
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const value of arr) {
        for (let sum = target; sum >= value; sum--) {
            dp[sum] = dp[sum] || dp[sum - value];
        }
    }

    return dp[target];
}

function equalPartition(arr) {
    const total = arr.reduce((sum, value) => sum + value, 0);
    return total % 2 === 0 && subsetSum(arr, total / 2);
}

function minimumPartitionDifference(arr) {
    const total = arr.reduce((sum, value) => sum + value, 0);
    const dp = new Array(Math.floor(total / 2) + 1).fill(false);
    dp[0] = true;

    for (const value of arr) {
        for (let sum = dp.length - 1; sum >= value; sum--) {
            dp[sum] = dp[sum] || dp[sum - value];
        }
    }

    for (let sum = dp.length - 1; sum >= 0; sum--) {
        if (dp[sum]) return total - 2 * sum;
    }

    return total;
}

function countSubsetsWithSum(arr, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (const value of arr) {
        for (let sum = target; sum >= value; sum--) {
            dp[sum] += dp[sum - value];
        }
    }

    return dp[target];
}

function targetSum(arr, target) {
    const total = arr.reduce((sum, value) => sum + value, 0);
    if ((total + target) % 2 !== 0 || Math.abs(target) > total) return 0;
    return countSubsetsWithSum(arr, (total + target) / 2);
}

function coinChangeMinimum(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let sum = 1; sum <= amount; sum++) {
        for (const coin of coins) {
            if (coin <= sum) dp[sum] = Math.min(dp[sum], dp[sum - coin] + 1);
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

function coinChangeWays(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let sum = coin; sum <= amount; sum++) {
            dp[sum] += dp[sum - coin];
        }
    }

    return dp[amount];
}

function rodCutting(prices) {
    const n = prices.length;
    const dp = new Array(n + 1).fill(0);

    for (let length = 1; length <= n; length++) {
        for (let cut = 1; cut <= length; cut++) {
            dp[length] = Math.max(dp[length], prices[cut - 1] + dp[length - cut]);
        }
    }

    return dp[n];
}

function perfectSquares(n) {
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    for (let value = 1; value <= n; value++) {
        for (let root = 1; root * root <= value; root++) {
            dp[value] = Math.min(dp[value], dp[value - root * root] + 1);
        }
    }

    return dp[n];
}

function combinationSumIV(arr, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (let sum = 1; sum <= target; sum++) {
        for (const value of arr) {
            if (value <= sum) dp[sum] += dp[sum - value];
        }
    }

    return dp[target];
}

function lcsLength(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1] + 1
                : Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[a.length][b.length];
}

function printLCS(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1] + 1
                : Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    let i = a.length;
    let j = b.length;
    let result = "";

    while (i > 0 && j > 0) {
        if (a[i - 1] === b[j - 1]) {
            result = a[i - 1] + result;
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
        else j--;
    }

    return result;
}

function longestCommonSubstring(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    let best = 0;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                best = Math.max(best, dp[i][j]);
            }
        }
    }

    return best;
}

function shortestCommonSupersequence(a, b) {
    return a.length + b.length - lcsLength(a, b);
}

function lisLength(arr) {
    const tails = [];

    for (const value of arr) {
        let left = 0;
        let right = tails.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < value) left = mid + 1;
            else right = mid;
        }

        tails[left] = value;
    }

    return tails.length;
}

function printLIS(arr) {
    const tails = [];
    const indices = [];
    const previous = new Array(arr.length).fill(-1);

    for (let i = 0; i < arr.length; i++) {
        let left = 0;
        let right = tails.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[tails[mid]] < arr[i]) left = mid + 1;
            else right = mid;
        }

        if (left > 0) previous[i] = tails[left - 1];
        tails[left] = i;
        indices[left] = i;
    }

    let current = indices[indices.length - 1];
    const result = [];

    while (current !== -1) {
        result.push(arr[current]);
        current = previous[current];
    }

    return result.reverse();
}

function numberOFLIS(arr) {
    const length = new Array(arr.length).fill(1);
    const count = new Array(arr.length).fill(1);
    let best = 1;

    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                if (length[j] + 1 > length[i]) {
                    length[i] = length[j] + 1;
                    count[i] = count[j];
                } else if (length[j] + 1 === length[i]) {
                    count[i] += count[j];
                }
            }
        }

        best = Math.max(best, length[i]);
    }

    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        if (length[i] === best) total += count[i];
    }

    return total;
}

function longestBitonicSubsequence(arr) {
    const increasing = new Array(arr.length).fill(1);
    const decreasing = new Array(arr.length).fill(1);

    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) increasing[i] = Math.max(increasing[i], increasing[j] + 1);
        }
    }

    for (let i = arr.length - 2; i >= 0; i--) {
        for (let j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[i]) decreasing[i] = Math.max(decreasing[i], decreasing[j] + 1);
        }
    }

    let best = 0;

    for (let i = 0; i < arr.length; i++) {
        best = Math.max(best, increasing[i] + decreasing[i] - 1);
    }

    return best;
}

function largestDivisibleSubset(arr) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const dp = new Array(sorted.length).fill(1);
    let best = 0;

    for (let i = 1; i < sorted.length; i++) {
        for (let j = 0; j < i; j++) {
            if (sorted[i] % sorted[j] === 0) dp[i] = Math.max(dp[i], dp[j] + 1);
        }

        best = Math.max(best, dp[i]);
    }

    return best;
}

function longestPalindromeSubsequence(s) {
    return lcsLength(s, s.split("").reverse().join(""));
}

function minimumInsertionsToPalindrome(s) {
    return s.length - longestPalindromeSubsequence(s);
}

function editDistance(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    return dp[a.length][b.length];
}

function distinctSubsequences(s, target) {
    const dp = new Array(target.length + 1).fill(0);
    dp[0] = 1;

    for (const ch of s) {
        for (let j = target.length; j >= 1; j--) {
            if (target[j - 1] === ch) dp[j] += dp[j - 1];
        }
    }

    return dp[target.length];
}

function wildcardMatching(text, pattern) {
    const dp = Array.from({ length: text.length + 1 }, () => new Array(pattern.length + 1).fill(false));
    dp[0][0] = true;

    for (let j = 1; j <= pattern.length; j++) {
        if (pattern[j - 1] === "*") dp[0][j] = dp[0][j - 1];
    }

    for (let i = 1; i <= text.length; i++) {
        for (let j = 1; j <= pattern.length; j++) {
            if (pattern[j - 1] === "*") {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            } else if (pattern[j - 1] === "?" || pattern[j - 1] === text[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[text.length][pattern.length];
}

function wordBreak(s, dictionary) {
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (const word of dictionary) {
            if (i >= word.length && dp[i - word.length] && s.slice(i - word.length, i) === word) {
                dp[i] = true;
            }
        }
    }

    return dp[s.length];
}

function solve() {
    const a = nextStr();
    const b = nextStr();

    return `${editDistance(a, b)} ${lcsLength(a, b)} ${shortestCommonSupersequence(a, b)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
