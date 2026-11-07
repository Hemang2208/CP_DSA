// Topic: BACKTRACKING
// Pattern: Choose, Explore, Undo
// Use Cases: N-Queens, Sudoku, permutations, combinations, subset sum,
// word search, constraint satisfaction.
//
// Example Problem: N-Queens (count all valid boards)
// Source: Classic backtracking problem.
//
// node "Backtracking.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// Approach: place one queen per row. Sets track used columns and both
// diagonals (row - col and row + col), making conflict checks O(1).
function countNQueens(n) {
    const columns = new Set();
    const diagonal1 = new Set();
    const diagonal2 = new Set();
    let count = 0;

    function place(row) {
        if (row === n) {
            count++;
            return;
        }

        for (let col = 0; col < n; col++) {
            if (columns.has(col) || diagonal1.has(row - col) || diagonal2.has(row + col)) {
                continue;
            }

            columns.add(col);
            diagonal1.add(row - col);
            diagonal2.add(row + col);

            place(row + 1);

            columns.delete(col);
            diagonal1.delete(row - col);
            diagonal2.delete(row + col);
        }
    }

    place(0);

    return count;
}

function solve() {
    const n = Number(input[index++]);

    return countNQueens(n);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
