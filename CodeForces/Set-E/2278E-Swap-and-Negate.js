// https://codeforces.com/problemset/problem/2278/E
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
	
	const arr = [];
	for (let j = 0; j < n; j++) {
		const val = Number(input[index++]);
		const paritySignOfNext = ((j + 1) % 2 === 0) ? 1 : -1;
		arr.push(val * paritySignOfNext);
	}

	arr.sort((x, y) => x - y);

	const numMinus = Math.floor((n + 1) / 2);
	let maxSum = 0n;

	for (let j = 0; j < numMinus; j++) {
		maxSum = maxSum - BigInt(arr[j]);
	}

	for (let j = numMinus; j < n; j++) {
		maxSum = maxSum + BigInt(arr[j]);
	}

	outcomes.push(maxSum.toString());
}

console.log(outcomes.join("\n"));