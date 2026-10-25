// https://codeforces.com/problemset/problem/96/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require('fs');

const input = fs.readFileSync(0, 'utf-8').trim();

const hasSeven = /0{7}|1{7}/.test(input);

const ans = hasSeven ? 'YES' : 'NO'

console.log(ans);

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim()

// const n = input.length;

// let countOne = 0 ; countZero = 0;

// for(let i = 0 ; i < n ; i++) {
// 	if(input[i] === "0") {
// 		countZero++;
// 		countOne = 0;
// 	} else {
// 		countOne++;
// 		countZero = 0;
// 	}

// 	if(countOne === 7 || countZero === 7) break;
// }

// if(countOne === 7 || countZero === 7) {
// 	console.log("YES")
// } else {
// 	console.log("NO")
// }