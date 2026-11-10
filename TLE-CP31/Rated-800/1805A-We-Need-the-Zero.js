// https://codeforces.com/problemset/problem/1805/A
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

function sumXOR(arr, n) {
	let xorSum = 0;

	for(let i = 0 ; i < n ; i++) {
		xorSum = xorSum ^ arr[i]
	}

	return xorSum;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);

	const arr = inputArray(n);
	arr.sort((a,b) => a - b);

	const ans = sumXOR(arr, n);

	if(n % 2 != 0) {
		outcomes.push(ans);
	} else {
		if(ans === 0) {
			outcomes.push(0);
		} else {
			outcomes.push(-1);
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

// function checkXOR(arr, n) {
// 	// let keepXOR = new Array(n + 1).fill(0);
// 	// let found = false;
// 	let x = 0;

// 	while(x < 256) {
// 		let sumXOR = 0;

// 		for(let i = 0 ; i < n ; i++) {
// 			const b = arr[i] ^ x;
// 			sumXOR = sumXOR ^ b;
// 		}

// 		if(sumXOR === 0) {
// 			return x;
// 		} else {
// 			x++;
// 		}
// 	}

// 	return -1;
// }

// for(let i = 0 ; i < t ; i++) {
// 	const n = Number(input[index++]);

// 	const arr = inputArray(n);
// 	arr.sort((a,b) => a - b);

// 	const ans = checkXOR(arr, n);

// 	outcomes.push(ans);
// }

// console.log(outcomes.join("\n"));