// https://codeforces.com/problemset/problem/2290/E
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);

	let totalStones = 0;

	for (let i = 0; i < n; i++) {
		const stones = Number(input[index++]);

		if (i % (k + 1) === 0) {
			totalStones = totalStones + stones;
		}
	}

	if (totalStones % 2 !== 0) {
		outcomes.push("Alice");
	} else {
		outcomes.push("Bob");
	}
}

console.log(outcomes.join("\n"));