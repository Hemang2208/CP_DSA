// https://codeforces.com/problemset/problem/2266/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray() {
	let arr = [];
	for (let i = 0; i < 3; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	let arr = []
	arr = inputArray()
	arr.sort((a,b) => a - b)
	
	let ans = Number(Math.abs(Math.floor(n - arr[0])))

	outcomes.push(ans)
}

console.log(outcomes.join("\n"));