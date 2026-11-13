// https://codeforces.com/problemset/problem/2200/C
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
	let arr = [];
	
	for (let i = 0 ; i < n ; i++) {
		const a = Number(input[index++]);
		arr.push(a);
	}

	return arr;
}

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
	const n = Number(input[index++]);
	const arr = String(input[index++]);

	const meraStack = new Stack();

	for(let j = 0 ; j < n ; j++) {
		if(meraStack.isKhaaliHain()) {
			meraStack.daaldo(arr[j]);
		} else {
			if(meraStack.dekhlo()) {
				if(arr[j] === meraStack.dekhlo()) {
					meraStack.nikaaldo();
				} else {
					meraStack.daaldo(arr[j]);
				}
			} else {
				meraStack.daaldo(arr[j]);
			}
		}
	}

	if(meraStack.isKhaaliHain()) {
		outcomes.push("YES");
	} else {
		outcomes.push("NO");
	}

	meraStack.saafKardo();
}

console.log(outcomes.join("\n"));