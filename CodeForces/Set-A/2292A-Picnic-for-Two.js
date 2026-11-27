// https://codeforces.com/problemset/problem/2292/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function gcd(a, b) {
	while (b !== 0) {
		const temp = b;
		b = a % b;
		a = temp;
	}

	return a;
}

function lcm(a, b, ab) {
	return (a / ab) * b;
}

for (let i = 0; i < t; i++) {
	const l = Number(input[index++]);
	const a = Number(input[index++]);
	const b = Number(input[index++]);

	const ga = gcd(l, a);
	const gb = gcd(l, b);

	const gab = gcd(ga, gb);
	const step = lcm(ga, gb, gab);

	const ans = Math.floor(l / step);
	outcomes.push(ans);
}

console.log(outcomes.join("\n"));