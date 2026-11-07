// https://codeforces.com/problemset/problem/2280/B
// node "test.js" < "Input.txt" > "Output.txt"

const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let t = null;
let n = null;
let currentStep = 0;
let totalOnes = 0;

rl.on("line", (line) => {
	const values = line.trim().split(/\s+/).map(Number);

	for (let i = 0; i < values.length; i++) {
		const value = values[i];
		
		if (value === -1) {
			process.exit(0);
		}

		if (t === null) {
			t = value;
			continue;
		}

		if (currentStep === 0) {
			n = value;
			console.log(`? 1 ${n}`);
			currentStep = 1;
		} 
		else if (currentStep === 1) {
			totalOnes = value;

			if (totalOnes === 0 || totalOnes === n) {
				console.log("! NO");
				t--;
				if (t === 0) process.exit(0);
				currentStep = 0;
			} else {
				console.log(`? 1 ${totalOnes}`);
				currentStep = 2;
			}
		} 
		else if (currentStep === 2) {
			const prefixOnes = value;

			if (prefixOnes === totalOnes) {
				console.log("! NO");
			} else {
				console.log("! YES");
			}

			t--;
			if (t === 0) process.exit(0);
			currentStep = 0;
		}
	}
});
