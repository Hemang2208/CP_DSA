// https://codeforces.com/problemset/problem/158/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const scores = [];
const n = Number(input[index++]);
const k = Number(input[index++]);

for(let i = 1 ; i <= n ; i++) {
	const a = Number(input[index++]);
	scores.push(a)
}

if(scores[0] === 0) {
	return console.log(0)
}

let count = 0;
for(let i = 0 ; i <= (n - 1) ; i++) {
	let value = scores[i]
	let cmp = scores[k-1]
	if(value > 0 && value >= cmp) {
		count++
	}
}

console.log(count);