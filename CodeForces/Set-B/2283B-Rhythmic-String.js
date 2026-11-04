// https://codeforces.com/problemset/problem/2283/B
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

	const uniqueElements = new Set(arr);
	let max = 0;

	for(const j of uniqueElements) {
		let count = 0;
		
		for(let k = 0 ; k < n ; k++) {
			if(arr[k] % j === 0) {
				count++;
			}
		}

		if(count > max) {
			max = count;
		}
	}

	outcomes.push(n - max);
}

console.log(outcomes.join("\n"));