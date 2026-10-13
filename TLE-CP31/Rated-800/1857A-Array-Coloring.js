// https://codeforces.com/problemset/problem/1857/A

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

// function sumArray(arr, n) {
// 	let sum = 0
// 	for (let i = 0; i < n; i++) {
// 		sum = sum + arr[i]
// 	}

// 	return sum;
// }

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	let arr = []
	arr = inputArray(n)
	arr.sort((a,b) => b - a)

	let m = Math.floor(n / 2)
	let sum1 = 0 , sum2 = 0;

	for(let i = 0 ; i < m ; i++) {
		sum1 = sum1 + arr[i]
	}

	for(let i = m ; i < n ; i++) {
		sum2 = sum2 + arr[i]
	}

	if((sum1 % 2) === (sum2 % 2)) {
		outcomes.push("YES")
	} else {
		outcomes.push("NO")
	}
}

console.log(outcomes.join("\n"));