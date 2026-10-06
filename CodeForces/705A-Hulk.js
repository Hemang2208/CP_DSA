// https://codeforces.com/problemset/problem/705/A

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

// let index = 0;
// const t = input[index++];
// const outcomes = [];
// const arr = ["I hate", "I love"]

// if(t === 1) {
// 	console.log("I hate it");
// 	return;
// }

// for(let i = 1; i <= t; i++) {
// 	if(i % 2 === 1) {
// 		const a = arr[0]
// 		outcomes.push(a)
// 	} else {
// 		const b = arr[1]
// 		outcomes.push(b)
// 	}
// }

// console.log(outcomes.join(" that ") + " it");

// https://codeforces.com/problemset/problem/705/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];
let result = "I ";

for(let i = 0; i < t; i++) {
	if(i > 0) {
		result = result + " that I "
	}
	result += (i % 2 == 0) ? "hate" : "love";
}
result += " it";

console.log(result);