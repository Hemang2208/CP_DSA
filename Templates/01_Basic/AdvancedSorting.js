// Topic: SORTING ALGORITHMS (ADVANCED)
// Pattern: Comparison and Non-Comparison Sorting
// Use Cases: Counting/radix/bucket sort, heap sort, shell sort, cycle
// sort, sort colors, custom comparators, frequency sorting.
//
// Example Problem: Heap Sort and Counting Sort
// Source: Classic sorting exercise.
//
// Every sort returns a new sorted array and never changes the input.
// Numeric helper problems return "N/A" when no valid answer exists.
// Counting-style sorts also return "N/A" when the value range is too large.
//
// node "AdvancedSorting.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

const MAX_COUNTING_RANGE = 100000;

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

// Approach: scan once for both extremes. Iterating avoids spreading a large
// array into Math.min / Math.max, which can hit the argument limit.
// Time: O(n) | Space: O(1).
function getMinMax(arr) {
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    return { min, max };
}

// Approach: counting-based algorithms use values as array indexes, so all
// values must be whole numbers within JavaScript's safe integer range.
// Time: O(n) | Space: O(1).
function areIntegers(arr) {
    for (const value of arr) {
        if (!Number.isSafeInteger(value)) return false;
    }

    return true;
}

// Approach: merge two sorted parts through a shared temporary array, then copy
// the merged values back. Taking a value from the right part means it is
// smaller than every remaining value in the left part, which creates that
// many inversions. Merge sort ignores this count; countInversions uses it.
// Time: O(right - left + 1) | Space: O(n) for the shared temp array.
function mergeRanges(result, temp, left, mid, right) {
    let i = left;
    let j = mid + 1;
    let k = left;
    let inversions = 0;

    while (i <= mid && j <= right) {
        if (result[i] <= result[j]) {
            temp[k] = result[i];
            i++;
        } else {
            temp[k] = result[j];
            inversions += mid - i + 1;
            j++;
        }

        k++;
    }

    while (i <= mid) {
        temp[k] = result[i];
        i++;
        k++;
    }

    while (j <= right) {
        temp[k] = result[j];
        j++;
        k++;
    }

    for (let p = left; p <= right; p++) {
        result[p] = temp[p];
    }

    return inversions;
}

// Approach: Lomuto partition keeps a boundary of values smaller than or equal
// to the pivot. The middle value is moved to the end first, which avoids the
// classic worst case on already sorted input.
// Time: O(high - low + 1) | Space: O(1).
function lomutoPartition(result, low, high) {
    const middle = Math.floor((low + high) / 2);

    [result[middle], result[high]] = [result[high], result[middle]];

    const pivot = result[high];
    let boundary = low;

    for (let i = low; i < high; i++) {
        if (result[i] <= pivot) {
            [result[boundary], result[i]] = [result[i], result[boundary]];
            boundary++;
        }
    }

    [result[boundary], result[high]] = [result[high], result[boundary]];

    return boundary;
}

// Approach: reverse a part of the array in place. Tim sort uses it for
// descending runs and pancake sort uses it to flip a prefix.
// Time: O(right - left + 1) | Space: O(1).
function reverseRange(result, left, right) {
    while (left < right) {
        [result[left], result[right]] = [result[right], result[left]];
        left++;
        right--;
    }
}

// Approach: insertion sort limited to one index range, used by intro sort for
// small partitions.
// Time: O(k^2) for a range of k values | Space: O(1).
function insertionSortRange(result, low, high) {
    for (let i = low + 1; i <= high; i++) {
        const value = result[i];
        let j = i - 1;

        while (j >= low && result[j] > value) {
            result[j + 1] = result[j];
            j--;
        }

        result[j + 1] = value;
    }
}

// Approach: binary insertion sort limited to one index range, used by the
// simplified Tim sort to extend short runs.
// Time: O(k log k) comparisons and O(k^2) shifts | Space: O(1).
function binaryInsertionSortRange(result, low, high) {
    for (let i = low + 1; i <= high; i++) {
        const value = result[i];
        let left = low;
        let right = i - 1;

        while (left <= right) {
            const middle = Math.floor((left + right) / 2);

            if (result[middle] <= value) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }

        for (let j = i - 1; j >= left; j--) {
            result[j + 1] = result[j];
        }

        result[left] = value;
    }
}

