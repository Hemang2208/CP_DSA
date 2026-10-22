// https://codeforces.com/problemset/problem/2267/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function ansPalindrome(arr, c) {
	let coins = 0;
	let left = 0;
	let right = arr.length - 1;

	while (left < right) {
		if (arr[left] !== arr[right]) {
			if(arr[left] === c) {
				coins = coins + 1;
			} else if(arr[right] === c) {
				coins = coins + 1;
			} else {
				coins = coins + 2;
			}
		}

		left++;
		right--;
	}

	return coins;
}

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const c = String(input[index++]);
	const s = String(input[index++]);

	const ans = ansPalindrome(s, c);
	if(ans === 0) {
		outcomes.push(0);
	} else {
		outcomes.push(ans);
	}
}

console.log(outcomes.join("\n"));