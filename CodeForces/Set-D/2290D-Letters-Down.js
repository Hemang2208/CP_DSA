// https://codeforces.com/problemset/problem/2290/D
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const s = input[index++];

	const range = Math.floor(n / 2);
	const changeFreq = new Array(26).fill(false);

	for(let j = 0 ; j < range ; j++) {
		const leftSide = s.charCodeAt(j) - 97;
		const rightSide = s.charCodeAt(n - 1 - j) - 97;

		if (leftSide !== rightSide) {
			const low = Math.min(leftSide, rightSide);
			const high = Math.max(leftSide, rightSide);

			for(let k = low + 1 ; k <= high ; k++) {
				changeFreq[k] = true;
			}
		}
	}

	let count = 0;

	for(let x = 1 ; x < 26 ; x++) {
		if(changeFreq[x]) {
			count++;
		}
	}

	outcomes.push(count);
}

console.log(outcomes.join("\n"));