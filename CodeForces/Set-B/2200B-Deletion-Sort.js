// https://codeforces.com/problemset/problem/2200/B
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

function isSorted(arr, n) {
	for(let i = 0 ; i < n ; i++) {
		if(arr[i] > arr[i + 1]) {
			return false;
		}
	}

	return true;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const arr = inputArray(n);

	if(isSorted(arr, n)) {
		outcomes.push(n);
	} else {
		outcomes.push(1);
	}
}

console.log(outcomes.join("\n"));