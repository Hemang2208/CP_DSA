// https://codeforces.com/problemset/problem/1814/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);

	if(n % 2 === 0 || (n - k) % 2 === 0) {
		outcomes.push("YES");
	} else {
		outcomes.push("NO");
	}
}

console.log(outcomes.join("\n"));