// https://codeforces.com/problemset/problem/1373/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const a = BigInt(input[index++]);
	const b = BigInt(input[index++]);
	const c = BigInt(input[index++]);

	const ans1 = a < c ? "1" : "-1";
	const ans2 = c < a * b ? b.toString() : "-1";

	outcomes.push(`${ans1} ${ans2}`);
}

console.log(outcomes.join("\n"));