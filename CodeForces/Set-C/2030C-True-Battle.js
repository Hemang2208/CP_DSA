// https://codeforces.com/problemset/problem/2030/C

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const num = String(input[index++])

	if(num.startsWith("1") || num.endsWith("1") || num.includes("11")) {
		outcomes.push("YES")
	} else {
		outcomes.push("NO")
	}
}

console.log(outcomes.join("\n"));