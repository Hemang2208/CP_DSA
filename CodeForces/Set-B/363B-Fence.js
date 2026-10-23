// https://codeforces.com/problemset/problem/363/B
// node "test.js" < "Input.txt" > "Output.txt"

// Solution using 100% a Dynamic Programming technique

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;

const n = Number(input[index++]);
const k = Number(input[index++]);

console.log(dpWindowSumIndex(n, k));

function dpWindowSumIndex(n, k) {
	if (n < k) return 0;

	let minSum = Infinity; 
	let minSumIdx = 0;

	let dp = [0];

	for (let i = 1; i <= n; i++) {
		let current_height = Number(input[index++]);
		
		dp.push(dp[i - 1] + current_height);

		if (i >= k) {
			let currentSum = dp[i] - dp[i - k];

			if (minSum > currentSum) {
				minSum = currentSum;
				minSumIdx = i - k + 1;
			}
		}
	}

	return minSumIdx;
}

// Solution using 100% a Sliding Window technique

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

// let index = 0;

// const n = Number(input[index++]);
// const k = Number(input[index++]);

// console.log(slidingWindowSumIndex(n, k));

// function slidingWindowSumIndex(n, k) {
// 	if (n < k) return 0;

// 	let minSum = Infinity; 
// 	let currentSum = 0;
// 	let minSumIdx = 0;

// 	let arr = [];
// 	for (let i = 0; i < n; i++) {
// 		arr.push(Number(input[index++]));
// 		currentSum = currentSum + arr[i];

// 		if (i >= k - 1) {
// 			if (i >= k) {
// 				currentSum = currentSum - arr[i - k];
// 			}

// 			if(minSum > currentSum) {
// 				minSum = currentSum;
// 				minSumIdx = i - k + 1;
// 			}
// 		}
// 	}

// 	minSum = 0; 
// 	currentSum = 0;
// 	return minSumIdx + 1;
// }

// Core Sliding Window.

// function slidingWindow(arr, n, k) {
// 	if(n < k) return 0;

// 	let minSum = 0, currentSum = 0;

// 	for(let i = 0 ; i < k ; i++) {
// 		currentSum = currentSum + arr[i];
// 	}

// 	minSum = currentSum;

// 	for(let i = k ; i < n ; i++) {
// 		currentSum = currentSum + arr[i] - arr[i - k];

// 		minSum = Math.min(minSum, currentSum);
// 	}

// 	return minSum;
// }