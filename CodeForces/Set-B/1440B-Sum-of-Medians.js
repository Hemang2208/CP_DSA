// https://codeforces.com/problemset/problem/1440/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);
	const total = Number(n * k);

	const arr = [];
	for(let j = 0 ; j < total ; j++) {
		arr.push(Number(input[index++]));
	}

	const median = Number(Math.ceil(n / 2) - 1);
	const rightCount = Number(n - median);

	let left = 0, right = (total - 1), sum = 0;

	for(let g = 0 ; g < k ; g++) {
		const brr = [];
		for(let x = 0 ; x < median ; x++) {
			brr.push(Number(arr[left++]))
		}

		const startRight = Number(right - rightCount + 1);
		for(let x = startRight ; x <= right ; x++) {
			brr.push(Number(arr[x]))
		}

		right = Number(right - rightCount);
		sum = Number(sum + brr[median]);
	}

	outcomes.push(sum);
}

console.log(outcomes.join("\n"));