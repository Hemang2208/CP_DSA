// https://codeforces.com/problemset/problem/2288/A
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function checkDamage(moves, charges) {
	let power = 1;
	let totalDamage = 0;

	for (let i = 0 ; i < charges ; i++) {
		power++;
	}

	const attacks = moves - charges;
	for (let i = 0 ; i < attacks ; i++) {
		totalDamage = totalDamage + power;

		if (power > 1) {
			power--;
		}
	}

	return totalDamage;
}

for (let i = 0; i < t; i++) {
	const x = Number(input[index++]);

	let m = 1;
	while (true) {
		let best = 0;

		for (let c = 0 ; c < m ; c++) {
			const damage = checkDamage(m, c);

			if (damage > best) {
				best = damage;
			}
		}

		if (best >= x) {
			outcomes.push(m);
			break;
		}

		m++;
	}
}

console.log(outcomes.join("\n"));