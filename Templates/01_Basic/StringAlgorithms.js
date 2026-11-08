// Topic: STRINGS (BASIC AND INTERMEDIATE)
// Pattern: Frequency, Reversal, Encoding, Parsing
// Use Cases: Palindrome and anagram checks, first non-repeating
// character, run-length encoding, ATOI, Roman numerals, binary sums.
//
// Example Problem: Palindrome, First Unique Character, Run-Length Encoding
// Source: Classic string processing exercise.
//
// node "StringAlgorithms.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(tokens[index++]);
const outcomes = [];

function nextStr() {
    return tokens[index++];
}

function reverseString(s) {
    return s.split("").reverse().join("");
}

function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }

    return true;
}

function frequency(s) {
    const map = new Map();

    for (const ch of s) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }

    return map;
}

function isAnagram(a, b) {
    if (a.length !== b.length) return false;
    const map = frequency(a);

    for (const ch of b) {
        if (!map.get(ch)) return false;
        map.set(ch, map.get(ch) - 1);
    }

    return true;
}

function firstNonRepeating(s) {
    const map = frequency(s);

    for (const ch of s) {
        if (map.get(ch) === 1) return ch;
    }

    return "-1";
}

function longestCommonPrefix(words) {
    if (!words.length) return "";

    let prefix = words[0];

    for (let i = 1; i < words.length; i++) {
        while (!words[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return "";
        }
    }

    return prefix;
}

function reverseWords(s) {
    return s.trim().split(/\s+/).reverse().join(" ");
}

function atoi(s) {
    let i = 0;
    let sign = 1;

    while (s[i] === " ") i++;
    if (s[i] === "+" || s[i] === "-") {
        sign = s[i] === "-" ? -1 : 1;
        i++;
    }

    let value = 0;

    while (i < s.length && s[i] >= "0" && s[i] <= "9") {
        value = value * 10 + Number(s[i]);
        i++;
    }

    return sign * value;
}

function addBinary(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    let result = "";

    while (i >= 0 || j >= 0 || carry) {
        const left = i >= 0 ? Number(a[i--]) : 0;
        const right = j >= 0 ? Number(b[j--]) : 0;
        const sum = left + right + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    return result;
}

function runLengthEncode(s) {
    if (!s) return "";

    let result = "";
    let count = 1;

    for (let i = 1; i <= s.length; i++) {
        if (i < s.length && s[i] === s[i - 1]) {
            count++;
        } else {
            result += s[i - 1] + count;
            count = 1;
        }
    }

    return result;
}

function runLengthDecode(s) {
    let result = "";
    let count = "";

    for (const ch of s) {
        if (ch >= "0" && ch <= "9") {
            count += ch;
        } else {
            result += ch.repeat(Number(count || 1));
            count = "";
        }
    }

    return result;
}

const ROMAN = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function intToRoman(value) {
    let result = "";

    for (const [number, symbol] of ROMAN) {
        while (value >= number) {
            result += symbol;
            value -= number;
        }
    }

    return result;
}

function romanToInt(s) {
    const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        const current = values[s[i]];
        const next = values[s[i + 1]] || 0;
        result += current < next ? -current : current;
    }

    return result;
}

function solve() {
    const s = nextStr();

    return `${isPalindrome(s)} ${firstNonRepeating(s)} ${runLengthEncode(s)} ${reverseString(s)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
