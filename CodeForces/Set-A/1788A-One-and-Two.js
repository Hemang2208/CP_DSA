// https://codeforces.com/problemset/problem/1788/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	const arr = [];
	let count2 = 0;

	for (let k = 0 ; k < n ; k++) {
		const a = Number(input[index++]);
		arr.push(a);

		if(a === 2) count2++;
	}

	if (count2 % 2 !== 0) {
		outcomes.push(-1);
	} else if (count2 === 0) {
		outcomes.push(1);
	} else {
		let seenTwos = 0;
		let wantTwos = Math.floor(count2 / 2)

		for (let j = 0; j < n; j++) {
			if (arr[j] === 2) seenTwos++;

			if (seenTwos === wantTwos) {
				outcomes.push(j + 1);
				break;
			}
		}
	}
}

console.log(outcomes.join("\n"));

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

// let index = 0;
// const t = Number(input[index++]);
// const outcomes = [];

// function inputArray(n) {
// 	let arr = [];
	
// 	for (let i = 0 ; i < n ; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}

// 	return arr;
// }

// function findMultiple(arr, start, end) {
// 	let prod = 1;

// 	for(let i = start ; i < end ; i++) {
// 		prod = prod * arr[i];
// 	}

// 	return prod;
// }

// for(let i = 0 ; i < t ; i++) {
// 	const n = Number(input[index++]);
// 	const arr = inputArray(n);
	
// 	let k = 1
// 	let found = false;

// 	while(k < n) {
// 		const a = findMultiple(arr, 0, k)
// 		const b = findMultiple(arr, k, n)

// 		if(a === b) {
// 			found = true;
// 			break;
// 		} else {
// 			k++
// 		}
// 	}

// 	if(found) {
// 		outcomes.push(k)
// 	} else {
// 		outcomes.push(-1)
// 	}
// }

// console.log(outcomes.join("\n"));