// https://codeforces.com/problemset/problem/1722/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);

const tim = "Timur"
const arr1 = tim.trim().split("").sort().join('');

for (let i = 1; i <= t; i++) {
	let n = Number(input[index++]);
	let s = String(input[index++]);

	if (n !== 5 || s.indexOf("T") === -1) {
		console.log("NO");
        continue;
    }

	const arr2 = s.trim().split("").sort().join('');

	if(n === 5 && arr1 === arr2) {
		console.log("YES")
	} else {
		console.log("NO");
	}
}