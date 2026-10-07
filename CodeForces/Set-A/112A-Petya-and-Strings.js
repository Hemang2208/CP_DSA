// https://codeforces.com/problemset/problem/112/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

if (input[0].toLowerCase() === input[1].toLowerCase()) {
  console.log(0);
} else if (input[0].toLowerCase() < input[1].toLowerCase()) {
  console.log(-1);
} else {
  console.log(1);
}
