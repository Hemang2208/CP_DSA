// Topic: DIVIDE AND CONQUER (ADVANCED)
// Pattern: Split, Recurse, Combine
// Use Cases: Closest pair, maximum subarray, Karatsuba multiplication,
// Strassen multiplication, fast power, skyline merge, recurrences.
//
// Example Problem: Closest Pair of Points
// Source: Classic divide and conquer geometry problem.
//
// node "DivideAndConquerAdvanced.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function readPoints(n) {
    const points = [];

    for (let i = 0; i < n; i++) {
        points.push([Number(input[index++]), Number(input[index++])]);
    }

    return points;
}

function distance(a, b) {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function closestPair(points) {
    const sorted = points.slice().sort((a, b) => a[0] - b[0]);

    function solveStrip(strip, best) {
        strip.sort((a, b) => a[1] - b[1]);

        for (let i = 0; i < strip.length; i++) {
            for (let j = i + 1; j < strip.length && strip[j][1] - strip[i][1] < best; j++) {
                best = Math.min(best, distance(strip[i], strip[j]));
            }
        }

        return best;
    }

    function recurse(left, right) {
        if (right - left <= 3) {
            let best = Infinity;

            for (let i = left; i < right; i++) {
                for (let j = i + 1; j < right; j++) {
                    best = Math.min(best, distance(sorted[i], sorted[j]));
                }
            }

            return best;
        }

        const mid = Math.floor((left + right) / 2);
        const midX = sorted[mid][0];
        const bestLeft = recurse(left, mid);
        const bestRight = recurse(mid, right);
        let best = Math.min(bestLeft, bestRight);
        const strip = [];

        for (let i = left; i < right; i++) {
            if (Math.abs(sorted[i][0] - midX) < best) strip.push(sorted[i]);
        }

        return solveStrip(strip, best);
    }

    return points.length < 2 ? 0 : recurse(0, sorted.length);
}

function maximumSubarray(arr) {
    function recurse(left, right) {
        if (left === right) return arr[left];

        const mid = Math.floor((left + right) / 2);
        let leftBest = -Infinity;
        let sum = 0;

        for (let i = mid; i >= left; i--) {
            sum += arr[i];
            leftBest = Math.max(leftBest, sum);
        }

        let rightBest = -Infinity;
        sum = 0;

        for (let i = mid + 1; i <= right; i++) {
            sum += arr[i];
            rightBest = Math.max(rightBest, sum);
        }

        return Math.max(recurse(left, mid), recurse(mid + 1, right), leftBest + rightBest);
    }

    return arr.length ? recurse(0, arr.length - 1) : 0;
}

function karatsuba(a, b) {
    if (a < 10 || b < 10) return a * b;

    const size = Math.max(String(a).length, String(b).length);
    const half = Math.floor(size / 2);
    const power = 10 ** half;
    const aHigh = Math.floor(a / power);
    const aLow = a % power;
    const bHigh = Math.floor(b / power);
    const bLow = b % power;

    const z0 = karatsuba(aLow, bLow);
    const z2 = karatsuba(aHigh, bHigh);
    const z1 = karatsuba(aLow + aHigh, bLow + bHigh) - z0 - z2;

    return z2 * power * power + z1 * power + z0;
}

function matrixMultiply(a, b) {
    const n = a.length;
    const result = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return result;
}

function strassen(a, b) {
    if (a.length <= 2) return matrixMultiply(a, b);

    const n = a.length;
    const half = n / 2;

    function split(matrix) {
        const topLeft = [];
        const topRight = [];
        const bottomLeft = [];
        const bottomRight = [];

        for (let i = 0; i < half; i++) {
            topLeft.push(matrix[i].slice(0, half));
            topRight.push(matrix[i].slice(half));
            bottomLeft.push(matrix[i + half].slice(0, half));
            bottomRight.push(matrix[i + half].slice(half));
        }

        return [topLeft, topRight, bottomLeft, bottomRight];
    }

    function combine(c11, c12, c21, c22) {
        const result = [];

        for (let i = 0; i < half; i++) {
            result.push(c11[i].concat(c12[i]));
        }

        for (let i = 0; i < half; i++) {
            result.push(c21[i].concat(c22[i]));
        }

        return result;
    }

    function add(x, y) {
        return x.map((row, i) => row.map((value, j) => value + y[i][j]));
    }

    function subtract(x, y) {
        return x.map((row, i) => row.map((value, j) => value - y[i][j]));
    }

    const [a11, a12, a21, a22] = split(a);
    const [b11, b12, b21, b22] = split(b);
    const m1 = strassen(add(a11, a22), add(b11, b22));
    const m2 = strassen(add(a21, a22), b11);
    const m3 = strassen(a11, subtract(b12, b22));
    const m4 = strassen(a22, subtract(b21, b11));
    const m5 = strassen(add(a11, a12), b22);
    const m6 = strassen(subtract(a21, a11), add(b11, b12));
    const m7 = strassen(subtract(a12, a22), add(b21, b22));

    return combine(
        add(subtract(add(m1, m4), m5), m7),
        add(m3, m5),
        add(m2, m4),
        add(subtract(add(m1, m3), m2), m6)
    );
}

function power(base, exponent) {
    if (exponent === 0) return 1;
    const half = power(base, Math.floor(exponent / 2));
    return exponent % 2 ? half * half * base : half * half;
}

function solve() {
    const n = Number(input[index++]);
    const points = readPoints(n);

    return closestPair(points).toFixed(4);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
