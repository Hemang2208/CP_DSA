// https://codeforces.com/problemset/problem/2284/C1
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
	const n = Number(input[index++]);
	const result = [];

	for(let j = 0 ; j < n ; j++) {
		let currentValue = Number(input[index++]);

		if(isPrime(currentValue)) {
			result.push(currentValue);
			continue;
		}

		let x = 1;

		while(true) {
			if(getGCD(currentValue, x) === 1 && isPrime(currentValue + x)) {
				currentValue = currentValue + x;
				break;
			}
			x++;
		}

		result.push(currentValue);
	}

	outcomes.push(result.join(" "));
}

console.log(outcomes.join("\n"));