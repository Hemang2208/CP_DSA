// https://codeforces.com/problemset/problem/110/C
// node "test.js" < "Input.txt" > "Output.txt"

// Total sum must be of the form: 4 * fours + 7 * sevens = input
// Taking modulo 7: 4 * fours ≡ input (mod 7)
// The modular inverse of 4 modulo 7 is 2 (since 4 * 2 = 8 ≡ 1 mod 7)
// Therefore: fours ≡ (input * 2) (mod 7)

const fs = require("fs");

const input = Number(fs.readFileSync(0, "utf-8").trim());

let fours = Math.floor((input * 2) % 7);
let remaining = Math.floor(input - fours * 4);

if (remaining < 0 || remaining % 7 !== 0) {
	console.log(-1);
	return;
}

let sevens = Math.floor(remaining / 7);

console.log("4".repeat(fours) + "7".repeat(sevens));

// const fs = require("fs");

// let input = Number(fs.readFileSync(0, "utf-8").trim());

// let fours = 0;
// let sevens = 0;
// let result = "";

// while (input >= 0) {
//     if (input % 7 === 0) {
//         sevens = Number(Math.floor(input / 7));
//         break;
//     }

//     input = Number(input - 4);
//     fours++;
// }

// if (input < 0) {
//     console.log(-1);
// } else {
// 	while(fours > 0) {
// 		result = String(result + "4");
// 		fours--;
// 	}

// 	while(sevens > 0) {
// 		result = String(result + "7");
// 		sevens--;
// 	}
// }

// console.log(result);