// Approach: repeatedly grow the gap between compared values. Later passes
// finish the nearly sorted array with ordinary insertion-style shifts.
// Time: O(n log n) to O(n^2) depending on the gap sequence | Space: O(n) copy.
function shellSort(arr) {
    const result = arr.slice();

    for (let gap = Math.floor(result.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < result.length; i++) {
            const value = result[i];
            let j = i;

            while (j >= gap && result[j - gap] > value) {
                result[j] = result[j - gap];
                j -= gap;
            }

            result[j] = value;
        }
    }

    return result;
}

// Approach: count how many times each integer appears, then write the values
// back in order. The range guard avoids allocating a huge sparse array.
// Returns "N/A" for non-integers or when the range is too large.
// Time: O(n + range) | Space: O(range).
function countingSort(arr) {
    if (!arr.length) return [];
    if (!areIntegers(arr)) return "N/A";

    const { min, max } = getMinMax(arr);
    const range = max - min + 1;

    if (range > MAX_COUNTING_RANGE) return "N/A";

    const counts = new Array(range).fill(0);
    const result = [];

    for (const value of arr) counts[value - min]++;
    for (let i = 0; i < counts.length; i++) {
        while (counts[i] > 0) {
            result.push(i + min);
            counts[i]--;
        }
    }

    return result;
}

// Approach: sort negative values by their absolute value in a reversed order,
// then append the non-negative values. Digit passes are stable, so processing
// one decimal digit at a time from least to most significant works.
// Returns "N/A" for non-integers.
// Time: O(digits * n) | Space: O(n + digits * 10) for the buckets.
function radixSort(arr) {
    if (!arr.length) return [];
    if (!areIntegers(arr)) return "N/A";

    const negatives = [];
    const nonNegatives = [];

    for (const value of arr) {
        if (value < 0) {
            negatives.push(-value);
        } else {
            nonNegatives.push(value);
        }
    }

    const sortedNegatives = radixSortNonNegative(negatives);
    const sortedNonNegatives = radixSortNonNegative(nonNegatives);
    const result = [];

    for (let i = sortedNegatives.length - 1; i >= 0; i--) {
        result.push(-sortedNegatives[i]);
    }

    for (const value of sortedNonNegatives) {
        result.push(value);
    }

    return result;
}

// Approach: the LSB radix pass used by radixSort for one sign group at a time.
// Time: O(digits * n) | Space: O(n + digits * 10).
function radixSortNonNegative(values) {
    if (!values.length) return [];

    const { min, max } = getMinMax(values);
    const maxValue = Math.max(Math.abs(min), Math.abs(max));
    let result = values.slice();

    for (let exp = 1; Math.floor(maxValue / exp) > 0; exp *= 10) {
        const buckets = Array.from({ length: 10 }, () => []);
        const digitOf = (value) => Math.floor(value / exp) % 10;

        for (const value of result) {
            buckets[digitOf(value)].push(value);
        }

        result = buckets.flat();
    }

    return result;
}

// Approach: split values into equal-width buckets, sort each small bucket,
// then join them. Iterating for the extremes avoids Math.min(...arr).
// Time: O(n + buckets) average | Space: O(n + buckets).
function bucketSort(arr, buckets = 5) {
    if (!arr.length) return [];

    const { min, max } = getMinMax(arr);
    const width = (max - min + 1) / buckets || 1;
    const groups = Array.from({ length: buckets }, () => []);

    for (const value of arr) {
        groups[Math.min(buckets - 1, Math.floor((value - min) / width))].push(value);
    }

    return groups.flatMap((group) => group.sort((a, b) => a - b));
}

