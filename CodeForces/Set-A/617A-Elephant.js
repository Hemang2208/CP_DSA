// https://codeforces.com/problemset/problem/617/A

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim();

const x = Number(input);

const ans = Math.ceil(x / 5);

console.log(ans);
