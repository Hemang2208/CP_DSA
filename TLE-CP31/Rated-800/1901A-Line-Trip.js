// https://codeforces.com/problemset/problem/1901/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];

for (let i = 1; i <= t; i++) {
  const n = input[index++];
  const x = input[index++];
  const arr = [];

  for (let j = 1; j <= n; j++) {
    arr.push(input[index++]);
  }

  let count = 0, final = 0, p = 0;

  for (let k = 1; k <= x; k++) {
    count++;

    if (arr[p] === k) {
      final = Math.max(final, count);
      count = 0;
      p++;
    }
  }

  p = arr.length - 1;

  for (let l = x - 1; l >= 0; l--) {
    count++;
    
    if (arr[p] === l) {
      final = Math.max(final, count);
      count = 0;
      p--;
    }
  }

  console.log(final);
}
