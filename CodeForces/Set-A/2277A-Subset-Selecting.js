// https://codeforces.com/problemset/problem/2277/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);

	const count = new Map();

	for(let i = 0 ; i < n ; i++) {
		const val = Number(input[index++]);
		count.set(val, (count.get(val) || 0) + 1);
	}

	let sum = 0;
	let value = 0;

	while(true) {
		const currentCount = count.get(value) || 0;

		if (currentCount === 0) {
			outcomes.push(value);
			break;
		}

		sum = sum + currentCount;

		if (sum < k) {
			outcomes.push(value);
			break;
		}

		sum = sum - k;
		value++;
	}
}

console.log(outcomes.join("\n"));