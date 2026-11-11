// https://codeforces.com/problemset/problem/1831/A
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

function checkArray(arr, n) {
    return arr.map(val => n + 1 - val);
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const arr = inputArray(n);
	const brr = checkArray(arr, n);
	outcomes.push(brr.join(" "));
}

console.log(outcomes.join("\n"));