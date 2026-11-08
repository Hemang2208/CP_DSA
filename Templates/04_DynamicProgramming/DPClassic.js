// Topic: DYNAMIC PROGRAMMING CLASSIC PROBLEMS
// Pattern: 1D / Grid / State Machine DP
// Use Cases: Stairs, frog jumps, house robber, unique paths, path sum,
// cherry pickup, maximal square, decode ways, stocks, Catalan.
//
// Example Problem: House Robber, Maximum Product and Decode Ways
// Source: Classic 1D DP problems (LeetCode 198 / 152 / 91).
//
// node "DPClassic.js" < "Input.txt" > "Output.txt"

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

function climbingStairs(n) {
    let previous = 1;
    let current = 1;

    for (let i = 2; i <= n; i++) {
        [previous, current] = [current, previous + current];
    }

    return current;
}

function frogJump(heights) {
    const dp = new Array(heights.length).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i < heights.length; i++) {
        dp[i] = dp[i - 1] + Math.abs(heights[i] - heights[i - 1]);

        if (i > 1) {
            dp[i] = Math.min(dp[i], dp[i - 2] + Math.abs(heights[i] - heights[i - 2]));
        }
    }

    return dp[heights.length - 1] || 0;
}

function frogJumpK(heights, k) {
    const dp = new Array(heights.length).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i < heights.length; i++) {
        for (let step = 1; step <= k && i - step >= 0; step++) {
            dp[i] = Math.min(dp[i], dp[i - step] + Math.abs(heights[i] - heights[i - step]));
        }
    }

    return dp[heights.length - 1] || 0;
}

function houseRobber(arr) {
    let previous = 0;
    let current = 0;

    for (const value of arr) {
        [previous, current] = [current, Math.max(current, previous + value)];
    }

    return current;
}

function houseRobberCircular(arr) {
    if (arr.length === 1) return arr[0];

    function rob(values) {
        let previous = 0;
        let current = 0;

        for (const value of values) {
            [previous, current] = [current, Math.max(current, previous + value)];
        }

        return current;
    }

    return Math.max(rob(arr.slice(1)), rob(arr.slice(0, -1)));
}

function minimumCostClimbingStairs(cost) {
    let one = 0;
    let two = 0;

    for (let i = 2; i <= cost.length; i++) {
        const current = Math.min(one + cost[i - 1], two + cost[i - 2]);
        two = one;
        one = current;
    }

    return one;
}

function uniquePaths(rows, cols) {
    const dp = new Array(cols).fill(1);

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            dp[j] += dp[j - 1];
        }
    }

    return dp[cols - 1];
}

function uniquePathsWithObstacles(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const dp = new Array(cols).fill(0);
    dp[0] = grid[0][0] === 1 ? 0 : 1;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                dp[j] = 0;
            } else if (j > 0) {
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[cols - 1];
}

function minimumPathSum(grid) {
    const dp = grid[0].slice();

    for (let i = 1; i < dp.length; i++) dp[i] += dp[i - 1];

    for (let i = 1; i < grid.length; i++) {
        dp[0] += grid[i][0];

        for (let j = 1; j < dp.length; j++) {
            dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
        }
    }

    return dp[dp.length - 1];
}

function triangleMinimum(triangle) {
    const dp = triangle[triangle.length - 1].slice();

    for (let row = triangle.length - 2; row >= 0; row--) {
        for (let col = 0; col <= row; col++) {
            dp[col] = triangle[row][col] + Math.min(dp[col], dp[col + 1]);
        }
    }

    return dp[0];
}

function maximumPathSumMatrix(grid) {
    const dp = grid[0].slice();

    for (let i = 1; i < grid.length; i++) {
        const next = new Array(grid[0].length).fill(0);

        for (let j = 0; j < grid[0].length; j++) {
            let best = dp[j];
            if (j > 0) best = Math.max(best, dp[j - 1]);
            if (j + 1 < grid[0].length) best = Math.max(best, dp[j + 1]);
            next[j] = grid[i][j] + best;
        }

        for (let j = 0; j < dp.length; j++) dp[j] = next[j];
    }

    return Math.max(...dp);
}

