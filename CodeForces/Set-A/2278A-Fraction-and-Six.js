// https://codeforces.com/problemset/problem/2278/A
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

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const m = Number(input[index++]);

	const p = String(input[index++]);
	const q = String(input[index++]);

	const countP = new Array(26).fill(0);
	const countQ = new Array(26).fill(0);

	for (let j = 0; j < n; j++) {
		countP[p.charCodeAt(j) - 97]++;
	}

	for (let j = 0; j < m; j++) {
		countQ[q.charCodeAt(j) - 97]++;
	}

	countQ['s'.charCodeAt(0) - 97]++;
	countQ['i'.charCodeAt(0) - 97]++;
	countQ['x'.charCodeAt(0) - 97]++;

	let possible = true;
	for (let j = 0; j < 26; j++) {
		if (countP[j] !== countQ[j]) {
			possible = false;
			break;
		}
	}

	outcomes.push(possible ? "YES" : "NO");
}

console.log(outcomes.join("\n"));