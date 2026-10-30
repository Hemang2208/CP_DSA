// https://codeforces.com/problemset/problem/281/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim()

console.log(input[0].toUpperCase() + input.slice(1, input.length))