// https://codeforces.com/problemset/problem/1777/A
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

function countOperations(arr, n) {
	let count = 0;

	for(let i = 0 ; i < (n - 1) ; i++) {
		if(arr[i] % 2 === 0 && arr[i + 1] % 2 === 0) {
			count++;
		} else if(arr[i] % 2 != 0 && arr[i + 1] % 2 != 0) {
			count++;
		}

		// arr[i] % 2 === arr[i + 1] % 2
	}

	return count;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	const arr = inputArray(n);
	const ans = countOperations(arr, n);

	outcomes.push(ans);
}

console.log(outcomes.join("\n"));