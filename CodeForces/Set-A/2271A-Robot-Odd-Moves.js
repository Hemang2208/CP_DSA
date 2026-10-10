// https://codeforces.com/contest/2271/problem/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const x = input[index++];
	const y = input[index++];

	if(x === 0 && y === 0) {
		outcomes.push(0);
	} else if(x < 0) {
		outcomes.push(-1);
	} else if(Math.abs(y) <= x && (x % 2) === (Math.abs(y) % 2)) {
		outcomes.push(x);
	} else if(Math.abs(y) <= x + 1 && ((x + 1) % 2) === (Math.abs(y) % 2)) {
		outcomes.push(x + 1);
	} else {
		outcomes.push(-1);
	}
}

console.log(outcomes.join("\n"));