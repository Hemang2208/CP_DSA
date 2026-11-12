// https://codeforces.com/problemset/problem/2290/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = []

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const s = input[index++];

	let count = (s[0] === 'B') ? 1 : 0;
	
	for (let i = 1; i < n; i++) {
		if (s[i] === s[i - 1]) {
			count++;
		}
	}

	outcomes.push(count);
}

console.log(outcomes.join("\n"));