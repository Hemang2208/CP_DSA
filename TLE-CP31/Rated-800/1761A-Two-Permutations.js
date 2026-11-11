// https://codeforces.com/problemset/problem/1761/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// function inputArray(n) {
// 	let arr = [];
	
// 	for (let i = 0 ; i < n ; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}

// 	return arr;
// }

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const a = Number(input[index++]);
	const b = Number(input[index++]);
	
	if ((a === n && b === n) || a + b + 2 <= n) {
		outcomes.push("Yes");
	} else {
		outcomes.push("No");
	}
}

console.log(outcomes.join("\n"));