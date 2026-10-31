// https://codeforces.com/problemset/problem/2278/B
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
	const x = Number(input[index++]);
	const y = Number(input[index++]);
	const z = Number(input[index++]);

	const totalRounds = x + y + z;
	let bobMove = 'R';

	const maxCount = Math.max(x, y, z);

	if (maxCount === x) {
		bobMove = 'P';
	} else if (maxCount === y) {
		bobMove = 'R';
	} else {
		bobMove = 'S';
	}

	outcomes.push(bobMove.repeat(totalRounds));
}

console.log(outcomes.join("\n"));