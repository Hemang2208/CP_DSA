// https://codeforces.com/problemset/problem/1862/B

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

function ansArray(arr, ans, n) {
	for(let i = 1 ; i < n ; i++) {
		if(arr[i] < arr[i-1]) {
			ans.push(arr[i])
		}
		ans.push(arr[i])
	}

	outcomes.push(ans.length);
	outcomes.push(ans.join(" "));
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	let arr = []
	arr = inputArray(n)

	const ans = []
	ans.push(arr[0])

	ansArray(arr, ans, n)
}

console.log(outcomes.join("\n"));