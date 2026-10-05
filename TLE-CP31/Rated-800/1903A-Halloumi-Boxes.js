// https://codeforces.com/problemset/problem/1903/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);

function sortCheck(a, n) {
	for(let i=0 ; i < (n-1) ; i++){
        if (a[i]>a[i+1]){
            return false;
        }
    }
    return true;
}

function inputArray(n) {
	let arr = []
	for(let i = 1 ; i <= n ; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}
	return arr;
}

for (let i = 1; i <= t; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);

	let arr = []
	arr = inputArray(n);

	let flag = sortCheck(arr, n);

	if(k > 1 || flag) {
		console.log("YES")
		continue;
	} else {
		console.log("NO")
		continue;
	}
}
