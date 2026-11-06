// https://codeforces.com/problemset/problem/2284/A2
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];
	
	for (let i = 0; i < n; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	let arr = inputArray(n);

	arr.sort((a, b) => b - a);

	let sumX = 0n;
	let sumY = 0n;

	for (let j = 0; j < n; j++) {
		let val = 1n << BigInt(arr[j]);

		if (sumX <= sumY) {
			sumX += val;
		} else {
			sumY += val;
		}
	}

	let maxDoubledArea = BigInt(sumX * sumY);
	outcomes.push(maxDoubledArea.toString());
}

console.log(outcomes.join("\n"));