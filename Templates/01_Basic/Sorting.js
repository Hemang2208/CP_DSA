// Topic: SORTING
// Pattern: Comparison Sorting (Bubble / Selection / Insertion)
// Use Cases: Small arrays, nearly sorted data, stable ordering,
// interview fundamentals, and greedy-after-sorting problems.
//
// Example Problem: Codeforces 160A - Twins
// https://codeforces.com/problemset/problem/160/A
//
// Every sort returns a new sorted array and never changes the input.
// Numeric helper problems return "N/A" when no valid answer exists.
//
// node "Sorting.js" < "Input.txt" > "Output.txt"

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

// Approach: compare neighbouring values and swap them when they are in the
// wrong order. An early exit keeps the best case linear for sorted input.
// Time: O(n^2) average/worst, O(n) best | Space: O(n) for the copy.
function bubbleSort(arr) {
    const result = arr.slice();

    for (let i = 0; i < result.length; i++) {
        let swapped = false;

        for (let j = 0; j + 1 < result.length - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return result;
}

// Approach: repeatedly find the smallest value in the unsorted part and place
// it at the current position. The number of swaps is always at most n - 1.
// Time: O(n^2) | Space: O(n) for the copy.
function selectionSort(arr) {
    const result = arr.slice();

    for (let i = 0; i < result.length; i++) {
        let minimum = i;

        for (let j = i + 1; j < result.length; j++) {
            if (result[j] < result[minimum]) minimum = j;
        }

        [result[i], result[minimum]] = [result[minimum], result[i]];
    }

    return result;
}

// Approach: grow a sorted prefix. Take the next value, shift larger values one
// step right, and drop the value into the gap that opens up.
// Time: O(n^2) worst, O(n) best | Space: O(n) for the copy.
function insertionSort(arr) {
    const result = arr.slice();

    for (let i = 1; i < result.length; i++) {
        const value = result[i];
        let j = i - 1;

        while (j >= 0 && result[j] > value) {
            result[j + 1] = result[j];
            j--;
        }

        result[j + 1] = value;
    }

    return result;
}

// Approach: find the correct position of each value with binary search, then
// shift the larger values one step right to make room for it. Using <= in the
// search keeps equal values in their original order (stable sort).
// Time: O(n log n) comparisons and O(n^2) shifts | Space: O(n) for the copy.
function binaryInsertionSort(arr) {
    const result = arr.slice();

    for (let i = 1; i < result.length; i++) {
        const value = result[i];
        let low = 0;
        let high = i - 1;

        while (low <= high) {
            const middle = Math.floor((low + high) / 2);

            if (result[middle] <= value) {
                low = middle + 1;
            } else {
                high = middle - 1;
            }
        }

        for (let j = i - 1; j >= low; j--) {
            result[j + 1] = result[j];
        }

        result[low] = value;
    }

    return result;
}

// Approach: a two-way bubble sort. One sweep pushes the largest value to the
// right, the next sweep pushes the smallest value to the left.
// Time: O(n^2) average/worst, O(n) best | Space: O(n) for the copy.
function cocktailShakerSort(arr) {
    const result = arr.slice();
    let left = 0;
    let right = result.length - 1;

    while (left < right) {
        let swapped = false;

        for (let i = left; i < right; i++) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
                swapped = true;
            }
        }

        right--;

        for (let i = right; i > left; i--) {
            if (result[i] < result[i - 1]) {
                [result[i], result[i - 1]] = [result[i - 1], result[i]];
                swapped = true;
            }
        }

        left++;

        if (!swapped) break;
    }

    return result;
}

// Approach: walk forward while values increase. When the current value is
// smaller than the previous one, swap them and step back; otherwise step on.
// Time: O(n^2) worst, O(n) best | Space: O(n) for the copy.
function gnomeSort(arr) {
    const result = arr.slice();
    let i = 1;

    while (i < result.length) {
        if (result[i] < result[i - 1]) {
            [result[i], result[i - 1]] = [result[i - 1], result[i]];
            i--;
        } else {
            i++;
        }
    }

    return result;
}

// Approach: repeat two bubble-like passes, one on even index pairs and one on
// odd index pairs. Turtles (small values near the end) move faster than in a
// plain bubble sort.
// Time: O(n^2) worst, O(n) best | Space: O(n) for the copy.
function oddEvenSort(arr) {
    const result = arr.slice();
    let sorted = false;

    while (!sorted) {
        sorted = true;

        for (let i = 0; i + 1 < result.length; i += 2) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
                sorted = false;
            }
        }

        for (let i = 1; i + 1 < result.length; i += 2) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
                sorted = false;
            }
        }
    }

    return result;
}

