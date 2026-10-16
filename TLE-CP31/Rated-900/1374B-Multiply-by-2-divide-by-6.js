// https://codeforces.com/problemset/problem/1374/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	let count = 0, m = n, f = 0;

	for(let i = 0 ; i < 100 ; i++) {
		if(m === 1) {
			break;
		} else {
			if(m % 6 === 0) {
				m = Math.floor(m / 6);
				count++;
				f = 1;
			} else {
				m = m * 2;
				count++
				f = 1;
			}
		}

		if(f === 0) break;
		f = 0;
	}

	if(m === 1) {
		outcomes.push(count)
	} else {
		outcomes.push(-1)
	}
}

console.log(outcomes.join("\n"));