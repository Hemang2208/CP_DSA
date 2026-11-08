// Topic: MATRICES AND 2D ARRAYS
// Pattern: Matrix Traversal / Rotation / Prefix and Search
// Use Cases: Spiral and diagonal order, transpose, multiplication,
// rotate 90 degrees, Pascal's triangle, set matrix zeroes, sorted search.
//
// Example Problem: Spiral Traversal and 90 Degree Rotation
// Source: Classic matrix traversal problem (LeetCode 54 / 48).
//
// node "Matrices.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function readMatrix(rows, cols) {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];

        for (let j = 0; j < cols; j++) {
            row.push(Number(input[index++]));
        }

        matrix.push(row);
    }

    return matrix;
}

function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = Array.from({ length: cols }, () => new Array(rows).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }

    return result;
}

function rotate90(matrix) {
    const reversed = matrix.slice().reverse();
    return transpose(reversed);
}

function multiply(a, b) {
    const rows = a.length;
    const inner = b.length;
    const cols = b[0].length;
    const result = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let k = 0; k < inner; k++) {
            for (let j = 0; j < cols; j++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return result;
}

function spiralOrder(matrix) {
    const result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (let j = left; j <= right; j++) result.push(matrix[top][j]);
        top++;

        for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
        right--;

        if (top <= bottom) {
            for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
            left++;
        }
    }

    return result;
}

function pascalTriangle(rows) {
    const triangle = [];

    for (let row = 0; row < rows; row++) {
        triangle.push(new Array(row + 1).fill(1));

        for (let column = 1; column < row; column++) {
            triangle[row][column] = triangle[row - 1][column - 1] + triangle[row - 1][column];
        }
    }

    return triangle;
}

function diagonalOrder(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (let sum = 0; sum < rows + cols - 1; sum++) {
        const values = [];

        for (let i = 0; i < rows; i++) {
            const j = sum - i;

            if (j >= 0 && j < cols) {
                values.push(matrix[i][j]);
            }
        }

        if (sum % 2 === 0) {
            values.reverse();
        }

        result.push(...values);
    }

    return result;
}

function setZeroes(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const zeroRows = new Set();
    const zeroCols = new Set();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                zeroRows.add(i);
                zeroCols.add(j);
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (zeroRows.has(i) || zeroCols.has(j)) {
                matrix[i][j] = 0;
            }
        }
    }

    return matrix;
}

function searchSortedMatrix(matrix, target) {
    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === target) return true;
        if (matrix[row][col] > target) col--;
        else row++;
    }

    return false;
}

function boundaryTraversal(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (let j = 0; j < cols; j++) result.push(matrix[0][j]);
    for (let i = 1; i < rows; i++) result.push(matrix[i][cols - 1]);
    if (rows > 1) for (let j = cols - 2; j >= 0; j--) result.push(matrix[rows - 1][j]);
    if (cols > 1) for (let i = rows - 2; i >= 1; i--) result.push(matrix[i][0]);

    return result;
}

function solve() {
    const rows = Number(input[index++]);
    const cols = Number(input[index++]);
    const matrix = readMatrix(rows, cols);
    const rotated = rotate90(matrix);
    const flattened = rotated.map((row) => row.join(" ")).join(" ");

    return `${spiralOrder(matrix).join(" ")}\n${flattened}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
