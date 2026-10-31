// https://codeforces.com/problemset/problem/2278/F
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

// function inputArray(n) {
// 	let arr = [];
// 	for (let i = 0; i < n; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}

// 	return arr;
// }

const MOD = 998244353;

for (let i = 0; i < t; i++) {
	const n = Number(input[index++]);
	const m = Number(input[index++]);

	let dp = new Array(m + 1).fill(0);
	dp[0] = 1;

	let totalAns = 0;

	for (let step = 1; step < n; step++) {
		const nextDp = new Array(m + 1).fill(0);
		
		const pref = new Array(m + 2).fill(0);
		for (let j = 0; j <= m; j++) {
			pref[j + 1] = (pref[j] + dp[j]) % MOD;
		}

		for (let j = 0; j <= m; j++) {
			const low = Math.floor(j / 2);
			const high = j;

			if (low <= high) {
				nextDp[j] = (pref[high + 1] - pref[low] + MOD) % MOD;
			}
		}

		dp = nextDp;
		totalAns = (totalAns + dp[m]) % MOD;
	}

	outcomes.push(totalAns);
}

console.log(outcomes.join("\n"));