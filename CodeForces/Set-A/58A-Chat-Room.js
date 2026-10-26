// https://codeforces.com/problemset/problem/58/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim();

const pattern = /h.*e.*l.*l.*o/;

if(pattern.test(input)) {
	console.log("YES");
} else {
	console.log("NO")
}

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim();
// const n = input.length;

// const target = "hello";
// const targetlength = 5
// let targetIndex = 0;

// for(let i = 0 ; i < n ; i++){
// 	if(input[i] === target[targetIndex]) {
// 		targetIndex++;
// 	}

// 	if(targetIndex === targetlength) {
// 		console.log("YES");
// 		return;
// 	}
// }

// console.log("NO")