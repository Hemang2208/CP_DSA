// https://codeforces.com/problemset/problem/339/A
// node "test.js" < "Input.txt" > "Output.txt"

const result = require("fs").readFileSync(0, "utf-8").trim().split("+").sort((a, b) => Number(a) - Number(b)).join("+");
console.log(result);

// const fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim();
// const inputLength = input.length;

// const nums = [];
// for(let i = 0 ; i < inputLength ; i++) {
// 	if(input[i] != "+") {
// 		const number = Number(input[i]);
// 		nums.push(number);
// 	}
// }

// const numsLength = nums.length;

// for (let i = 0 ; i < numsLength - 1 ; i++) {
// 	for (let j = 0 ; j < numsLength - i - 1 ; j++) {
// 		if (nums[j] > nums[j + 1]) {
// 			const temp = nums[j];
// 			nums[j] = nums[j + 1];
// 			nums[j + 1] = temp;
// 		}
// 	}
// }

// let result = "";
// let k = 0;

// while (k < numsLength) {
// 	result = result + nums[k];

// 	if (k < numsLength - 1) {
// 		result = result + "+";
// 	}

// 	k++;
// }

// console.log(result);