// https://codeforces.com/problemset/problem/110/B
// node "test.js" < "Input.txt" > "Output.txt"

const fs = require('fs');

const input = Number(fs.readFileSync(0, 'utf-8').trim());
const pattern = "abcd";
let result = "";

for (let i = 0; i < input; i++) {
    result += pattern[i % 4];
}

console.log(result);