// Approach: build a max heap, then repeatedly move its largest value to the
// end and restore the heap in the remaining part.
// Time: O(n log n) | Space: O(n) for the copy (the heap itself is in-place).
function heapSort(arr) {
    const result = arr.slice();
    const n = result.length;

    function heapify(size, root) {
        let largest = root;
        const left = 2 * root + 1;
        const right = 2 * root + 2;

        if (left < size && result[left] > result[largest]) largest = left;
        if (right < size && result[right] > result[largest]) largest = right;

        if (largest !== root) {
            [result[root], result[largest]] = [result[largest], result[root]];
            heapify(size, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

    for (let end = n - 1; end > 0; end--) {
        [result[0], result[end]] = [result[end], result[0]];
        heapify(end, 0);
    }

    return result;
}

// Approach: each value is placed in its final position directly, so the array
// is written as few times as possible. Useful when writes are expensive.
// Time: O(n^2) | Space: O(n) for the copy.
function cycleSort(arr) {
    const result = arr.slice();
    let writes = 0;

    for (let start = 0; start < result.length - 1; start++) {
        let item = result[start];
        let pos = start;

        for (let i = start + 1; i < result.length; i++) {
            if (result[i] < item) pos++;
        }

        if (pos === start) continue;

        while (item === result[pos]) pos++;
        [result[pos], item] = [item, result[pos]];
        writes++;

        while (pos !== start) {
            pos = start;

            for (let i = start + 1; i < result.length; i++) {
                if (result[i] < item) pos++;
            }

            while (item === result[pos]) pos++;
            [result[pos], item] = [item, result[pos]];
            writes++;
        }
    }

    return result;
}

// Approach: validate first, then use three pointers. low stores 0s, high stores
// 2s, and middle scans the unknown area. Invalid input returns "N/A".
// Time: O(n) | Space: O(n) for the copy.
function dutchNationalFlag(arr) {
    const result = arr.slice();

    for (const value of result) {
        if (value !== 0 && value !== 1 && value !== 2) return "N/A";
    }

    let low = 0;
    let middle = 0;
    let high = result.length - 1;

    while (middle <= high) {
        if (result[middle] === 0) {
            [result[low], result[middle]] = [result[middle], result[low]];
            low++;
            middle++;
        } else if (result[middle] === 1) {
            middle++;
        } else {
            [result[middle], result[high]] = [result[high], result[middle]];
            high--;
        }
    }

    return result;
}

// Approach: count each value once, then sort by frequency. Ties are broken by
// value so the output is predictable. Kept as a wrapper for existing callers.
// Time: O(n log n) | Space: O(n).
function sortByFrequency(arr) {
    return frequencySortDescending(arr);
}

// Approach: hand a copy to JavaScript's built-in sort with a custom rule.
// Time: O(n log n) | Space: O(n) for the copy.
function sortWithComparator(arr, comparator) {
    return arr.slice().sort(comparator);
}

// Approach: split the array in half, sort each half recursively, then merge the
// two sorted halves. Small halves stop at one element.
// Time: O(n log n) | Space: O(n) for the copy and temp array.
function mergeSortTopDown(arr) {
    const result = arr.slice();
    const temp = new Array(result.length);

    function sortRange(left, right) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);

        sortRange(left, mid);
        sortRange(mid + 1, right);
        mergeRanges(result, temp, left, mid, right);
    }

    sortRange(0, result.length - 1);

    return result;
}

// Approach: start with sorted blocks of width 1 and merge neighbouring blocks
// into widths 2, 4, 8 ... until the whole array is sorted. No recursion needed.
// Time: O(n log n) | Space: O(n) for the copy and temp array.
function mergeSortBottomUp(arr) {
    const result = arr.slice();
    const temp = new Array(result.length);
    let width = 1;

    while (width < result.length) {
        for (let left = 0; left < result.length; left += 2 * width) {
            const mid = Math.min(left + width - 1, result.length - 1);
            const right = Math.min(left + 2 * width - 1, result.length - 1);

            if (mid < right) {
                mergeRanges(result, temp, left, mid, right);
            }
        }

        width *= 2;
    }

    return result;
}

// Approach: recursively apply Lomuto partition. Every partition puts one pivot
// in its final place, so the two sides can be sorted independently.
// Time: O(n log n) average, O(n^2) worst | Space: O(n) recursion stack.
function quickSortLomuto(arr) {
    const result = arr.slice();

    function sortRange(low, high) {
        if (low >= high) return;

        const pivotIndex = lomutoPartition(result, low, high);

        sortRange(low, pivotIndex - 1);
        sortRange(pivotIndex + 1, high);
    }

    sortRange(0, result.length - 1);

    return result;
}

// Approach: Hoare partition uses two pointers that move towards each other and
// swaps out-of-order values. The pivot is the middle value of the range.
// Time: O(n log n) average, O(n^2) worst | Space: O(n) recursion stack.
function quickSortHoare(arr) {
    const result = arr.slice();

    function partition(low, high) {
        const pivot = result[Math.floor((low + high) / 2)];
        let i = low - 1;
        let j = high + 1;

        while (true) {
            do {
                i++;
            } while (result[i] < pivot);

            do {
                j--;
            } while (result[j] > pivot);

            if (i >= j) return j;

            [result[i], result[j]] = [result[j], result[i]];
        }
    }

    function sortRange(low, high) {
        if (low >= high) return;

        const split = partition(low, high);

        sortRange(low, split);
        sortRange(split + 1, high);
    }

    sortRange(0, result.length - 1);

    return result;
}

// Approach: quick sort with a safety net. Small ranges use insertion sort, and
// when recursion gets too deep the range is finished with heap sort. This gives
// the O(n log n) worst-case guarantee of introsort.
// Time: O(n log n) worst | Space: O(n) for the copy and recursion stack.
function introSort(arr) {
    const result = arr.slice();
    const depthLimit = 2 * Math.floor(Math.log2(result.length || 1));

    function sortRange(low, high, depth) {
        const size = high - low + 1;

        if (size <= 16) {
            insertionSortRange(result, low, high);
            return;
        }

        if (depth === 0) {
            const sortedPart = heapSort(result.slice(low, high + 1));

            for (let i = 0; i < sortedPart.length; i++) {
                result[low + i] = sortedPart[i];
            }

            return;
        }

        const pivotIndex = lomutoPartition(result, low, high);

        sortRange(low, pivotIndex - 1, depth - 1);
        sortRange(pivotIndex + 1, high, depth - 1);
    }

    sortRange(0, result.length - 1, depthLimit);

    return result;
}

// Approach: a simplified Tim sort. Find ascending or descending runs, reverse
// descending ones, extend short runs with binary insertion sort, then merge
// neighbouring runs. Real Tim sort adds more run rules; this is the core idea.
// Time: O(n log n) | Space: O(n) for the copy, temp array, and run list.
function simplifiedTimSort(arr) {
    const result = arr.slice();
    const n = result.length;
    const temp = new Array(n);
    const minRun = 32;
    const runs = [];
    let start = 0;

    while (start < n) {
        let end = start + 1;

        if (end < n && result[end] < result[end - 1]) {
            while (end < n && result[end] < result[end - 1]) end++;
            reverseRange(result, start, end - 1);
        } else {
            while (end < n && result[end] >= result[end - 1]) end++;
        }

        if (end - start < minRun) {
            const limit = Math.min(n, start + minRun);

            binaryInsertionSortRange(result, start, limit - 1);
            end = limit;
        }

        runs.push([start, end - 1]);
        start = end;
    }

    let mergedRuns = runs;

    while (mergedRuns.length > 1) {
        const nextRuns = [];

        for (let i = 0; i < mergedRuns.length; i += 2) {
            if (i + 1 === mergedRuns.length) {
                nextRuns.push(mergedRuns[i]);
            } else {
                const first = mergedRuns[i];
                const second = mergedRuns[i + 1];

                mergeRanges(result, temp, first[0], first[1], second[1]);
                nextRuns.push([first[0], second[1]]);
            }
        }

        mergedRuns = nextRuns;
    }

    return result;
}

// Approach: pigeonhole sort and counting sort place values into slots by key.
// Reuse countingSort so the integer and range checks stay in one place.
// Time: O(n + range) | Space: O(range).
function pigeonholeSort(arr) {
    return countingSort(arr);
}

// Approach: find the largest value in the unsorted prefix, move it to the front
// with one flip, then flip the whole prefix to send it to its final position.
// Time: O(n^2) | Space: O(n) for the copy.
function pancakeSort(arr) {
    const result = arr.slice();

    for (let size = result.length; size > 1; size--) {
        let maxIndex = 0;

        for (let i = 1; i < size; i++) {
            if (result[i] > result[maxIndex]) maxIndex = i;
        }

        if (maxIndex === size - 1) continue;

        if (maxIndex > 0) reverseRange(result, 0, maxIndex);
        reverseRange(result, 0, size - 1);
    }

    return result;
}

// Approach: sort the first and last values, then sort overlapping two-thirds
// pieces recursively. Educational only: it is extremely slow even for modest
// arrays, so never use it in real code.
// Time: about O(n^2.71) | Space: O(n) copy plus O(log n) recursion stack.
function stoogeSort(arr) {
    const result = arr.slice();

    function sortRange(left, right) {
        if (left >= right) return;

        if (result[left] > result[right]) {
            [result[left], result[right]] = [result[right], result[left]];
        }

        if (right - left + 1 > 2) {
            const third = Math.floor((right - left + 1) / 3);

            sortRange(left, right - third);
            sortRange(left + third, right);
            sortRange(left, right - third);
        }
    }

    sortRange(0, result.length - 1);

    return result;
}

// Approach: use a fixed compare-and-swap network. Small alternating up/down
// sequences are merged into bigger ones until the whole array is sorted.
// Only powers of two are supported; other sizes return "N/A".
// Time: O(n log^2 n) | Space: O(n) for the copy.
function bitonicSort(arr) {
    const n = arr.length;

    if (n === 0) return [];
    if (!isPowerOfTwo(n)) return "N/A";

    const result = arr.slice();
    let size = 2;

    while (size <= n) {
        let step = Math.floor(size / 2);

        while (step > 0) {
            for (let block = 0; block < n; block += size) {
                const ascending = Math.floor(block / size) % 2 === 0;

                for (let start = block; start < block + size; start += 2 * step) {
                    for (let i = start; i < start + step; i++) {
                        const partner = i + step;
                        const wrongOrder = ascending
                            ? result[i] > result[partner]
                            : result[i] < result[partner];

                        if (wrongOrder) {
                            [result[i], result[partner]] = [result[partner], result[i]];
                        }
                    }
                }
            }

            step = Math.floor(step / 2);
        }

        size *= 2;
    }

    return result;
}

// Approach: check powers of two by doubling from 1, avoiding bitwise tricks.
// Time: O(log n) | Space: O(1).
function isPowerOfTwo(value) {
    let current = 1;

    while (current < value) {
        current *= 2;
    }

    return current === value;
}

// Approach: insert every value into a binary search tree (duplicates go right),
// then do an in-order walk, which visits the values in sorted order.
// Time: O(n log n) average, O(n^2) worst | Space: O(n) for the tree.
function treeSort(arr) {
    const result = [];

    function insertValue(root, value) {
        if (root === null) return { value, left: null, right: null };

        if (value < root.value) {
            root.left = insertValue(root.left, value);
        } else {
            root.right = insertValue(root.right, value);
        }

        return root;
    }

    function collectValues(node) {
        if (node === null) return;

        collectValues(node.left);
        result.push(node.value);
        collectValues(node.right);
    }

    let root = null;

    for (const value of arr) {
        root = insertValue(root, value);
    }

    collectValues(root);

    return result;
}

// Approach: partition around a pivot and continue only in the side that holds
// the wanted index. k is 1-based here, so the internal target is k - 1.
// Time: O(n) average, O(n^2) worst | Space: O(1) besides the copy.
function quickSelect(arr, target) {
    const result = arr.slice();
    let low = 0;
    let high = result.length - 1;

    while (low <= high) {
        const pivotIndex = lomutoPartition(result, low, high);

        if (pivotIndex === target) return result[pivotIndex];

        if (target < pivotIndex) {
            high = pivotIndex - 1;
        } else {
            low = pivotIndex + 1;
        }
    }

    return "N/A";
}

// Approach: k starts at 1 for the smallest value. Out-of-range k returns "N/A".
// Time: O(n) average | Space: O(n) for the copy.
function quickSelectKthSmallest(arr, k) {
    if (k < 1 || k > arr.length) return "N/A";
    return quickSelect(arr, k - 1);
}

// Approach: the kth largest is the (n - k + 1)th smallest. Out-of-range k
// returns "N/A".
// Time: O(n) average | Space: O(n) for the copy.
function quickSelectKthLargest(arr, k) {
    if (k < 1 || k > arr.length) return "N/A";
    return quickSelect(arr, arr.length - k);
}

// Approach: count each value, then sort by its frequency. Equal frequencies
// are ordered by value so results are stable and easy to read.
// Time: O(n log n) | Space: O(n).
function sortByFrequencyOrder(arr, ascending) {
    const counts = new Map();

    for (const value of arr) counts.set(value, (counts.get(value) || 0) + 1);

    return arr.slice().sort((a, b) => {
        const frequencyDifference = counts.get(a) - counts.get(b);

        if (frequencyDifference !== 0) {
            if (ascending) return frequencyDifference;
            return -frequencyDifference;
        }

        return a - b;
    });
}

// Approach: fewer occurrences come first, ties broken by value.
// Time: O(n log n) | Space: O(n).
function frequencySortAscending(arr) {
    return sortByFrequencyOrder(arr, true);
}

// Approach: more occurrences come first, ties broken by value.
// Time: O(n log n) | Space: O(n).
function frequencySortDescending(arr) {
    return sortByFrequencyOrder(arr, false);
}

// Approach: compare absolute values first, then the real values so that -3
// appears before 3.
// Time: O(n log n) | Space: O(n) for the copy.
function sortByAbsoluteValue(arr) {
    return arr.slice().sort((a, b) => {
        const magnitudeDifference = Math.abs(a) - Math.abs(b);

        if (magnitudeDifference !== 0) return magnitudeDifference;
        return a - b;
    });
}

// Approach: sort by parity first (0 for even, 1 for odd) and by value second.
// Math.abs handles negative odd numbers correctly.
// Time: O(n log n) | Space: O(n) for the copy.
function sortEvensBeforeOdds(arr) {
    return arr.slice().sort((a, b) => {
        const parityA = Math.abs(a) % 2;
        const parityB = Math.abs(b) % 2;

        if (parityA !== parityB) return parityA - parityB;
        return a - b;
    });
}

// Approach: treat the number as an unsigned 32-bit value, then count how many
// of its bits are 1 by repeatedly dividing by 2.
// Time: O(log n) per value | Space: O(1).
function countSetBits(value) {
    let bits = value >>> 0;
    let count = 0;

    while (bits > 0) {
        count += bits % 2;
        bits = Math.floor(bits / 2);
    }

    return count;
}

// Approach: sort by the number of 1 bits, then by value to break ties.
// Time: O(n log n) | Space: O(n) for the copy.
function sortBySetBits(arr) {
    return arr.slice().sort((a, b) => {
        const bitDifference = countSetBits(a) - countSetBits(b);

        if (bitDifference !== 0) return bitDifference;
        return a - b;
    });
}

// Approach: compare two strings by trying both orders (a+b and b+a). The order
// that gives the larger concatenation comes first. Returns "N/A" for invalid
// input and a string result, since the answer can be very large.
// Time: O(n log n * digits) | Space: O(n * digits).
function largestNumberFormation(arr) {
    if (!arr.length) return "N/A";
    if (!areIntegers(arr)) return "N/A";

    for (const value of arr) {
        if (value < 0) return "N/A";
    }

    const parts = arr.map(String);

    parts.sort((a, b) => {
        const orderAB = a + b;
        const orderBA = b + a;

        if (orderAB > orderBA) return -1;
        if (orderAB < orderBA) return 1;
        return 0;
    });

    if (parts[0] === "0") return "0";
    return parts.join("");
}

// Approach: sort ascending, then swap every adjacent pair starting at index 1.
// This gives nums[0] <= nums[1] >= nums[2] <= nums[3] ... , a valid wiggle.
// Time: O(n log n) | Space: O(n) for the copy.
function wiggleSort(arr) {
    const result = arr.slice();

    result.sort((a, b) => a - b);

    for (let i = 1; i + 1 < result.length; i += 2) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
    }

    return result;
}

// Approach: use merge sort and add up the inversions reported by each merge.
// An inversion is a pair (i, j) with i < j and arr[i] > arr[j].
// Time: O(n log n) | Space: O(n) for the copy and temp array.
function countInversions(arr) {
    const result = arr.slice();
    const temp = new Array(result.length);
    let inversions = 0;

    function sortRange(left, right) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);

        sortRange(left, mid);
        sortRange(mid + 1, right);
        inversions += mergeRanges(result, temp, left, mid, right);
    }

    sortRange(0, result.length - 1);

    return inversions;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return `${heapSort(arr).join(" ")}\n${countingSort(arr).join(" ")}\n${sortByFrequency(arr).join(" ")}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
