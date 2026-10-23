// https://codeforces.com/problemset/problem/1791/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function ansPalindrome(arr, n) {
	let left = 0;
	let right = n - 1;

	while (left < right) {
		if (arr[left] === arr[right]) {
			break;
		}

		left++;
		right--;
	}

	return (right - left) + 1;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const s = String(input[index++]);

	outcomes.push(ansPalindrome(s, n));
}

console.log(outcomes.join("\n"));