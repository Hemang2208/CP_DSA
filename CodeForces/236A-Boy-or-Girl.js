// https://codeforces.com/problemset/problem/236/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim();
const distinctCount = new Set(input).size;

const final = distinctCount % 2 === 0 ? "CHAT WITH HER!" : "IGNORE HIM!";

console.log(final);
