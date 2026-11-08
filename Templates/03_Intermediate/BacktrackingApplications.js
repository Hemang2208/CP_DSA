// Topic: RECURSION AND BACKTRACKING APPLICATIONS
// Pattern: Choose, Explore, Unchoose / Pruning
// Use Cases: Subsets, permutations, combinations, combination sum,
// parentheses, N-Queens, sudoku, word search, graph coloring.
//
// Example Problem: Generate Parentheses and Count N-Queens Solutions
// Source: Classic backtracking problems (LeetCode 22 / 51).
//
// node "BacktrackingApplications.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function generateSubsets(arr) {
    const result = [];

    function backtrack(start, path) {
        result.push(path.slice());

        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
}

function subsetsWithDuplicates(arr) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const result = [];

    function backtrack(start, path) {
        result.push(path.slice());

        for (let i = start; i < sorted.length; i++) {
            if (i > start && sorted[i] === sorted[i - 1]) continue;
            path.push(sorted[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
}

function generatePermutations(arr) {
    const result = [];
    const used = new Array(arr.length).fill(false);

    function backtrack(path) {
        if (path.length === arr.length) {
            result.push(path.slice());
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(arr[i]);
            backtrack(path);
            path.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}

function generateCombinations(n, k) {
    const result = [];

    function backtrack(start, path) {
        if (path.length === k) {
            result.push(path.slice());
            return;
        }

        for (let i = start; i <= n; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(1, []);
    return result;
}

function combinationSum(arr, target) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const result = [];

    function backtrack(start, remaining, path) {
        if (remaining === 0) {
            result.push(path.slice());
            return;
        }

        for (let i = start; i < sorted.length; i++) {
            if (sorted[i] > remaining) break;
            path.push(sorted[i]);
            backtrack(i, remaining - sorted[i], path);
            path.pop();
        }
    }

    backtrack(0, target, []);
    return result;
}

function subsetSumExists(arr, target) {
    function backtrack(i, remaining) {
        if (remaining === 0) return true;
        if (i === arr.length || remaining < 0) return false;
        return backtrack(i + 1, remaining - arr[i]) || backtrack(i + 1, remaining);
    }

    return backtrack(0, target);
}

function palindromePartitions(s) {
    const result = [];

    function isPalindrome(left, right) {
        while (left < right) {
            if (s[left++] !== s[right--]) return false;
        }
        return true;
    }

    function backtrack(start, path) {
        if (start === s.length) {
            result.push(path.slice());
            return;
        }

        for (let end = start; end < s.length; end++) {
            if (!isPalindrome(start, end)) continue;
            path.push(s.slice(start, end + 1));
            backtrack(end + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
}

function generateParentheses(n) {
    const result = [];

    function backtrack(open, close, path) {
        if (path.length === 2 * n) {
            result.push(path);
            return;
        }

        if (open < n) backtrack(open + 1, close, path + "(");
        if (close < open) backtrack(open, close + 1, path + ")");
    }

    backtrack(0, 0, "");
    return result;
}

function letterCombinations(digits) {
    if (!digits) return [];
    const phone = {
        2: "abc", 3: "def", 4: "ghi", 5: "jkl",
        6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz",
    };
    const result = [];

    function backtrack(i, path) {
        if (i === digits.length) {
            result.push(path);
            return;
        }

        for (const ch of phone[digits[i]]) {
            backtrack(i + 1, path + ch);
        }
    }

    backtrack(0, "");
    return result;
}

function nQueensCount(n) {
    let count = 0;
    const columns = new Set();
    const diagonal1 = new Set();
    const diagonal2 = new Set();

    function backtrack(row) {
        if (row === n) {
            count++;
            return;
        }

        for (let col = 0; col < n; col++) {
            if (columns.has(col) || diagonal1.has(row - col) || diagonal2.has(row + col)) continue;
            columns.add(col);
            diagonal1.add(row - col);
            diagonal2.add(row + col);
            backtrack(row + 1);
            columns.delete(col);
            diagonal1.delete(row - col);
            diagonal2.delete(row + col);
        }
    }

    backtrack(0);
    return count;
}

function solveSudoku(board) {
    function isValid(row, col, value) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === value || board[i][col] === value) return false;
            if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === value) {
                return false;
            }
        }
        return true;
    }

    function backtrack() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] !== 0) continue;

                for (let value = 1; value <= 9; value++) {
                    if (!isValid(row, col, value)) continue;
                    board[row][col] = value;
                    if (backtrack()) return true;
                    board[row][col] = 0;
                }

                return false;
            }
        }

        return true;
    }

    backtrack();
    return board;
}

function wordSearch(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    function backtrack(row, col, i) {
        if (i === word.length) return true;
        if (row < 0 || col < 0 || row >= rows || col >= cols) return false;
        if (board[row][col] !== word[i]) return false;

        const saved = board[row][col];
        board[row][col] = "#";
        const found =
            backtrack(row + 1, col, i + 1) ||
            backtrack(row - 1, col, i + 1) ||
            backtrack(row, col + 1, i + 1) ||
            backtrack(row, col - 1, i + 1);
        board[row][col] = saved;
        return found;
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (backtrack(row, col, 0)) return true;
        }
    }

    return false;
}

function graphColoring(graph, colors) {
    const color = new Array(graph.length).fill(0);

    function backtrack(node) {
        if (node === graph.length) return true;

        for (let c = 1; c <= colors; c++) {
            let valid = true;

            for (const neighbour of graph[node]) {
                if (color[neighbour] === c) {
                    valid = false;
                    break;
                }
            }

            if (!valid) continue;
            color[node] = c;
            if (backtrack(node + 1)) return true;
            color[node] = 0;
        }

        return false;
    }

    return backtrack(0) ? color.slice(1) : [];
}

function solve() {
    const n = Number(input[index++]);

    return `${generateParentheses(n).join(" ")}\n${nQueensCount(n)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
