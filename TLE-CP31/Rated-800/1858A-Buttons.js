// https://codeforces.com/problemset/problem/1858/A

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
	const c = Number(input[index++]);

	if(c % 2 === 0) {
		if(a > b) {
			outcomes.push("First")
		} else {
			outcomes.push("Second")
		}
	} else {
		if(a >= b) {
			outcomes.push("First")
		} else {
			outcomes.push("Second")
		}
	}
}

console.log(outcomes.join("\n"));