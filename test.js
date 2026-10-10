// https://codeforces.com/contest/2271/problem/E

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = input[index++];
	const k = input[index++];

	let arr = [];

	for(let j = 0 ; j < n ; j++) {
		arr.push(input[index++]);
	}

	outcomes.push(solve(n, k, arr));
}

console.log(outcomes.join("\n"));