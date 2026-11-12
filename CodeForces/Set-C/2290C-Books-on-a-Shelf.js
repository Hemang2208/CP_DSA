// https://codeforces.com/problemset/problem/2290/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const freq = new Map();

	for (let i = 0 ; i < n ; i++) {
		const a = Number(input[index++]);
		freq.set(a, (freq.get(a) || 0) + 1);
	}

	const alag = Array.from(freq.keys()).sort((a, b) => a - b);

	const left = [], middle = [], right = [];

	for (const h of alag) {
		const count = freq.get(h);
		left.push(h);

		if (count >= 2) {
			right.push(h);
		}

		for (let c = 2; c < count; c++) {
			middle.push(h);
		}
	}

	right.reverse();
	const arrangement = left.concat(middle, right);
	const k = Number(left.length + right.length);

	outcomes.push(k);
	outcomes.push(arrangement.join(" "));
}

console.log(outcomes.join("\n"));