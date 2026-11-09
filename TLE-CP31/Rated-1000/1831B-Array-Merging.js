// https://codeforces.com/problemset/problem/1831/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];
	
	for (let i = 0 ; i < n ; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

function getMaxNums(arr, n) {
	let maxNums = new Array((2 * n) + 1).fill(0);
	let streak = 0;

	for (let i = 0 ; i < n ; i++) {
		if (i > 0 && arr[i] === arr[i - 1]) {
			streak++;
		} else {
			streak = 1;
		}

		if (streak > maxNums[arr[i]]) {
			maxNums[arr[i]] = streak;
		}
	}

	return maxNums;
}

function getSumMax(n, maxA, maxB) {
	let ans = 0;

	for (let i = 1 ; i <= (2 * n) ; i++) {
		if (maxA[i] + maxB[i] > ans) {
			ans = maxA[i] + maxB[i];
		}
	}

	return ans;
}

for (let i = 0; i < t; i++) {
	const n = Number(input[index++]);

	const a = inputArray(n);
	const b = inputArray(n);

	const maxA = getMaxNums(a, n);
	const maxB = getMaxNums(b, n);

	const ans = getSumMax(n, maxA, maxB)

	outcomes.push(ans);
}

console.log(outcomes.join("\n"));
