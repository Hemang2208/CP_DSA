// https://codeforces.com/problemset/problem/71/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);

for (let i = 1; i <= t; i++) {
	const word = String(input[index++]);
	const len = word.length;
	if(len > 10) console.log(word[0] + "" + (len - 2) + "" + word[len - 1]);
	else console.log(word)
}