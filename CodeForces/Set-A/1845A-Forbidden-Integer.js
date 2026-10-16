// https://codeforces.com/problemset/problem/1845/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);

for(let i = 0 ; i < t ; i++) {
	const n = Number(input[index++]);
	const k = Number(input[index++]);
	const x = Number(input[index++]);
	
	let output = [];

	if(x != 1) {
		console.log("YES");
		console.log(n);

		for(let i = 0 ; i < n ; i++) {
			output.push(1);
		}

		console.log(output.join(" "));
	} else {
		if( k === 1 || (k === 2 && n % 2 === 1)) {
			console.log("NO");
		} else {
			console.log("YES");
			const even = Number(Math.floor(n / 2));
			const odd = Number(Math.floor((n - 3) / 2));;

			if(n % 2 === 0) {
				console.log(even);

				for(let i = 0 ; i < even ; i++) {
					output.push(2);
				}

				console.log(output.join(" "));
			} else {
				console.log(Number(odd + 1));

				for(let i = 0 ; i < odd ; i++) {
					output.push(2);
				}

				output.push(3);
				console.log(output.join(" "));
			}
		}
	}
}