// Topic: ARRAY ALGORITHMS
// Pattern: Majority / Next Permutation / Rotation / Subarray Scans
// Use Cases: Boyer-Moore majority, inverse permutation, next permutation,
// rotation, product except self, stock profit, circular subarrays,
// merge intervals, maximum product subarray.
//
// Example Problem: Next Permutation
// Source: Classic next-permutation exercise.
//
// node "ArrayAlgorithms.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function boyerMooreMajority(arr) {
    let candidate = null;
    let count = 0;

    for (const value of arr) {
        if (count === 0) candidate = value;
        count += value === candidate ? 1 : -1;
    }

    const frequency = arr.filter((value) => value === candidate).length;
    return frequency * 2 > arr.length ? candidate : -1;
}

function inversePermutation(arr) {
    const position = new Array(arr.length + 1).fill(0);

    for (let i = 0; i < arr.length; i++) {
        position[arr[i]] = i + 1;
    }

    return position.slice(1);
}

function nextPermutation(arr) {
    let pivot = arr.length - 2;

    while (pivot >= 0 && arr[pivot] >= arr[pivot + 1]) pivot--;

    if (pivot >= 0) {
        let successor = arr.length - 1;
        while (arr[successor] <= arr[pivot]) successor--;
        [arr[pivot], arr[successor]] = [arr[successor], arr[pivot]];
    }

    for (let left = pivot + 1, right = arr.length - 1; left < right; left++, right--) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    }

    return arr;
}

function rotateRight(arr, k) {
    const n = arr.length;
    if (n === 0) return arr;
    k %= n;

    function reverse(left, right) {
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    reverse(0, n - 1);
    reverse(0, k - 1);
    reverse(k, n - 1);
    return arr;
}

function maximumProductSubarray(arr) {
    let maximum = arr[0];
    let minimum = arr[0];
    let best = arr[0];

    for (let i = 1; i < arr.length; i++) {
        const candidates = [arr[i], maximum * arr[i], minimum * arr[i]];
        maximum = Math.max(...candidates);
        minimum = Math.min(...candidates);
        best = Math.max(best, maximum);
    }

    return best;
}

function productExceptSelf(arr) {
    const n = arr.length;
    const result = new Array(n).fill(1);
    let prefix = 1;

    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= arr[i];
    }

    let suffix = 1;

    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= arr[i];
    }

    return result;
}

function stockMaximumProfit(prices) {
    let minimum = Infinity;
    let profit = 0;

    for (const price of prices) {
        minimum = Math.min(minimum, price);
        profit = Math.max(profit, price - minimum);
    }

    return profit;
}

function maximumCircularSubarray(arr) {
    function kadane(values) {
        let best = -Infinity;
        let current = 0;

        for (const value of values) {
            current = Math.max(value, current + value);
            best = Math.max(best, current);
        }

        return best;
    }

    const total = arr.reduce((sum, value) => sum + value, 0);
    const maximum = kadane(arr);
    if (maximum < 0) return maximum;
    const minimum = -kadane(arr.map((value) => -value));
    return Math.max(maximum, total - minimum);
}

function mergeIntervals(intervals) {
    const sorted = intervals.map((interval) => interval.slice()).sort((a, b) => a[0] - b[0]);
    const merged = [];

    for (const interval of sorted) {
        if (!merged.length || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
        }
    }

    return merged;
}

function solve() {
    const n = Number(input[index++]);
    const arr = [];

    for (let i = 0; i < n; i++) arr.push(Number(input[index++]));

    return nextPermutation(arr).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
