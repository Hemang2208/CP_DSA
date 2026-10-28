// https://codeforces.com/problemset/problem/16/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;

const n = Number(input[index++]);
const m = Number(input[index++]);
const t = n * m;

// let arr = input.slice(index, index + n).join("").split("");

let prevColor = null;

for (let i = 0; i < n; i++) {
    let row = input[index++];
    
    let firstChar = row[0];
    for (let j = 1; j < m; j++) {
        if (row[j] !== firstChar) {
            console.log("NO");
            return;
        }
    }
    
    if (firstChar === prevColor) {
        console.log("NO");
        return;
    }
    
    prevColor = firstChar;
}

console.log("YES");