// Topic: POLYNOMIALS AND LINEAR ALGEBRA
// Pattern: FFT/NTT / Convolution / Gaussian Elimination / Linear Basis
// Use Cases: Polynomial products, matrix rank, determinant, inverse,
// linear equations, maximum subset XOR, Kitamasa recurrence.
//
// Example Problem: Multiply Two Polynomials
// Source: Classic polynomial multiplication exercise.
//
// node "PolynomialsLinearAlgebra.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function readArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) arr.push(Number(input[index++]));

    return arr;
}

const NTT_MOD = 998244353;
const NTT_ROOT = 3;

function mulMod(a, b, mod) {
    return Number((BigInt(a) * BigInt(b)) % BigInt(mod));
}

function modPow(base, exponent, mod) {
    let result = 1;
    base %= mod;

    while (exponent > 0) {
        if (exponent & 1) result = mulMod(result, base, mod);
        base = mulMod(base, base, mod);
        exponent = Math.floor(exponent / 2);
    }

    return result;
}

function ntt(values, invert) {
    const n = values.length;

    for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1;

        for (; j & bit; bit >>= 1) j ^= bit;

        j ^= bit;

        if (i < j) [values[i], values[j]] = [values[j], values[i]];
    }

    for (let length = 2; length <= n; length <<= 1) {
        const angle = modPow(NTT_ROOT, (NTT_MOD - 1) / length, NTT_MOD);
        const root = invert ? modPow(angle, NTT_MOD - 2, NTT_MOD) : angle;

        for (let i = 0; i < n; i += length) {
            let power = 1;

            for (let j = 0; j < length / 2; j++) {
                const even = values[i + j];
                const odd = mulMod(values[i + j + length / 2], power, NTT_MOD);
                values[i + j] = (even + odd) % NTT_MOD;
                values[i + j + length / 2] = (even - odd + NTT_MOD) % NTT_MOD;
                power = mulMod(power, root, NTT_MOD);
            }
        }
    }

    if (invert) {
        const inverse = modPow(n, NTT_MOD - 2, NTT_MOD);
        for (let i = 0; i < n; i++) values[i] = mulMod(values[i], inverse, NTT_MOD);
    }
}

function convolution(a, b) {
    if (!a.length || !b.length) return [];

    let size = 1;
    while (size < a.length + b.length - 1) size <<= 1;

    const left = a.concat(new Array(size - a.length).fill(0));
    const right = b.concat(new Array(size - b.length).fill(0));

    ntt(left, false);
    ntt(right, false);

    for (let i = 0; i < size; i++) left[i] = mulMod(left[i], right[i], NTT_MOD);

    ntt(left, true);
    return left.slice(0, a.length + b.length - 1);
}

function naiveConvolution(a, b) {
    const result = new Array(a.length + b.length - 1).fill(0);

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) result[i + j] += a[i] * b[j];
    }

    return result;
}

function gaussianElimination(matrix) {
    const a = matrix.map((row) => row.slice());
    const rows = a.length;
    const columns = a[0].length;
    let rank = 0;

    for (let column = 0; column < columns && rank < rows; column++) {
        let pivot = rank;

        for (let row = rank; row < rows; row++) {
            if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) pivot = row;
        }

        if (Math.abs(a[pivot][column]) < 1e-9) continue;
        [a[rank], a[pivot]] = [a[pivot], a[rank]];

        const divisor = a[rank][column];

        for (let j = column; j < columns; j++) a[rank][j] /= divisor;

        for (let row = 0; row < rows; row++) {
            if (row === rank) continue;
            const factor = a[row][column];

            for (let j = column; j < columns; j++) {
                a[row][j] -= factor * a[rank][j];
            }
        }

        rank++;
    }

    return { rank, matrix: a };
}

function determinant(matrix) {
    const a = matrix.map((row) => row.slice());
    const n = a.length;
    let result = 1;

    for (let column = 0; column < n; column++) {
        let pivot = column;

        for (let row = column + 1; row < n; row++) {
            if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) pivot = row;
        }

        if (Math.abs(a[pivot][column]) < 1e-9) return 0;
        if (pivot !== column) {
            [a[pivot], a[column]] = [a[column], a[pivot]];
            result = -result;
        }

        result *= a[column][column];

        for (let row = column + 1; row < n; row++) {
            const factor = a[row][column] / a[column][column];

            for (let j = column; j < n; j++) a[row][j] -= factor * a[column][j];
        }
    }

    return result;
}

function matrixPower(matrix, exponent) {
    const n = matrix.length;
    let result = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    );
    let base = matrix.map((row) => row.slice());

    while (exponent > 0) {
        if (exponent & 1) result = multiplyMatrices(result, base);
        base = multiplyMatrices(base, base);
        exponent >>= 1;
    }

    return result;
}

function multiplyMatrices(a, b) {
    const n = a.length;
    const result = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
            for (let j = 0; j < n; j++) result[i][j] += a[i][k] * b[k][j];
        }
    }

    return result;
}

function linearBasis(values, maximumBit = 30) {
    const basis = new Array(maximumBit + 1).fill(0);

    for (const value of values) {
        let current = value;

        for (let bit = maximumBit; bit >= 0; bit--) {
            if (((current >> bit) & 1) === 0) continue;
            if (!basis[bit]) {
                basis[bit] = current;
                break;
            }
            current ^= basis[bit];
        }
    }

    return basis;
}

function maximumSubsetXor(values, maximumBit = 30) {
    const basis = linearBasis(values, maximumBit);
    let answer = 0;

    for (let bit = maximumBit; bit >= 0; bit--) {
        if ((answer ^ basis[bit]) > answer) answer ^= basis[bit];
    }

    return answer;
}

function solve() {
    const n = Number(input[index++]);
    const a = readArray(n);
    const m = Number(input[index++]);
    const b = readArray(m);

    return convolution(a, b).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
