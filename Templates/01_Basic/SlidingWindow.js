// Topic: SLIDING WINDOW
// Pattern: Fixed and Variable Size Windows
// Use Cases: Window sums and averages, longest unique substring,
// K distinct characters, minimum window substring, anagram counting,
// smallest subarray with a target sum, consecutive ones.
//
// Example Problem: Codeforces 363B - Fence
// https://codeforces.com/problemset/problem/363/B
//
// node "SlidingWindow.js" < "Input.txt" > "Output.txt"

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

function maximumSumK(arr, k) {
    let windowSum = 0;
    let best = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        if (i >= k) windowSum -= arr[i - k];
        if (i >= k - 1) best = Math.max(best, windowSum);
    }

    return best;
}

function minimumSumK(arr, k) {
    let windowSum = 0;
    let best = Infinity;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        if (i >= k) windowSum -= arr[i - k];
        if (i >= k - 1) best = Math.min(best, windowSum);
    }

    return best;
}

function maximumAverage(arr, k) {
    let windowSum = 0;
    let best = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        if (i >= k) windowSum -= arr[i - k];
        if (i >= k - 1) best = Math.max(best, windowSum / k);
    }

    return best;
}

function longestNoRepeat(arr) {
    const last = new Map();
    let left = 0;
    let best = 0;

    for (let right = 0; right < arr.length; right++) {
        if (last.has(arr[right]) && last.get(arr[right]) >= left) {
            left = last.get(arr[right]) + 1;
        }

        last.set(arr[right], right);
        best = Math.max(best, right - left + 1);
    }

    return best;
}

function longestKDistinct(arr, k) {
    const counts = new Map();
    let left = 0;
    let best = 0;

    for (let right = 0; right < arr.length; right++) {
        counts.set(arr[right], (counts.get(arr[right]) || 0) + 1);

        while (counts.size > k) {
            const old = arr[left++];
            counts.set(old, counts.get(old) - 1);
            if (counts.get(old) === 0) counts.delete(old);
        }

        best = Math.max(best, right - left + 1);
    }

    return best;
}

function minimumWindowSubstring(text, pattern) {
    if (pattern.length > text.length) return "";

    const need = new Map();
    const window = new Map();

    for (const ch of pattern) {
        need.set(ch, (need.get(ch) || 0) + 1);
    }

    let left = 0;
    let formed = 0;
    let best = [Infinity, 0, 0];

    for (let right = 0; right < text.length; right++) {
        const ch = text[right];
        window.set(ch, (window.get(ch) || 0) + 1);

        if (need.has(ch) && window.get(ch) === need.get(ch)) formed++;

        while (formed === need.size) {
            if (right - left + 1 < best[0]) {
                best = [right - left + 1, left, right];
            }

            const old = text[left++];
            window.set(old, window.get(old) - 1);

            if (need.has(old) && window.get(old) < need.get(old)) formed--;
        }
    }

    return best[0] === Infinity ? "" : text.slice(best[1], best[2] + 1);
}

function characterReplacement(s, k) {
    const counts = new Map();
    let left = 0;
    let best = 0;
    let maxCount = 0;

    for (let right = 0; right < s.length; right++) {
        counts.set(s[right], (counts.get(s[right]) || 0) + 1);
        maxCount = Math.max(maxCount, counts.get(s[right]));

        while (right - left + 1 - maxCount > k) {
            counts.set(s[left], counts.get(s[left]) - 1);
            left++;
        }

        best = Math.max(best, right - left + 1);
    }

    return best;
}

function countAnagramWindows(text, pattern) {
    if (pattern.length > text.length) return 0;

    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);
    let count = 0;

    for (const ch of pattern) {
        need[ch.charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < text.length; i++) {
        window[text.charCodeAt(i) - 97]++;

        if (i >= pattern.length) {
            window[text.charCodeAt(i - pattern.length) - 97]--;
        }

        if (i >= pattern.length - 1 && need.every((value, j) => value === window[j])) {
            count++;
        }
    }

    return count;
}

function smallestSubarraySum(arr, target) {
    let left = 0;
    let sum = 0;
    let best = Infinity;

    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];

        while (sum >= target) {
            best = Math.min(best, right - left + 1);
            sum -= arr[left++];
        }
    }

    return best === Infinity ? -1 : best;
}

function maxConsecutiveOnes(arr, k) {
    let left = 0;
    let zeros = 0;
    let best = 0;

    for (let right = 0; right < arr.length; right++) {
        if (arr[right] === 0) zeros++;

        while (zeros > k) {
            if (arr[left] === 0) zeros--;
            left++;
        }

        best = Math.max(best, right - left + 1);
    }

    return best;
}

function fruitIntoBaskets(arr) {
    return longestKDistinct(arr, 2);
}

function atMostKDistinct(arr, k) {
    return longestKDistinct(arr, k);
}

function exactlyKDistinct(arr, k) {
    return longestKDistinct(arr, k) - longestKDistinct(arr, k - 1);
}

function countNiceSubarrays(arr, k) {
    const prefix = new Map([[0, 1]]);
    let odds = 0;
    let count = 0;

    for (const value of arr) {
        odds += value % 2;
        count += prefix.get(odds - k) || 0;
        prefix.set(odds, (prefix.get(odds) || 0) + 1);
    }

    return count;
}

// Approach: build the first window sum, then slide it by removing the
// outgoing element and adding the incoming one. Track the smallest sum.
function minimumWindowStart(heights, k) {
    let windowSum = 0;

    for (let i = 0; i < k; i++) {
        windowSum += heights[i];
    }

    let bestSum = windowSum;
    let bestStart = 1;

    for (let i = k; i < heights.length; i++) {
        windowSum += heights[i] - heights[i - k];

        if (windowSum < bestSum) {
            bestSum = windowSum;
            bestStart = i - k + 2;
        }
    }

    return bestStart;
}

function solve() {
    const n = Number(input[index++]);
    const k = Number(input[index++]);
    const heights = inputArray(n);

    return minimumWindowStart(heights, k);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
