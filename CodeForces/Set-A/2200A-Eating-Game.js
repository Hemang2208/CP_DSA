// https://codeforces.com/problemset/problem/2200/A
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
	arr.sort((a,b) => a - b);

	const max = arr[n - 1];
	const count = arr.filter(a => a === max).length;

	outcomes.push(count);
}

console.log(outcomes.join("\n"));

// const input = require("fs").readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);
// let i = 1, out = [];

// while (i < input.length) {
// 	const arr = input.slice(i + 1, i += input[i] + 1);
// 	const max = Math.max(...arr);
// 	out.push(arr.filter(x => x === max).length);
// }

// console.log(out.join("\n"));