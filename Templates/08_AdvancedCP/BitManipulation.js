// Topic: BIT MANIPULATION
// Pattern: XOR / Set Bits / Bit Tricks / Bitmask Enumeration
// Use Cases: Single number problems, subset enumeration, parity, bit
// queries and updates, Gray code, XOR prefix, missing numbers.
//
// Example Problem: Find the Element Appearing Once (Others Twice)
// Source: Classic single number problem.
//
// node "BitManipulation.js" < "Input.txt" > "Output.txt"

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

function countSetBits(value) {
    let count = 0;

    while (value > 0) {
        value &= value - 1;
        count++;
    }

    return count;
}

function lowestSetBit(value) {
    return value & -value;
}

function isPowerOfTwo(value) {
    return value > 0 && (value & (value - 1)) === 0;
}

// Approach: every value appearing twice cancels under XOR, leaving only
// the unique value.
function singleNumber(arr) {
    let answer = 0;

    for (const value of arr) {
        answer ^= value;
    }

    return answer;
}

function getBit(value, position) {
    return (value >> position) & 1;
}

function setBit(value, position) {
    return value | (1 << position);
}

function clearBit(value, position) {
    return value & ~(1 << position);
}

function toggleBit(value, position) {
    return value ^ (1 << position);
}

function isBitSet(value, position) {
    return getBit(value, position) === 1;
}

function clearLowestSetBit(value) {
    return value & (value - 1);
}

function countSetBitsSigned(value) {
    let count = 0;
    value = value >>> 0;

    while (value > 0) {
        value &= value - 1;
        count++;
    }

    return count;
}

function xorUpto(n) {
    if (n < 0) return 0;

    switch (n % 4) {
        case 0:
            return n;
        case 1:
            return 1;
        case 2:
            return n + 1;
        default:
            return 0;
    }
}

function isEven(value) {
    return (value & 1) === 0;
}

function isOdd(value) {
    return (value & 1) === 1;
}

function xorSwaps(a, b) {
    if (a !== b) {
        a ^= b;
        b ^= a;
        a ^= b;
    }

    return [a, b];
}

function grayCode(n) {
    return n ^ (n >> 1);
}

function grayToBinary(gray) {
    let binary = gray;

    while (gray > 0) {
        gray >>= 1;
        binary ^= gray;
    }

    return binary;
}

function swapOddEvenBits(value) {
    const evenBits = value & 0xaaaaaaaa;
    const oddBits = value & 0x55555555;
    return ((evenBits >>> 1) | (oddBits << 1)) >>> 0;
}

function reverseBits(value) {
    let result = 0;

    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (value & 1);
        value >>>= 1;
    }

    return result >>> 0;
}

function enumerateSubsets(mask) {
    const subsets = [];

    for (let subset = mask; ; subset = (subset - 1) & mask) {
        subsets.push(subset);
        if (subset === 0) break;
    }

    return subsets;
}

function enumerateSubmasks(mask) {
    return enumerateSubsets(mask);
}

class BinaryTrieNode {
    constructor() {
        this.child = [null, null];
    }
}

function maximumXorPair(values) {
    const root = new BinaryTrieNode();
    let best = 0;

    for (const value of values) {
        let node = root;

        for (let bit = 30; bit >= 0; bit--) {
            const current = (value >> bit) & 1;
            if (!node.child[current]) node.child[current] = new BinaryTrieNode();
            node = node.child[current];
        }
    }

    for (const value of values) {
        let node = root;
        let candidate = 0;

        for (let bit = 30; bit >= 0; bit--) {
            const current = (value >> bit) & 1;
            const opposite = current ^ 1;

            if (node.child[opposite]) {
                candidate |= 1 << bit;
                node = node.child[opposite];
            } else {
                node = node.child[current];
            }
        }

        best = Math.max(best, candidate);
    }

    return best;
}

function twoSingleNumbers(arr) {
    let xor = 0;

    for (const value of arr) xor ^= value;

    const lowest = xor & -xor;
    let first = 0;
    let second = 0;

    for (const value of arr) {
        if (value & lowest) first ^= value;
        else second ^= value;
    }

    return [first, second].sort((a, b) => a - b);
}

function missingNumber(values) {
    let xor = 0;
    const n = values.length;

    for (let i = 0; i <= n; i++) xor ^= i;

    for (const value of values) xor ^= value;

    return xor;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return singleNumber(arr);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
