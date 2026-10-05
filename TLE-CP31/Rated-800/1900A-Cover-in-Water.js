// https://codeforces.com/problemset/problem/1900/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);

function countThreeSpace(str, len) {
	let count = 0;
	for(let i = 0 ; i <= (len - 1) ; i++) {
		if(str[i] === "." && str[i+1] === "." && str[i+2] === ".") {
			count++;
			return count;
		}
	}
	return count;
}

function countAllBlock(str, len) {
	let count = 0;
	for(let i = 0 ; i <= (len - 1) ; i++) {
		if(str[i] === ".") {
			count++;
		}
	}
	return count;
}

for (let i = 1; i <= t; i++) {
	const len = Number(input[index++]);
	const str = String(input[index++]);

	const count = countThreeSpace(str, len);
	if (count === 1) {
		console.log(2);
		continue;
	}

	const block = countAllBlock(str, len);
	if(block === 0) {
		console.log(0);
		continue;
	} else {
		console.log(block);
	}
}