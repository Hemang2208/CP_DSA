// https://codeforces.com/problemset/problem/1873/C

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let row = [];
	for (let i = 0; i < n; i++) {
		const a = String(input[index++]);
		row.push(a);
	}

	return row;
}

function sumArray(arr, n) {
	let sum = 0;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const a = arr[i][j];
			if(a === "X") {
				let points = Math.min(i, j, 9 - i, 9 - j) + 1;
				sum += points;
			}
		}
	}

	return sum;
}

for(let i = 0 ; i < t ; i++) {
	const n = 10

	let arr = []
	arr = inputArray(n)

	let sum = 0;
	sum = sumArray(arr, n)

	outcomes.push(sum);
}

console.log(outcomes.join("\n"));