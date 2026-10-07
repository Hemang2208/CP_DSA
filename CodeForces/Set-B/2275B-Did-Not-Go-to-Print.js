// https://codeforces.com/problemset/problem/2275/B

const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);

const output = [];

for (let tc = 0; tc < t; tc++) {
    const n = Number(input[index++]);
    const num = input[index++];

    const memory = [];
    const printed = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
        const value = num[i - 1];

        if (value === "1") {
            memory.push(i);
        } 
        else if (value === "2") {
            if (memory.length > 0) {
                printed[memory.pop()] = true;
            } else {
                printed[i] = true;
            }
        } 
        else {
            printed[i] = true;
        }
    }

    const unprinted = [];

    for (let i = 1; i <= n; i++) {
        if (!printed[i]) {
            unprinted.push(i);
        }
    }

    output.push(unprinted.length);
    output.push(unprinted.join(" "));
}

console.log(output.join("\n"));