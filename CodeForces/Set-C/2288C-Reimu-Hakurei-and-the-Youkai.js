// https://codeforces.com/problemset/problem/2288/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];
	
	for (let i = 0 ; i < n ; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const x = Number(input[index++]);

	const arr = inputArray(n);

	const hits = arr.map((a) => Math.floor((a + x - 1) / x));
	hits.sort((a, b) => a - b);

	let spellCards = 0;
	for (let i = 0; i < (n - 1); i++) {
		spellCards = Math.max(spellCards, hits[i] - (i + 1));
	}

	outcomes.push(spellCards);
}

console.log(outcomes.join("\n"));