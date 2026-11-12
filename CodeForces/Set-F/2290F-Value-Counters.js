// https://codeforces.com/problemset/problem/2290/F
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
	const n = Number(input[index++]);
	const arr = inputArray(n);

	const freq = new Array(n).fill(0);
	let OK = true;

	for(let j = 1 ; j <= n ; j++) {
		const value = n - j + arr[j - 1];

		if(value < 0 || value >= n || freq[value] != 0) {
			OK = false;
			break;
		}

		freq[value] = j;
	}

	if(OK) {
		outcomes.push(freq.join(" "));
	} else {
		outcomes.push("-1");
	}
}

console.log(outcomes.join("\n"));