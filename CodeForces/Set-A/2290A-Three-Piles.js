// https://codeforces.com/problemset/problem/2290/A
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

for(let i = 0 ; i < t ; i++) {
	const n = 3;

	let arr = inputArray(n);
	arr.sort((a,b) => a - b);

	if ((arr[1] - arr[0]) === 1 && (arr[2] - arr[1]) === 1) {
		outcomes.push("Yes");
	} else {
		outcomes.push("No");
	}
}

console.log(outcomes.join("\n"));