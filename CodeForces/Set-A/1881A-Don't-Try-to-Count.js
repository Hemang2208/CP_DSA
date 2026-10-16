// https://codeforces.com/problemset/problem/1881/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);

for (let i = 1; i <= t; i++) {
  const n = Number(input[index++]);
  const m = Number(input[index++]);

  let x = String(input[index++]);
  const s = String(input[index++]);

  let flag = 0;

  for (let j = 0; j <= 6; j++) {
    if (x.includes(s)) {
      console.log(j);
      flag = 1;
      break;
    } else {
      x = x + x;
      flag = 0;
    }
    
    if (flag === 1) break;
    if (j === 6) console.log(-1);
  }
}