// Approach: one compare-and-swap sweep for a fixed gap. It reports whether it
// changed anything so combSort can decide when to stop.
// Time: O(n) | Space: O(1).
function combPass(result, gap) {
    let swapped = false;

    for (let i = 0; i + gap < result.length; i++) {
        if (result[i] > result[i + gap]) {
            [result[i], result[i + gap]] = [result[i + gap], result[i]];
            swapped = true;
        }
    }

    return swapped;
}

// Approach: like bubble sort, but compare values that are far apart first.
// The gap starts near n and shrinks by a factor of 1.3. Gap 1 is always run at
// least once because only adjacent swaps can guarantee a fully sorted array.
// Time: O(n^2) worst, about O(n log n) average | Space: O(n) for the copy.
function combSort(arr) {
    const result = arr.slice();
    let gap = Math.floor(result.length * 10 / 11);

    if (gap < 1) gap = 1;

    while (gap > 1) {
        combPass(result, gap);
        gap = Math.floor(gap / 1.3);
        if (gap < 1) gap = 1;
    }

    let swapped = true;

    while (swapped) {
        swapped = combPass(result, 1);
    }

    return result;
}

// Approach: copy the array and use JavaScript's built-in sort with a numeric
// comparator. Pass true as the second argument for descending order.
// Time: O(n log n) | Space: O(n) for the copy.
function builtInSort(arr, descending = false) {
    const result = arr.slice();

    result.sort((a, b) => {
        if (descending) return b - a;
        return a - b;
    });

    return result;
}

// Approach: walk once and check that each pair is in the requested order.
// Empty and single-element arrays are already sorted.
// Time: O(n) | Space: O(1).
function isSorted(arr, descending = false) {
    for (let i = 1; i < arr.length; i++) {
        if (descending) {
            if (arr[i] > arr[i - 1]) return false;
        } else if (arr[i] < arr[i - 1]) {
            return false;
        }
    }

    return true;
}

// Approach: use the same passes as bubbleSort, but count each swap instead of
// only remembering that a swap happened. The result is also the number of
// adjacent swaps needed to sort the array.
// Time: O(n^2) | Space: O(n) for the copy.
function bubbleSortSwapCount(arr) {
    const result = arr.slice();
    let swaps = 0;

    for (let i = 0; i < result.length; i++) {
        let swapped = false;

        for (let j = 0; j + 1 < result.length - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swaps++;
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return swaps;
}

// Approach: sort a copy, then take the middle value. For an even length the
// median is the average of the two middle values. Returns "N/A" if empty.
// Time: O(n log n) | Space: O(n) for the copy.
function findMedian(arr) {
    if (!arr.length) return "N/A";

    const sorted = builtInSort(arr);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 1) return sorted[middle];
    return (sorted[middle - 1] + sorted[middle]) / 2;
}

// Approach: after sorting, the two closest values must be neighbours, so only
// adjacent pairs need checking. Returns "N/A" with fewer than two values.
// Time: O(n log n) | Space: O(n) for the copy.
function minimumAbsoluteDifference(arr) {
    if (arr.length < 2) return "N/A";

    const sorted = builtInSort(arr);
    let minimum = Infinity;

    for (let i = 1; i < sorted.length; i++) {
        const difference = sorted[i] - sorted[i - 1];

        if (difference < minimum) minimum = difference;
    }

    return minimum;
}

// Approach: walk the already sorted array and keep a value only when it is
// different from the previously kept value.
// Time: O(n) | Space: O(n) for the returned array.
function removeDuplicatesFromSortedArray(arr) {
    const result = [];

    for (const value of arr) {
        if (result.length === 0 || value !== result[result.length - 1]) {
            result.push(value);
        }
    }

    return result;
}

// Approach: track the largest and second largest distinct values in one pass.
// Returns "N/A" when there is no distinct second largest value.
// Time: O(n) | Space: O(1).
function findSecondLargestElement(arr) {
    let largest = -Infinity;
    let second = -Infinity;

    for (const value of arr) {
        if (value > largest) {
            second = largest;
            largest = value;
        } else if (value < largest && value > second) {
            second = value;
        }
    }

    if (second === -Infinity) return "N/A";
    return second;
}

// Approach: sort the coins in ascending order, then take coins from the
// largest end until the collected sum is strictly more than half.
function minimumCoins(arr) {
    const total = arr.reduce((sum, value) => sum + value, 0);
    const sorted = insertionSort(arr);
    let taken = 0;

    for (let i = sorted.length - 1; i >= 0; i--) {
        taken += sorted[i];

        if (taken * 2 > total) {
            return sorted.length - i;
        }
    }

    return sorted.length;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return minimumCoins(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
