// https://codeforces.com/problemset/problem/1374/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];

for (let j = 0; j < t; j++) {
  const x = input[index++];
  const y = input[index++];
  const n = input[index++];

  console.log(Math.floor((n - y) / x) * x + y);
}