function cherryPickup(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let dp = new Map([[cols - 1, grid[0][0] + grid[0][cols - 1]]]);

    for (let row = 1; row < rows; row++) {
        const next = new Map();

        for (let a = 0; a < cols; a++) {
            for (let b = 0; b < cols; b++) {
                let best = -Infinity;

                for (let da = -1; da <= 1; da++) {
                    for (let db = -1; db <= 1; db++) {
                        const previous = dp.get((a + da) * cols + (b + db));
                        if (previous !== undefined) best = Math.max(best, previous);
                    }
                }

                if (best === -Infinity) continue;
                const gain = a === b ? grid[row][a] : grid[row][a] + grid[row][b];
                next.set(a * cols + b, best + gain);
            }
        }

        dp = next;
    }

    return dp.get((cols - 1) * cols + (cols - 1)) || 0;
}

function maximalSquare(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const dp = new Array(cols + 1).fill(0);
    let best = 0;

    for (let i = 1; i <= rows; i++) {
        let diagonal = 0;

        for (let j = 1; j <= cols; j++) {
            const previous = dp[j];

            if (matrix[i - 1][j - 1] === 1) {
                dp[j] = 1 + Math.min(dp[j], dp[j - 1], diagonal);
                best = Math.max(best, dp[j]);
            } else {
                dp[j] = 0;
            }

            diagonal = previous;
        }
    }

    return best * best;
}

function decodeWays(s) {
    if (!s.length || s[0] === "0") return 0;
    let previous = 1;
    let current = 1;

    for (let i = 1; i < s.length; i++) {
        let ways = 0;

        if (s[i] !== "0") ways += current;
        const pair = Number(s.slice(i - 1, i + 1));
        if (pair >= 10 && pair <= 26) ways += previous;

        previous = current;
        current = ways;
    }

    return current;
}

function jumpGame(arr) {
    let reach = 0;

    for (let i = 0; i < arr.length; i++) {
        if (i > reach) return false;
        reach = Math.max(reach, i + arr[i]);
    }

    return true;
}

function bestTimeToBuySell(prices) {
    let minimum = Infinity;
    let best = 0;

    for (const price of prices) {
        minimum = Math.min(minimum, price);
        best = Math.max(best, price - minimum);
    }

    return best;
}

function maximumProductSubarray(arr) {
    let maximum = arr[0];
    let minimum = arr[0];
    let best = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < 0) [maximum, minimum] = [minimum, maximum];
        maximum = Math.max(arr[i], maximum * arr[i]);
        minimum = Math.min(arr[i], minimum * arr[i]);
        best = Math.max(best, maximum);
    }

    return best;
}

function diceThrow(n, faces, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (let dice = 0; dice < n; dice++) {
        const next = new Array(target + 1).fill(0);

        for (let sum = 0; sum <= target; sum++) {
            for (let face = 1; face <= faces && sum + face <= target; face++) {
                next[sum + face] += dp[sum];
            }
        }

        for (let i = 0; i <= target; i++) dp[i] = next[i];
    }

    return dp[target];
}

function paintingFence(n, colors) {
    if (n === 1) return colors;

    let same = colors;
    let different = colors * (colors - 1);

    for (let i = 3; i <= n; i++) {
        const nextSame = different;
        const nextDifferent = (same + different) * (colors - 1);
        same = nextSame;
        different = nextDifferent;
    }

    return same + different;
}

function tilingWays(n) {
    let previous = 1;
    let current = 1;

    for (let i = 2; i <= n; i++) {
        [previous, current] = [current, previous + current];
    }

    return current;
}

function catalanNumber(n) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] += dp[j] * dp[i - 1 - j];
        }
    }

    return dp[n];
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return `${houseRobber(arr)} ${maximumProductSubarray(arr)} ${decodeWays(arr.join(""))} ${catalanNumber(n)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
