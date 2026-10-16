// https://codeforces.com/problemset/problem/1890/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];
const outcomes = [];

// function isPrime(val) {
// 	if(val < 2) return false;
// 	if(val === 2) return true;
// 	if(val % 2 === 0) return false;
 
// 	for(let i = 3 ; (i * i) <= val ; i = (i + 2)) {
// 		if(val % i === 0) return false;
// 	}
 
// 	return true;
// }

function checkForGood(arr, n) {
	let first = arr[0];
	let second = -1;

	let firstFreq = 0;
	let secondFreq = 0;

	for(let i = 0 ; i < n ; i++) {
		if(arr[i] === first) {
			firstFreq++;
		} else {
			if(second === -1) {
				second = arr[i];
			}

			if(arr[i] === second) {
				secondFreq++;
			} else {
				outcomes.push("NO");
				return;
			}
		}
	}

	if(second === -1) {
		outcomes.push("YES");
		return;
	}

	let difference = firstFreq - secondFreq;

	if(difference < 0) {
		difference = -difference;
	}

	if(difference <= 1) {
		outcomes.push("YES");
	} else {
		outcomes.push("NO");
	}
}

for(let i = 0 ; i < t ; i++) {
	const n = input[index++];

	let arr = [];

	for(let j = 0 ; j < n ; j++) {
		arr.push(input[index++]);
	}

	checkForGood(arr, n);
}

console.log(outcomes.join("\n"));