// https://codeforces.com/problemset/problem/1899/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];
const outcomes = [];

function isPrime(val) {

}

for(let i = 0; i < t; i++) {
	const n = input[index++];

	if(n % 3 === 0) {
		outcomes.push("Second");
	} else {
		outcomes.push("First");
	}
}

console.log(outcomes.join("\n"));