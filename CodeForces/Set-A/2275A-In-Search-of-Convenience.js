// https://codeforces.com/problemset/problem/2275/A

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = input[index++];
// const outcomes = [];

// function inputArray(n) {
// 	let arr = []
// 	for(let i = 1 ; i <= n ; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}
// 	return arr;
// }

function findIntegerCoordinate(x0, y0, R) {
    for (let dx = -R ; dx <= R ; dx++) {
        const dySquared = (R * R) - (dx * dx);
        const dy = Math.round(Math.sqrt(dySquared));

        if (dx * dx + dy * dy === R * R) {
            const x1 = x0 + dx;
            const y1 = y0 + dy;
            
            console.log(x1 + " " + y1);
            break;
        }
    }
}

for(let i = 0; i < t; i++) {
	const x0 = Number(input[index++]);
	const y0 = Number(input[index++]);
	const R = Number(input[index++]);
	
	findIntegerCoordinate(x0, y0, R)
	// outcomes.push(ans)
}

// console.log(outcomes.join("\n"));