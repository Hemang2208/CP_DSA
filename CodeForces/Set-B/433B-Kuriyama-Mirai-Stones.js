// https://codeforces.com/problemset/problem/433/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
// const t = BigInt(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = new Int32Array(n);
	
	for (let i = 0 ; i < n ; i++) {
		arr[i] = Number(input[index++]);
	}

	return arr;
}

function prefixSum(arr, n) {
	const sum = new Array(n + 1).fill(0);

	for(let i = 1 ; i <= n ; i++) {
		sum[i] = (sum[i - 1] + arr[i - 1]);
	}

	return sum;
}

// function rangeSum(sum, left, right) {
// 	return (sum[right] - sum[left - 1]);
// }

// for(let i = 0n ; i < t ; i++) {
	const n = Number(input[index++]);

	const arr = inputArray(n);
	// const brr = new Int32Array(arr).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
	const brr = new Int32Array(arr).sort((a, b) => a - b);

	const sum1 = prefixSum(arr, n);
	const sum2 = prefixSum(brr, n);

	const x = Number(input[index++]);

	for(let j = 0 ; j < x ; j++) {
		const type = Number(input[index++]);
		const left = Number(input[index++]);
		const right = Number(input[index++]);

		const ans = (type === 1) ? (sum1[right] - sum1[left - 1]) : (sum2[right] - sum2[left - 1]);

		outcomes.push(ans.toString());
	}
// }

console.log(outcomes.join("\n"));