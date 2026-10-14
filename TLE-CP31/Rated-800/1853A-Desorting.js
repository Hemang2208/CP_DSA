// https://codeforces.com/problemset/problem/1853/A
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

function minDiffNum(arr, n) {
	let minDiff = Infinity;
	for (let j = 0; j < (n - 1); j++) {
		let diff = Number(Math.floor(arr[j + 1] - arr[j]));
		if (diff < minDiff) {
			minDiff = diff;
		}
	}

	return minDiff;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	let m = Number(Math.floor(n / 2));
	let ans = 0;

	let arr = [];
	arr = inputArray(n);
	let brr = arr.slice().sort((a, b) => a - b);

	if (JSON.stringify(arr) !== JSON.stringify(brr)) {
		ans = 0;
		outcomes.push(ans);
		continue;
	}

	let minDiff = minDiffNum(arr, n)

	ans = Number(Math.floor(minDiff / 2) + 1);
	outcomes.push(ans);
}

console.log(outcomes.join("\n"));