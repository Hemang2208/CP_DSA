// https://codeforces.com/problemset/problem/2284/A1
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	if(n % 2 === 0) {
		const ans = (n / 2) * (n / 2);
		outcomes.push(ans);
	} else {
		let ans = ((n + 1) / 2);
		ans = ans * (ans - 1)
		outcomes.push(ans);
	}
}

console.log(outcomes.join("\n"));