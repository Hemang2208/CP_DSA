// https://codeforces.com/problemset/problem/2269/B

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let row = [];

	for (let i = 0 ; i < n ; i++) {
		const a = String(input[index++]);
		row.push(a);
	}

	return row;
}

function getDigitSum(strNum) {
	let sum = 0;

	for (let i = 0 ; i < strNum.length ; i++) {
		let digit = Number(strNum[i]);
		sum = sum + (digit * digit);
	}

	return String(sum);
}

for (let i = 0; i < t; i++) {
	const n = Number(input[index++]);
	let arr = inputArray(n);

	const counts = new Map();

	for (let j = 0; j < n; j++) {
		let a = arr[j];

		for (let step = 0; step < 200; step++) {
			a = getDigitSum(a);
		}

		counts.set(a, (counts.get(a) || 0) + 1);
	}

	let totalPairs = 0;
	for (let count of counts.values()) {
		totalPairs += (count * (count - 1)) / 2;
	}

	outcomes.push(totalPairs);
}

console.log(outcomes.join("\n"));