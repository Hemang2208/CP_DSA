// https://codeforces.com/problemset/problem/266/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);
let index = 0;

const n = Number(input[index++]);
const s = String(input[index++]);

let count = 0;
for(let i = 0 ; i < (n - 1) ; i++) {
	if(s[i + 1] === s[i]) count++;
}

console.log(count);