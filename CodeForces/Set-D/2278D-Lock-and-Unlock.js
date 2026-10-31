// https://codeforces.com/problemset/problem/2278/D
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
	
	let arr = [];
	for (let j = 0; j < n; j++) {
		arr.push(Number(input[index++]));
	}

	arr.sort((a, b) => a - b);

	const middle = arr[Math.floor(n / 2)];

	let minCost = 0;
	for (let j = 0; j < n; j++) {
		minCost = minCost + Math.abs(arr[j] - middle);
	}

	const minOps = Math.abs(arr[n - 1] - arr[0]);

	outcomes.push(`${minCost} ${minOps}`);
}

console.log(outcomes.join("\n"));