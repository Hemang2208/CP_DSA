// https://codeforces.com/problemset/problem/1878/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = []
	for(let i = 0; i < n ; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}
	return arr;
}

function checkArray(arr, n, k) {
	for(let i = 0 ; i < n ; i++) {
		if(arr[i] === k) {
			outcomes.push("YES")
			return;
		}
	}
	outcomes.push("NO")
	return;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);

	let arr = []
	arr = inputArray(n);

	checkArray(arr, n, k)
}

console.log(outcomes.join("\n"));