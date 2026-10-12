// https://codeforces.com/problemset/problem/1866/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
// const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];
	for (let i = 0; i < n; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

// for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	let arr = []
	arr = inputArray(n)
	arr = arr.map(num => Math.abs(num));
	arr.sort((a, b) => a - b);
	outcomes.push(arr[0])
// }

console.log(outcomes.join("\n"));



// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

// let index = 0;

// const n = input[index++];
// let min = Infinity;

// for(let i = 0 ; i < n ; i++) {
// 	const a = Math.abs(input[index++]);

// 	if(a < min) {
// 		min = a;
// 	}
// }

// console.log(min);