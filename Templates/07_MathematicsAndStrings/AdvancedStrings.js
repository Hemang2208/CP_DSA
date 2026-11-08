// Topic: ADVANCED STRINGS
// Pattern: Aho-Corasick / Suffix Automaton / Palindromic Tree
// Use Cases: Multi-pattern matching, distinct substrings, distinct
// palindromes, minimal rotation, border periods, double hashing.
//
// Example Problem: Count Every Pattern Occurrence In A Text
// Source: Classic Aho-Corasick application.
//
// node "AdvancedStrings.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

class AhoCorasick {
    constructor() {
        this.next = [new Map()];
        this.fail = [0];
        this.output = [[]];
    }

    addNode() {
        this.next.push(new Map());
        this.fail.push(0);
        this.output.push([]);
        return this.next.length - 1;
    }

    add(pattern, id) {
        let node = 0;

        for (const ch of pattern) {
            if (!this.next[node].has(ch)) {
                this.next[node].set(ch, this.addNode());
            }

            node = this.next[node].get(ch);
        }

        this.output[node].push(id);
    }

    build() {
        const queue = [];

        for (const child of this.next[0].values()) {
            queue.push(child);
        }

        for (let head = 0; head < queue.length; head++) {
            const node = queue[head];

            for (const [ch, child] of this.next[node]) {
                let fallback = this.fail[node];

                while (fallback && !this.next[fallback].has(ch)) {
                    fallback = this.fail[fallback];
                }

                if (this.next[fallback].has(ch) && this.next[fallback].get(ch) !== child) {
                    this.fail[child] = this.next[fallback].get(ch);
                } else {
                    this.fail[child] = 0;
                }

                this.output[child].push(...this.output[this.fail[child]]);
                queue.push(child);
            }
        }
    }

    search(text, patternCount) {
        const count = new Array(patternCount).fill(0);
        let node = 0;

        for (const ch of text) {
            while (node && !this.next[node].has(ch)) {
                node = this.fail[node];
            }

            node = this.next[node].get(ch) || 0;

            for (const id of this.output[node]) {
                count[id]++;
            }
        }

        return count;
    }
}

function distinctSubstrings(text) {
    const next = [new Map()];
    const link = [-1];
    const length = [0];
    let last = 0;

    function extend(ch) {
        const current = next.length;
        next.push(new Map());
        link.push(0);
        length.push(length[last] + 1);
        let p = last;

        while (p !== -1 && !next[p].has(ch)) {
            next[p].set(ch, current);
            p = link[p];
        }

        if (p !== -1) {
            const q = next[p].get(ch);

            if (length[p] + 1 === length[q]) {
                link[current] = q;
            } else {
                const clone = next.length;
                next.push(new Map(next[q]));
                link.push(link[q]);
                length.push(length[p] + 1);

                while (p !== -1 && next[p].get(ch) === q) {
                    next[p].set(ch, clone);
                    p = link[p];
                }

                link[q] = clone;
                link[current] = clone;
            }
        }

        last = current;
    }

    for (const ch of text) extend(ch);

    let answer = 0;

    for (let node = 1; node < next.length; node++) {
        answer += length[node] - length[link[node]];
    }

    return answer;
}

function distinctPalindromes(text) {
    const next = [new Map(), new Map()];
    const link = [0, 0];
    const length = [-1, 0];
    let last = 1;

    function getLink(node, position) {
        while (position - 1 - length[node] < 0 || text[position - 1 - length[node]] !== text[position]) {
            node = link[node];
        }

        return node;
    }

    for (let position = 0; position < text.length; position++) {
        const ch = text[position];
        let current = getLink(last, position);

        if (!next[current].has(ch)) {
            const node = next.length;
            next.push(new Map());
            link.push(0);
            length.push(length[current] + 2);
            next[current].set(ch, node);

            if (length[node] === 1) {
                link[node] = 1;
            } else {
                const candidate = getLink(link[current], position);
                link[node] = next[candidate].get(ch);
            }
        }

        last = next[current].get(ch);
    }

    return next.length - 2;
}

function minimalRotation(text) {
    const doubled = text + text;
    let i = 0;
    let j = 1;
    let k = 0;

    while (i < text.length && j < text.length && k < text.length) {
        const a = doubled[i + k];
        const b = doubled[j + k];

        if (a === b) {
            k++;
            continue;
        }

        if (a > b) i += k + 1;
        else j += k + 1;

        if (i === j) j++;
        k = 0;
    }

    return doubled.slice(Math.min(i, j), Math.min(i, j) + text.length);
}

function prefixFunction(text) {
    const pi = new Array(text.length).fill(0);

    for (let i = 1; i < text.length; i++) {
        let j = pi[i - 1];

        while (j > 0 && text[i] !== text[j]) j = pi[j - 1];
        if (text[i] === text[j]) j++;
        pi[i] = j;
    }

    return pi;
}

function shortestPeriod(text) {
    const pi = prefixFunction(text);
    const period = text.length - pi[text.length - 1];
    return text.length % period === 0 ? period : text.length;
}

function doubleHash(text) {
    const mod1 = 1_000_000_007;
    const mod2 = 1_000_000_009;
    const base = 911382323;
    const prefix1 = new Array(text.length + 1).fill(0);
    const prefix2 = new Array(text.length + 1).fill(0);
    const power1 = new Array(text.length + 1).fill(1);
    const power2 = new Array(text.length + 1).fill(1);

    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i) + 1;
        prefix1[i + 1] = (prefix1[i] * base + code) % mod1;
        prefix2[i + 1] = (prefix2[i] * base + code) % mod2;
        power1[i + 1] = (power1[i] * base) % mod1;
        power2[i + 1] = (power2[i] * base) % mod2;
    }

    return {
        query(left, right) {
            const length = right - left;
            const first = (prefix1[right] - prefix1[left] * power1[length] % mod1 + mod1) % mod1;
            const second = (prefix2[right] - prefix2[left] * power2[length] % mod2 + mod2) % mod2;
            return [first, second];
        },
    };
}

function solve() {
    const patternCount = Number(input[index++]);
    const patterns = [];

    for (let i = 0; i < patternCount; i++) {
        patterns.push(input[index++]);
    }

    const text = input[index++];
    const automaton = new AhoCorasick();

    patterns.forEach((pattern, id) => automaton.add(pattern, id));
    automaton.build();

    return automaton.search(text, patternCount).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
