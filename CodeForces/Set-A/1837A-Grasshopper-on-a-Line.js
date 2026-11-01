// https://codeforces.com/problemset/problem/1837/A
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
	const x = Number(input[index++]);
	const k = Number(input[index++]);

	if(x % k === 0) {
		outcomes.push(2);
		outcomes.push(`${x-1} ${1}`);
	} else {
		outcomes.push(1);
		outcomes.push(x);
	}
}

console.log(outcomes.join("\n"));