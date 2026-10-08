// https://codeforces.com/problemset/problem/1370/C

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function isPrime(val) {
	if(val < 2) return false;
	if(val === 2) return true;
	if(val % 2 === 0) return false;

	for(let i = 3 ; (i * i) <= val ; i = (i + 2)) {
		if(val % i === 0) return false;
	}

	return true;
}

for(let i = 0; i < t; i++) {
	const n = Number(input[index++]);
	
	if(n === 1) {
		outcomes.push("FastestFinger");
	} else if(n === 2 || n % 2 !== 0) {
		outcomes.push("Ashishgup");
	} else {
		if((n & (n - 1)) === 0) {
			outcomes.push("FastestFinger");
		} else if (n % 4 !== 0) {
			if (isPrime(n / 2)) {
				outcomes.push("FastestFinger");
			} else {
				outcomes.push("Ashishgup");
			}
		} else {
			outcomes.push("Ashishgup");
		}
	}
}

console.log(outcomes.join("\n"));