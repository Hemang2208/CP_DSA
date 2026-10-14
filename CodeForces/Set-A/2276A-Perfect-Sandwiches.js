// https://codeforces.com/problemset/problem/2276/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// function inputArray(n) {
// 	let arr = [];
// 	for (let i = 0; i < n; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}

// 	return arr;
// }

for(let i = 0 ; i < t ; i++) {
	const a = Number(input[index++]);
	const b = Number(input[index++]);
	let ans = 0

	if(b >= a) {
		ans = -1;
	} else {
		ans = Math.min(b, a-b)
	}

	// let arr = []
	// arr = inputArray(n)
	// arr.sort((a,b) => a - b)

	outcomes.push(ans)
}

console.log(outcomes.join("\n"));