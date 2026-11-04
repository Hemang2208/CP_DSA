// https://codeforces.com/problemset/problem/2283/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const l = Number(input[index++]);
	const r = Number(input[index++]);

	if(l > 0 || r < 0) {
		outcomes.push(r - l);
	} else {
		if(-l === r) {
			outcomes.push(0);
		} else if (-l > r) {
			outcomes.push(-l - r - 1);
		} else {
			outcomes.push(r + l - 1);
		}
	}
}

console.log(outcomes.join("\n"));