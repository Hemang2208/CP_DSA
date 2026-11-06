// https://codeforces.com/problemset/problem/2284/B
// node "test.js" < "Input.txt" > "Output.txt"

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

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);

	let arr = inputArray(n);
	arr.sort((a, b) => a - b);

	const firstK = arr.slice(n - k);
	const remaining = arr.slice(0, n - k).reverse();
	const result = firstK.concat(remaining);

	let sum = 0n;
	let count = 0;

	for(let i = 0 ; i < n ; i++) {
		const value = BigInt(result[i]);

		if(i === 0) {
			count++
		} else {
			if((value * BigInt(i)) >= sum) {
				count++
			}
		}

		sum = sum + value;
	}

	if(count === k) {
		outcomes.push("YES");
		outcomes.push(result.join(" "));
	} else {
		outcomes.push("NO");
	}
}

console.log(outcomes.join("\n"));