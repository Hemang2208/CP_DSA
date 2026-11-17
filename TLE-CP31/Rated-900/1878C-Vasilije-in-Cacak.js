// https://codeforces.com/problemset/problem/1878/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);
	const x = Number(input[index++]);

	const minSum = (k % 2 === 0) ? (k / 2) * (k + 1) : k * ((k + 1) / 2);

	const maxSum = (k % 2 === 0) ? (k / 2) * (2 * n - k + 1) : k * ((2 * n - k + 1) / 2);

	if (x >= minSum && x <= maxSum) {
		outcomes.push('YES');
	} else {
		outcomes.push('NO');
	}
}

console.log(outcomes.join("\n"));