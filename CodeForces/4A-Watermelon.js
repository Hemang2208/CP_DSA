// https://codeforces.com/problemset/problem/4/A

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim();
const w = Number(input);
const ans = ( w % 2 === 0 && w > 2 ) ? "YES" : "NO";
console.log(ans);
