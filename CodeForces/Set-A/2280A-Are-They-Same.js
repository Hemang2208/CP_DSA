// https://codeforces.com/problemset/problem/2280/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];
	
	for (let i = 0; i < n; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);

	const a = inputArray(n);
	const b = inputArray(n);

	let a_evens = 0;
	let a_odds = 0;
	for (let j = 0; j < n; j++) {
		if (a[j] % 2 === 0) {
			a_evens++;
		}
		else {
			a_odds++;
		}
	}

	let b_evens = 0;
	let b_odds = 0;
	for (let j = 0; j < n; j++) {
		if (b[j] % 2 === 0) {
			b_evens++;
		}
		else {
			b_odds++;
		}
	}

	if (k % 2 === 0) {
		if (b_odds <= a_odds) {
			outcomes.push("YES");
		} else {
			outcomes.push("NO");
		}
	} else {
		if (b_evens <= a_evens) {
			outcomes.push("YES");
		} else {
			outcomes.push("NO");
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
	
// 	for (let i = 0; i < n; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}

// 	return arr;
// }

// for(let i = 0 ; i < t ; i++) {
// 	const n = Number(input[index++]);
// 	const k = Number(input[index++]);

// 	const a = inputArray(n);
// 	const b = inputArray(n);

// 	const k_ka_parity = k % 2;
// 	const not_k_ka_parity = 1 - k_ka_parity;

// 	let countA = 0;
// 	for(let i = 0 ; i < n ; i++) {
// 		if(a[i] % 2 === not_k_ka_parity) {
// 			countA++;
// 		}
// 	}

// 	let countB = 0;
// 	for(let i = 0 ; i < n ; i++) {
// 		if(b[i] % 2 === not_k_ka_parity) {
// 			countB++;
// 		}
// 	}

// 	if(countB <= countA) {
// 		outcomes.push("YES")
// 	} else {
// 		outcomes.push("NO")
// 	}
// }

// console.log(outcomes.join("\n"));