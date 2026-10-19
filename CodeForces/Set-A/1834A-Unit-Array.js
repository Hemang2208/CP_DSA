// https://codeforces.com/problemset/problem/1834/A
// node "test.js" < "Input.txt" > "Output.txt"

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
	let arr = inputArray(n);

	let posLen = Number(arr.filter((item) => item > 0).length);
	let negLen = Number(n - posLen);

	let minPos = Number(Math.ceil(n / 2));
	let operations = 0;

	if(posLen < minPos) {
		let diff = Number(minPos - posLen);
		operations = Number(operations + diff);
		negLen = Number(negLen - diff);
	}

	if(negLen % 2 != 0) {
		operations++;
	}

	outcomes.push(operations.toString());
}

console.log(outcomes.join("\n"));