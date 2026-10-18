// https://codeforces.com/problemset/problem/110/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = String(fs.readFileSync(0, "utf-8").trim().toString());
let count = 0, flag = 0;

for(let i = 0 ; i < input.length ; i++) {
	if(input[i] === "4" || input[i] === "7") {
		count++
	}
}

count = String(count.toString())

for(let i = 0 ; i < count.length ; i++) {
	if(count[i] != "4" && count[i] != "7") {
		flag = 1;
		break;
	}
}

if(flag === 0) {
	console.log("YES");
} else {
	console.log("NO");
}