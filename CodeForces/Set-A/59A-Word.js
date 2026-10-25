// https://codeforces.com/problemset/problem/59/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim()

// const countCase = input => ({ upper: input.split(/[A-Z]/).length - 1, lower: input.split(/[a-z]/).length - 1 });
// console.log(countCase(input))

const n = input.length;
const half = n / 2;

let upperCase = 0, lowerCase = 0, upper = (n - 1), lower = 0;

while(lower <= upper) {
	if(input[lower] >= "A" && input[lower] <= "Z") {
		upperCase++;
	} else if(input[lower] >= "a" && input[lower] <= "z") {
		lowerCase++;
	}

	if(lower < upper) {
		if (input[upper] >= "A" && input[upper] <= "Z") {
			upperCase++;
		} else if(input[upper] >= "a" && input[upper] <= "z") {
			lowerCase++;
		}
	}

	if (upperCase > half) break;
	if (lowerCase >= half) break;

	lower++;
	upper--;
}

if(lowerCase >= upperCase) {
	console.log(input.toLowerCase().toString());
} else {
	console.log(input.toUpperCase().toString());
}