// https://codeforces.com/problemset/problem/1859/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(m) {
	let arr = [];
	for (let i = 0; i < m; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	let globalMin = Infinity;
	let minOfSecondMins = Infinity;
	let sumOfSecondMins = 0n;

	for(let i = 0 ; i < n ; i++) {
		const m = Number(input[index++]);

		let arr = inputArray(m);
		arr.sort((a,b) => a - b);

		let firstMin = arr[0];
		let secondMin = arr[1];

		globalMin = Math.min(globalMin, firstMin);
		minOfSecondMins = Math.min(minOfSecondMins, secondMin);
		sumOfSecondMins = sumOfSecondMins + BigInt(secondMin);
	}

	let maxBeauty = BigInt(globalMin) + sumOfSecondMins - BigInt(minOfSecondMins);
	outcomes.push(maxBeauty.toString());
}

console.log(outcomes.join("\n"));