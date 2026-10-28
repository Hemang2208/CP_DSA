// https://codeforces.com/problemset/problem/16/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;

const n = Number(input[index++]);
const m = Number(input[index++]);
const t = n * m;

// let arr = input.slice(index, index + n).join("").split("");

let arr = [];
for (let i = 0; i < n; i++) {
	let a = input[index++];
	if(a[0] != a[1] || a[1] != a[2] || a[0] != a[2]) {
		console.log("NO")
		return;	
	}
	a = a.toString().split("");
	arr.push(...a);
}

const track = new Map();

for(let i = 0 ; i < t ; i++) {
	track.set(arr[i], (track.get(arr[i]) || 0) + 1);

	const status = Number(track.get(arr[i])) || 0;
	const size = Number(track.size);
	if(status > n || size > n) {
		console.log("NO")
		return;
	}
}

console.log("YES")