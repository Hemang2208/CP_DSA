// https://codeforces.com/problemset/problem/282/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const outcomes = [];

function ansArray(n) {
	let count = 0;
	for (let i = 0; i < n; i++) {
		const a = String(input[index++]);
		if(a === "++X") {
		          ++count;
		} else if(a === "X++") {
		          count++
		} else if(a === "--X") {
		          --count;
		} else {
		          count--;
		}
	}

	return count;
}

const n = Number(input[index++]);

let ans = ansArray(n)

outcomes.push(ans)

console.log(outcomes.join("\n"));
