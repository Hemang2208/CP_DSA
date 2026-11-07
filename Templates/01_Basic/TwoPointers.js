// Topic: TWO POINTERS
// Pattern: Opposite Direction Pointers
// Use Cases: Pair sum in sorted array, palindrome checks,
// container with most water, taking from both ends greedily.
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
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
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

        if (turn % 2 === 0) {
            sereja += picked;
        } else {
            dima += picked;
        }

        turn++;
    }

    return sereja + " " + dima;
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
