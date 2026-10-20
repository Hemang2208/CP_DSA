// https://codeforces.com/problemset/problem/1829/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const output = [];

for (let i = 0; i < t; i++) {
    const n = Number(input[index++]);
    let count = 0;
    let maxZero = 0;

    for (let i = 0; i < n; i++) {
        if (input[index++] === "0") {
            count++;
            if (count > maxZero) maxZero = count;
        } else {
            count = 0;
        }
    }

    output.push(maxZero);
}

console.log(output.join("\n"));

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

// let index = 0;
// const t = Number(input[index++]);
// const outcomes = [];

// function inputArray(n) {
// 	let arr = [];
// 	for (let i = 0; i < n; i++) {
// 		const a = Number(input[index++]);
// 		arr.push(a);
// 	}

// 	return arr;
// }

// for(let i = 0 ; i < t ; i++) {
// 	const n = Number(input[index++]);

// 	let arr = [];
// 	arr = inputArray(n);

// 	let zeroCount = 0, count = 0;
// 	for (let i = 0; i < n; i++) {
// 		const a = arr[i]
// 		if(a === 0) {
// 			count++
// 			zeroCount = Math.max(zeroCount, count)
// 		} else {
// 			count = 0;
// 		}
// 	}

// 	outcomes.push(zeroCount)
// }

// console.log(outcomes.join("\n"));