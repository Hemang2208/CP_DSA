// Topic: SORTING ALGORITHMS (ADVANCED)
// Pattern: Comparison and Non-Comparison Sorting
// Use Cases: Counting/radix/bucket sort, heap sort, shell sort, cycle
// sort, sort colors, custom comparators, frequency sorting.
//
// Example Problem: Heap Sort and Counting Sort
// Source: Classic sorting exercise.
//
// node "AdvancedSorting.js" < "Input.txt" > "Output.txt"

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

function countingSort(arr) {
    if (!arr.length) return [];
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const counts = new Array(max - min + 1).fill(0);
    const result = [];

    for (const value of arr) counts[value - min]++;
    for (let i = 0; i < counts.length; i++) {
        while (counts[i]-- > 0) result.push(i + min);
    }

    return result;
}

function radixSort(arr) {
    let result = arr.slice();

    for (let exp = 1; Math.max(...result) >= exp; exp *= 10) {
        const buckets = Array.from({ length: 10 }, () => []);

        for (const value of result) {
            buckets[Math.floor(value / exp) % 10].push(value);
        }

        result = buckets.flat();
    }

    return result;
}

function bucketSort(arr, buckets = 5) {
    if (!arr.length) return [];
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const width = (max - min + 1) / buckets || 1;
    const groups = Array.from({ length: buckets }, () => []);

    for (const value of arr) {
        groups[Math.min(buckets - 1, Math.floor((value - min) / width))].push(value);
    }

    return groups.flatMap((group) => group.sort((a, b) => a - b));
}

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

function dutchNationalFlag(arr) {
    const result = arr.slice();
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

function sortByFrequency(arr) {
    const counts = new Map();

    for (const value of arr) counts.set(value, (counts.get(value) || 0) + 1);

    return arr.slice().sort((a, b) => {
        const difference = counts.get(b) - counts.get(a);
        return difference || a - b;
    });
}

function sortWithComparator(arr, comparator) {
    return arr.slice().sort(comparator);
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
