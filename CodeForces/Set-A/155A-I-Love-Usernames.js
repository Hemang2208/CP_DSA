// https://codeforces.com/problemset/problem/155/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
// const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

function countRecords(arr) {
    let best = arr[0];
    let worst = arr[0];
    let records = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > best) {
            best = arr[i];
            records++;
        } else if (arr[i] < worst) {
            worst = arr[i];
            records++;
        }
    }

    return records;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return countRecords(arr);
}

// for (let i = 0; i < t; i++) {
    outcomes.push(solve());
// }

console.log(outcomes.join("\n"));
