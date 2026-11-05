// https://codeforces.com/problemset/problem/1806/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const a = Number(input[index++]);
	const b = Number(input[index++]);
	const c = Number(input[index++]);
	const d = Number(input[index++]);

	if((d < b) || ((c - a) > (d - b))) {
		outcomes.push(-1);
	} else {
		const ans = (2 * (d - b)) - (c - a)
		outcomes.push(ans);
	}
}

console.log(outcomes.join("\n"));