// https://codeforces.com/problemset/problem/2277/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];
	for (let i = 0; i < n; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	const arr = inputArray(n);
	const min = arr.reduce((a, b) => Math.min(a, b));

	const ans = min < n ? n : 0;

	outcomes.push(ans);
}

console.log(outcomes.join("\n"));