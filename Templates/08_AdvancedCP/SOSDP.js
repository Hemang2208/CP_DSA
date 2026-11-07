// Topic: SOS DP (SUM OVER SUBSETS)
// Pattern: Subset Zeta Transform
// Use Cases: Subset sums, superset sums, bitmask DP aggregation,
// or-convolution preprocessing, counting masks with properties.
//
// Example Problem: For Every Mask, Sum Values Over All Submasks
// Source: Classic SOS DP problem.
//
// node "SOSDP.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        const a = Number(input[index++]);
        arr.push(a);
    }

    return arr;
}

// Approach: after processing bit i, f[mask] contains the sum over all
// submasks that may differ from mask only in bits 0..i.
function subsetSums(values, bits) {
    const n = 1 << bits;
    const f = values.slice();

    for (let bit = 0; bit < bits; bit++) {
        for (let mask = 0; mask < n; mask++) {
            if (mask & (1 << bit)) {
                f[mask] += f[mask ^ (1 << bit)];
            }
        }
    }

    return f;
}

function solve() {
    const bits = Number(input[index++]);
    const values = inputArray(1 << bits);

    return subsetSums(values, bits).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
