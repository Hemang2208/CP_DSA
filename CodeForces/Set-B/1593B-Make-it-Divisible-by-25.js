// https://codeforces.com/problemset/problem/1593/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

for(let i = 0 ; i < t ; i++) {
	const s = String(input[index++]);
	const len = s.length;

	let ans = Infinity;

	const last5 = s.lastIndexOf("5");
	if (last5 >= 1) {
		const pos2 = s.lastIndexOf("2", last5 - 1);
		const pos7 = s.lastIndexOf("7", last5 - 1);
		const best = Math.max(pos2, pos7);

		if (best !== -1) {
			ans = Math.min(ans, len - 2 - best);
		}
	}

	const last0 = s.lastIndexOf("0");
	if (last0 >= 1) {
		const pos0 = s.lastIndexOf("0", last0 - 1);
		const pos5 = s.lastIndexOf("5", last0 - 1);
		const best = Math.max(pos0, pos5);

		if (best !== -1) {
			ans = Math.min(ans, len - 2 - best);
		}
	}

	outcomes.push(ans);
}

console.log(outcomes.join("\n"));


// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(BigInt);

// let index = 0;
// const t = BigInt(input[index++]);
// const outcomes = [];

// for(let i = 0n ; i < t ; i++) {
// 	const n = BigInt(input[index++]);
// 	let m = n, count = 0, ans = Infinity;

// 	while (m > 9n) {
// 		const num = m % 100n;

// 		if (num === 0n || num === 25n || num === 50n || num === 75n) {
// 			ans = count;
// 			break;
// 		}

// 		m = m / 10n;
// 		count++;
// 	}

// 	const s = n.toString();
// 	const len = s.length;

// 	for (let j = len - 1; j >= 1; j--) {
// 		if (s[j] === "5") {
// 			const pos2 = s.lastIndexOf("2", j - 1);
// 			const pos7 = s.lastIndexOf("7", j - 1);
// 			const best = Math.max(pos2, pos7);

// 			if (best !== -1) {
// 				const moves = (len - 1 - j) + (j - 1 - best);
// 				ans = Math.min(ans, moves);
// 			}
// 		} else if (s[j] === "0") {
// 			const pos0 = s.lastIndexOf("0", j - 1);
// 			const pos5 = s.lastIndexOf("5", j - 1);
// 			const best = Math.max(pos0, pos5);

// 			if (best !== -1) {
// 				const moves = (len - 1 - j) + (j - 1 - best);
// 				ans = Math.min(ans, moves);
// 			}
// 		}
// 	}

// 	outcomes.push(ans);
// }

// console.log(outcomes.join("\n"));