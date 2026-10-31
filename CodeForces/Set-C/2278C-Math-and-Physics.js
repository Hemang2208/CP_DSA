// https://codeforces.com/problemset/problem/2278/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

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

for (let i = 0; i < t; i++) {
	const n = Number(input[index++]);
	
	let sum = 0;
	let maxVal = 0;
	let hasInternal = false;

	for (let j = 0; j < n; j++) {
		const val = Number(input[index++]);
		sum += val;
		
		if (val > maxVal) {
			maxVal = val;
		}
		
		if (j > 0 && j < n - 1) {
			if (val >= 2) {
				hasInternal = true;
			}
		}
	}

	if (maxVal < 2) {
		outcomes.push(-1);
	}
	else if (hasInternal) {
		outcomes.push(sum - 1);
	}
	else {
		outcomes.push(sum - (n - 1));
	}
}

console.log(outcomes.join("\n"));