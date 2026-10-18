// https://codeforces.com/problemset/problem/110/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

let input = Number(fs.readFileSync(0, "utf-8").trim());

let fours = 0;
let sevens = 0;
let result = "";

while (input >= 0) {
    if (input % 7 === 0) {
        sevens = Number(Math.floor(input / 7));
        break;
    }

    input = Number(input - 4);
    fours++;
}

if (input < 0) {
    console.log(-1);
} else {
	while(fours > 0) {
		result = String(result + "4");
		fours--;
	}

	while(sevens > 0) {
		result = String(result + "7");
		sevens--;
	}
}

console.log(result);