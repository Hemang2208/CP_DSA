// Topic: SEARCHING ALGORITHMS (ADVANCED)
// Pattern: Rotated Arrays / Peak Finding / Binary Search on the Answer
// Use Cases: Rotated search, minimum in rotated array, peak finding,
// ternary/jump/exponential search, Koko, integer roots, median.
//
// Example Problem: Search in a Rotated Array and Find a Peak
// Source: Classic binary search problems (LeetCode 33 / 162).
//
// node "AdvancedSearching.js" < "Input.txt" > "Output.txt"

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

function searchRotated(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;

        if (arr[left] <= arr[mid]) {
            if (arr[left] <= target && target < arr[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (arr[mid] < target && target <= arr[right]) left = mid + 1;
            else right = mid - 1;
        }
    }

    return -1;
}

function findMinRotated(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] > arr[right]) left = mid + 1;
        else right = mid;
    }

    return arr[left];
}

function peakElement(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < arr[mid + 1]) left = mid + 1;
        else right = mid;
    }

    return left;
}

function ternarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const third = Math.floor((right - left) / 3);
        const mid1 = left + third;
        const mid2 = right - third;

        if (arr[mid1] === target) return mid1;
        if (arr[mid2] === target) return mid2;

        if (target < arr[mid1]) right = mid1 - 1;
        else if (target > arr[mid2]) left = mid2 + 1;
        else {
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }

    return -1;
}

function jumpSearch(arr, target) {
    const n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }

    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }

    return arr[prev] === target ? prev : -1;
}

function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;

    let bound = 1;

    while (bound < arr.length && arr[bound] <= target) {
        bound *= 2;
    }

    let left = Math.floor(bound / 2);
    let right = Math.min(bound, arr.length - 1);

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}

function integerSqrt(n) {
    let left = 0;
    let right = n;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (mid * mid <= n) left = mid + 1;
        else right = mid - 1;
    }

    return right;
}

function kokoEatingSpeed(piles, hours) {
    let left = 1;
    let right = Math.max(...piles);

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        let needed = 0;

        for (const pile of piles) {
            needed += Math.ceil(pile / mid);
        }

        if (needed <= hours) right = mid;
        else left = mid + 1;
    }

    return left;
}

function medianTwoSorted(a, b) {
    if (a.length > b.length) return medianTwoSorted(b, a);

    const total = a.length + b.length;
    const half = Math.floor((total + 1) / 2);
    let left = 0;
    let right = a.length;

    while (left <= right) {
        const i = Math.floor((left + right) / 2);
        const j = half - i;
        const aLeft = i > 0 ? a[i - 1] : -Infinity;
        const aRight = i < a.length ? a[i] : Infinity;
        const bLeft = j > 0 ? b[j - 1] : -Infinity;
        const bRight = j < b.length ? b[j] : Infinity;

        if (aLeft <= bRight && bLeft <= aRight) {
            if (total % 2 === 1) return Math.max(aLeft, bLeft);
            return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
        }

        if (aLeft > bRight) right = i - 1;
        else left = i + 1;
    }

    return -1;
}

function solve() {
    const n = Number(input[index++]);
    const target = Number(input[index++]);
    const arr = inputArray(n);

    return `${searchRotated(arr, target)} ${peakElement(arr)} ${findMinRotated(arr)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
