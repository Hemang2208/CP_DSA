// https://codeforces.com/problemset/problem/1877/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = []
	for(let i = 0 ; i < (n - 1) ; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

function sumArray(arr, n) {
	let sum = 0;
	for(let i = 0 ; i < (n - 1) ; i++) {
		sum = sum + arr[i];
	}

	return sum;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	let arr = []
	arr = inputArray(n)

	let sum = 0;
	sum = sumArray(arr, n)

	const final = -sum
	outcomes.push(final);
}

console.log(outcomes.join("\n"));