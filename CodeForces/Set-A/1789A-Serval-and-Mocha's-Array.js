// https://codeforces.com/problemset/problem/1789/A
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
	a = Math.abs(a);
	b = Math.abs(b);

	while (b !== 0) {
		let temp = b;
		b = a % b;
		a = temp;
	}

	return a;
}

// function isPrime(num) {
// 	if (num <= 1) return false;
// 	if (num <= 3) return true;
// 	if (num % 2 === 0 || num % 3 === 0) return false;

// 	for (let i = 5 ; (i * i) <= num ; i = (i + 6)) {
// 		if (num % i === 0 || num % (i + 2) === 0) {
// 			return false;
// 		}
// 	}

// 	return true;
// }

function isPossible(arr, n) {
	let possible = false;

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (getGCD(arr[i], arr[j]) <= 2) {
				possible = true;
				break;
			}
		}

		if (possible) break;
	}

	return possible ? "Yes" : "No";
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const arr = inputArray(n);

	const ans = isPossible(arr, n)

	outcomes.push(ans);
}

console.log(outcomes.join("\n"));