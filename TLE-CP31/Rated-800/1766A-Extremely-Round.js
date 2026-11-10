// https://codeforces.com/problemset/problem/1766/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");
const [, ...cases] = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

const checkNumber = (s) => 9 * (s.length - 1) + Number(s[0]);

console.log(cases.map(checkNumber).join("\n"));

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

// let index = 0;
// const t = Number(input[index++]);
// const outcomes = [];

// function checkNumber(n) {
//   let count = 0;

//   for (let power = 1 ; power <= 100000 ; power = power * 10) {
//     for (let digit = 1 ; digit <= 9 ; digit++) {
//       if (digit * power <= n) {
//         count++;
//       } else {
//         return count;
//       }
//     }
//   }

//   return count;
// }

// for(let i = 0 ; i < t ; i++) {
// 	const n = Number(input[index++]);

// 	outcomes.push(checkNumber(n));
// }

// console.log(outcomes.join("\n"));