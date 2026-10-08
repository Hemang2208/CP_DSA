// https://codeforces.com/problemset/problem/2269/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// function inputArray(n) {
// 	let arr = []
// 	for(let i = 1 ; i <= n ; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}
// 	return arr;
// }

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);
	let money = 1;

	// for(let j = 0 ; j < n - k + 1 ; j++) {
	// 	money = money * 2;
	// }

	money = Math.floor(Math.pow(2, (n - k + 1)))

	money = Math.floor(money + ((k - 1) * 2))

	outcomes.push(money);
}

console.log(outcomes.join("\n"));