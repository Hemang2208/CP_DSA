// https://codeforces.com/problemset/problem/1783/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];

	for (let i = 0; i < n; i++) {
		arr.push(Number(input[index++]));
	}

	return arr;
}

function isBeautiful(arr) {
	let sum = 0;

	for (let i = 0; i < arr.length; i++) {
		if (sum === arr[i]) {
			return false;
		}

		sum += arr[i];
	}

	return true;
}


function isPalindrome(arr) {
	const copy_arr = [...arr].reverse();

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== copy_arr[i]) {
			return false;
		}
	}

	return true;
}

for (let i = 0; i < t; i++) {
	const n = Number(input[index++]);
	let arr = inputArray(n);

	if (isBeautiful(arr)) {
		outcomes.push("YES");
		outcomes.push(arr.join(" "));
	} else {
		if (isPalindrome(arr)) {
			outcomes.push("NO");
		} else {
			[arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];

			outcomes.push("YES");
			outcomes.push(arr.join(" "));
		}
	}
}

console.log(outcomes.join("\n"));