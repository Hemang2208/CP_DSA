// Topic: MEET IN THE MIDDLE
// Pattern: Split Search Space in Half
// Use Cases: Subset sums up to n = 40, count subsets with a target,
// closest subset sum, 4-sum style problems, bidirectional search.
//
// Example Problem: Count Subsets With Sum Equal to Target
// Source: Classic meet in the middle problem.
//
// node "MeetInTheMiddle.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

function subsetSums(arr) {
    const sums = [0];

    for (const value of arr) {
        const length = sums.length;

        for (let i = 0; i < length; i++) {
            sums.push(sums[i] + value);
        }
    }

    return sums;
}

function lowerBound(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = (low + high) >> 1;

        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

function upperBound(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = (low + high) >> 1;

        if (arr[mid] <= target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

// Approach: enumerate subset sums of both halves (2^(n/2) each). For
// every left sum, binary search how many right sums complete the target.
function countSubsets(arr, target) {
    const mid = arr.length >> 1;
    const leftSums = subsetSums(arr.slice(0, mid));
    const rightSums = subsetSums(arr.slice(mid)).sort((a, b) => a - b);
    let count = 0;

    for (const left of leftSums) {
        const need = target - left;
        count += upperBound(rightSums, need) - lowerBound(rightSums, need);
    }

    return count;
}

function solve() {
    const n = Number(input[index++]);
    const target = Number(input[index++]);
    const arr = inputArray(n);

    return countSubsets(arr, target);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
