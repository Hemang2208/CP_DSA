// https://codeforces.com/problemset/problem/1676/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	let sum1 = 0, sum2 = 0;
	let num = String(input[index++]);

	sum1 = sum1 + Number(num[0]);
	sum1 = sum1 + Number(num[1]);
	sum1 = sum1 + Number(num[2]);

	sum2 = sum2 + Number(num[3]);
	sum2 = sum2 + Number(num[4]);
	sum2 = sum2 + Number(num[5]);

	if(sum1 === sum2) {
		outcomes.push("YES");
	} else {
		outcomes.push("NO");
	}
}

console.log(outcomes.join("\n"));