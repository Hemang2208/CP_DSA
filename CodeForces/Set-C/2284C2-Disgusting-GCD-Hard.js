// https://codeforces.com/problemset/problem/2284/C2
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

function getGCD(a, b) {
	while (b !== 0) {
		let temp = b;
		b = a % b;
		a = temp;
	}

	return a;
}

function isPrime(num) {
	if (num < 2) return false;
	
	for (let i = 2 ; i * i <= num ; i++) {
		if (num % i === 0) return false;
	}

	return true;
}

for(let i = 0 ; i < t ; i++) {
	const a = Number(input[index++]);
	const b = Number(input[index++]);

	if(a === b) {
		outcomes.push("0");
		continue;
	}

	if(getGCD(a, b) === 1) {
		outcomes.push("1");
		outcomes.push((b - a).toString());
		continue;
	}

	if((b - a) > 300) {
		let c = a + 1;

		while(true) {
			if(isPrime(c) && getGCD(c, b) === 1) {
				break;
			}

			c++;
		}

		outcomes.push("2");
		outcomes.push(`${c - a} ${b - c}`);
		continue;
	}

	let foundTwo = false;

	for (let c = a + 1; c < b; c++) {
		if (getGCD(a, c) === 1 && getGCD(c, b) === 1) {
			outcomes.push("2");
			outcomes.push(`${c - a} ${b - c}`);
			foundTwo = true;
			break;
		}
	}

	if (foundTwo) continue;

	let foundThree = false;

	for (let c1 = a + 1; c1 < b; c1++) {
		if (getGCD(a, c1) !== 1) continue;

		for (let c2 = a + 1; c2 < b; c2++) {
			if (c1 === c2) continue;

			if (getGCD(c1, c2) === 1 && getGCD(c2, b) === 1) {
				outcomes.push("3");
				outcomes.push(`${c1 - a} ${c2 - c1} ${b - c2}`);
				foundThree = true;
				break;
			}
		}

		if (foundThree) break;
	}
}

console.log(outcomes.join("\n"));