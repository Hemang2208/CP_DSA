// https://codeforces.com/problemset/problem/1380/A
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

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const arr = inputArray(n);

	let nums = [];
	let flag = false;

	for(let i = 0 ; i < (n - 2) ; i++) {
		if(arr[i] < arr[i + 1] && arr[i + 1] > arr[i + 2]) {
			flag = true;
			nums = [(i + 1), (i + 2), (i + 3)];
			break;
		}
	}

	if(flag) {
		outcomes.push("YES");
		outcomes.push(nums.join(" "));
	} else {
		outcomes.push("NO")
	}
}

console.log(outcomes.join("\n"));