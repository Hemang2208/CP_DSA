// https://codeforces.com/problemset/problem/1896/A

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

// let index = 0;
// const t = input[index++];
// const outcomes = [];

// function inputArray(n) {
// 	let arr = []
// 	for(let i = 1 ; i <= n ; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}
// 	return arr;
// }

// for(let i = 0; i < t; i++) {
// 	const n = input[index++];
// 	let arr = []
// 	arr = inputArray(n);
// 	const log = arr[0] === 1 ? "YES" : "NO"
// 	outcomes.push(log)
// }

// console.log(outcomes.join("\n"));

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0; i < t; i++) {
	const n = Number(input[index++]);
	let arr = Number(input[index++]);
	const log = arr === 1 ? "YES" : "NO"
	outcomes.push(log)
	index = Number(index + (n-1))
}

console.log(outcomes.join("\n"));