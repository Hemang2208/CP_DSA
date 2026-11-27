// https://codeforces.com/problemset/problem/2292/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for (let i = 0; i < t; i++) {
	const n = Number(input[index++]);
	const s = String(input[index++]);

	if (n % 2 !== 0) {
		outcomes.push("NO");
		continue;
	}

	let isAlter = true;
	for (let j = 1; j < n; j++) {
		if (s[j] === s[j - 1]) {
			isAlter = false;
			break;
		}
	}

	outcomes.push(isAlter ? "NO" : "YES");
}

console.log(outcomes.join("\n"));