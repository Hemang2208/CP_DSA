// https://codeforces.com/problemset/problem/546/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const [k, n, w] = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

const cost = k * (w * (w + 1)) / 2;

console.log((cost - n) >= 0 ? (cost - n) : 0);

// const fs = require("fs");

// const [k, n, w] = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);
// let cost = 0

// for(let i = 1 ; i <= w ; i++) {
// 	cost = cost + (i * k)
// }

// console.log((cost - n) >= 0 ? (cost - n) : 0);