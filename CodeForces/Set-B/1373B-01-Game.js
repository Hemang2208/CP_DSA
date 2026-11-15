// https://codeforces.com/problemset/problem/1373/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class Stack {
	#items = [];
	#maxSize;

	constructor(maxSize = Infinity) {
		this.#maxSize = maxSize;
	}

	daaldo(value) {
		if (this.#items.length >= this.#maxSize) {
			return false;
		}

		this.#items.push(value);
		return true;
	}

	nikaaldo() {
		if (this.isKhaaliHain()) {
			return false;
		}

		return this.#items.pop();
	}

	dekhlo() {
		if (this.isKhaaliHain()) {
			return false;
		}

		return this.#items[this.#items.length - 1];
	}

	isKhaaliHain() {
		return this.#items.length === 0;
	}

	kitnaa() {
		return this.#items.length;
	}

	dikhado() {
		if (this.isKhaaliHain()) {
			return false;
		}

		return this.#items
			.map(item => (typeof item === "object" && item !== null ? JSON.stringify(item) : item))
			.join(" ");
	}

	saafKardo() {
		this.#items = [];
		return true;
	}
}

for(let i = 0 ; i < t ; i++) {
	const s = String(input[index++]);
	const meraStack = new Stack();
	let count = 0;

	for(let j = 0 ; j < s.length ; j++) {
		if (meraStack.isKhaaliHain()) {
			meraStack.daaldo(s[j]);
		} else if (s[j] !== meraStack.dekhlo()) {
			meraStack.nikaaldo();
			count++;
		} else {
			meraStack.daaldo(s[j]);
		}
	}
	
	if (count % 2 === 1) {
		outcomes.push("DA");
	} else {
		outcomes.push("NET");
	}

	meraStack.saafKardo();
}

console.log(outcomes.join("\n"));

// const fs = require("fs");

// const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(String);

// let index = 0;
// const t = Number(input[index++]);
// const outcomes = [];

// function countZero(arr, length) {
// 	let count0 = 0;

// 	for(let i = 0 ; i < length ; i++) {
// 		if(arr[i] === 0 || arr[i] === "0") count0++;
// 	}

// 	return count0;
// }

// for(let i = 0 ; i < t ; i++) {
// 	const n = String(input[index++]);
// 	const arr = String(n).split("").map(Number);
// 	const length = arr.length;

// 	const count0 = countZero(arr, length);
// 	const count1 = Number(length - count0);

// 	if(count1 === length || count0 === length) {
// 		outcomes.push("NET");
// 	} else if(count0 <= count1 && count0 % 2 === 0) {
// 		outcomes.push("NET");
// 	} else if(count1 < count0 && count1 % 2 === 0) {
// 		outcomes.push("NET");
// 	} else {
// 		outcomes.push("DA");
// 	}
// }

// console.log(outcomes.join("\n"));