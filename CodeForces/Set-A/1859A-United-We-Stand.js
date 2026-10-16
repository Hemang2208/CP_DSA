// https://codeforces.com/problemset/problem/1859/A

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

	let arr = []
	arr = inputArray(n)
	arr.sort((x, y) => x - y);

	const maxVal = arr[n-1];

	const sett = new Set(arr)
	if(sett.size === 1 || arr[0] === maxVal) {
		outcomes.push(-1)
		continue;
	}

	let brr = [], crr = [];

	for (let j = 0 ; j < n ; j++) {
		if (arr[j] < maxVal) {
			brr.push(arr[j]);
		} else {
			crr.push(arr[j]);
		}
	}

	brr.sort((x, y) => x - y);
	crr.sort((x, y) => y - x);

	// outcomes.push(`${brr.length} ${crr.length}`);
	outcomes.push(brr.length + " " + crr.length)
	outcomes.push(brr.join(' '));
	outcomes.push(crr.join(' '));
}

console.log(outcomes.join("\n"));