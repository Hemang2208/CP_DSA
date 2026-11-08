// Topic: TWO POINTERS
// Pattern: Opposite / Same Direction Pointers
// Use Cases: Pair and triple sums, container with most water, trapping
// rain water, removing duplicates, merging sorted arrays, squares.
//
// Example Problem: Codeforces 381A - Sereja and Dima
// https://codeforces.com/problemset/problem/381/A
//
// node "TwoPointers.js" < "Input.txt" > "Output.txt"

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

function pairSum(sorted, target) {
    let left = 0;
    let right = sorted.length - 1;

    while (left < right) {
        const sum = sorted[left] + sorted[right];

        if (sum === target) return [sorted[left], sorted[right]];
        if (sum < target) left++;
        else right--;
    }

    return [];
}

function threeSum(arr, target = 0) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < sorted.length - 2; i++) {
        if (i > 0 && sorted[i] === sorted[i - 1]) continue;

        let left = i + 1;
        let right = sorted.length - 1;

        while (left < right) {
            const sum = sorted[i] + sorted[left] + sorted[right];

            if (sum === target) {
                result.push([sorted[i], sorted[left], sorted[right]]);
                left++;
                right--;

                while (left < right && sorted[left] === sorted[left - 1]) left++;
                while (left < right && sorted[right] === sorted[right + 1]) right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

function threeSumClosest(arr, target) {
    const sorted = arr.slice().sort((a, b) => a - b);
    let best = Infinity;

    for (let i = 0; i < sorted.length - 2; i++) {
        let left = i + 1;
        let right = sorted.length - 1;

        while (left < right) {
            const sum = sorted[i] + sorted[left] + sorted[right];

            if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
            if (sum < target) left++;
            else right--;
        }
    }

    return best;
}

function fourSum(arr, target) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < sorted.length - 3; i++) {
        if (i > 0 && sorted[i] === sorted[i - 1]) continue;

        for (let j = i + 1; j < sorted.length - 2; j++) {
            if (j > i + 1 && sorted[j] === sorted[j - 1]) continue;

            let left = j + 1;
            let right = sorted.length - 1;

            while (left < right) {
                const sum = sorted[i] + sorted[j] + sorted[left] + sorted[right];

                if (sum === target) {
                    result.push([sorted[i], sorted[j], sorted[left], sorted[right]]);
                    left++;
                    right--;

                    while (left < right && sorted[left] === sorted[left - 1]) left++;
                    while (left < right && sorted[right] === sorted[right + 1]) right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}

function containerWater(heights) {
    let left = 0;
    let right = heights.length - 1;
    let best = 0;

    while (left < right) {
        best = Math.max(best, Math.min(heights[left], heights[right]) * (right - left));

        if (heights[left] < heights[right]) left++;
        else right--;
    }

    return best;
}

function trapRain(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }

    return water;
}

function removeDuplicates(sorted) {
    let write = 0;

    for (let read = 0; read < sorted.length; read++) {
        if (read === 0 || sorted[read] !== sorted[read - 1]) {
            sorted[write++] = sorted[read];
        }
    }

    return sorted.slice(0, write);
}

function moveZeroes(arr) {
    let write = 0;

    for (let read = 0; read < arr.length; read++) {
        if (arr[read] !== 0) arr[write++] = arr[read];
    }

    while (write < arr.length) arr[write++] = 0;

    return arr;
}

function mergeSorted(a, b) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) result.push(a[i++]);
        else result.push(b[j++]);
    }

    while (i < a.length) result.push(a[i++]);
    while (j < b.length) result.push(b[j++]);

    return result;
}

function unionSorted(a, b) {
    return [...new Set(mergeSorted(a, b))];
}

function intersectionSorted(a, b) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < a.length && j < b.length) {
        if (a[i] === b[j]) {
            result.push(a[i]);
            i++;
            j++;
        } else if (a[i] < b[j]) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

function squaresSorted(arr) {
    const result = new Array(arr.length);
    let left = 0;
    let right = arr.length - 1;

    for (let i = arr.length - 1; i >= 0; i--) {
        if (Math.abs(arr[left]) > Math.abs(arr[right])) {
            result[i] = arr[left] * arr[left];
            left++;
        } else {
            result[i] = arr[right] * arr[right];
            right--;
        }
    }

    return result;
}

// Approach: the only available cards are at the two ends. Each player
// greedily takes the larger end card; pointers move inward until empty.
function playGame(arr) {
    let left = 0;
    let right = arr.length - 1;
    let sereja = 0;
    let dima = 0;
    let turn = 0;

    while (left <= right) {
        let picked;

        if (arr[left] > arr[right]) {
            picked = arr[left];
            left++;
        } else {
            picked = arr[right];
            right--;
        }

        if (turn % 2 === 0) sereja += picked;
        else dima += picked;

        turn++;
    }

    return `${sereja} ${dima}`;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return playGame(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
