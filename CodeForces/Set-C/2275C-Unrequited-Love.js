// https://codeforces.com/problemset/problem/2275/C

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];
const outcomes = [];

function inputArray(n) {
	let arr = []
	for(let i = 1 ; i <= n ; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}
	return arr;
}

function totalWays(Value, m) {
	const freq = new Map();
	let totalWays = 0;

	for (let y = 0; y < m; y++) {
        const currentVal = Value[y];

        let validCount = freq.get(currentVal) || 0;

        if (y >= 2 && Value[y - 2] === currentVal) {
            validCount--;
        }
        if (y >= 4 && Value[y - 4] === currentVal) {
            validCount--;
        }

        totalWays += validCount;

        freq.set(currentVal, (freq.get(currentVal) || 0) + 1);
    }

    outcomes.push(totalWays)
}

for(let i = 0; i < t; i++) {
	const n = Number(input[index++]);

	const m = n - 4;
    if (m < 2) {
        outcomes.push(0);
        continue;
    }

    let arr = []
	arr = inputArray(n)

	let Value = []
	for (let x = 0 ; x < m ; x++) {
        Value[x] = arr[x] + arr[x + 2] - arr[x + 4];
    }

    totalWays(Value, m);
}

console.log(outcomes.join("\n"));