# JavaScript Competitive Programming Handbook

## 0. How To Use This Handbook

### 0.1 Your Base Template (numbers only)

```js
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

// ---- paste solution functions here ----

for (let i = 0; i < t; i++) {
  const n = Number(input[index++]);
  let arr = inputArray(n);
  arr.sort((a, b) => a - b);
  outcomes.push(arr.join(" "));
}

console.log(outcomes.join("\n"));
```

### 0.2 Template Variant (strings in the input)

`map(Number)` turns words into `NaN`. When the input has strings, keep tokens as strings:

```js
const fs = require("fs");
const tokens = fs.readFileSync(0, "utf-8").trim().split(/\s+/);
let index = 0;

function nextInt() {
  return Number(tokens[index++]);
}
function nextStr() {
  return tokens[index++];
}
function nextBig() {
  return BigInt(tokens[index++]);
}
function inputArray(n) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = nextInt();
  return arr;
}
```

### 0.3 Line-based input (when lines matter, e.g. grids with spaces)

```js
const lines = require("fs").readFileSync(0, "utf-8").split("\n");
let li = 0;
function nextLine() {
  return lines[li++].trim();
}
```

### 0.4 Toolbox (used by many sections, copy when needed)

```js
// ---------- Priority queue / binary heap (min-heap by default) ----------
class PriorityQueue {
  constructor(cmp = (a, b) => a - b) {
    this.h = [];
    this.cmp = cmp;
  }
  size() {
    return this.h.length;
  }
  peek() {
    return this.h[0];
  }
  push(v) {
    const h = this.h;
    h.push(v);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(h[i], h[p]) >= 0) break;
      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    }
  }
  pop() {
    const h = this.h;
    const top = h[0];
    const last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      const n = h.length;
      while (true) {
        const l = 2 * i + 1,
          r = l + 1;
        let m = i;
        if (l < n && this.cmp(h[l], h[m]) < 0) m = l;
        if (r < n && this.cmp(h[r], h[m]) < 0) m = r;
        if (m === i) break;
        [h[i], h[m]] = [h[m], h[i]];
        i = m;
      }
    }
    return top;
  }
}
// Max-heap: new PriorityQueue((a, b) => b - a)
// Pairs:    new PriorityQueue((a, b) => a[0] - b[0])

// ---------- Safe modular multiplication (mod < 2^31, no BigInt) ----------
const MOD = 1000000007;
function mulmod(a, b, m = MOD) {
  // a, b < m < 2^31. a*b can exceed 2^53, so split a into high/low 16 bits.
  return ((((a >>> 16) * b) % m) * 65536 + (a & 65535) * b) % m;
}
function addmod(a, b, m = MOD) {
  return (a + b) % m;
}
function submod(a, b, m = MOD) {
  return (((a - b) % m) + m) % m;
}

// ---------- Swap, random, pairs ----------
function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
function randInt(l, r) {
  return l + Math.floor(Math.random() * (r - l + 1));
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) swap(arr, i, randInt(0, i));
  return arr;
}
```

### 0.5 JavaScript Pitfalls (read once, save penalty time)

| Pitfall                                                                         | Fix                                              |
| ------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------- |
| `arr.sort()` sorts **as strings** (`[10,9,1]` -> `[1,10,9]`)                    | Always `arr.sort((a,b)=>a-b)`                    |
| Numbers are doubles: exact only up to `2^53 - 1` (`9007199254740991`)           | Use `BigInt` (`123n`) or `mulmod`                |
| `%` can be negative: `-7 % 3 === -1`                                            | `((a % m) + m) % m`                              |
| `/` is float division                                                           | `Math.floor(a / b)` or `(a / b)                  | 0` (only < 2^31) |
| Bitwise ops are **32-bit signed**                                               | `>>> 0` for unsigned, `BigInt` for 64-bit        |
| `Math.max(...arr)` crashes for ~1e5+ elements                                   | Use a loop or `reduce`                           |
| Recursion depth is only ~1e4                                                    | Use iterative DFS/BFS for large trees and graphs |
| `Array(n).fill([])` shares one array                                            | `Array.from({length:n}, () => [])`               |
| `arr.shift()` is O(n)                                                           | Use head index / deque                           |
| String `+=` in loops is OK, but `console.log` per line is slow                  | Collect in an array, `join("\n")` once           |
| `obj[key]` with numeric keys is OK, but `Map` is safer for large/arbitrary keys | Use `Map` and `Set`                              |
| `Number("1e9")` parses, `parseInt("1e9")` gives 1                               | Use `Number`                                     |

### 0.6 Complexity Cheat Sheet (1 second ~ 10^8 simple ops in Node)

| n (max)   | Target complexity                      |
| --------- | -------------------------------------- |
| n <= 10   | O(n!)                                  |
| n <= 20   | O(2^n \* n)                            |
| n <= 40   | Meet in the middle O(2^(n/2))          |
| n <= 500  | O(n^3)                                 |
| n <= 5000 | O(n^2)                                 |
| n <= 1e5  | O(n log n)                             |
| n <= 1e6  | O(n) or O(n log n) with small constant |
| n <= 1e18 | O(log n) / O(sqrt n) with math         |

### 0.7 Table of Contents

1. Programming Fundamentals
2. Basic Mathematics
3. Arrays
4. Strings
5. Two Pointers
6. Sliding Window
7. Prefix Sum and Difference Arrays
8. Searching Algorithms
9. Sorting Algorithms
10. Linked Lists
11. Stacks
12. Queues and Deques
13. Hashing
14. Recursion and Backtracking
15. Greedy Algorithms
16. Divide and Conquer
17. Dynamic Programming
18. Binary Trees
19. Binary Search Trees
20. Heaps and Priority Queues
21. Graph Fundamentals
22. Advanced Graph Algorithms
23. Disjoint Set Union (DSU)
24. Fenwick Tree and Segment Tree
25. Tries and String Data Structures
26. Bit Manipulation
27. Advanced Number Theory
28. Computational Geometry
29. Advanced Competitive Programming Techniques
30. Graph and Bitmask DP Problems

---

# 1. Programming Fundamentals

### Variables, Data Types, Operators

```js
const a = 5; // number (double). Integers are exact up to 2^53 - 1
let big = 123456789012345678901234567890n; // BigInt
let s = "hello"; // string (immutable)
let flag = true; // boolean
let arr = [1, 2, 3]; // array
let obj = { x: 1 }; // object
let nothing = null,
  und = undefined;

// Operators
// arithmetic: + - * / % **      comparison: === !== < <= > >=
// logical: && || !              bitwise: & | ^ ~ << >> >>>
console.log(7 / 2, Math.floor(7 / 2), 7 % 2, 2 ** 10); // 3.5 3 1 1024
console.log(typeof 1, typeof 1n, typeof "a", typeof [], Array.isArray([]));
```

### Conditional Statements

```js
function sign(x) {
  if (x > 0) return 1;
  else if (x < 0) return -1;
  return 0;
}
const parity = (x) => (x % 2 === 0 ? "even" : "odd"); // ternary
```

### Loops and Nested Loops

```js
function sumTo(n) {
  let s = 0;
  for (let i = 1; i <= n; i++) s += i;
  return s;
}
function printPairs(n) {
  // nested loop O(n^2)
  const out = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) out.push(`${i} ${j}`);
  return out;
}
// for...of (values), for...in (indices/keys), while, do...while
for (const v of [10, 20]) console.log(v);
let k = 5;
while (k--) {
  /* runs 5 times */
}
```

### Functions, Scope

```js
function add(a, b) {
  return a + b;
}
const mul = (a, b) => a * b;

// let / const are block-scoped, var is function-scoped (avoid var)
let g = 1;
function demo() {
  let g = 2; // shadows the outer g
  {
    let g = 3;
  } // inner block
  return g; // 2
}
// Closures: inner function remembers outer variables
function makeCounter() {
  let c = 0;
  return () => ++c;
}
```

### Recursion Basics

```js
function factorial(n) {
  // base case + recursive case
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
// JS has no tail-call optimization. Depth ~1e4 is the limit -> convert to loops for big n.
```

### Arrays, Strings, Objects, Maps, Sets

```js
// Arrays
const a1 = new Array(5).fill(0);
const a2D = Array.from({ length: 3 }, () => new Array(4).fill(0)); // 3x4 grid
a1.push(1);
a1.pop();
a1.slice(1, 3);
a1.indexOf(0);
a1.includes(0);
a1.map((x) => x * 2);
a1.filter((x) => x > 0);
a1.reduce((s, x) => s + x, 0);
const typed = new Int32Array(100000); // faster, fixed size, zero filled
const f64 = new Float64Array(100000);

// Strings (immutable: build via array then join)
const s = "abcde";
s.length;
s[0];
s.charCodeAt(0);
String.fromCharCode(97);
s.split("");
s.slice(1, 3);
s.substring(1, 3);
s.indexOf("c");
s.toUpperCase();
s.toLowerCase();
s.repeat(3);
[...s].reverse().join("");

// Objects (string keys)
const o = {};
o["k"] = (o["k"] || 0) + 1;

// Map: any key type, insertion order, O(1) average
const m = new Map();
m.set(5, (m.get(5) || 0) + 1);
m.has(5);
m.delete(5);
m.size;
for (const [key, val] of m) {
}

// Set
const st = new Set([1, 2, 2, 3]);
st.add(4);
st.has(2);
st.delete(1);
st.size;
```

### Input / Output

```js
// Fast input: read everything once. Fast output: collect, join, print once.
const data = require("fs")
  .readFileSync(0, "utf-8")
  .trim()
  .split(/\s+/)
  .map(Number);
const out = [];
out.push(42);
console.log(out.join("\n"));
// For huge output use process.stdout.write(out.join("\n") + "\n");
```

### Time Complexity, Space Complexity, Big-O, Big-Theta, Big-Omega

- **Big-O** `O(f)`: upper bound (worst case growth). "At most this slow."
- **Big-Omega** `Omega(f)`: lower bound. "At least this slow."
- **Big-Theta** `Theta(f)`: tight bound (both O and Omega).
- **Time complexity**: number of basic operations as a function of input size.
- **Space complexity**: extra memory used as a function of input size.

```js
function constant(arr) {
  return arr[0];
} // O(1)
function linear(arr) {
  let s = 0;
  for (const x of arr) s += x;
  return s;
} // O(n)
function quadratic(arr) {
  let c = 0;
  for (const a of arr) for (const b of arr) c++;
  return c;
} // O(n^2)
function logarithmic(n) {
  let c = 0;
  while (n > 1) {
    n >>= 1;
    c++;
  }
  return c;
} // O(log n)
function sqrtLoop(n) {
  let c = 0;
  for (let i = 1; i * i <= n; i++) c++;
  return c;
} // O(sqrt n)
// Sorting: O(n log n). Hash map lookup: O(1) average. Memory: arrays O(n), 2D grid O(n*m).
```

### Amortized Analysis

Some operations are occasionally expensive but cheap on average over a sequence.

```js
// Dynamic array push: occasional O(n) resize, but total for n pushes is O(n) -> O(1) amortized.
// Two pointers: i and j each move at most n times total -> O(n), even with a nested while loop.
function amortizedExample(arr) {
  let j = 0,
    steps = 0;
  for (let i = 0; i < arr.length; i++) {
    while (j < arr.length && arr[j] <= arr[i] + 5) {
      j++;
      steps++;
    } // j never moves back
  }
  return steps; // <= n, not n^2
}
// Monotonic stack: each element pushed once and popped once -> O(n) total.
```

---

# 2. Basic Mathematics

### Arithmetic, Modulo, Absolute Value, Floor and Ceiling, Integer Division

```js
Math.abs(-5); // 5
Math.floor(7 / 2); // 3   (integer division for non-negative)
Math.ceil(7 / 2); // 4
Math.trunc(-7 / 2); // -3  (toward zero)
const ceilDiv = (a, b) => Math.floor((a + b - 1) / b); // positive a, b
const mod = (a, m) => ((a % m) + m) % m; // always non-negative
```

### GCD, LCM, Euclidean Algorithm

```js
function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}
function lcm(a, b) {
  return (a / gcd(a, b)) * b;
} // divide first to avoid overflow
function gcdArray(arr) {
  return arr.reduce((g, x) => gcd(g, x), 0);
}
```

### Prime Number Checking, Prime Factorization

```js
function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6)
    if (n % i === 0 || n % (i + 2) === 0) return false;
  return true;
}
function primeFactorize(n) {
  // returns [[prime, exponent], ...]  O(sqrt n)
  const res = [];
  for (let p = 2; p * p <= n; p++) {
    if (n % p === 0) {
      let e = 0;
      while (n % p === 0) {
        n /= p;
        e++;
      }
      res.push([p, e]);
    }
  }
  if (n > 1) res.push([n, 1]);
  return res;
}
```

### Divisors, Count of Divisors, Sum of Divisors

```js
function divisors(n) {
  // O(sqrt n), sorted
  const small = [],
    large = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i !== n / i) large.push(n / i);
    }
  }
  return small.concat(large.reverse());
}
function countDivisors(n) {
  // product of (e+1)
  return primeFactorize(n).reduce((c, [, e]) => c * (e + 1), 1);
}
function sumDivisors(n) {
  // product of (p^(e+1)-1)/(p-1)
  return primeFactorize(n).reduce(
    (s, [p, e]) => s * ((p ** (e + 1) - 1) / (p - 1)),
    1,
  );
}
```

### Sieve of Eratosthenes, Segmented Sieve

```js
function sieve(n) {
  // isPrime[i] = 1 if prime. O(n log log n)
  const isPrime = new Uint8Array(n + 1).fill(1);
  isPrime[0] = 0;
  if (n >= 1) isPrime[1] = 0;
  for (let i = 2; i * i <= n; i++)
    if (isPrime[i]) for (let j = i * i; j <= n; j += i) isPrime[j] = 0;
  return isPrime;
}
function primesUpTo(n) {
  const isPrime = sieve(n),
    res = [];
  for (let i = 2; i <= n; i++) if (isPrime[i]) res.push(i);
  return res;
}
function segmentedSieve(L, R) {
  // primes in [L, R], R up to ~1e12, R-L up to ~1e7
  const lim = Math.floor(Math.sqrt(R));
  const small = sieve(lim);
  const isP = new Uint8Array(R - L + 1).fill(1);
  for (let p = 2; p <= lim; p++) {
    if (!small[p]) continue;
    for (let j = Math.max(p * p, Math.ceil(L / p) * p); j <= R; j += p)
      isP[j - L] = 0;
  }
  const res = [];
  for (let i = 0; i <= R - L; i++) if (isP[i] && L + i >= 2) res.push(L + i);
  return res;
}
```

### Euler's Totient Function

phi(n) = count of numbers in [1, n] coprime to n.

```js
function phi(n) {
  let result = n;
  for (let p = 2; p * p <= n; p++) {
    if (n % p === 0) {
      while (n % p === 0) n /= p;
      result -= result / p;
    }
  }
  if (n > 1) result -= result / n;
  return result;
}
function phiSieve(n) {
  // phi for all 1..n
  const ph = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 2; i <= n; i++)
    if (ph[i] === i) for (let j = i; j <= n; j += i) ph[j] -= ph[j] / i;
  return ph;
}
```

### Modular Arithmetic: Add, Subtract, Multiply, Power, Inverse

```js
// addmod, submod, mulmod are in the Toolbox (section 0.4)
function powmod(base, exp, m = MOD) {
  // Fast power / modular exponentiation O(log exp)
  let result = 1;
  base %= m;
  while (exp > 0) {
    if (exp & 1) result = mulmod(result, base, m);
    base = mulmod(base, base, m);
    exp = Math.floor(exp / 2); // works for exp > 2^31 too
  }
  return result;
}
function fastPower(x, n) {
  // plain (non-modular) power, small results
  let r = 1;
  while (n > 0) {
    if (n & 1) r *= x;
    x *= x;
    n >>= 1;
  }
  return r;
}
// Fermat's Little Theorem: p prime, a not divisible by p => a^(p-1) = 1 (mod p)
// => modular inverse: a^(-1) = a^(p-2) (mod p)
function modInverse(a, m = MOD) {
  return powmod(a, m - 2, m);
} // m must be prime
function divmod(a, b, m = MOD) {
  return mulmod(a, modInverse(b, m), m);
}
```

### Extended Euclidean Algorithm, Modular Inverse (any modulus)

```js
function extgcd(a, b) {
  // returns [g, x, y] with a*x + b*y = g
  if (b === 0) return [a, 1, 0];
  const [g, x, y] = extgcd(b, a % b);
  return [g, y, x - Math.floor(a / b) * y];
}
function modInverseAny(a, m) {
  // when gcd(a, m) = 1, m need not be prime
  const [g, x] = extgcd(((a % m) + m) % m, m);
  if (g !== 1) return -1;
  return ((x % m) + m) % m;
}
```

### Chinese Remainder Theorem

Solve `x = r1 (mod m1)`, `x = r2 (mod m2)`. BigInt because `lcm` can be huge.

```js
function egcdBig(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcdBig(b, a % b);
  return [g, y, x - (a / b) * y];
}
function crt(r1, m1, r2, m2) {
  // all BigInt. returns [r, lcm] or null
  const [g, p] = egcdBig(m1, m2);
  if ((r2 - r1) % g !== 0n) return null;
  const m2g = m2 / g;
  const t = (((((r2 - r1) / g) * p) % m2g) + m2g) % m2g;
  const l = (m1 / g) * m2;
  return [(((r1 + m1 * t) % l) + l) % l, l];
}
// crt(2n,3n, 3n,5n) -> [8n, 15n]
```

### Factorials, Permutations, Combinations, Binomial Coefficients

```js
const MAXN = 200005;
const fact = new Array(MAXN),
  invFact = new Array(MAXN);
function precomputeFactorials() {
  fact[0] = 1;
  for (let i = 1; i < MAXN; i++) fact[i] = mulmod(fact[i - 1], i);
  invFact[MAXN - 1] = powmod(fact[MAXN - 1], MOD - 2);
  for (let i = MAXN - 1; i > 0; i--) invFact[i - 1] = mulmod(invFact[i], i);
}
precomputeFactorials();
function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  return mulmod(fact[n], mulmod(invFact[r], invFact[n - r]));
}
function nPr(n, r) {
  if (r < 0 || r > n) return 0;
  return mulmod(fact[n], invFact[n - r]);
}
// Stars and bars: ways to put n identical balls in k boxes = nCr(n + k - 1, k - 1)
```

### Pascal's Triangle

```js
function pascal(n) {
  // C[i][j] without modulo (small n) or with mod
  const C = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= n; i++) {
    C[i][0] = 1;
    for (let j = 1; j <= i; j++)
      C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
  }
  return C; // O(n^2), no inverses needed
}
```

### Matrix Exponentiation, Fibonacci Numbers

```js
function matMul(A, B, m = MOD) {
  const n = A.length,
    p = B[0].length,
    k = B.length;
  const C = Array.from({ length: n }, () => new Array(p).fill(0));
  for (let i = 0; i < n; i++)
    for (let t = 0; t < k; t++) {
      if (A[i][t] === 0) continue;
      for (let j = 0; j < p; j++)
        C[i][j] = (C[i][j] + mulmod(A[i][t], B[t][j], m)) % m;
    }
  return C;
}
function matPow(M, e, m = MOD) {
  const n = M.length;
  let R = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
  while (e > 0) {
    if (e & 1) R = matMul(R, M, m);
    M = matMul(M, M, m);
    e = Math.floor(e / 2);
  }
  return R;
}
function fib(n) {
  // F(0)=0, F(1)=1, O(log n)
  if (n === 0) return 0;
  return matPow(
    [
      [1, 1],
      [1, 0],
    ],
    n - 1,
  )[0][0];
}
// Any linear recurrence f(n) = c1 f(n-1) + ... + ck f(n-k) -> k x k matrix power.
```

### Catalan Numbers

C(n) = C(2n, n) / (n + 1). Counts balanced brackets, BSTs with n nodes, etc.

```js
function catalan(n) {
  // needs precomputeFactorials up to 2n
  return mulmod(fact[2 * n], mulmod(invFact[n], invFact[n + 1]));
}
function catalanDP(n) {
  // C(0)=1, C(n)=sum C(i)*C(n-1-i)
  const c = new Array(n + 1).fill(0);
  c[0] = 1;
  for (let i = 1; i <= n; i++)
    for (let j = 0; j < i; j++)
      c[i] = (c[i] + mulmod(c[j], c[i - 1 - j])) % MOD;
  return c;
}
```

### Inclusion-Exclusion Principle

|A1 u ... u Ak| = sum of singles - sum of pairs + sum of triples ...

```js
function countDivisibleByAny(n, nums) {
  // how many x in [1, n] divisible by at least one of nums
  const k = nums.length;
  let total = 0;
  for (let mask = 1; mask < 1 << k; mask++) {
    let l = 1,
      bits = 0,
      over = false;
    for (let i = 0; i < k; i++) {
      if (mask & (1 << i)) {
        bits++;
        l = lcm(l, nums[i]);
        if (l > n) {
          over = true;
          break;
        }
      }
    }
    if (over) continue;
    const cnt = Math.floor(n / l);
    total += bits % 2 === 1 ? cnt : -cnt;
  }
  return total;
}
// Derangements: D(n) = (n-1) * (D(n-1) + D(n-2)), D(0)=1, D(1)=0
```

### Pigeonhole Principle

If n items go into m < n boxes, some box holds at least ceil(n/m) items.
Typical use: among any `n+1` prefix sums modulo `n`, two are equal, so some subarray sum is divisible by `n`.

```js
function subarrayDivisibleByN(arr) {
  // always exists for array of length n
  const n = arr.length,
    seen = new Map([[0, -1]]);
  let pref = 0;
  for (let i = 0; i < n; i++) {
    pref = (((pref + arr[i]) % n) + n) % n;
    if (seen.has(pref)) return [seen.get(pref) + 1, i]; // inclusive range
    seen.set(pref, i);
  }
}
```

### Probability Basics, Expected Value, Combinatorics

Linearity of expectation: `E[X + Y] = E[X] + E[Y]` even if dependent.
Modular probability: `p/q` becomes `p * q^(-1) mod M`.

```js
function expectedDice(n) {
  return (n * (n + 1)) / 2 / n;
} // fair n-sided die = (n+1)/2
function probabilityMod(p, q) {
  return divmod(p, q);
} // answer for "print p/q mod 1e9+7"
// Expected number of fixed points of a random permutation = 1 (sum of n indicators each 1/n).
// Multinomial: n! / (a! b! c!)  = fact[n] * invFact[a] * invFact[b] * invFact[c]
function multinomial(n, parts) {
  let r = fact[n];
  for (const p of parts) r = mulmod(r, invFact[p]);
  return r;
}
```

---

# 3. Arrays

### Traversal, Insertion, Deletion, Updating, Searching, Reversal, Copying

```js
function traverse(arr) {
  for (let i = 0; i < arr.length; i++) {
    /* arr[i] */
  }
}
function insertAt(arr, i, x) {
  arr.splice(i, 0, x);
  return arr;
} // O(n)
function deleteAt(arr, i) {
  arr.splice(i, 1);
  return arr;
} // O(n)
function updateAt(arr, i, x) {
  arr[i] = x;
  return arr;
} // O(1)
function linearSearch(arr, x) {
  for (let i = 0; i < arr.length; i++) if (arr[i] === x) return i;
  return -1;
}
function reverseArray(arr) {
  // in place
  for (let i = 0, j = arr.length - 1; i < j; i++, j--)
    [arr[i], arr[j]] = [arr[j], arr[i]];
  return arr;
}
const copy1 = (arr) => arr.slice(); // shallow copy
const copy2D = (g) => g.map((r) => r.slice()); // copy of 2D array
```

### Array Rotation (Left, Right, Cyclic)

Reversal trick: rotate left by k = reverse(0..k-1), reverse(k..n-1), reverse(all).

```js
function reverseRange(a, l, r) {
  while (l < r) {
    [a[l], a[r]] = [a[r], a[l]];
    l++;
    r--;
  }
}
function rotateLeft(a, k) {
  const n = a.length;
  k %= n;
  reverseRange(a, 0, k - 1);
  reverseRange(a, k, n - 1);
  reverseRange(a, 0, n - 1);
  return a;
}
function rotateRight(a, k) {
  return rotateLeft(a, a.length - (k % a.length));
}
// Cyclic rotation check: B is a rotation of A  <=>  B is a substring of A + A (use KMP).
```

### Merging, Splitting, Sorting, Duplicate Removal, Frequency Counting

```js
function mergeSorted(a, b) {
  const res = [];
  let i = 0,
    j = 0;
  while (i < a.length && j < b.length) res.push(a[i] <= b[j] ? a[i++] : b[j++]);
  while (i < a.length) res.push(a[i++]);
  while (j < b.length) res.push(b[j++]);
  return res;
}
function splitArray(arr, k) {
  // chunks of size k
  const res = [];
  for (let i = 0; i < arr.length; i += k) res.push(arr.slice(i, i + k));
  return res;
}
const sortNumbers = (arr) => arr.sort((a, b) => a - b);
const removeDuplicates = (arr) => [...new Set(arr)];
function frequency(arr) {
  const f = new Map();
  for (const x of arr) f.set(x, (f.get(x) || 0) + 1);
  return f;
}
```

### Maximum, Minimum, Second Largest, Kth Largest / Smallest

```js
function maxOf(a) {
  let m = -Infinity;
  for (const x of a) if (x > m) m = x;
  return m;
}
function minOf(a) {
  let m = Infinity;
  for (const x of a) if (x < m) m = x;
  return m;
}
function secondLargest(a) {
  let first = -Infinity,
    second = -Infinity;
  for (const x of a) {
    if (x > first) {
      second = first;
      first = x;
    } else if (x > second && x !== first) second = x;
  }
  return second;
}
function kthSmallest(a, k) {
  // 1-indexed, randomized quickselect, O(n) average
  a = a.slice();
  let lo = 0,
    hi = a.length - 1;
  k--;
  while (lo < hi) {
    const pivot = a[lo + Math.floor(Math.random() * (hi - lo + 1))];
    let i = lo,
      j = hi;
    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
        j--;
      }
    }
    if (k <= j) hi = j;
    else if (k >= i) lo = i;
    else return a[k];
  }
  return a[k];
}
const kthLargest = (a, k) => kthSmallest(a, a.length - k + 1);
```

### Missing Number, Repeating Number, Majority Element

```js
function missingNumber(arr, n) {
  // arr has n-1 distinct values from 1..n
  let x = 0;
  for (let i = 1; i <= n; i++) x ^= i;
  for (const v of arr) x ^= v;
  return x;
}
function findDuplicate(arr) {
  // n+1 numbers in 1..n: Floyd cycle detection
  let slow = arr[0],
    fast = arr[0];
  do {
    slow = arr[slow];
    fast = arr[arr[fast]];
  } while (slow !== fast);
  slow = arr[0];
  while (slow !== fast) {
    slow = arr[slow];
    fast = arr[fast];
  }
  return slow;
}
function majorityElement(arr) {
  // Boyer-Moore voting, > n/2 occurrences
  let cand = null,
    cnt = 0;
  for (const x of arr) {
    if (cnt === 0) cand = x;
    cnt += x === cand ? 1 : -1;
  }
  return cand; // verify with a counting pass if majority is not guaranteed
}
```

### Leaders, Equilibrium Index, Stock Buy and Sell

```js
function leaders(a) {
  // element greater than everything on its right
  const res = [];
  let mx = -Infinity;
  for (let i = a.length - 1; i >= 0; i--)
    if (a[i] > mx) {
      mx = a[i];
      res.push(a[i]);
    }
  return res.reverse();
}
function equilibriumIndex(a) {
  // left sum == right sum
  const total = a.reduce((s, x) => s + x, 0);
  let left = 0;
  for (let i = 0; i < a.length; i++) {
    if (left === total - left - a[i]) return i;
    left += a[i];
  }
  return -1;
}
function maxProfitOneTransaction(p) {
  let minP = Infinity,
    best = 0;
  for (const x of p) {
    minP = Math.min(minP, x);
    best = Math.max(best, x - minP);
  }
  return best;
}
function maxProfitUnlimited(p) {
  let s = 0;
  for (let i = 1; i < p.length; i++) if (p[i] > p[i - 1]) s += p[i] - p[i - 1];
  return s;
}
```

### Maximum Subarray Sum (Kadane), Maximum Product Subarray, Product Except Self

```js
function kadane(a) {
  let best = a[0],
    cur = a[0];
  for (let i = 1; i < a.length; i++) {
    cur = Math.max(a[i], cur + a[i]);
    best = Math.max(best, cur);
  }
  return best;
}
function kadaneWithRange(a) {
  // returns [sum, l, r]
  let best = -Infinity,
    cur = 0,
    start = 0,
    L = 0,
    R = 0;
  for (let i = 0; i < a.length; i++) {
    if (cur <= 0) {
      cur = a[i];
      start = i;
    } else cur += a[i];
    if (cur > best) {
      best = cur;
      L = start;
      R = i;
    }
  }
  return [best, L, R];
}
function maxProductSubarray(a) {
  // track both max and min (negatives flip)
  let mx = a[0],
    mn = a[0],
    best = a[0];
  for (let i = 1; i < a.length; i++) {
    const x = a[i];
    const c = [x, mx * x, mn * x];
    mx = Math.max(...c);
    mn = Math.min(...c);
    best = Math.max(best, mx);
  }
  return best;
}
function productExceptSelf(a) {
  // no division
  const n = a.length,
    res = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    res[i] = left;
    left *= a[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= right;
    right *= a[i];
  }
  return res;
}
```

### Subarray Generation, Subarray Sum, Subarray XOR, Circular Subarray

```js
function allSubarrays(a) {
  // O(n^2) subarrays (output O(n^3))
  const res = [];
  for (let i = 0; i < a.length; i++)
    for (let j = i; j < a.length; j++) res.push(a.slice(i, j + 1));
  return res;
}
function subarraySums(a) {
  // sum of every subarray in O(n^2)
  const res = [];
  for (let i = 0; i < a.length; i++) {
    let s = 0;
    for (let j = i; j < a.length; j++) {
      s += a[j];
      res.push(s);
    }
  }
  return res;
}
function subarrayXorCount(a, k) {
  // count subarrays with XOR == k (prefix xor + map)
  const seen = new Map([[0, 1]]);
  let x = 0,
    cnt = 0;
  for (const v of a) {
    x ^= v;
    cnt += seen.get(x ^ k) || 0;
    seen.set(x, (seen.get(x) || 0) + 1);
  }
  return cnt;
}
function maxCircularSubarray(a) {
  // max(kadane max, total - kadane min)
  let total = 0,
    curMax = 0,
    bestMax = -Infinity,
    curMin = 0,
    bestMin = Infinity;
  for (const x of a) {
    total += x;
    curMax = Math.max(x, curMax + x);
    bestMax = Math.max(bestMax, curMax);
    curMin = Math.min(x, curMin + x);
    bestMin = Math.min(bestMin, curMin);
  }
  return bestMax < 0 ? bestMax : Math.max(bestMax, total - bestMin);
}
```

### Array Partitioning, Dutch National Flag

```js
function dutchNationalFlag(a) {
  // sort 0/1/2 in one pass
  let lo = 0,
    mid = 0,
    hi = a.length - 1;
  while (mid <= hi) {
    if (a[mid] === 0) {
      [a[lo], a[mid]] = [a[mid], a[lo]];
      lo++;
      mid++;
    } else if (a[mid] === 1) mid++;
    else {
      [a[mid], a[hi]] = [a[hi], a[mid]];
      hi--;
    }
  }
  return a;
}
function partitionByPivot(a, pivot) {
  // elements < pivot first (in place), returns split index
  let i = 0;
  for (let j = 0; j < a.length; j++)
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  return i;
}
```

### Next Permutation, Previous Permutation

```js
function nextPermutation(a) {
  // in place; returns false if it was the last
  let i = a.length - 2;
  while (i >= 0 && a[i] >= a[i + 1]) i--;
  if (i < 0) {
    a.reverse();
    return false;
  }
  let j = a.length - 1;
  while (a[j] <= a[i]) j--;
  [a[i], a[j]] = [a[j], a[i]];
  reverseRange(a, i + 1, a.length - 1);
  return true;
}
function prevPermutation(a) {
  let i = a.length - 2;
  while (i >= 0 && a[i] <= a[i + 1]) i--;
  if (i < 0) {
    a.reverse();
    return false;
  }
  let j = a.length - 1;
  while (a[j] >= a[i]) j--;
  [a[i], a[j]] = [a[j], a[i]];
  reverseRange(a, i + 1, a.length - 1);
  return true;
}
```

### Merge Intervals, Insert Interval, Overlapping Intervals

```js
function mergeIntervals(iv) {
  iv = iv.slice().sort((a, b) => a[0] - b[0]);
  const res = [];
  for (const [s, e] of iv) {
    if (res.length && s <= res[res.length - 1][1])
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], e);
    else res.push([s, e]);
  }
  return res;
}
function insertInterval(iv, nw) {
  // iv sorted & disjoint
  const res = [];
  let i = 0,
    n = iv.length;
  while (i < n && iv[i][1] < nw[0]) res.push(iv[i++]);
  while (i < n && iv[i][0] <= nw[1]) {
    nw = [Math.min(nw[0], iv[i][0]), Math.max(nw[1], iv[i][1])];
    i++;
  }
  res.push(nw);
  while (i < n) res.push(iv[i++]);
  return res;
}
function hasOverlap(iv) {
  iv = iv.slice().sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < iv.length; i++) if (iv[i][0] < iv[i - 1][1]) return true;
  return false;
}
```

---

# 4. Strings

### Traversal, Reversal, Concatenation, Substring, Subsequence, Comparison

```js
const reverseString = (s) => s.split("").reverse().join("");
function isSubsequence(s, t) {
  // is s a subsequence of t
  let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) if (s[i] === t[j]) i++;
  return i === s.length;
}
function compareStrings(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
} // lexicographic
// substring: s.slice(l, r) is [l, r)   concatenation: build with array + join for loops
```

### Character Frequency, ASCII Operations, Case Conversion

```js
function charFreq(s) {
  // lowercase letters
  const f = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) f[s.charCodeAt(i) - 97]++;
  return f;
}
const charToIdx = (c) => c.charCodeAt(0) - 97; // 'a' -> 0
const idxToChar = (i) => String.fromCharCode(97 + i);
const upper = (s) => s.toUpperCase();
const lower = (s) => s.toLowerCase();
const isDigit = (c) => c >= "0" && c <= "9";
const isLower = (c) => c >= "a" && c <= "z";
```

### Palindrome, Anagram, Rotation

```js
function isPalindrome(s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--)
    if (s[i] !== s[j]) return false;
  return true;
}
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const f = charFreq(a),
    g = charFreq(b);
  return f.every((v, i) => v === g[i]);
}
function isRotation(a, b) {
  return a.length === b.length && (a + a).includes(b);
}
```

### String Compression / Expansion, Run-Length Encoding

```js
function rle(s) {
  const out = [];
  for (let i = 0; i < s.length; ) {
    let j = i;
    while (j < s.length && s[j] === s[i]) j++;
    out.push(s[i] + (j - i));
    i = j;
  }
  return out.join("");
}
function rleDecode(s) {
  const out = [];
  const re = /([^\d])(\d+)/g;
  let m;
  while ((m = re.exec(s)) !== null) out.push(m[1].repeat(Number(m[2])));
  return out.join("");
}
```

### Duplicate Removal, First Non-Repeating Character

```js
function removeDuplicateChars(s) {
  return [...new Set(s)].join("");
}
function firstNonRepeating(s) {
  const f = new Map();
  for (const c of s) f.set(c, (f.get(c) || 0) + 1);
  for (let i = 0; i < s.length; i++) if (f.get(s[i]) === 1) return i;
  return -1;
}
```

### Longest Common Prefix / Suffix

```js
function longestCommonPrefix(strs) {
  let p = strs[0];
  for (const s of strs) {
    while (!s.startsWith(p)) p = p.slice(0, -1);
  }
  return p;
}
function longestCommonSuffix(strs) {
  return reverseString(longestCommonPrefix(strs.map(reverseString)));
}
```

### Longest Palindromic Substring / Subsequence, Longest Repeating Substring

```js
function longestPalSubstring(s) {
  // expand around center O(n^2). Use Manacher for O(n)
  let start = 0,
    best = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    if (r - l - 1 > best) {
      best = r - l - 1;
      start = l + 1;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + best);
}
function longestPalSubsequence(s) {
  // DP O(n^2): LPS(s) = LCS(s, reverse(s))
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++)
      dp[i][j] =
        s[i] === s[j]
          ? dp[i + 1][j - 1] + 2
          : Math.max(dp[i + 1][j], dp[i][j - 1]);
  }
  return n ? dp[0][n - 1] : 0;
}
function longestRepeatingSubstring(s) {
  // longest substring that appears at least twice (O(n^2) DP)
  const n = s.length;
  let best = 0;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = i + 1; j <= n; j++)
      if (s[i - 1] === s[j - 1]) {
        dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, j - i);
        best = Math.max(best, dp[i][j]);
      }
  return best; // for n up to 2e5 use suffix array + LCP: max(lcp)
}
```

### Valid Parentheses

```js
function validParentheses(s) {
  const st = [],
    pair = { ")": "(", "]": "[", "}": "{" };
  for (const c of s) {
    if (c === "(" || c === "[" || c === "{") st.push(c);
    else if (st.pop() !== pair[c]) return false;
  }
  return st.length === 0;
}
```

### String Matching, Pattern Matching, Lexicographical Ordering

```js
function naiveMatch(text, pat) {
  // O(nm); fine for small inputs
  const res = [];
  for (let i = 0; i + pat.length <= text.length; i++)
    if (text.startsWith(pat, i)) res.push(i);
  return res;
}
// Lexicographic order: plain `<` on strings. For smallest concatenation order use comparator:
const smallestConcat = (arr) =>
  arr.sort((a, b) => (a + b < b + a ? -1 : 1)).join("");
```

### String Hashing, Rolling Hash, Rabin-Karp

Hash of `s[l..r)` in O(1) after O(n) preprocessing. Use **two moduli** against anti-hash tests.

```js
class StringHash {
  constructor(s, mod1 = 1000000007, mod2 = 998244353) {
    this.m1 = mod1;
    this.m2 = mod2;
    const base1 = 131 + Math.floor(Math.random() * 1000),
      base2 = 137 + Math.floor(Math.random() * 1000);
    const n = s.length;
    this.h1 = new Array(n + 1).fill(0);
    this.h2 = new Array(n + 1).fill(0);
    this.p1 = new Array(n + 1).fill(1);
    this.p2 = new Array(n + 1).fill(1);
    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i);
      this.h1[i + 1] = (mulmod(this.h1[i], base1, mod1) + c) % mod1;
      this.h2[i + 1] = (mulmod(this.h2[i], base2, mod2) + c) % mod2;
      this.p1[i + 1] = mulmod(this.p1[i], base1, mod1);
      this.p2[i + 1] = mulmod(this.p2[i], base2, mod2);
    }
  }
  get(l, r) {
    // hash of s[l..r) as one comparable number key
    const a =
      (this.h1[r] - mulmod(this.h1[l], this.p1[r - l], this.m1) + this.m1) %
      this.m1;
    const b =
      (this.h2[r] - mulmod(this.h2[l], this.p2[r - l], this.m2) + this.m2) %
      this.m2;
    return a + "," + b; // string key: exact and usable in Map / Set / ===
  }
}
function rabinKarp(text, pat) {
  // uses the same class on a combined string
  const combined = pat + "#" + text;
  const H = new StringHash(combined),
    target = H.get(0, pat.length),
    res = [];
  for (let i = 0; i + pat.length <= text.length; i++) {
    const st = pat.length + 1 + i;
    if (H.get(st, st + pat.length) === target) res.push(i);
  }
  return res;
}
```

### Knuth-Morris-Pratt (KMP)

`pi[i]` = length of the longest proper prefix of `s[0..i]` that is also a suffix.

```js
function prefixFunction(s) {
  const n = s.length,
    pi = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    let j = pi[i - 1];
    while (j > 0 && s[i] !== s[j]) j = pi[j - 1];
    if (s[i] === s[j]) j++;
    pi[i] = j;
  }
  return pi;
}
function kmpSearch(text, pat) {
  // start indices of all matches, O(n+m)
  const pi = prefixFunction(pat + "#" + text),
    res = [];
  for (let i = pat.length + 1; i < pi.length; i++)
    if (pi[i] === pat.length) res.push(i - 2 * pat.length);
  return res;
}
// Smallest period of s: n - pi[n-1] (if it divides n; otherwise the string itself is the period)
```

### Z Algorithm

`z[i]` = length of the longest common prefix of `s` and `s[i..]`.

```js
function zFunction(s) {
  const n = s.length,
    z = new Array(n).fill(0);
  for (let i = 1, l = 0, r = 0; i < n; i++) {
    if (i < r) z[i] = Math.min(r - i, z[i - l]);
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] > r) {
      l = i;
      r = i + z[i];
    }
  }
  return z;
}
function zSearch(text, pat) {
  const z = zFunction(pat + "#" + text),
    res = [];
  for (let i = pat.length + 1; i < z.length; i++)
    if (z[i] >= pat.length) res.push(i - pat.length - 1);
  return res;
}
```

### Manacher's Algorithm (all palindromes in O(n))

```js
function manacher(s) {
  // p[i] = palindrome radius in transformed string t
  const t = "#" + s.split("").join("#") + "#",
    n = t.length,
    p = new Array(n).fill(0);
  let c = 0,
    r = 0;
  for (let i = 0; i < n; i++) {
    if (i < r) p[i] = Math.min(r - i, p[2 * c - i]);
    while (
      i - p[i] - 1 >= 0 &&
      i + p[i] + 1 < n &&
      t[i - p[i] - 1] === t[i + p[i] + 1]
    )
      p[i]++;
    if (i + p[i] > r) {
      c = i;
      r = i + p[i];
    }
  }
  return p; // palindrome at center i has length p[i] in the original s
}
function longestPalManacher(s) {
  const p = manacher(s);
  let best = 0,
    ci = 0;
  for (let i = 0; i < p.length; i++)
    if (p[i] > best) {
      best = p[i];
      ci = i;
    }
  const start = (ci - best) / 2;
  return s.slice(start, start + best);
}
```

### Aho-Corasick (multi-pattern matching)

```js
function buildAhoCorasick(patterns) {
  // lowercase letters
  const next = [new Array(26).fill(-1)],
    fail = [0],
    out = [[]];
  patterns.forEach((p, idx) => {
    let u = 0;
    for (const ch of p) {
      const c = ch.charCodeAt(0) - 97;
      if (next[u][c] === -1) {
        next[u][c] = next.length;
        next.push(new Array(26).fill(-1));
        fail.push(0);
        out.push([]);
      }
      u = next[u][c];
    }
    out[u].push(idx);
  });
  const q = [];
  for (let c = 0; c < 26; c++) {
    if (next[0][c] === -1) next[0][c] = 0;
    else {
      fail[next[0][c]] = 0;
      q.push(next[0][c]);
    }
  }
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    for (let c = 0; c < 26; c++) {
      const v = next[u][c];
      if (v === -1) next[u][c] = next[fail[u]][c];
      else {
        fail[v] = next[fail[u]][c];
        out[v] = out[v].concat(out[fail[v]]);
        q.push(v);
      }
    }
  }
  return { next, fail, out };
}
function ahoSearch(text, ac) {
  // returns [endIndex, patternIndex] pairs
  const res = [];
  let u = 0;
  for (let i = 0; i < text.length; i++) {
    u = ac.next[u][text.charCodeAt(i) - 97];
    for (const id of ac.out[u]) res.push([i, id]);
  }
  return res;
}
```

### Suffix Array (+ LCP Array)

Sorted list of all suffixes. O(n log^2 n) is fine for n up to ~1e5.

```js
function suffixArray(s) {
  const n = s.length;
  let sa = Array.from({ length: n }, (_, i) => i);
  let rank = Array.from(s, (c) => c.charCodeAt(0)),
    tmp = new Array(n).fill(0);
  for (let k = 1; ; k <<= 1) {
    const cmp = (a, b) =>
      rank[a] !== rank[b]
        ? rank[a] - rank[b]
        : (a + k < n ? rank[a + k] : -1) - (b + k < n ? rank[b + k] : -1);
    sa.sort(cmp);
    tmp[sa[0]] = 0;
    for (let i = 1; i < n; i++)
      tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) < 0 ? 1 : 0);
    [rank, tmp] = [tmp, rank];
    if (rank[sa[n - 1]] === n - 1) break;
  }
  return sa;
}
function lcpArray(s, sa) {
  // Kasai: lcp[i] = LCP(suffix sa[i-1], suffix sa[i])
  const n = s.length,
    rank = new Array(n),
    lcp = new Array(n).fill(0);
  for (let i = 0; i < n; i++) rank[sa[i]] = i;
  let h = 0;
  for (let i = 0; i < n; i++) {
    if (rank[i] > 0) {
      const j = sa[rank[i] - 1];
      while (i + h < n && j + h < n && s[i + h] === s[j + h]) h++;
      lcp[rank[i]] = h;
      if (h > 0) h--;
    } else h = 0;
  }
  return lcp;
}
// Number of distinct substrings = n(n+1)/2 - sum(lcp)
// Longest repeated substring = max(lcp)
// Pattern search: binary search over sa comparing s.startsWith(pat, sa[mid]).
```

### Suffix Automaton

Smallest DFA accepting all suffixes. Great for distinct substrings, substring occurrence counts, LCS of two strings.

```js
class SuffixAutomaton {
  constructor() {
    this.len = [0];
    this.link = [-1];
    this.next = [new Map()];
    this.last = 0;
  }
  extend(ch) {
    const cur = this.len.length;
    this.len.push(this.len[this.last] + 1);
    this.link.push(0);
    this.next.push(new Map());
    let p = this.last;
    while (p !== -1 && !this.next[p].has(ch)) {
      this.next[p].set(ch, cur);
      p = this.link[p];
    }
    if (p === -1) this.link[cur] = 0;
    else {
      const q = this.next[p].get(ch);
      if (this.len[p] + 1 === this.len[q]) this.link[cur] = q;
      else {
        const clone = this.len.length;
        this.len.push(this.len[p] + 1);
        this.link.push(this.link[q]);
        this.next.push(new Map(this.next[q]));
        while (p !== -1 && this.next[p].get(ch) === q) {
          this.next[p].set(ch, clone);
          p = this.link[p];
        }
        this.link[q] = this.link[cur] = clone;
      }
    }
    this.last = cur;
  }
  distinctSubstrings() {
    let t = 0;
    for (let i = 1; i < this.len.length; i++)
      t += this.len[i] - this.len[this.link[i]];
    return t;
  }
}
function buildSAM(s) {
  const sam = new SuffixAutomaton();
  for (const c of s) sam.extend(c);
  return sam;
}
function isSubstring(sam, t) {
  let u = 0;
  for (const c of t) {
    if (!sam.next[u].has(c)) return false;
    u = sam.next[u].get(c);
  }
  return true;
}
```

### Suffix Tree

A suffix tree of `s` is the compressed trie of all its suffixes. In contests, you almost never hand-write Ukkonen's algorithm. Two practical routes:

1. **Suffix array + LCP array** (above) gives the same information (the suffix tree is the Cartesian tree of the LCP array).
2. **Suffix link tree of the suffix automaton of the reversed string** _is_ the suffix tree of `s`.

```js
function suffixTreeViaSAM(s) {
  // returns parent links of the suffix tree of s
  const sam = buildSAM(s.split("").reverse().join(""));
  return { parent: sam.link, edgeLen: sam.len }; // node v represents strings of length (len[link[v]], len[v]]
}
// Simple O(n^2) build for small n (learning / tiny constraints):
function naiveSuffixTrie(s) {
  const root = new Map();
  for (let i = 0; i < s.length; i++) {
    let node = root;
    for (let j = i; j < s.length; j++) {
      if (!node.has(s[j])) node.set(s[j], new Map());
      node = node.get(s[j]);
    }
  }
  return root;
}
```

---

# 5. Two Pointers

Two indices move through the data so that an O(n^2) double loop becomes O(n).
Use it on **sorted arrays**, **pairs/triples**, **in-place filtering**, and **linked list cycles**.

### Opposite Direction, Pair Sum

```js
function pairSumSorted(a, target) {
  // a sorted ascending
  let l = 0,
    r = a.length - 1;
  while (l < r) {
    const s = a[l] + a[r];
    if (s === target) return [l, r];
    if (s < target) l++;
    else r--;
  }
  return null;
}
function countPairsWithSumAtMost(a, target) {
  // a sorted
  let l = 0,
    r = a.length - 1,
    cnt = 0;
  while (l < r) {
    if (a[l] + a[r] <= target) {
      cnt += r - l;
      l++;
    } else r--;
  }
  return cnt;
}
```

### Three Sum, Four Sum

```js
function threeSum(a) {
  // unique triplets summing to 0, O(n^2)
  a = a.slice().sort((x, y) => x - y);
  const res = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (i > 0 && a[i] === a[i - 1]) continue;
    let l = i + 1,
      r = a.length - 1;
    while (l < r) {
      const s = a[i] + a[l] + a[r];
      if (s === 0) {
        res.push([a[i], a[l], a[r]]);
        l++;
        r--;
        while (l < r && a[l] === a[l - 1]) l++;
        while (l < r && a[r] === a[r + 1]) r--;
      } else if (s < 0) l++;
      else r--;
    }
  }
  return res;
}
function fourSum(a, target) {
  // O(n^3)
  a = a.slice().sort((x, y) => x - y);
  const res = [],
    n = a.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && a[i] === a[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && a[j] === a[j - 1]) continue;
      let l = j + 1,
        r = n - 1;
      while (l < r) {
        const s = a[i] + a[j] + a[l] + a[r];
        if (s === target) {
          res.push([a[i], a[j], a[l], a[r]]);
          l++;
          r--;
          while (l < r && a[l] === a[l - 1]) l++;
          while (l < r && a[r] === a[r + 1]) r--;
        } else if (s < target) l++;
        else r--;
      }
    }
  }
  return res;
}
```

### Container With Most Water, Trapping Rain Water

```js
function maxWater(h) {
  let l = 0,
    r = h.length - 1,
    best = 0;
  while (l < r) {
    best = Math.max(best, Math.min(h[l], h[r]) * (r - l));
    if (h[l] < h[r]) l++;
    else r--; // move the shorter wall
  }
  return best;
}
function trapRain(h) {
  let l = 0,
    r = h.length - 1,
    lm = 0,
    rm = 0,
    water = 0;
  while (l < r) {
    if (h[l] < h[r]) {
      lm = Math.max(lm, h[l]);
      water += lm - h[l];
      l++;
    } else {
      rm = Math.max(rm, h[r]);
      water += rm - h[r];
      r--;
    }
  }
  return water;
}
```

### Same Direction: Remove Duplicates, Move Zeroes, Partition

```js
function removeDuplicatesSorted(a) {
  // returns new length, modifies a in place
  if (!a.length) return 0;
  let w = 1;
  for (let r = 1; r < a.length; r++) if (a[r] !== a[w - 1]) a[w++] = a[r];
  return w;
}
function moveZeroes(a) {
  let w = 0;
  for (let r = 0; r < a.length; r++)
    if (a[r] !== 0) {
      [a[w], a[r]] = [a[r], a[w]];
      w++;
    }
  return a;
}
function partitionArray(a, pred) {
  // elements satisfying pred go first
  let w = 0;
  for (let r = 0; r < a.length; r++)
    if (pred(a[r])) {
      [a[w], a[r]] = [a[r], a[w]];
      w++;
    }
  return w;
}
// Dutch National Flag: see section 3.
```

### Merge, Intersection, Union of Sorted Arrays

```js
function intersectionSorted(a, b) {
  const res = [];
  let i = 0,
    j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      if (!res.length || res[res.length - 1] !== a[i]) res.push(a[i]);
      i++;
      j++;
    } else if (a[i] < b[j]) i++;
    else j++;
  }
  return res;
}
function unionSorted(a, b) {
  const res = [];
  let i = 0,
    j = 0;
  const add = (x) => {
    if (!res.length || res[res.length - 1] !== x) res.push(x);
  };
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && a[i] <= b[j])) add(a[i++]);
    else add(b[j++]);
  }
  return res;
}
// Merge two sorted arrays: mergeSorted() in section 3.
```

### Palindrome Checking, Subarray Two Pointers

```js
function isPalindromeIgnoringNonAlnum(s) {
  let l = 0,
    r = s.length - 1;
  const ok = (c) => /[a-z0-9]/i.test(c);
  while (l < r) {
    while (l < r && !ok(s[l])) l++;
    while (l < r && !ok(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}
function countSubarraysSumAtMost(a, S) {
  // positive numbers: number of subarrays with sum <= S
  let l = 0,
    sum = 0,
    cnt = 0;
  for (let r = 0; r < a.length; r++) {
    sum += a[r];
    while (sum > S) sum -= a[l++];
    cnt += r - l + 1;
  }
  return cnt;
}
```

### Slow and Fast Pointers (Floyd) on arrays

```js
function hasCycleFunctional(next, start) {
  // next[i] = successor of i
  let slow = start,
    fast = start;
  while (fast !== -1 && next[fast] !== -1) {
    slow = next[slow];
    fast = next[next[fast]];
    if (slow === fast) return true;
  }
  return false;
}
// Linked-list version: section 10.
```

---

# 6. Sliding Window

A window `[l, r]` slides across the array. **Fixed size**: add the new element, remove the old one.
**Variable size**: expand `r`; while the window is invalid, shrink `l`.

### Fixed Size: Max/Min Sum, Max Average

```js
function maxSumSubarrayK(a, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i];
  let best = sum;
  for (let i = k; i < a.length; i++) {
    sum += a[i] - a[i - k];
    best = Math.max(best, sum);
  }
  return best;
}
function minSumSubarrayK(a, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i];
  let best = sum;
  for (let i = k; i < a.length; i++) {
    sum += a[i] - a[i - k];
    best = Math.min(best, sum);
  }
  return best;
}
const maxAverageSubarray = (a, k) => maxSumSubarrayK(a, k) / k;
```

### Variable Size: Longest Substring Without Repeating, K Distinct

```js
function longestUniqueSubstring(s) {
  const last = new Map();
  let l = 0,
    best = 0;
  for (let r = 0; r < s.length; r++) {
    if (last.has(s[r]) && last.get(s[r]) >= l) l = last.get(s[r]) + 1;
    last.set(s[r], r);
    best = Math.max(best, r - l + 1);
  }
  return best;
}
function longestSubstringKDistinct(s, k) {
  const f = new Map();
  let l = 0,
    best = 0;
  for (let r = 0; r < s.length; r++) {
    f.set(s[r], (f.get(s[r]) || 0) + 1);
    while (f.size > k) {
      f.set(s[l], f.get(s[l]) - 1);
      if (f.get(s[l]) === 0) f.delete(s[l]);
      l++;
    }
    best = Math.max(best, r - l + 1);
  }
  return best;
}
```

### Minimum Window Substring

```js
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let missing = t.length,
    l = 0,
    bestL = 0,
    bestLen = Infinity;
  for (let r = 0; r < s.length; r++) {
    if ((need.get(s[r]) || 0) > 0) missing--;
    need.set(s[r], (need.get(s[r]) || 0) - 1);
    while (missing === 0) {
      if (r - l + 1 < bestLen) {
        bestLen = r - l + 1;
        bestL = l;
      }
      need.set(s[l], need.get(s[l]) + 1);
      if (need.get(s[l]) > 0) missing++;
      l++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(bestL, bestL + bestLen);
}
```

### Longest Repeating Character Replacement

```js
function characterReplacement(s, k) {
  // longest window that can become one letter with <= k changes
  const f = new Array(26).fill(0);
  let l = 0,
    maxF = 0,
    best = 0;
  for (let r = 0; r < s.length; r++) {
    maxF = Math.max(maxF, ++f[s.charCodeAt(r) - 65]);
    if (r - l + 1 - maxF > k) f[s.charCodeAt(l++) - 65]--;
    best = Math.max(best, r - l + 1);
  }
  return best;
}
```

### Count Anagrams, Permutation in String (Frequency-Based Window)

```js
function countAnagrams(text, pat) {
  const n = text.length,
    m = pat.length;
  if (m > n) return 0;
  const need = new Array(26).fill(0),
    win = new Array(26).fill(0);
  for (let i = 0; i < m; i++) {
    need[pat.charCodeAt(i) - 97]++;
    win[text.charCodeAt(i) - 97]++;
  }
  const same = () => {
    for (let i = 0; i < 26; i++) if (need[i] !== win[i]) return false;
    return true;
  };
  let cnt = same() ? 1 : 0;
  for (let i = m; i < n; i++) {
    win[text.charCodeAt(i) - 97]++;
    win[text.charCodeAt(i - m) - 97]--;
    if (same()) cnt++;
  }
  return cnt;
}
const permutationInString = (pat, text) => countAnagrams(text, pat) > 0;
```

### Smallest Subarray With Given Sum, Maximum Consecutive Ones

```js
function smallestSubarrayWithSum(a, S) {
  // positive numbers, sum >= S
  let l = 0,
    sum = 0,
    best = Infinity;
  for (let r = 0; r < a.length; r++) {
    sum += a[r];
    while (sum >= S) {
      best = Math.min(best, r - l + 1);
      sum -= a[l++];
    }
  }
  return best === Infinity ? 0 : best;
}
function maxConsecutiveOnes(a, k) {
  // flip at most k zeros
  let l = 0,
    zeros = 0,
    best = 0;
  for (let r = 0; r < a.length; r++) {
    if (a[r] === 0) zeros++;
    while (zeros > k) if (a[l++] === 0) zeros--;
    best = Math.max(best, r - l + 1);
  }
  return best;
}
```

### Sliding Window Maximum / Minimum (Monotonic Deque)

Deque of indices; values decrease from front to back so the front is always the max.

```js
function slidingWindowMax(a, k) {
  const dq = new Array(a.length);
  let head = 0,
    tail = 0;
  const res = [];
  for (let i = 0; i < a.length; i++) {
    while (tail > head && a[dq[tail - 1]] <= a[i]) tail--;
    dq[tail++] = i;
    if (dq[head] <= i - k) head++;
    if (i >= k - 1) res.push(a[dq[head]]);
  }
  return res;
}
function slidingWindowMin(a, k) {
  const dq = new Array(a.length);
  let head = 0,
    tail = 0;
  const res = [];
  for (let i = 0; i < a.length; i++) {
    while (tail > head && a[dq[tail - 1]] >= a[i]) tail--;
    dq[tail++] = i;
    if (dq[head] <= i - k) head++;
    if (i >= k - 1) res.push(a[dq[head]]);
  }
  return res;
}
```

### At Most K Distinct, Exactly K Distinct

```js
function atMostKDistinct(a, k) {
  // number of subarrays with <= k distinct values
  const f = new Map();
  let l = 0,
    cnt = 0;
  for (let r = 0; r < a.length; r++) {
    f.set(a[r], (f.get(a[r]) || 0) + 1);
    while (f.size > k) {
      f.set(a[l], f.get(a[l]) - 1);
      if (f.get(a[l]) === 0) f.delete(a[l]);
      l++;
    }
    cnt += r - l + 1;
  }
  return cnt;
}
const exactlyKDistinct = (a, k) =>
  atMostKDistinct(a, k) - atMostKDistinct(a, k - 1);
```

---

# 7. Prefix Sum and Difference Arrays

### Prefix Sum, Suffix Sum, Prefix Product, Prefix XOR, Range Sum Queries

`pre[i]` = sum of the first `i` elements. Sum of `[l, r]` (0-indexed) = `pre[r+1] - pre[l]`.

```js
function buildPrefix(a) {
  const pre = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) pre[i + 1] = pre[i] + a[i];
  return pre;
}
const rangeSum = (pre, l, r) => pre[r + 1] - pre[l];

function buildSuffix(a) {
  const suf = new Array(a.length + 1).fill(0);
  for (let i = a.length - 1; i >= 0; i--) suf[i] = suf[i + 1] + a[i];
  return suf;
}
function buildPrefixXor(a) {
  const px = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) px[i + 1] = px[i] ^ a[i];
  return px; // xor of [l, r] = px[r+1] ^ px[l]
}
function buildPrefixProductMod(a, m = MOD) {
  // zero-free arrays: divide with modular inverse
  const pp = new Array(a.length + 1).fill(1);
  for (let i = 0; i < a.length; i++) pp[i + 1] = mulmod(pp[i], a[i] % m, m);
  return pp;
}
function buildPrefixFrequency(a, maxV) {
  // pf[v][i] = count of value v in first i elements
  const pf = Array.from(
    { length: maxV + 1 },
    () => new Int32Array(a.length + 1),
  );
  for (let i = 0; i < a.length; i++) {
    for (let v = 0; v <= maxV; v++) pf[v][i + 1] = pf[v][i];
    pf[a[i]][i + 1]++;
  }
  return pf; // use only for small maxV
}
```

### 2D / Matrix Prefix Sum

```js
function build2D(g) {
  const n = g.length,
    m = g[0].length;
  const p = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      p[i + 1][j + 1] = g[i][j] + p[i][j + 1] + p[i + 1][j] - p[i][j];
  return p;
}
function query2D(p, r1, c1, r2, c2) {
  // inclusive corners, 0-indexed
  return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];
}
```

### Subarray Sum Equals K, Count Subarrays With Given Sum (Prefix Sum + Hash Map)

Idea: sum(l..r) = k <=> pre[r+1] - pre[l] = k, so look up `pre - k` in a map.

```js
function subarraySumEqualsK(a, k) {
  // works with negative numbers
  const seen = new Map([[0, 1]]);
  let pref = 0,
    cnt = 0;
  for (const x of a) {
    pref += x;
    cnt += seen.get(pref - k) || 0;
    seen.set(pref, (seen.get(pref) || 0) + 1);
  }
  return cnt;
}
function longestSubarraySumK(a, k) {
  // longest length with sum k
  const first = new Map([[0, -1]]);
  let pref = 0,
    best = 0;
  for (let i = 0; i < a.length; i++) {
    pref += a[i];
    if (first.has(pref - k)) best = Math.max(best, i - first.get(pref - k));
    if (!first.has(pref)) first.set(pref, i);
  }
  return best;
}
```

### Prefix Sum With Modulo

```js
function countSubarraysDivisibleByK(a, k) {
  const f = new Array(k).fill(0);
  f[0] = 1;
  let pref = 0,
    cnt = 0;
  for (const x of a) {
    pref = (((pref + x) % k) + k) % k;
    cnt += f[pref]++;
  }
  return cnt;
}
```

### Maximum Subarray Sum Using Prefix Sum

```js
function maxSubarrayPrefix(a) {
  // best = max over r of (pre[r+1] - min pre[0..r])
  let pref = 0,
    minPref = 0,
    best = -Infinity;
  for (const x of a) {
    pref += x;
    best = Math.max(best, pref - minPref);
    minPref = Math.min(minPref, pref);
  }
  return best;
}
```

### Difference Array, Range Update Queries, 2D Difference Array

Add `v` to `[l, r]` in O(1): `d[l] += v; d[r+1] -= v`. Prefix-sum `d` once at the end to recover the array.

```js
function applyRangeUpdates(n, updates) {
  // updates: [l, r, v], 0-indexed, final array
  const d = new Array(n + 1).fill(0);
  for (const [l, r, v] of updates) {
    d[l] += v;
    d[r + 1] -= v;
  }
  const res = new Array(n);
  let cur = 0;
  for (let i = 0; i < n; i++) {
    cur += d[i];
    res[i] = cur;
  }
  return res;
}
function applyRangeUpdates2D(n, m, updates) {
  // updates: [r1, c1, r2, c2, v]
  const d = Array.from({ length: n + 2 }, () => new Array(m + 2).fill(0));
  for (const [r1, c1, r2, c2, v] of updates) {
    d[r1][c1] += v;
    d[r1][c2 + 1] -= v;
    d[r2 + 1][c1] -= v;
    d[r2 + 1][c2 + 1] += v;
  }
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      d[i][j] +=
        (i ? d[i - 1][j] : 0) +
        (j ? d[i][j - 1] : 0) -
        (i && j ? d[i - 1][j - 1] : 0);
    }
  return d.slice(0, n).map((row) => row.slice(0, m));
}
```

### Prefix Minimum / Maximum

```js
function prefixMin(a) {
  const r = a.slice();
  for (let i = 1; i < r.length; i++) r[i] = Math.min(r[i], r[i - 1]);
  return r;
}
function prefixMax(a) {
  const r = a.slice();
  for (let i = 1; i < r.length; i++) r[i] = Math.max(r[i], r[i - 1]);
  return r;
}
function suffixMax(a) {
  const r = a.slice();
  for (let i = r.length - 2; i >= 0; i--) r[i] = Math.max(r[i], r[i + 1]);
  return r;
}
```

### Coordinate Compression

Map large values to `0..k-1` while preserving order.

```js
function compress(a) {
  const sorted = [...new Set(a)].sort((x, y) => x - y);
  const idx = new Map(sorted.map((v, i) => [v, i]));
  return { comp: a.map((v) => idx.get(v)), sorted }; // sorted[comp[i]] === a[i]
}
```

---

# 8. Searching Algorithms

### Linear Search

```js
function linearSearchIdx(a, x) {
  for (let i = 0; i < a.length; i++) if (a[i] === x) return i;
  return -1;
}
```

### Binary Search (Iterative and Recursive)

Requires a sorted array (or a monotonic predicate). O(log n).

```js
function binarySearch(a, x) {
  let lo = 0,
    hi = a.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (a[mid] === x) return mid;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
function binarySearchRec(a, x, lo = 0, hi = a.length - 1) {
  if (lo > hi) return -1;
  const mid = lo + ((hi - lo) >> 1);
  if (a[mid] === x) return mid;
  return a[mid] < x
    ? binarySearchRec(a, x, mid + 1, hi)
    : binarySearchRec(a, x, lo, mid - 1);
}
```

### Lower Bound, Upper Bound, First / Last Occurrence, Count, Insert Position

- `lowerBound(x)`: first index with `a[i] >= x`
- `upperBound(x)`: first index with `a[i] > x`

```js
function lowerBound(a, x) {
  let lo = 0,
    hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound(a, x) {
  let lo = 0,
    hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
const firstOccurrence = (a, x) => {
  const i = lowerBound(a, x);
  return i < a.length && a[i] === x ? i : -1;
};
const lastOccurrence = (a, x) => {
  const i = upperBound(a, x) - 1;
  return i >= 0 && a[i] === x ? i : -1;
};
const countOccurrences = (a, x) => upperBound(a, x) - lowerBound(a, x);
const searchInsertPosition = (a, x) => lowerBound(a, x);
```

### Search in Rotated Sorted Array, Nearly Sorted Array

```js
function searchRotated(a, x) {
  // distinct values
  let lo = 0,
    hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] === x) return mid;
    if (a[lo] <= a[mid]) {
      if (a[lo] <= x && x < a[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (a[mid] < x && x <= a[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
function findMinRotated(a) {
  let lo = 0,
    hi = a.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] > a[hi]) lo = mid + 1;
    else hi = mid;
  }
  return a[lo];
}
function searchNearlySorted(a, x) {
  // element i may be at i-1, i, i+1
  let lo = 0,
    hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] === x) return mid;
    if (mid - 1 >= lo && a[mid - 1] === x) return mid - 1;
    if (mid + 1 <= hi && a[mid + 1] === x) return mid + 1;
    if (a[mid] > x) hi = mid - 2;
    else lo = mid + 2;
  }
  return -1;
}
```

### Search in 2D Matrix, Peak Element, Bitonic Array

```js
function searchMatrixSortedRows(g, x) {
  // each row sorted, first of row > last of previous row
  const n = g.length,
    m = g[0].length;
  let lo = 0,
    hi = n * m - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1,
      v = g[Math.floor(mid / m)][mid % m];
    if (v === x) return true;
    if (v < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}
function searchMatrixStaircase(g, x) {
  // rows and columns sorted: O(n+m)
  let r = 0,
    c = g[0].length - 1;
  while (r < g.length && c >= 0) {
    if (g[r][c] === x) return true;
    if (g[r][c] > x) c--;
    else r++;
  }
  return false;
}
function findPeak(a) {
  // an index with a[i] >= neighbors
  let lo = 0,
    hi = a.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] < a[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function searchBitonic(a, x) {
  // increasing then decreasing
  const p = findPeak(a);
  let lo = 0,
    hi = p;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (a[m] === x) return m;
    if (a[m] < x) lo = m + 1;
    else hi = m - 1;
  }
  lo = p + 1;
  hi = a.length - 1;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (a[m] === x) return m;
    if (a[m] > x) lo = m + 1;
    else hi = m - 1;
  }
  return -1;
}
```

### Ternary Search, Jump Search, Interpolation Search, Exponential Search

```js
function ternarySearchMax(f, lo, hi, iters = 100) {
  // unimodal f on reals, find argmax
  for (let i = 0; i < iters; i++) {
    const m1 = lo + (hi - lo) / 3,
      m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) lo = m1;
    else hi = m2;
  }
  return (lo + hi) / 2;
}
function ternarySearchMinInt(f, lo, hi) {
  // unimodal on integers, argmin
  while (hi - lo > 2) {
    const m1 = lo + Math.floor((hi - lo) / 3),
      m2 = hi - Math.floor((hi - lo) / 3);
    if (f(m1) < f(m2)) hi = m2;
    else lo = m1;
  }
  let best = lo;
  for (let i = lo; i <= hi; i++) if (f(i) < f(best)) best = i;
  return best;
}
function jumpSearch(a, x) {
  const n = a.length,
    step = Math.floor(Math.sqrt(n));
  let prev = 0,
    cur = step;
  while (prev < n && a[Math.min(cur, n) - 1] < x) {
    prev = cur;
    cur += step;
  }
  for (let i = prev; i < Math.min(cur, n); i++) if (a[i] === x) return i;
  return -1;
}
function interpolationSearch(a, x) {
  // good on uniformly distributed values
  let lo = 0,
    hi = a.length - 1;
  while (lo <= hi && x >= a[lo] && x <= a[hi]) {
    if (a[hi] === a[lo]) return a[lo] === x ? lo : -1;
    const pos = lo + Math.floor(((x - a[lo]) * (hi - lo)) / (a[hi] - a[lo]));
    if (a[pos] === x) return pos;
    if (a[pos] < x) lo = pos + 1;
    else hi = pos - 1;
  }
  return -1;
}
function exponentialSearch(a, x) {
  // unbounded / unknown size
  if (a[0] === x) return 0;
  let i = 1;
  while (i < a.length && a[i] <= x) i *= 2;
  let lo = i >> 1,
    hi = Math.min(i, a.length - 1);
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (a[m] === x) return m;
    if (a[m] < x) lo = m + 1;
    else hi = m - 1;
  }
  return -1;
}
```

### Binary Search on Answer, Parametric Search

**The most important pattern in contests.** If `check(x)` is monotone (false...false true...true), find the smallest `x` where it is true.

```js
function binarySearchOnAnswer(lo, hi, check) {
  // smallest x in [lo, hi] with check(x) true
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (check(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
// Example: minimum days to ship all packages with capacity C
function shipDays(weights, days) {
  const feasible = (cap) => {
    let d = 1,
      cur = 0;
    for (const w of weights) {
      if (cur + w > cap) {
        d++;
        cur = 0;
      }
      cur += w;
    }
    return d <= days;
  };
  return binarySearchOnAnswer(
    Math.max(...weights),
    weights.reduce((s, x) => s + x, 0),
    feasible,
  );
}
// For "largest x with check(x) true": flip the logic with lo = mid when check(mid), mid = lo + ceil((hi-lo)/2).
function binarySearchMax(lo, hi, check) {
  while (lo < hi) {
    const mid = lo + Math.ceil((hi - lo) / 2);
    if (check(mid)) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
```

### Integer Square Root, Floating Point Binary Search

```js
function isqrt(n) {
  // n up to ~2^53
  let r = Math.floor(Math.sqrt(n));
  while (r * r > n) r--;
  while ((r + 1) * (r + 1) <= n) r++;
  return r;
}
function floatBinarySearch(lo, hi, check, iters = 100) {
  // smallest real x with check(x)
  for (let i = 0; i < iters; i++) {
    const mid = (lo + hi) / 2;
    if (check(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
}
```

### Parallel Binary Search

Answer many "smallest time `t` such that condition holds" queries together. Each round, process all events once (Fenwick/DSU), and split queries by whether their mid satisfied the condition. Total O((n + q) log T \* cost).

```js
// Skeleton: queries[i] wants the smallest t in [1, T] for which test(i, t) is true.
// resetStructure(), applyEvent(t) and test(i) are problem-specific.
function parallelBinarySearch(q, T, resetStructure, applyEvent, test) {
  const lo = new Array(q).fill(1),
    hi = new Array(q).fill(T + 1);
  let changed = true;
  while (changed) {
    changed = false;
    const buckets = Array.from({ length: T + 2 }, () => []);
    for (let i = 0; i < q; i++)
      if (lo[i] < hi[i]) {
        buckets[(lo[i] + hi[i]) >> 1].push(i);
        changed = true;
      }
    if (!changed) break;
    resetStructure();
    for (let t = 1; t <= T; t++) {
      applyEvent(t); // apply event number t
      for (const i of buckets[t]) {
        if (test(i)) hi[i] = t;
        else lo[i] = t + 1;
      }
    }
  }
  return lo; // lo[i] === T + 1 means "never"
}
```

---

# 9. Sorting Algorithms

In contests use `arr.sort((a, b) => a - b)` (stable TimSort in V8, O(n log n)). Know the others for understanding and for special tasks.
For big numeric arrays, `Int32Array.prototype.sort()` / `Float64Array.prototype.sort()` sorts numerically and is faster.

### Bubble, Selection, Insertion, Shell (O(n^2) family)

```js
function bubbleSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++)
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    if (!swapped) break;
  }
  return a;
}
function selectionSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    let m = i;
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[m]) m = j;
    [a[i], a[m]] = [a[m], a[i]];
  }
  return a;
}
function insertionSort(a) {
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}
function shellSort(a) {
  for (let gap = a.length >> 1; gap > 0; gap >>= 1)
    for (let i = gap; i < a.length; i++) {
      const t = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > t) {
        a[j] = a[j - gap];
        j -= gap;
      }
      a[j] = t;
    }
  return a;
}
function binaryInsertionSort(a) {
  // fewer comparisons, still O(n^2) moves
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let lo = 0,
      hi = i;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (a[m] <= key) lo = m + 1;
      else hi = m;
    }
    for (let j = i; j > lo; j--) a[j] = a[j - 1];
    a[lo] = key;
  }
  return a;
}
```

### Merge Sort

Stable, O(n log n), O(n) extra space.

```js
function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = a.length >> 1;
  return mergeSorted(mergeSort(a.slice(0, mid)), mergeSort(a.slice(mid))); // mergeSorted from section 3
}
```

### Quick Sort, Randomized, Three-Way

```js
function quickSort(a, lo = 0, hi = a.length - 1) {
  // randomized pivot, in place
  while (lo < hi) {
    const pivot = a[lo + Math.floor(Math.random() * (hi - lo + 1))];
    let i = lo,
      j = hi;
    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
        j--;
      }
    }
    if (j - lo < hi - i) {
      quickSort(a, lo, j);
      lo = i;
    } else {
      quickSort(a, i, hi);
      hi = j;
    }
  }
  return a;
}
function threeWayQuickSort(a, lo = 0, hi = a.length - 1) {
  // great with many duplicates
  if (lo >= hi) return a;
  const pivot = a[lo + Math.floor(Math.random() * (hi - lo + 1))];
  let lt = lo,
    i = lo,
    gt = hi;
  while (i <= gt) {
    if (a[i] < pivot) {
      [a[lt], a[i]] = [a[i], a[lt]];
      lt++;
      i++;
    } else if (a[i] > pivot) {
      [a[i], a[gt]] = [a[gt], a[i]];
      gt--;
    } else i++;
  }
  threeWayQuickSort(a, lo, lt - 1);
  threeWayQuickSort(a, gt + 1, hi);
  return a;
}
```

### Heap Sort

```js
function heapSort(a) {
  const n = a.length;
  const sift = (i, size) => {
    while (true) {
      let m = i;
      const l = 2 * i + 1,
        r = l + 1;
      if (l < size && a[l] > a[m]) m = l;
      if (r < size && a[r] > a[m]) m = r;
      if (m === i) return;
      [a[i], a[m]] = [a[m], a[i]];
      i = m;
    }
  };
  for (let i = (n >> 1) - 1; i >= 0; i--) sift(i, n);
  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    sift(0, end);
  }
  return a;
}
```

### Counting Sort, Radix Sort, Bucket Sort, Pigeonhole Sort

```js
function countingSort(a, maxV) {
  // non-negative ints <= maxV
  const cnt = new Array(maxV + 1).fill(0);
  for (const x of a) cnt[x]++;
  const res = [];
  for (let v = 0; v <= maxV; v++) for (let c = 0; c < cnt[v]; c++) res.push(v);
  return res;
}
function radixSort(a) {
  // non-negative ints, base 10, LSD
  let maxV = Math.max(...a);
  for (let exp = 1; Math.floor(maxV / exp) > 0; exp *= 10) {
    const out = new Array(a.length),
      cnt = new Array(10).fill(0);
    for (const x of a) cnt[Math.floor(x / exp) % 10]++;
    for (let i = 1; i < 10; i++) cnt[i] += cnt[i - 1];
    for (let i = a.length - 1; i >= 0; i--)
      out[--cnt[Math.floor(a[i] / exp) % 10]] = a[i];
    a = out;
  }
  return a;
}
function bucketSort(a) {
  // floats in [0, 1)
  const n = a.length,
    buckets = Array.from({ length: n }, () => []);
  for (const x of a) buckets[Math.floor(x * n)].push(x);
  return buckets.flatMap((b) => b.sort((x, y) => x - y));
}
function pigeonholeSort(a) {
  // small range of integers
  const mn = Math.min(...a),
    mx = Math.max(...a),
    holes = new Array(mx - mn + 1).fill(0);
  for (const x of a) holes[x - mn]++;
  const res = [];
  holes.forEach((c, i) => {
    while (c-- > 0) res.push(i + mn);
  });
  return res;
}
```

### Cycle Sort, Pancake Sort, Comb Sort, Gnome Sort

```js
function cycleSort(a) {
  // minimizes number of writes
  for (let start = 0; start < a.length - 1; start++) {
    let item = a[start],
      pos = start;
    for (let i = start + 1; i < a.length; i++) if (a[i] < item) pos++;
    if (pos === start) continue;
    while (item === a[pos]) pos++;
    [a[pos], item] = [item, a[pos]];
    while (pos !== start) {
      pos = start;
      for (let i = start + 1; i < a.length; i++) if (a[i] < item) pos++;
      while (item === a[pos]) pos++;
      [a[pos], item] = [item, a[pos]];
    }
  }
  return a;
}
function pancakeSort(a) {
  // only prefix reversals allowed
  const flip = (k) => {
    for (let i = 0, j = k; i < j; i++, j--) [a[i], a[j]] = [a[j], a[i]];
  };
  for (let size = a.length; size > 1; size--) {
    let mi = 0;
    for (let i = 1; i < size; i++) if (a[i] > a[mi]) mi = i;
    if (mi !== size - 1) {
      flip(mi);
      flip(size - 1);
    }
  }
  return a;
}
function combSort(a) {
  let gap = a.length,
    swapped = true;
  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / 1.3));
    swapped = false;
    for (let i = 0; i + gap < a.length; i++)
      if (a[i] > a[i + gap]) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        swapped = true;
      }
  }
  return a;
}
function gnomeSort(a) {
  let i = 0;
  while (i < a.length) {
    if (i === 0 || a[i] >= a[i - 1]) i++;
    else {
      [a[i], a[i - 1]] = [a[i - 1], a[i]];
      i--;
    }
  }
  return a;
}
```

### Tim Sort, Intro Sort, External Sorting

- **Tim Sort**: merge sort + insertion sort on small "runs"; what `Array.prototype.sort` uses in V8. Stable, O(n log n), O(n) on nearly sorted data.
- **Intro Sort**: quicksort that switches to heap sort when recursion gets too deep (guarantees O(n log n)) and to insertion sort for small ranges.
- **External sorting**: data does not fit in memory -> sort chunks, then k-way merge (use a heap). Rare in contests.

```js
function introSort(a) {
  const maxDepth = 2 * Math.floor(Math.log2(Math.max(2, a.length)));
  function insertion(lo, hi) {
    for (let i = lo + 1; i <= hi; i++) {
      const k = a[i];
      let j = i - 1;
      while (j >= lo && a[j] > k) {
        a[j + 1] = a[j];
        j--;
      }
      a[j + 1] = k;
    }
  }
  function heapPart(lo, hi) {
    const part = heapSort(a.slice(lo, hi + 1));
    for (let i = 0; i < part.length; i++) a[lo + i] = part[i];
  }
  function rec(lo, hi, depth) {
    if (hi - lo < 16) return insertion(lo, hi);
    if (depth === 0) return heapPart(lo, hi);
    const pivot = a[lo + ((hi - lo) >> 1)];
    let i = lo,
      j = hi;
    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
        j--;
      }
    }
    rec(lo, j, depth - 1);
    rec(i, hi, depth - 1);
  }
  rec(0, a.length - 1, maxDepth);
  return a;
}
function kWayMerge(sortedLists) {
  // external-sort merge step with a heap
  const pq = new PriorityQueue((x, y) => x[0] - y[0]),
    res = [];
  sortedLists.forEach((l, i) => {
    if (l.length) pq.push([l[0], i, 0]);
  });
  while (pq.size()) {
    const [v, li, ix] = pq.pop();
    res.push(v);
    if (ix + 1 < sortedLists[li].length)
      pq.push([sortedLists[li][ix + 1], li, ix + 1]);
  }
  return res;
}
```

### Stable / Unstable, In-Place, Custom Comparator Sorting

- **Stable**: equal keys keep their original order (merge, insertion, bubble, counting, **JS built-in sort**).
- **Unstable**: quick, heap, selection.
- **In-place**: O(1) extra memory (quick\*, heap, insertion, selection).

```js
const people = [
  ["bob", 25],
  ["amy", 25],
  ["cat", 20],
];
people.sort((x, y) => x[1] - y[1] || x[0].localeCompare(y[0])); // by age, then name
const idx = Array.from({ length: 5 }, (_, i) => i);
const keys = [5, 3, 9, 1, 7];
idx.sort((i, j) => keys[i] - keys[j]); // argsort
const byLength = ["bb", "a", "ccc"].sort((a, b) => a.length - b.length);
const desc = [3, 1, 2].sort((a, b) => b - a);
// Comparator must be consistent: return negative, zero or positive (never a boolean).
```

### Topological Sorting

Order vertices of a DAG so every edge goes forward. Full details in section 22; quick version (Kahn):

```js
function topoSort(n, edges) {
  // returns order, or [] if there is a cycle
  const adj = Array.from({ length: n }, () => []),
    indeg = new Array(n).fill(0);
  for (const [u, v] of edges) {
    adj[u].push(v);
    indeg[v]++;
  }
  const q = [],
    order = [];
  for (let i = 0; i < n; i++) if (!indeg[i]) q.push(i);
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    order.push(u);
    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);
  }
  return order.length === n ? order : [];
}
```

---

# 10. Linked Lists

In contests linked lists show up rarely (arrays are faster), but they appear in interviews and "simulation" tasks. For deletion-heavy tasks you can also simulate a linked list with arrays `prev[]` and `next[]`.

### Fundamentals: Node, Head/Tail, Singly / Doubly / Circular

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
class DNode {
  // doubly linked node
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}
function fromArray(arr) {
  // singly linked list
  const dummy = new ListNode(0);
  let tail = dummy;
  for (const x of arr) {
    tail.next = new ListNode(x);
    tail = tail.next;
  }
  return dummy.next;
}
function toArray(head) {
  const res = [];
  for (let c = head; c; c = c.next) res.push(c.val);
  return res;
}
// Circular singly list: last.next = head.   Circular doubly list: also head.prev = last.
function makeCircular(head) {
  let t = head;
  while (t.next) t = t.next;
  t.next = head;
  return head;
}
function makeCircularDoubly(arr) {
  const nodes = arr.map((x) => new DNode(x)),
    n = nodes.length;
  for (let i = 0; i < n; i++) {
    nodes[i].next = nodes[(i + 1) % n];
    nodes[i].prev = nodes[(i - 1 + n) % n];
  }
  return nodes[0];
}
```

### Traversal, Search, Update, Insertion, Deletion

```js
function traverseList(head, fn) {
  for (let c = head; c; c = c.next) fn(c.val);
}
function searchList(head, x) {
  for (let c = head, i = 0; c; c = c.next, i++) if (c.val === x) return i;
  return -1;
}
function updateAtPosition(head, pos, val) {
  let c = head;
  while (pos-- > 0 && c) c = c.next;
  if (c) c.val = val;
  return head;
}

function insertHead(head, x) {
  return new ListNode(x, head);
}
function insertTail(head, x) {
  const node = new ListNode(x);
  if (!head) return node;
  let c = head;
  while (c.next) c = c.next;
  c.next = node;
  return head;
}
function insertAtPosition(head, pos, x) {
  // pos 0 = new head
  if (pos === 0) return new ListNode(x, head);
  let c = head;
  for (let i = 0; i < pos - 1 && c; i++) c = c.next;
  if (c) c.next = new ListNode(x, c.next);
  return head;
}
function deleteHead(head) {
  return head ? head.next : null;
}
function deleteTail(head) {
  if (!head || !head.next) return null;
  let c = head;
  while (c.next.next) c = c.next;
  c.next = null;
  return head;
}
function deleteByValue(head, x) {
  // dummy node trick avoids special-casing the head
  const dummy = new ListNode(0, head);
  let c = dummy;
  while (c.next) {
    if (c.next.val === x) {
      c.next = c.next.next;
      break;
    }
    c = c.next;
  }
  return dummy.next;
}
function deleteByPosition(head, pos) {
  const dummy = new ListNode(0, head);
  let c = dummy;
  for (let i = 0; i < pos && c.next; i++) c = c.next;
  if (c.next) c.next = c.next.next;
  return dummy.next;
}
```

### Reversing (Iterative and Recursive)

```js
function reverseList(head) {
  let prev = null,
    cur = head;
  while (cur) {
    const nx = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nx;
  }
  return prev;
}
function reverseListRec(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRec(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
```

### Middle Node, Cycle Detection (Floyd), Cycle Start, Remove Cycle

```js
function middleNode(head) {
  // second middle for even length
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
function hasCycle(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
function cycleStart(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
}
function removeCycle(head) {
  const start = cycleStart(head);
  if (!start) return head;
  let c = start;
  while (c.next !== start) c = c.next;
  c.next = null;
  return head;
}
```

### Nth Node From End, Merge Two Sorted, Sort List

```js
function nthFromEnd(head, n) {
  let fast = head,
    slow = head;
  for (let i = 0; i < n; i++) fast = fast.next;
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy,
    slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}
function mergeTwoLists(a, b) {
  const dummy = new ListNode(0);
  let t = dummy;
  while (a && b) {
    if (a.val <= b.val) {
      t.next = a;
      a = a.next;
    } else {
      t.next = b;
      b = b.next;
    }
    t = t.next;
  }
  t.next = a || b;
  return dummy.next;
}
function sortList(head) {
  // merge sort, O(n log n)
  if (!head || !head.next) return head;
  let slow = head,
    fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const right = slow.next;
  slow.next = null;
  return mergeTwoLists(sortList(head), sortList(right));
}
```

### Palindrome List, Intersection, Reverse in K Groups, Rotate

```js
function isPalindromeList(head) {
  const mid = middleNode(head);
  let second = reverseList(mid),
    first = head;
  while (second) {
    if (first.val !== second.val) return false;
    first = first.next;
    second = second.next;
  }
  return true;
}
function intersectionNode(a, b) {
  let p = a,
    q = b;
  while (p !== q) {
    p = p ? p.next : b;
    q = q ? q.next : a;
  }
  return p; // null if no intersection
}
function reverseKGroup(head, k) {
  let probe = head;
  for (let i = 0; i < k; i++) {
    if (!probe) return head;
    probe = probe.next;
  }
  let prev = null,
    cur = head;
  for (let i = 0; i < k; i++) {
    const nx = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nx;
  }
  head.next = reverseKGroup(cur, k);
  return prev;
}
function rotateRightList(head, k) {
  if (!head || !head.next) return head;
  let len = 1,
    tail = head;
  while (tail.next) {
    tail = tail.next;
    len++;
  }
  k %= len;
  if (k === 0) return head;
  tail.next = head;
  let newTail = head;
  for (let i = 0; i < len - k - 1; i++) newTail = newTail.next;
  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
}
```

### Flatten Multilevel Linked List

```js
// node: { val, next, child }. Flatten so that child lists come right after their parent.
function flattenMultilevel(head) {
  const stack = [];
  let cur = head;
  while (cur) {
    if (cur.child) {
      if (cur.next) stack.push(cur.next);
      cur.next = cur.child;
      cur.child = null;
    }
    if (!cur.next && stack.length) cur.next = stack.pop();
    cur = cur.next;
  }
  return head;
}
```

### LRU Cache Implementation

`Map` keeps insertion order: re-inserting a key moves it to the "most recent" end, and the first key is the least recent.

```js
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, v);
    return v;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.cap)
      this.map.delete(this.map.keys().next().value);
    this.map.set(key, val);
  }
}
```

---

# 11. Stacks

LIFO: Last In, First Out. In JS use an array: `push`, `pop`, `arr[arr.length-1]` (peek), all O(1).

### Stack Fundamentals: Push, Pop, Peek, Overflow, Underflow, Array / Linked List Based

```js
class Stack {
  // dynamic array-based stack
  constructor() {
    this.a = [];
  }
  push(x) {
    this.a.push(x);
  }
  pop() {
    if (!this.a.length) throw new Error("Stack underflow");
    return this.a.pop();
  }
  peek() {
    return this.a[this.a.length - 1];
  }
  isEmpty() {
    return this.a.length === 0;
  }
  size() {
    return this.a.length;
  }
}
class FixedStack {
  // overflow demonstration
  constructor(cap) {
    this.a = new Array(cap);
    this.top = -1;
    this.cap = cap;
  }
  push(x) {
    if (this.top + 1 === this.cap) throw new Error("Stack overflow");
    this.a[++this.top] = x;
  }
  pop() {
    if (this.top < 0) throw new Error("Stack underflow");
    return this.a[this.top--];
  }
}
class LinkedStack {
  constructor() {
    this.head = null;
    this.n = 0;
  }
  push(x) {
    this.head = { val: x, next: this.head };
    this.n++;
  }
  pop() {
    const v = this.head.val;
    this.head = this.head.next;
    this.n--;
    return v;
  }
  peek() {
    return this.head.val;
  }
}
```

### Balanced / Valid Parentheses

`validParentheses(s)` is in section 4.

### Infix, Prefix, Postfix: Conversion and Evaluation

```js
const PREC = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
function infixToPostfix(tokens) {
  // tokens array, e.g. ["a","+","b","*","(","c","-","d",")"]
  const out = [],
    st = [];
  for (const t of tokens) {
    if (t === "(") st.push(t);
    else if (t === ")") {
      while (st.length && st[st.length - 1] !== "(") out.push(st.pop());
      st.pop();
    } else if (PREC[t]) {
      while (
        st.length &&
        PREC[st[st.length - 1]] &&
        (PREC[st[st.length - 1]] > PREC[t] ||
          (PREC[st[st.length - 1]] === PREC[t] && t !== "^"))
      )
        out.push(st.pop());
      st.push(t);
    } else out.push(t);
  }
  while (st.length) out.push(st.pop());
  return out;
}
function infixToPrefix(tokens) {
  // reverse, swap brackets, convert, reverse
  const rev = tokens
    .slice()
    .reverse()
    .map((t) => (t === "(" ? ")" : t === ")" ? "(" : t));
  const out = [],
    st = [];
  for (const t of rev) {
    if (t === "(") st.push(t);
    else if (t === ")") {
      while (st.length && st[st.length - 1] !== "(") out.push(st.pop());
      st.pop();
    } else if (PREC[t]) {
      while (
        st.length &&
        PREC[st[st.length - 1]] &&
        (PREC[st[st.length - 1]] > PREC[t] ||
          (PREC[st[st.length - 1]] === PREC[t] && t === "^"))
      )
        out.push(st.pop());
      st.push(t);
    } else out.push(t);
  }
  while (st.length) out.push(st.pop());
  return out.reverse();
}
function applyOp(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return Math.trunc(a / b);
    case "^":
      return a ** b;
  }
}
function evalPostfix(tokens) {
  const st = [];
  for (const t of tokens) {
    if (PREC[t]) {
      const b = st.pop(),
        a = st.pop();
      st.push(applyOp(t, a, b));
    } else st.push(Number(t));
  }
  return st[0];
}
function evalPrefix(tokens) {
  // scan right to left
  const st = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    if (PREC[t]) {
      const a = st.pop(),
        b = st.pop();
      st.push(applyOp(t, a, b));
    } else st.push(Number(t));
  }
  return st[0];
}
```

### Next / Previous Greater / Smaller Element (Monotonic Stack)

Each element is pushed and popped at most once: O(n).

```js
function nextGreater(a) {
  // value of next greater to the right, -1 if none
  const res = new Array(a.length).fill(-1),
    st = [];
  for (let i = 0; i < a.length; i++) {
    while (st.length && a[st[st.length - 1]] < a[i]) res[st.pop()] = a[i];
    st.push(i);
  }
  return res;
}
function nextSmaller(a) {
  const res = new Array(a.length).fill(-1),
    st = [];
  for (let i = 0; i < a.length; i++) {
    while (st.length && a[st[st.length - 1]] > a[i]) res[st.pop()] = a[i];
    st.push(i);
  }
  return res;
}
function previousGreater(a) {
  const res = new Array(a.length).fill(-1),
    st = [];
  for (let i = 0; i < a.length; i++) {
    while (st.length && a[st[st.length - 1]] <= a[i]) st.pop();
    res[i] = st.length ? a[st[st.length - 1]] : -1;
    st.push(i);
  }
  return res;
}
function previousSmaller(a) {
  const res = new Array(a.length).fill(-1),
    st = [];
  for (let i = 0; i < a.length; i++) {
    while (st.length && a[st[st.length - 1]] >= a[i]) st.pop();
    res[i] = st.length ? a[st[st.length - 1]] : -1;
    st.push(i);
  }
  return res;
}
// Monotonic increasing stack (bottom to top ascending): used for "next/prev smaller".
// Monotonic decreasing stack: used for "next/prev greater".
```

### Stock Span, Largest Rectangle in Histogram, Maximal Rectangle

```js
function stockSpan(p) {
  const res = new Array(p.length),
    st = [];
  for (let i = 0; i < p.length; i++) {
    while (st.length && p[st[st.length - 1]] <= p[i]) st.pop();
    res[i] = st.length ? i - st[st.length - 1] : i + 1;
    st.push(i);
  }
  return res;
}
function largestRectangle(h) {
  const st = [],
    n = h.length;
  let best = 0;
  for (let i = 0; i <= n; i++) {
    const cur = i === n ? 0 : h[i];
    while (st.length && h[st[st.length - 1]] >= cur) {
      const height = h[st.pop()];
      const left = st.length ? st[st.length - 1] : -1;
      best = Math.max(best, height * (i - left - 1));
    }
    st.push(i);
  }
  return best;
}
function maximalRectangle(grid) {
  // grid of "0"/"1" chars or 0/1 numbers
  if (!grid.length) return 0;
  const m = grid[0].length,
    heights = new Array(m).fill(0);
  let best = 0;
  for (const row of grid) {
    for (let j = 0; j < m; j++)
      heights[j] = Number(row[j]) === 1 ? heights[j] + 1 : 0;
    best = Math.max(best, largestRectangle(heights));
  }
  return best;
}
```

### Remove K Digits, Daily Temperatures, Asteroid Collision

```js
function removeKDigits(num, k) {
  // smallest number after removing k digits
  const st = [];
  for (const c of num) {
    while (k > 0 && st.length && st[st.length - 1] > c) {
      st.pop();
      k--;
    }
    st.push(c);
  }
  while (k-- > 0) st.pop();
  const res = st.join("").replace(/^0+/, "");
  return res === "" ? "0" : res;
}
function dailyTemperatures(t) {
  // days until a warmer day
  const res = new Array(t.length).fill(0),
    st = [];
  for (let i = 0; i < t.length; i++) {
    while (st.length && t[st[st.length - 1]] < t[i]) {
      const j = st.pop();
      res[j] = i - j;
    }
    st.push(i);
  }
  return res;
}
function asteroidCollision(a) {
  // positive = right, negative = left
  const st = [];
  for (const x of a) {
    let alive = true;
    while (alive && x < 0 && st.length && st[st.length - 1] > 0) {
      const top = st[st.length - 1];
      if (top < -x) st.pop();
      else if (top === -x) {
        st.pop();
        alive = false;
      } else alive = false;
    }
    if (alive) st.push(x);
  }
  return st;
}
```

### Min Stack, Two Stacks in One Array

```js
class MinStack {
  constructor() {
    this.st = [];
    this.mins = [];
  }
  push(x) {
    this.st.push(x);
    this.mins.push(
      this.mins.length ? Math.min(x, this.mins[this.mins.length - 1]) : x,
    );
  }
  pop() {
    this.mins.pop();
    return this.st.pop();
  }
  top() {
    return this.st[this.st.length - 1];
  }
  getMin() {
    return this.mins[this.mins.length - 1];
  }
}
class TwoStacks {
  // stack 1 grows from left, stack 2 from right
  constructor(n) {
    this.a = new Array(n);
    this.t1 = -1;
    this.t2 = n;
  }
  push1(x) {
    if (this.t1 + 1 === this.t2) throw new Error("Overflow");
    this.a[++this.t1] = x;
  }
  push2(x) {
    if (this.t1 + 1 === this.t2) throw new Error("Overflow");
    this.a[--this.t2] = x;
  }
  pop1() {
    if (this.t1 < 0) throw new Error("Underflow");
    return this.a[this.t1--];
  }
  pop2() {
    if (this.t2 >= this.a.length) throw new Error("Underflow");
    return this.a[this.t2++];
  }
}
```

---

# 12. Queues and Deques

FIFO: First In, First Out. **Never use `arr.shift()` in a loop** (O(n) each). Use a head index.

### Queue Fundamentals: Enqueue, Dequeue, Front, Rear

```js
class Queue {
  // array + head pointer, all O(1)
  constructor() {
    this.a = [];
    this.head = 0;
  }
  enqueue(x) {
    this.a.push(x);
  }
  dequeue() {
    return this.a[this.head++];
  }
  front() {
    return this.a[this.head];
  }
  rear() {
    return this.a[this.a.length - 1];
  }
  size() {
    return this.a.length - this.head;
  }
  isEmpty() {
    return this.head >= this.a.length;
  }
}
class LinkedQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.n = 0;
  }
  enqueue(x) {
    const nd = { val: x, next: null };
    if (this.tail) this.tail.next = nd;
    else this.head = nd;
    this.tail = nd;
    this.n++;
  }
  dequeue() {
    const v = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.n--;
    return v;
  }
}
```

### Circular Queue

```js
class CircularQueue {
  constructor(k) {
    this.a = new Array(k);
    this.cap = k;
    this.head = 0;
    this.size = 0;
  }
  enqueue(x) {
    if (this.size === this.cap) return false;
    this.a[(this.head + this.size) % this.cap] = x;
    this.size++;
    return true;
  }
  dequeue() {
    if (!this.size) return undefined;
    const v = this.a[this.head];
    this.head = (this.head + 1) % this.cap;
    this.size--;
    return v;
  }
  front() {
    return this.size ? this.a[this.head] : undefined;
  }
  rear() {
    return this.size
      ? this.a[(this.head + this.size - 1) % this.cap]
      : undefined;
  }
}
```

### Deque, Input-Restricted, Output-Restricted

```js
class Deque {
  // circular buffer, O(1) at both ends, grows when full
  constructor(cap = 16) {
    this.a = new Array(cap);
    this.cap = cap;
    this.head = 0;
    this.n = 0;
  }
  _grow() {
    const b = new Array(this.cap * 2);
    for (let i = 0; i < this.n; i++) b[i] = this.a[(this.head + i) % this.cap];
    this.a = b;
    this.cap *= 2;
    this.head = 0;
  }
  pushBack(x) {
    if (this.n === this.cap) this._grow();
    this.a[(this.head + this.n) % this.cap] = x;
    this.n++;
  }
  pushFront(x) {
    if (this.n === this.cap) this._grow();
    this.head = (this.head - 1 + this.cap) % this.cap;
    this.a[this.head] = x;
    this.n++;
  }
  popFront() {
    const v = this.a[this.head];
    this.head = (this.head + 1) % this.cap;
    this.n--;
    return v;
  }
  popBack() {
    const v = this.a[(this.head + this.n - 1) % this.cap];
    this.n--;
    return v;
  }
  front() {
    return this.a[this.head];
  }
  back() {
    return this.a[(this.head + this.n - 1) % this.cap];
  }
  size() {
    return this.n;
  }
}
// Input-restricted deque: insertion only at the back, deletion at both ends -> just never call pushFront.
// Output-restricted deque: deletion only at the front, insertion at both ends -> never call popBack.
```

### Priority Queue

See section 20 and the toolbox in 0.4.

### Monotonic Queue, Sliding Window Maximum / Minimum

Same as section 6 (`slidingWindowMax`, `slidingWindowMin`). Template for "DP with monotone queue":

```js
function dpWithMonotonicQueue(a, k) {
  // max sum of path jumping at most k steps: dp[i] = a[i] + max(dp[i-k..i-1])
  const n = a.length,
    dp = new Array(n).fill(0),
    dq = [0];
  let head = 0;
  dp[0] = a[0];
  for (let i = 1; i < n; i++) {
    while (dq[head] < i - k) head++;
    dp[i] = a[i] + dp[dq[head]];
    while (dq.length > head && dp[dq[dq.length - 1]] <= dp[i]) dq.pop();
    dq.push(i);
  }
  return dp[n - 1];
}
```

### Queue Using Two Stacks, Stack Using Two Queues

```js
class QueueTwoStacks {
  // amortized O(1)
  constructor() {
    this.inS = [];
    this.outS = [];
  }
  enqueue(x) {
    this.inS.push(x);
  }
  dequeue() {
    if (!this.outS.length)
      while (this.inS.length) this.outS.push(this.inS.pop());
    return this.outS.pop();
  }
}
class StackTwoQueues {
  // push is O(n)
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }
  push(x) {
    this.q2.push(x);
    while (this.q1.length) this.q2.push(this.q1.shift());
    [this.q1, this.q2] = [this.q2, this.q1];
  }
  pop() {
    return this.q1.shift();
  }
  top() {
    return this.q1[0];
  }
}
```

### First Negative Number in Every Window

```js
function firstNegativeInWindow(a, k) {
  const q = [],
    res = [];
  let head = 0; // queue of indices of negatives
  for (let i = 0; i < a.length; i++) {
    if (a[i] < 0) q.push(i);
    if (i >= k - 1) {
      while (head < q.length && q[head] <= i - k) head++;
      res.push(head < q.length ? a[q[head]] : 0);
    }
  }
  return res;
}
```

### LRU Cache, BFS Queue Implementation

LRU: see section 10. BFS: see section 21. Basic BFS skeleton with the `Queue` class:

```js
function bfsOrder(adj, start) {
  const seen = new Array(adj.length).fill(false),
    q = new Queue(),
    order = [];
  q.enqueue(start);
  seen[start] = true;
  while (!q.isEmpty()) {
    const u = q.dequeue();
    order.push(u);
    for (const v of adj[u])
      if (!seen[v]) {
        seen[v] = true;
        q.enqueue(v);
      }
  }
  return order;
}
```

---

# 13. Hashing

`Map` and `Set` are hash tables in JS. Average O(1) insert/lookup/delete.
Keys: numbers, strings, even arrays-as-strings (`${a},${b}`). Do not use arrays/objects directly as keys (identity compare).

### Hash Functions, Hash Tables, Collision Handling (Chaining, Open Addressing)

```js
function hashString(s, size) {
  // polynomial rolling hash mapped to a bucket
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % size;
  return h;
}
class ChainingHashTable {
  // separate chaining
  constructor(size = 1009) {
    this.size = size;
    this.buckets = Array.from({ length: size }, () => []);
  }
  set(key, val) {
    const b = this.buckets[hashString(String(key), this.size)];
    for (const e of b)
      if (e[0] === key) {
        e[1] = val;
        return;
      }
    b.push([key, val]);
  }
  get(key) {
    for (const e of this.buckets[hashString(String(key), this.size)])
      if (e[0] === key) return e[1];
    return undefined;
  }
  delete(key) {
    const b = this.buckets[hashString(String(key), this.size)];
    const i = b.findIndex((e) => e[0] === key);
    if (i >= 0) b.splice(i, 1);
  }
}
class OpenAddressingTable {
  // linear / quadratic / double hashing in one class
  constructor(size = 1009, mode = "linear") {
    this.size = size;
    this.mode = mode;
    this.keys = new Array(size).fill(null);
    this.vals = new Array(size).fill(null);
    this.deleted = new Array(size).fill(false);
  }
  h1(k) {
    return hashString(String(k), this.size);
  }
  h2(k) {
    return 1 + hashString(String(k) + "#", this.size - 1);
  } // double hashing step (size should be prime)
  probe(k, i) {
    if (this.mode === "linear") return (this.h1(k) + i) % this.size;
    if (this.mode === "quadratic") return (this.h1(k) + i * i) % this.size;
    return (this.h1(k) + i * this.h2(k)) % this.size;
  }
  set(k, v) {
    for (let i = 0; i < this.size; i++) {
      const p = this.probe(k, i);
      if (this.keys[p] === null || this.deleted[p] || this.keys[p] === k) {
        this.keys[p] = k;
        this.vals[p] = v;
        this.deleted[p] = false;
        return true;
      }
    }
    return false; // table full
  }
  get(k) {
    for (let i = 0; i < this.size; i++) {
      const p = this.probe(k, i);
      if (this.keys[p] === null && !this.deleted[p]) return undefined;
      if (this.keys[p] === k && !this.deleted[p]) return this.vals[p];
    }
    return undefined;
  }
  delete(k) {
    for (let i = 0; i < this.size; i++) {
      const p = this.probe(k, i);
      if (this.keys[p] === null && !this.deleted[p]) return;
      if (this.keys[p] === k && !this.deleted[p]) {
        this.deleted[p] = true;
        return;
      }
    }
  }
}
```

### Hash Maps, Hash Sets, Frequency Maps, Duplicate Detection

```js
function hasDuplicate(a) {
  return new Set(a).size !== a.length;
}
function frequencyMap(a) {
  const f = new Map();
  for (const x of a) f.set(x, (f.get(x) || 0) + 1);
  return f;
}
function mostFrequent(a) {
  let best = null,
    bc = 0;
  for (const [k, c] of frequencyMap(a))
    if (c > bc) {
      bc = c;
      best = k;
    }
  return best;
}
function firstNonRepeatingElement(a) {
  const f = frequencyMap(a);
  for (const x of a) if (f.get(x) === 1) return x;
  return null;
}
```

### Two Sum, Group Anagrams, Longest Consecutive Sequence

```js
function twoSum(a, target) {
  const seen = new Map();
  for (let i = 0; i < a.length; i++) {
    if (seen.has(target - a[i])) return [seen.get(target - a[i]), i];
    seen.set(a[i], i);
  }
  return null;
}
function groupAnagrams(words) {
  const g = new Map();
  for (const w of words) {
    const key = w.split("").sort().join("");
    if (!g.has(key)) g.set(key, []);
    g.get(key).push(w);
  }
  return [...g.values()];
}
function longestConsecutive(a) {
  // O(n)
  const s = new Set(a);
  let best = 0;
  for (const x of s) {
    if (s.has(x - 1)) continue; // only start counting from sequence starts
    let y = x;
    while (s.has(y + 1)) y++;
    best = Math.max(best, y - x + 1);
  }
  return best;
}
```

### Subarray Sum / XOR Equals K, Distinct Elements in a Window

`subarraySumEqualsK` is in section 7 and `subarrayXorCount` in section 3.

```js
function distinctInEveryWindow(a, k) {
  const f = new Map(),
    res = [];
  for (let i = 0; i < a.length; i++) {
    f.set(a[i], (f.get(a[i]) || 0) + 1);
    if (i >= k) {
      const o = a[i - k];
      if (f.get(o) === 1) f.delete(o);
      else f.set(o, f.get(o) - 1);
    }
    if (i >= k - 1) res.push(f.size);
  }
  return res;
}
```

### Hash-Based String Matching, Rolling Hash, Polynomial Hashing

See `StringHash` and `rabinKarp` in section 4.

```js
function polyHash(s, base = 911382323, mod = 972663749) {
  // single-modulus polynomial hash
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (mulmod(h, base, mod) + s.charCodeAt(i)) % mod;
  return h;
}
function countDistinctSubstringsOfLength(s, L) {
  // distinct substrings via rolling hash
  const H = new StringHash(s),
    set = new Set();
  for (let i = 0; i + L <= s.length; i++) set.add(H.get(i, i + L));
  return set.size;
}
```

### Collision Probability

Birthday paradox: with a hash range `M`, `n` items collide with probability about `1 - e^(-n^2 / 2M)`. For `M = 1e9` and `n = 1e5` collisions are almost certain; use double hashing (`M ~ 1e18`). Always randomize the base so tests cannot be crafted against you.

```js
const collisionProbability = (n, M) => 1 - Math.exp((-n * n) / (2 * M));
// collisionProbability(1e5, 1e9) ~ 0.99;   collisionProbability(1e5, 1e18) ~ 5e-9
```

---

# 14. Recursion and Backtracking

### Recursion Fundamentals: Base Case, Recursive Case, Call Stack, Recursion Tree

Recursion = function calls itself on a smaller input. Always define the **base case** first. Each call is a node in a **recursion tree**; the **call stack** holds the active path (depth is limited to ~1e4 in Node).

```js
function sumArray(a, i = 0) {
  // recursion on arrays
  if (i === a.length) return 0; // base case
  return a[i] + sumArray(a, i + 1); // recursive case
}
function reverseStr(s) {
  // recursion on strings
  if (s.length <= 1) return s;
  return reverseStr(s.slice(1)) + s[0];
}
function fibRec(n) {
  return n < 2 ? n : fibRec(n - 1) + fibRec(n - 2);
} // tree recursion O(2^n)
function headRec(n, out = []) {
  if (n === 0) return out;
  headRec(n - 1, out);
  out.push(n);
  return out;
} // work after call
function tailRec(n, acc = 1) {
  return n <= 1 ? acc : tailRec(n - 1, acc * n);
} // work before call; JS does not optimize it
function gcdRec(a, b) {
  return b === 0 ? a : gcdRec(b, a % b);
}
```

### Generate Subsequences / Subsets

```js
function subsets(a) {
  // 2^n subsets
  const res = [],
    cur = [];
  (function go(i) {
    if (i === a.length) {
      res.push(cur.slice());
      return;
    }
    cur.push(a[i]);
    go(i + 1);
    cur.pop(); // take
    go(i + 1); // skip
  })(0);
  return res;
}
function subsetsUnique(a) {
  // with duplicate values
  a = a.slice().sort((x, y) => x - y);
  const res = [],
    cur = [];
  (function go(start) {
    res.push(cur.slice());
    for (let i = start; i < a.length; i++) {
      if (i > start && a[i] === a[i - 1]) continue;
      cur.push(a[i]);
      go(i + 1);
      cur.pop();
    }
  })(0);
  return res;
}
function subsequencesOfString(s) {
  const res = [];
  (function go(i, cur) {
    if (i === s.length) {
      res.push(cur);
      return;
    }
    go(i + 1, cur + s[i]);
    go(i + 1, cur);
  })(0, "");
  return res;
}
```

### Generate Permutations, Combinations

```js
function permutations(a) {
  const res = [],
    used = new Array(a.length).fill(false),
    cur = [];
  a = a.slice().sort((x, y) => x - y);
  (function go() {
    if (cur.length === a.length) {
      res.push(cur.slice());
      return;
    }
    for (let i = 0; i < a.length; i++) {
      if (used[i] || (i > 0 && a[i] === a[i - 1] && !used[i - 1])) continue; // skip duplicate branches
      used[i] = true;
      cur.push(a[i]);
      go();
      cur.pop();
      used[i] = false;
    }
  })();
  return res;
}
function combinations(n, k) {
  // choose k numbers from 1..n
  const res = [],
    cur = [];
  (function go(start) {
    if (cur.length === k) {
      res.push(cur.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      cur.push(i);
      go(i + 1);
      cur.pop();
    }
  })(1);
  return res;
}
```

### Combination Sum, Subset Sum, Palindrome Partitioning

```js
function combinationSum(cands, target) {
  // reuse allowed
  cands = cands.slice().sort((x, y) => x - y);
  const res = [],
    cur = [];
  (function go(start, rem) {
    if (rem === 0) {
      res.push(cur.slice());
      return;
    }
    for (let i = start; i < cands.length && cands[i] <= rem; i++) {
      cur.push(cands[i]);
      go(i, rem - cands[i]);
      cur.pop();
    }
  })(0, target);
  return res;
}
function subsetSumExists(a, target) {
  // backtracking with pruning; use DP for big targets (section 17)
  a = a.slice().sort((x, y) => y - x);
  const suffix = new Array(a.length + 1).fill(0);
  for (let i = a.length - 1; i >= 0; i--) suffix[i] = suffix[i + 1] + a[i];
  function go(i, rem) {
    if (rem === 0) return true;
    if (i === a.length || rem < 0 || suffix[i] < rem) return false; // pruning
    return go(i + 1, rem - a[i]) || go(i + 1, rem);
  }
  return go(0, target);
}
function palindromePartitions(s) {
  const res = [],
    cur = [];
  (function go(start) {
    if (start === s.length) {
      res.push(cur.slice());
      return;
    }
    for (let end = start + 1; end <= s.length; end++) {
      const part = s.slice(start, end);
      if (isPalindrome(part)) {
        cur.push(part);
        go(end);
        cur.pop();
      }
    }
  })(0);
  return res;
}
```

### N-Queens

```js
function nQueensCount(n) {
  // bitmask version, fast up to n ~ 14
  const full = (1 << n) - 1;
  function go(cols, d1, d2) {
    if (cols === full) return 1;
    let avail = full & ~(cols | d1 | d2),
      cnt = 0;
    while (avail) {
      const bit = avail & -avail;
      avail ^= bit;
      cnt += go(cols | bit, ((d1 | bit) << 1) & full, (d2 | bit) >> 1);
    }
    return cnt;
  }
  return go(0, 0, 0);
}
function nQueensSolutions(n) {
  // returns board placements (column per row)
  const res = [],
    cols = new Array(n).fill(false),
    d1 = new Array(2 * n).fill(false),
    d2 = new Array(2 * n).fill(false),
    pos = [];
  (function go(r) {
    if (r === n) {
      res.push(pos.slice());
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols[c] || d1[r + c] || d2[r - c + n]) continue;
      cols[c] = d1[r + c] = d2[r - c + n] = true;
      pos.push(c);
      go(r + 1);
      pos.pop();
      cols[c] = d1[r + c] = d2[r - c + n] = false;
    }
  })(0);
  return res;
}
```

### Sudoku Solver (Constraint Satisfaction + Pruning)

```js
function solveSudoku(b) {
  // b: 9x9 array of numbers, 0 = empty. Modifies in place.
  const row = Array.from({ length: 9 }, () => new Array(10).fill(false));
  const col = Array.from({ length: 9 }, () => new Array(10).fill(false));
  const box = Array.from({ length: 9 }, () => new Array(10).fill(false));
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (b[i][j]) {
        const v = b[i][j];
        row[i][v] =
          col[j][v] =
          box[Math.floor(i / 3) * 3 + Math.floor(j / 3)][v] =
            true;
      }
  function go() {
    let bi = -1,
      bj = -1,
      bestCnt = 10; // MRV heuristic: pick cell with fewest candidates
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (!b[i][j]) {
          let c = 0;
          for (let v = 1; v <= 9; v++)
            if (
              !row[i][v] &&
              !col[j][v] &&
              !box[Math.floor(i / 3) * 3 + Math.floor(j / 3)][v]
            )
              c++;
          if (c < bestCnt) {
            bestCnt = c;
            bi = i;
            bj = j;
          }
        }
    if (bi === -1) return true; // solved
    const bx = Math.floor(bi / 3) * 3 + Math.floor(bj / 3);
    for (let v = 1; v <= 9; v++) {
      if (row[bi][v] || col[bj][v] || box[bx][v]) continue;
      b[bi][bj] = v;
      row[bi][v] = col[bj][v] = box[bx][v] = true;
      if (go()) return true;
      b[bi][bj] = 0;
      row[bi][v] = col[bj][v] = box[bx][v] = false;
    }
    return false;
  }
  return go();
}
```

### Rat in a Maze, Word Search

```js
function ratInMaze(g) {
  // g[i][j] = 1 open; returns all paths from (0,0) to (n-1,n-1)
  const n = g.length,
    res = [],
    vis = Array.from({ length: n }, () => new Array(n).fill(false));
  const dirs = [
    [1, 0, "D"],
    [0, -1, "L"],
    [0, 1, "R"],
    [-1, 0, "U"],
  ];
  (function go(i, j, path) {
    if (i === n - 1 && j === n - 1) {
      res.push(path);
      return;
    }
    vis[i][j] = true;
    for (const [di, dj, ch] of dirs) {
      const x = i + di,
        y = j + dj;
      if (x >= 0 && y >= 0 && x < n && y < n && g[x][y] === 1 && !vis[x][y])
        go(x, y, path + ch);
    }
    vis[i][j] = false;
  })(0, 0, "");
  return g[0][0] === 1 ? res : [];
}
function wordSearch(board, word) {
  const n = board.length,
    m = board[0].length;
  function go(i, j, k) {
    if (k === word.length) return true;
    if (i < 0 || j < 0 || i >= n || j >= m || board[i][j] !== word[k])
      return false;
    const t = board[i][j];
    board[i][j] = "#";
    const ok =
      go(i + 1, j, k + 1) ||
      go(i - 1, j, k + 1) ||
      go(i, j + 1, k + 1) ||
      go(i, j - 1, k + 1);
    board[i][j] = t;
    return ok;
  }
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) if (go(i, j, 0)) return true;
  return false;
}
```

### Graph Coloring, Hamiltonian Path, Knight's Tour

```js
function graphColoring(adj, m) {
  // can the graph be colored with m colors?
  const n = adj.length,
    color = new Array(n).fill(0);
  function go(u) {
    if (u === n) return true;
    for (let c = 1; c <= m; c++) {
      if (adj[u].every((v) => color[v] !== c)) {
        color[u] = c;
        if (go(u + 1)) return true;
        color[u] = 0;
      }
    }
    return false;
  }
  return go(0) ? color : null;
}
function hamiltonianPathBacktrack(adj) {
  // n <= ~15; use bitmask DP (section 30) for n <= 20
  const n = adj.length,
    vis = new Array(n).fill(false),
    path = [];
  function go(u) {
    path.push(u);
    vis[u] = true;
    if (path.length === n) return true;
    for (const v of adj[u]) if (!vis[v] && go(v)) return true;
    path.pop();
    vis[u] = false;
    return false;
  }
  for (let s = 0; s < n; s++) if (go(s)) return path;
  return null;
}
function knightsTour(n) {
  // Warnsdorff heuristic: move to the square with fewest onward moves
  const dx = [2, 1, -1, -2, -2, -1, 1, 2],
    dy = [1, 2, 2, 1, -1, -2, -2, -1];
  const board = Array.from({ length: n }, () => new Array(n).fill(-1));
  const ok = (x, y) => x >= 0 && y >= 0 && x < n && y < n && board[x][y] === -1;
  const degree = (x, y) => {
    let c = 0;
    for (let k = 0; k < 8; k++) if (ok(x + dx[k], y + dy[k])) c++;
    return c;
  };
  let x = 0,
    y = 0;
  board[0][0] = 0;
  for (let step = 1; step < n * n; step++) {
    let best = -1,
      bd = 9;
    for (let k = 0; k < 8; k++) {
      const nx = x + dx[k],
        ny = y + dy[k];
      if (ok(nx, ny)) {
        const d = degree(nx, ny);
        if (d < bd) {
          bd = d;
          best = k;
        }
      }
    }
    if (best === -1) return null;
    x += dx[best];
    y += dy[best];
    board[x][y] = step;
  }
  return board;
}
```

### Branch and Bound, Pruning, Constraint Satisfaction

- **Pruning**: abort a branch as soon as it cannot lead to a solution (`rem < 0`, `suffix < rem`, column already used...).
- **Branch and bound**: keep the best answer so far; abort a branch if its optimistic estimate cannot beat it.
- **Constraint satisfaction**: choose the most constrained variable first (MRV, as in the Sudoku solver above).

```js
function knapsackBranchBound(items, cap) {
  // items: [weight, value]; fractional bound
  items = items.slice().sort((a, b) => b[1] / b[0] - a[1] / a[0]);
  let best = 0;
  function bound(i, w, v) {
    let rem = cap - w,
      b = v;
    for (; i < items.length && items[i][0] <= rem; i++) {
      rem -= items[i][0];
      b += items[i][1];
    }
    if (i < items.length) b += (items[i][1] / items[i][0]) * rem;
    return b;
  }
  (function go(i, w, v) {
    if (w > cap) return;
    best = Math.max(best, v);
    if (i === items.length || bound(i, w, v) <= best) return; // prune
    go(i + 1, w + items[i][0], v + items[i][1]);
    go(i + 1, w, v);
  })(0, 0, 0);
  return best;
}
```

---

# 15. Greedy Algorithms

Take the locally best choice each step. Works when the problem has the **greedy choice property** (a locally optimal choice is part of some global optimum) and **optimal substructure** (what remains is the same kind of problem).

**Exchange argument** (how to prove it): take any optimal solution that differs from the greedy one at the first step, swap its choice for the greedy choice, and show it is no worse.

### Activity Selection, Interval Scheduling, Maximum Number of Activities

```js
function activitySelection(iv) {
  // iv: [start, end]; sort by END time
  iv = iv.slice().sort((a, b) => a[1] - b[1]);
  let end = -Infinity,
    cnt = 0;
  for (const [s, e] of iv)
    if (s >= end) {
      cnt++;
      end = e;
    }
  return cnt;
}
function eraseOverlapIntervals(iv) {
  return iv.length - activitySelection(iv);
}
```

### Interval Merging, Interval Partitioning, Meeting Rooms, Minimum Platforms

```js
// mergeIntervals: see section 3.
function minPlatforms(arr, dep) {
  // also: minimum meeting rooms
  arr = arr.slice().sort((a, b) => a - b);
  dep = dep.slice().sort((a, b) => a - b);
  let i = 0,
    j = 0,
    cur = 0,
    best = 0;
  while (i < arr.length) {
    if (arr[i] <= dep[j]) {
      cur++;
      i++;
      best = Math.max(best, cur);
    } else {
      cur--;
      j++;
    }
  }
  return best;
}
function intervalPartitioning(iv) {
  // minimum number of groups with no overlap = max overlap
  const ev = [];
  for (const [s, e] of iv) {
    ev.push([s, 1]);
    ev.push([e, -1]);
  }
  ev.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // ends before starts at the same time
  let cur = 0,
    best = 0;
  for (const [, d] of ev) {
    cur += d;
    best = Math.max(best, cur);
  }
  return best;
}
function canAttendAllMeetings(iv) {
  return !hasOverlap(iv);
} // hasOverlap: section 3
```

### Fractional Knapsack, Job Sequencing With Deadlines

```js
function fractionalKnapsack(items, cap) {
  // items: [weight, value]
  items = items.slice().sort((a, b) => b[1] / b[0] - a[1] / a[0]);
  let total = 0;
  for (const [w, v] of items) {
    if (cap >= w) {
      cap -= w;
      total += v;
    } else {
      total += (v * cap) / w;
      break;
    }
  }
  return total;
}
function jobSequencing(jobs) {
  // jobs: [deadline, profit], unit time each
  jobs = jobs.slice().sort((a, b) => b[1] - a[1]);
  const maxD = Math.max(...jobs.map((j) => j[0])),
    slot = new Array(maxD + 1).fill(false);
  let profit = 0,
    cnt = 0;
  for (const [d, p] of jobs) {
    for (let t = d; t >= 1; t--)
      if (!slot[t]) {
        slot[t] = true;
        profit += p;
        cnt++;
        break;
      }
  }
  return [cnt, profit]; // (for large n, use DSU to find the free slot)
}
```

### Assign Cookies, Jump Game, Gas Station, Candy

```js
function assignCookies(greed, cookies) {
  greed = greed.slice().sort((a, b) => a - b);
  cookies = cookies.slice().sort((a, b) => a - b);
  let i = 0;
  for (const c of cookies) if (i < greed.length && c >= greed[i]) i++;
  return i;
}
function canJump(a) {
  let far = 0;
  for (let i = 0; i < a.length; i++) {
    if (i > far) return false;
    far = Math.max(far, i + a[i]);
  }
  return true;
}
function minJumps(a) {
  let jumps = 0,
    curEnd = 0,
    far = 0;
  for (let i = 0; i < a.length - 1; i++) {
    far = Math.max(far, i + a[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = far;
    }
  }
  return jumps;
}
function gasStation(gas, cost) {
  let total = 0,
    tank = 0,
    start = 0;
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i];
    total += d;
    tank += d;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
}
function candy(r) {
  // each child >= 1 candy; higher rating than neighbor => more candy
  const n = r.length,
    c = new Array(n).fill(1);
  for (let i = 1; i < n; i++) if (r[i] > r[i - 1]) c[i] = c[i - 1] + 1;
  for (let i = n - 2; i >= 0; i--)
    if (r[i] > r[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
  return c.reduce((s, x) => s + x, 0);
}
```

### Huffman Coding

```js
function huffman(freq) {
  // freq: Map(char -> count). returns Map(char -> code)
  const pq = new PriorityQueue((a, b) => a.f - b.f);
  for (const [ch, f] of freq) pq.push({ f, ch });
  if (pq.size() === 1) return new Map([[pq.peek().ch, "0"]]);
  while (pq.size() > 1) {
    const a = pq.pop(),
      b = pq.pop();
    pq.push({ f: a.f + b.f, left: a, right: b });
  }
  const codes = new Map();
  (function walk(node, code) {
    if (node.ch !== undefined) {
      codes.set(node.ch, code);
      return;
    }
    walk(node.left, code + "0");
    walk(node.right, code + "1");
  })(pq.pop(), "");
  return codes;
}
```

### Egyptian Fractions, Minimum Number of Coins

```js
function egyptianFraction(num, den) {
  // returns list of denominators d with sum 1/d = num/den
  const res = [];
  while (num !== 0) {
    const x = Math.ceil(den / num);
    res.push(x);
    num = num * x - den;
    den = den * x;
    const g = gcd(num, den);
    if (g) {
      num /= g;
      den /= g;
    }
  }
  return res;
}
function minCoinsGreedy(coins, amount) {
  // ONLY correct for canonical systems (1,5,10,25...). Else use DP.
  coins = coins.slice().sort((a, b) => b - a);
  const used = [];
  for (const c of coins)
    while (amount >= c) {
      amount -= c;
      used.push(c);
    }
  return amount === 0 ? used : null;
}
```

### Kruskal, Prim, Dijkstra (greedy graph algorithms), Greedy Scheduling

Kruskal / Prim / Dijkstra full code is in section 22.

```js
function minimizeMaxLateness(jobs) {
  // jobs: [duration, deadline]; sort by deadline (EDF)
  jobs = jobs.slice().sort((a, b) => a[1] - b[1]);
  let t = 0,
    worst = 0;
  for (const [d, dl] of jobs) {
    t += d;
    worst = Math.max(worst, t - dl);
  }
  return worst;
}
function minimizeWaitingTime(durations) {
  // shortest job first
  const d = durations.slice().sort((a, b) => a - b);
  let t = 0,
    total = 0;
  for (const x of d) {
    total += t;
    t += x;
  }
  return total;
}
function minCostConnectRopes(ropes) {
  const pq = new PriorityQueue();
  ropes.forEach((r) => pq.push(r));
  let cost = 0;
  while (pq.size() > 1) {
    const s = pq.pop() + pq.pop();
    cost += s;
    pq.push(s);
  }
  return cost;
}
```

---

# 16. Divide and Conquer

**Divide** the problem into smaller independent subproblems, **conquer** them recursively, **combine** results.
Recurrence `T(n) = a*T(n/b) + f(n)`.

**Master Theorem** (with `c = log_b(a)`):

- `f(n) = O(n^(c-e))` -> `T(n) = Theta(n^c)`
- `f(n) = Theta(n^c)` -> `T(n) = Theta(n^c log n)` (merge sort: a=2, b=2, f=n)
- `f(n) = Omega(n^(c+e))` (+ regularity) -> `T(n) = Theta(f(n))`

### Merge Sort, Quick Sort, Binary Search

See sections 9 and 8. They are the classic divide and conquer algorithms.

### Count Inversions

```js
function countInversions(a) {
  // pairs i < j with a[i] > a[j], O(n log n)
  a = a.slice();
  const tmp = new Array(a.length);
  function sort(lo, hi) {
    if (hi - lo <= 1) return 0;
    const mid = (lo + hi) >> 1;
    let inv = sort(lo, mid) + sort(mid, hi);
    let i = lo,
      j = mid,
      k = lo;
    while (i < mid && j < hi) {
      if (a[i] <= a[j]) tmp[k++] = a[i++];
      else {
        tmp[k++] = a[j++];
        inv += mid - i;
      }
    }
    while (i < mid) tmp[k++] = a[i++];
    while (j < hi) tmp[k++] = a[j++];
    for (let t = lo; t < hi; t++) a[t] = tmp[t];
    return inv;
  }
  return sort(0, a.length);
}
```

### Maximum Subarray (Divide and Conquer)

```js
function maxSubarrayDC(a, lo = 0, hi = a.length - 1) {
  if (lo === hi) return a[lo];
  const mid = (lo + hi) >> 1;
  let left = -Infinity,
    sum = 0;
  for (let i = mid; i >= lo; i--) {
    sum += a[i];
    left = Math.max(left, sum);
  }
  let right = -Infinity;
  sum = 0;
  for (let i = mid + 1; i <= hi; i++) {
    sum += a[i];
    right = Math.max(right, sum);
  }
  return Math.max(
    maxSubarrayDC(a, lo, mid),
    maxSubarrayDC(a, mid + 1, hi),
    left + right,
  );
}
```

### Closest Pair of Points

```js
function closestPair(pts) {
  // pts: [[x, y], ...], returns smallest distance, O(n log^2 n)
  const P = pts.slice().sort((a, b) => a[0] - b[0]);
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  function rec(l, r) {
    if (r - l <= 3) {
      let best = Infinity;
      for (let i = l; i < r; i++)
        for (let j = i + 1; j < r; j++) best = Math.min(best, d2(P[i], P[j]));
      return best;
    }
    const mid = (l + r) >> 1,
      midX = P[mid][0];
    let best = Math.min(rec(l, mid), rec(mid, r));
    const strip = [];
    for (let i = l; i < r; i++)
      if ((P[i][0] - midX) ** 2 < best) strip.push(P[i]);
    strip.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < strip.length; i++)
      for (
        let j = i + 1;
        j < strip.length && (strip[j][1] - strip[i][1]) ** 2 < best;
        j++
      )
        best = Math.min(best, d2(strip[i], strip[j]));
    return best;
  }
  return Math.sqrt(rec(0, P.length));
}
```

### Strassen's Matrix Multiplication (2^k x 2^k matrices)

```js
function addM(A, B) {
  return A.map((r, i) => r.map((v, j) => v + B[i][j]));
}
function subM(A, B) {
  return A.map((r, i) => r.map((v, j) => v - B[i][j]));
}
function strassen(A, B) {
  // O(n^2.81). Pad to a power of two in practice.
  const n = A.length;
  if (n <= 32) {
    // switch to naive for small blocks
    const C = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++)
      for (let k = 0; k < n; k++)
        for (let j = 0; j < n; j++) C[i][j] += A[i][k] * B[k][j];
    return C;
  }
  const h = n >> 1;
  const sub = (M, r, c) => M.slice(r, r + h).map((row) => row.slice(c, c + h));
  const A11 = sub(A, 0, 0),
    A12 = sub(A, 0, h),
    A21 = sub(A, h, 0),
    A22 = sub(A, h, h);
  const B11 = sub(B, 0, 0),
    B12 = sub(B, 0, h),
    B21 = sub(B, h, 0),
    B22 = sub(B, h, h);
  const M1 = strassen(addM(A11, A22), addM(B11, B22)),
    M2 = strassen(addM(A21, A22), B11);
  const M3 = strassen(A11, subM(B12, B22)),
    M4 = strassen(A22, subM(B21, B11));
  const M5 = strassen(addM(A11, A12), B22),
    M6 = strassen(subM(A21, A11), addM(B11, B12));
  const M7 = strassen(subM(A12, A22), addM(B21, B22));
  const C11 = addM(subM(addM(M1, M4), M5), M7),
    C12 = addM(M3, M5),
    C21 = addM(M2, M4),
    C22 = addM(subM(addM(M1, M3), M2), M6);
  const C = Array.from({ length: n }, () => new Array(n));
  for (let i = 0; i < h; i++)
    for (let j = 0; j < h; j++) {
      C[i][j] = C11[i][j];
      C[i][j + h] = C12[i][j];
      C[i + h][j] = C21[i][j];
      C[i + h][j + h] = C22[i][j];
    }
  return C;
}
```

### Karatsuba Multiplication

```js
function karatsuba(x, y) {
  // BigInt, non-negative. (BigInt * is already fast; for learning)
  if (x < 10n || y < 10n) return x * y;
  const n = Math.max(x.toString(2).length, y.toString(2).length),
    h = BigInt(n >> 1);
  const mask = (1n << h) - 1n;
  const a = x >> h,
    b = x & mask,
    c = y >> h,
    d = y & mask;
  const ac = karatsuba(a, c),
    bd = karatsuba(b, d),
    abcd = karatsuba(a + b, c + d);
  return (ac << (2n * h)) + ((abcd - ac - bd) << h) + bd;
}
```

### Fast Fourier Transform (polynomial multiplication)

```js
function fft(re, im, invert) {
  // in-place iterative FFT, length power of two
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = ((2 * Math.PI) / len) * (invert ? -1 : 1),
      wr = Math.cos(ang),
      wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1,
        ci = 0;
      for (let j = 0; j < len / 2; j++) {
        const ur = re[i + j],
          ui = im[i + j];
        const vr = re[i + j + len / 2] * cr - im[i + j + len / 2] * ci;
        const vi = re[i + j + len / 2] * ci + im[i + j + len / 2] * cr;
        re[i + j] = ur + vr;
        im[i + j] = ui + vi;
        re[i + j + len / 2] = ur - vr;
        im[i + j + len / 2] = ui - vi;
        const nr = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = nr;
      }
    }
  }
  if (invert)
    for (let i = 0; i < n; i++) {
      re[i] /= n;
      im[i] /= n;
    }
}
function multiplyPolynomials(a, b) {
  // integer coefficients, result rounded (safe while values < ~1e14)
  let n = 1;
  while (n < a.length + b.length) n <<= 1;
  const ar = new Float64Array(n),
    ai = new Float64Array(n),
    br = new Float64Array(n),
    bi = new Float64Array(n);
  a.forEach((v, i) => (ar[i] = v));
  b.forEach((v, i) => (br[i] = v));
  fft(ar, ai, false);
  fft(br, bi, false);
  for (let i = 0; i < n; i++) {
    const r = ar[i] * br[i] - ai[i] * bi[i],
      im = ar[i] * bi[i] + ai[i] * br[i];
    ar[i] = r;
    ai[i] = im;
  }
  fft(ar, ai, true);
  const res = [];
  for (let i = 0; i < a.length + b.length - 1; i++) res.push(Math.round(ar[i]));
  return res;
}
```

### Recurrence Relations (solving quickly)

```js
// T(n) = 2T(n/2) + n        -> O(n log n)   (merge sort)
// T(n) = T(n/2) + 1         -> O(log n)     (binary search)
// T(n) = 2T(n/2) + 1        -> O(n)
// T(n) = T(n-1) + n         -> O(n^2)       (unfold)
// T(n) = 7T(n/2) + n^2      -> O(n^2.81)    (Strassen)
// T(n) = 3T(n/2) + n        -> O(n^1.585)   (Karatsuba)
// Divide and Conquer DP optimization: see section 17.
```

---

# 17. Dynamic Programming

DP = recursion + remembering answers. Use it when you see **overlapping subproblems** (same call repeated) and **optimal substructure** (best answer is built from best answers of smaller states).

**Recipe:** (1) define the state `dp[...]` in words, (2) write the transition, (3) set base cases, (4) fix the order of evaluation, (5) read the answer, (6) optimize space.

### DP Fundamentals: Memoization (Top-Down) vs Tabulation (Bottom-Up)

```js
function fibMemo(n, memo = new Map()) {
  // top-down
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const r = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, r);
  return r;
}
function fibTab(n) {
  // bottom-up
  if (n < 2) return n;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}
function fibSpace(n) {
  // space optimization: only last two values
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}
// Memo key for several parameters: `${i},${j}` string, or flat index i * M + j in a typed array.
```

### 1D DP: Climbing Stairs, Frog Jump, House Robber, Min Cost Climbing Stairs

```js
function climbStairs(n) {
  // ways to climb 1 or 2 steps
  let a = 1,
    b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
function frogJump(h, k = 2) {
  // min cost, jump up to k stones, cost |h[i]-h[j]|
  const n = h.length,
    dp = new Array(n).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i < n; i++)
    for (let j = Math.max(0, i - k); j < i; j++)
      dp[i] = Math.min(dp[i], dp[j] + Math.abs(h[i] - h[j]));
  return dp[n - 1];
}
function houseRobber(a) {
  // max sum of non-adjacent elements
  let take = 0,
    skip = 0;
  for (const x of a) [take, skip] = [skip + x, Math.max(skip, take)];
  return Math.max(take, skip);
}
function houseRobberCircular(a) {
  if (a.length === 1) return a[0];
  return Math.max(houseRobber(a.slice(1)), houseRobber(a.slice(0, -1)));
}
function minCostClimbingStairs(cost) {
  let a = 0,
    b = 0;
  for (let i = 2; i <= cost.length; i++)
    [a, b] = [b, Math.min(b + cost[i - 1], a + cost[i - 2])];
  return b;
}
```

### Grid DP (2D)

```js
function uniquePaths(n, m, blocked = []) {
  // paths from top-left to bottom-right, moves: right / down
  const dp = Array.from({ length: n }, () => new Array(m).fill(0)),
    bl = new Set(blocked.map(([r, c]) => r * m + c));
  dp[0][0] = bl.has(0) ? 0 : 1;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      if (bl.has(i * m + j)) {
        dp[i][j] = 0;
        continue;
      }
      if (i) dp[i][j] += dp[i - 1][j];
      if (j) dp[i][j] += dp[i][j - 1];
    }
  return dp[n - 1][m - 1];
}
function minPathSum(g) {
  const n = g.length,
    m = g[0].length,
    dp = Array.from({ length: n }, () => new Array(m).fill(Infinity));
  dp[0][0] = g[0][0];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      if (i) dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + g[i][j]);
      if (j) dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + g[i][j]);
    }
  return dp[n - 1][m - 1];
}
function maxSquareOfOnes(g) {
  // largest all-1 square
  const n = g.length,
    m = g[0].length,
    dp = Array.from({ length: n }, () => new Array(m).fill(0));
  let best = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      if (Number(g[i][j]) === 1) {
        dp[i][j] =
          i && j
            ? Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
            : 1;
        best = Math.max(best, dp[i][j]);
      }
    }
  return best * best;
}
```

### 3D DP

```js
function cherryPickupLikeDP(grid) {
  // two walkers move together: state (step, r1, r2) -> 3D DP
  const n = grid.length,
    NEG = -1e9;
  let dp = Array.from({ length: n }, () => new Array(n).fill(NEG));
  dp[0][0] = grid[0][0];
  for (let step = 1; step <= 2 * (n - 1); step++) {
    const nd = Array.from({ length: n }, () => new Array(n).fill(NEG));
    for (let r1 = 0; r1 < n; r1++)
      for (let r2 = 0; r2 < n; r2++) {
        const c1 = step - r1,
          c2 = step - r2;
        if (
          c1 < 0 ||
          c2 < 0 ||
          c1 >= n ||
          c2 >= n ||
          grid[r1][c1] < 0 ||
          grid[r2][c2] < 0
        )
          continue;
        let best = NEG;
        for (const [a, b] of [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]) {
          const p1 = r1 - a,
            p2 = r2 - b;
          if (p1 >= 0 && p2 >= 0) best = Math.max(best, dp[p1][p2]);
        }
        if (best === NEG) continue;
        nd[r1][r2] = best + grid[r1][c1] + (r1 !== r2 ? grid[r2][c2] : 0);
      }
    dp = nd;
  }
  return Math.max(0, dp[n - 1][n - 1]);
}
```

### Knapsack Family: 0/1, Unbounded, Bounded

```js
function knapsack01(w, v, W) {
  // iterate capacity DOWNWARD so each item is used once
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < w.length; i++)
    for (let c = W; c >= w[i]; c--)
      dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
  return dp[W];
}
function knapsackUnbounded(w, v, W) {
  // iterate capacity UPWARD so items can repeat
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < w.length; i++)
    for (let c = w[i]; c <= W; c++)
      dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
  return dp[W];
}
function knapsackBounded(w, v, cnt, W) {
  // binary splitting of counts -> 0/1 items
  const items = [];
  for (let i = 0; i < w.length; i++) {
    let k = cnt[i];
    for (let p = 1; k > 0; p <<= 1) {
      const take = Math.min(p, k);
      items.push([w[i] * take, v[i] * take]);
      k -= take;
    }
  }
  const dp = new Array(W + 1).fill(0);
  for (const [iw, iv] of items)
    for (let c = W; c >= iw; c--) dp[c] = Math.max(dp[c], dp[c - iw] + iv);
  return dp[W];
}
```

### Subset Sum, Equal Partition

```js
function subsetSumDP(a, target) {
  // can some subset sum to target? bitset-like with Uint8Array
  const dp = new Uint8Array(target + 1);
  dp[0] = 1;
  for (const x of a) for (let s = target; s >= x; s--) if (dp[s - x]) dp[s] = 1;
  return !!dp[target];
}
function equalPartition(a) {
  const total = a.reduce((s, x) => s + x, 0);
  return total % 2 === 0 && subsetSumDP(a, total / 2);
}
function countSubsetsWithSum(a, target, m = MOD) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (const x of a)
    for (let s = target; s >= x; s--) dp[s] = (dp[s] + dp[s - x]) % m;
  return dp[target];
}
```

### Coin Change (Minimum Coins and Number of Ways), Rod Cutting

```js
function minCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let s = 1; s <= amount; s++)
    for (const c of coins) if (c <= s) dp[s] = Math.min(dp[s], dp[s - c] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}
function coinWays(coins, amount, m = MOD) {
  // combinations (order does not matter): coins in OUTER loop
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins)
    for (let s = c; s <= amount; s++) dp[s] = (dp[s] + dp[s - c]) % m;
  return dp[amount];
}
function coinPermutations(coins, amount, m = MOD) {
  // order matters: amount in OUTER loop
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let s = 1; s <= amount; s++)
    for (const c of coins) if (c <= s) dp[s] = (dp[s] + dp[s - c]) % m;
  return dp[amount];
}
function rodCutting(price, n) {
  // price[i] = price of length i+1
  const dp = new Array(n + 1).fill(0);
  for (let len = 1; len <= n; len++)
    for (let c = 1; c <= len; c++)
      dp[len] = Math.max(dp[len], price[c - 1] + dp[len - c]);
  return dp[n];
}
```

### Longest Common Subsequence / Substring

```js
function lcs(a, b) {
  const n = a.length,
    m = b.length,
    dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[n][m];
}
function lcsString(a, b) {
  // reconstruct the subsequence
  const n = a.length,
    m = b.length,
    dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
  const res = [];
  let i = n,
    j = m;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      res.push(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
    else j--;
  }
  return res.reverse().join("");
}
function longestCommonSubstring(a, b) {
  // contiguous
  const n = a.length,
    m = b.length;
  let prev = new Array(m + 1).fill(0),
    best = 0;
  for (let i = 1; i <= n; i++) {
    const cur = new Array(m + 1).fill(0);
    for (let j = 1; j <= m; j++)
      if (a[i - 1] === b[j - 1]) {
        cur[j] = prev[j - 1] + 1;
        best = Math.max(best, cur[j]);
      }
    prev = cur;
  }
  return best;
}
```

### Longest Increasing / Decreasing Subsequence

```js
function lisLength(a) {
  // O(n log n): tails[k] = smallest tail of an increasing subseq of length k+1
  const tails = [];
  for (const x of a) {
    let lo = 0,
      hi = tails.length;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (tails[m] < x) lo = m + 1;
      else hi = m;
    } // strictly increasing
    tails[lo] = x;
  }
  return tails.length; // non-decreasing: use `tails[m] <= x`
}
const ldsLength = (a) => lisLength(a.map((x) => -x));
function lisReconstruct(a) {
  const tails = [],
    tailIdx = [],
    parent = new Array(a.length).fill(-1);
  for (let i = 0; i < a.length; i++) {
    let lo = 0,
      hi = tails.length;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (tails[m] < a[i]) lo = m + 1;
      else hi = m;
    }
    tails[lo] = a[i];
    tailIdx[lo] = i;
    parent[i] = lo ? tailIdx[lo - 1] : -1;
  }
  const res = [];
  let k = tailIdx[tails.length - 1];
  while (k !== -1 && k !== undefined) {
    res.push(a[k]);
    k = parent[k];
  }
  return res.reverse();
}
```

### Edit Distance

```js
function editDistance(a, b) {
  const n = a.length,
    m = b.length,
    dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[n][m];
}
```

### Longest Palindromic Subsequence / Substring

`longestPalSubsequence` and `longestPalSubstring` / `manacher` are in section 4.

### Matrix Chain Multiplication (Interval DP)

```js
function matrixChain(dims) {
  // dims length n+1 for n matrices
  const n = dims.length - 1,
    dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let len = 2; len <= n; len++)
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++)
        dp[i][j] = Math.min(
          dp[i][j],
          dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1],
        );
    }
  return dp[0][n - 1];
}
function burstBalloons(nums) {
  // classic interval DP
  const a = [1, ...nums, 1],
    n = a.length,
    dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let len = 2; len < n; len++)
    for (let l = 0; l + len < n; l++) {
      const r = l + len;
      for (let k = l + 1; k < r; k++)
        dp[l][r] = Math.max(dp[l][r], dp[l][k] + dp[k][r] + a[l] * a[k] * a[r]);
    }
  return dp[0][n - 1];
}
```

### Wildcard Matching, Regular Expression Matching

```js
function wildcardMatch(s, p) {
  // '?' = any char, '*' = any sequence
  const n = s.length,
    m = p.length,
    dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= m; j++) if (p[j - 1] === "*") dp[0][j] = dp[0][j - 1];
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++) {
      if (p[j - 1] === "*") dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      else if (p[j - 1] === "?" || p[j - 1] === s[i - 1])
        dp[i][j] = dp[i - 1][j - 1];
    }
  return dp[n][m];
}
function regexMatch(s, p) {
  // '.' any single char, 'x*' zero or more of x
  const n = s.length,
    m = p.length,
    dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));
  dp[0][0] = true;
  for (let j = 2; j <= m; j++) if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2];
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++) {
      if (p[j - 1] === "*")
        dp[i][j] =
          dp[i][j - 2] ||
          ((p[j - 2] === "." || p[j - 2] === s[i - 1]) && dp[i - 1][j]);
      else
        dp[i][j] =
          (p[j - 1] === "." || p[j - 1] === s[i - 1]) && dp[i - 1][j - 1];
    }
  return dp[n][m];
}
```

### Distinct Subsequences, Word Break, Palindrome Partitioning (min cuts)

```js
function distinctSubsequences(s, t) {
  // how many times t appears as a subsequence of s
  const dp = new Array(t.length + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < s.length; i++)
    for (let j = t.length; j >= 1; j--)
      if (s[i] === t[j - 1]) dp[j] += dp[j - 1];
  return dp[t.length];
}
function wordBreak(s, dict) {
  const set = new Set(dict),
    dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
  return dp[s.length];
}
function minPalindromeCuts(s) {
  const n = s.length,
    pal = Array.from({ length: n }, () => new Array(n).fill(false)),
    cut = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    cut[i] = i;
    for (let j = 0; j <= i; j++) {
      if (s[j] === s[i] && (i - j < 2 || pal[j + 1][i - 1])) {
        pal[j][i] = true;
        cut[i] = j === 0 ? 0 : Math.min(cut[i], cut[j - 1] + 1);
      }
    }
  }
  return cut[n - 1];
}
```

### Interval DP, Partition DP

```js
function minCostToMergeStones2(a) {
  // merge adjacent piles (2 at a time), cost = sum. O(n^3) interval DP
  const n = a.length,
    pre = buildPrefix(a),
    dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let len = 2; len <= n; len++)
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++)
        dp[i][j] = Math.min(
          dp[i][j],
          dp[i][k] + dp[k + 1][j] + pre[j + 1] - pre[i],
        );
    }
  return dp[0][n - 1];
}
function partitionIntoKGroups(a, K) {
  // minimize the max group sum, groups are contiguous (partition DP)
  const n = a.length,
    pre = buildPrefix(a),
    INF = Infinity;
  const dp = Array.from({ length: K + 1 }, () => new Array(n + 1).fill(INF));
  dp[0][0] = 0;
  for (let k = 1; k <= K; k++)
    for (let i = 1; i <= n; i++)
      for (let j = 0; j < i; j++)
        dp[k][i] = Math.min(dp[k][i], Math.max(dp[k - 1][j], pre[i] - pre[j]));
  return dp[K][n];
}
```

### Tree DP, DP on Trees

State per node, combine children. Use an iterative order to avoid deep recursion: build BFS order, process in reverse.

```js
function treeOrder(n, adj, root = 0) {
  // BFS order + parent array
  const parent = new Array(n).fill(-1),
    order = [root],
    seen = new Array(n).fill(false);
  seen[root] = true;
  for (let h = 0; h < order.length; h++) {
    const u = order[h];
    for (const v of adj[u])
      if (!seen[v]) {
        seen[v] = true;
        parent[v] = u;
        order.push(v);
      }
  }
  return { order, parent };
}
function maxIndependentSetTree(n, adj) {
  // dp[u][0] = best without u, dp[u][1] = best with u
  const { order, parent } = treeOrder(n, adj),
    dp0 = new Array(n).fill(0),
    dp1 = new Array(n).fill(1);
  for (let i = n - 1; i >= 0; i--) {
    const u = order[i],
      p = parent[u];
    if (p !== -1) {
      dp0[p] += Math.max(dp0[u], dp1[u]);
      dp1[p] += dp0[u];
    }
  }
  return Math.max(dp0[0], dp1[0]);
}
function treeDiameter(n, adj) {
  // longest path (edges) via subtree depths
  const { order, parent } = treeOrder(n, adj),
    down = new Array(n).fill(0);
  let best = 0;
  for (let i = n - 1; i >= 0; i--) {
    const u = order[i],
      p = parent[u];
    if (p !== -1) {
      best = Math.max(best, down[p] + down[u] + 1);
      down[p] = Math.max(down[p], down[u] + 1);
    }
  }
  return best;
}
function subtreeSizes(n, adj) {
  const { order, parent } = treeOrder(n, adj),
    sz = new Array(n).fill(1);
  for (let i = n - 1; i > 0; i--) sz[parent[order[i]]] += sz[order[i]];
  return sz;
}
```

### Graph DP, DP on DAGs

```js
function longestPathDAG(n, edges) {
  // edges: [u, v, w]; DP in topological order
  const adj = Array.from({ length: n }, () => []),
    indeg = new Array(n).fill(0);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    indeg[v]++;
  }
  const q = [],
    dp = new Array(n).fill(0);
  for (let i = 0; i < n; i++) if (!indeg[i]) q.push(i);
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    for (const [v, w] of adj[u]) {
      dp[v] = Math.max(dp[v], dp[u] + w);
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return Math.max(...dp);
}
function countPathsDAG(n, edges, s, t, m = MOD) {
  const adj = Array.from({ length: n }, () => []),
    indeg = new Array(n).fill(0);
  for (const [u, v] of edges) {
    adj[u].push(v);
    indeg[v]++;
  }
  const q = [],
    ways = new Array(n).fill(0);
  ways[s] = 1;
  for (let i = 0; i < n; i++) if (!indeg[i]) q.push(i);
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    for (const v of adj[u]) {
      ways[v] = (ways[v] + ways[u]) % m;
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return ways[t];
}
```

### Bitmask DP, Profile DP, SOS DP

Bitmask DP and Profile DP: full code in section 30. SOS DP: section 26.

### Digit DP

Count numbers in `[0, N]` with some digit property. State: `(position, property-state, tight)`.

```js
function countDigitSum(N, S) {
  // numbers in [0, N] whose digit sum is exactly S
  const d = String(N).split("").map(Number),
    n = d.length;
  const memo = Array.from({ length: n + 1 }, () => new Array(S + 1).fill(-1));
  function go(pos, sum, tight) {
    if (sum > S) return 0;
    if (pos === n) return sum === S ? 1 : 0;
    if (!tight && memo[pos][sum] !== -1) return memo[pos][sum];
    let res = 0;
    const lim = tight ? d[pos] : 9;
    for (let x = 0; x <= lim; x++)
      res += go(pos + 1, sum + x, tight && x === lim);
    if (!tight) memo[pos][sum] = res;
    return res;
  }
  return go(0, 0, true); // for [L, R]: f(R) - f(L-1)
}
```

### DP on Subsequences, DP on Strings

```js
function countDistinctSubsequences(s) {
  // number of distinct non-empty subsequences
  const last = new Map();
  let total = 1; // total includes the empty subsequence
  for (let i = 0; i < s.length; i++) {
    const prev = total;
    total = (2 * total) % MOD;
    if (last.has(s[i])) total = (total - last.get(s[i]) + MOD) % MOD;
    last.set(s[i], prev);
  }
  return (total - 1 + MOD) % MOD;
}
function shortestCommonSupersequenceLen(a, b) {
  return a.length + b.length - lcs(a, b);
}
function minInsertionsToPalindrome(s) {
  return s.length - longestPalSubsequence(s);
}
```

### Probability DP, Expected Value DP

```js
function diceSumProbability(n, target) {
  // probability that n fair dice sum to target
  let dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    const nd = new Array(target + 1).fill(0);
    for (let s = 0; s <= target; s++)
      if (dp[s])
        for (let f = 1; f <= 6 && s + f <= target; f++) nd[s + f] += dp[s] / 6;
    dp = nd;
  }
  return dp[target];
}
function couponCollectorExpected(n) {
  // E[k] = expected steps from k collected: E[k] = 1 + (k/n)E[k] + ((n-k)/n)E[k+1]
  let e = 0;
  for (let k = n - 1; k >= 0; k--) e += n / (n - k);
  return e; // = n * H(n)
}
// Expected value DP in modular form: dp[state] = sum(prob * (cost + dp[next])), probabilities as p * inverse(q) mod M.
```

### Convex Hull Trick

Speeds up `dp[i] = min over j<i of (dp[j] + m[j] * x[i])`-type transitions to O(n) when slopes are sorted and queries are monotone.

```js
class CHT {
  // minimum query; slopes added in DECREASING order; x queries INCREASING
  constructor() {
    this.M = [];
    this.B = [];
    this.h = 0;
  }
  bad(l1, l2, l3) {
    return (
      (this.B[l3] - this.B[l1]) * (this.M[l1] - this.M[l2]) <=
      (this.B[l2] - this.B[l1]) * (this.M[l1] - this.M[l3])
    );
  }
  add(m, b) {
    // (use BigInt if m*b products exceed 2^53)
    const M = this.M,
      B = this.B;
    M.push(m);
    B.push(b);
    while (M.length - this.h >= 3) {
      const k = M.length;
      if (this.bad(k - 3, k - 2, k - 1)) {
        M.splice(k - 2, 1);
        B.splice(k - 2, 1);
      } else break;
    }
  }
  val(i, x) {
    return this.M[i] * x + this.B[i];
  }
  query(x) {
    while (
      this.h + 1 < this.M.length &&
      this.val(this.h + 1, x) <= this.val(this.h, x)
    )
      this.h++;
    return this.val(this.h, x);
  }
}
// For arbitrary slopes / queries: Li Chao tree (section 29).
```

### Divide and Conquer DP Optimization

`dp[k][i] = min over j<i of dp[k-1][j] + cost(j, i)` when `opt(i)` is monotone. O(K n log n).

```js
function dcOptimization(n, K, cost) {
  // cost(j, i) = cost of group (j, i]; returns dp[K][n]
  let prev = new Array(n + 1).fill(Infinity);
  prev[0] = 0;
  for (let k = 1; k <= K; k++) {
    const cur = new Array(n + 1).fill(Infinity);
    (function compute(l, r, optL, optR) {
      if (l > r) return;
      const mid = (l + r) >> 1;
      let best = Infinity,
        bestJ = optL;
      for (let j = optL; j <= Math.min(mid - 1, optR); j++) {
        const v = prev[j] + cost(j, mid);
        if (v < best) {
          best = v;
          bestJ = j;
        }
      }
      cur[mid] = best;
      compute(l, mid - 1, optL, bestJ);
      compute(mid + 1, r, bestJ, optR);
    })(1, n, 0, n - 1);
    prev = cur;
  }
  return prev[n];
}
// Example cost: split array into K groups minimizing sum of (group sum)^2
//   const pre = buildPrefix(a);  cost = (j, i) => (pre[i] - pre[j]) ** 2;
```

### Knuth Optimization

For `dp[l][r] = min over k of dp[l][k] + dp[k+1][r] + cost(l, r)` when `opt[l][r-1] <= opt[l][r] <= opt[l+1][r]`. O(n^2).

```js
function knuthOptimization(a) {
  // optimal merge of adjacent piles (cost = merged size)
  const n = a.length,
    pre = buildPrefix(a);
  const dp = Array.from({ length: n }, () => new Array(n).fill(0)),
    opt = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) opt[i][i] = i;
  for (let len = 2; len <= n; len++)
    for (let l = 0; l + len - 1 < n; l++) {
      const r = l + len - 1;
      dp[l][r] = Infinity;
      for (let k = opt[l][r - 1]; k <= Math.min(r - 1, opt[l + 1][r]); k++) {
        const v = dp[l][k] + dp[k + 1][r] + pre[r + 1] - pre[l];
        if (v < dp[l][r]) {
          dp[l][r] = v;
          opt[l][r] = k;
        }
      }
    }
  return dp[0][n - 1];
}
```

---

# 18. Binary Trees

### Tree Fundamentals

- **Root**: top node. **Parent / Child**: direct up / down neighbor. **Leaf**: no children. **Siblings**: same parent. **Subtree**: node plus all descendants.
- **Depth** of a node = edges from root. **Height** of a node = edges to deepest leaf. **Level** = depth + 1. **Diameter** = longest path between any two nodes.
- **Full**: every node has 0 or 2 children. **Complete**: all levels full except possibly the last, filled left to right. **Perfect**: all internal nodes have 2 children, all leaves at same level. **Balanced**: heights of subtrees differ by at most 1. **Degenerate / Skewed**: each node has one child (like a linked list).

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
function buildTree(arr) {
  // level-order input with null for missing: [1,2,3,null,4]
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]),
    q = [root];
  let i = 1,
    h = 0;
  while (h < q.length && i < arr.length) {
    const node = q[h++];
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      q.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      q.push(node.right);
    }
    i++;
  }
  return root;
}
```

### Traversals: Inorder, Preorder, Postorder (Recursive and Iterative), Level Order

```js
function inorder(root, out = []) {
  if (root) {
    inorder(root.left, out);
    out.push(root.val);
    inorder(root.right, out);
  }
  return out;
}
function preorder(root, out = []) {
  if (root) {
    out.push(root.val);
    preorder(root.left, out);
    preorder(root.right, out);
  }
  return out;
}
function postorder(root, out = []) {
  if (root) {
    postorder(root.left, out);
    postorder(root.right, out);
    out.push(root.val);
  }
  return out;
}

function inorderIter(root) {
  const res = [],
    st = [];
  let cur = root;
  while (cur || st.length) {
    while (cur) {
      st.push(cur);
      cur = cur.left;
    }
    cur = st.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}
function preorderIter(root) {
  if (!root) return [];
  const res = [],
    st = [root];
  while (st.length) {
    const n = st.pop();
    res.push(n.val);
    if (n.right) st.push(n.right);
    if (n.left) st.push(n.left);
  }
  return res;
}
function postorderIter(root) {
  // reverse of (root, right, left)
  if (!root) return [];
  const res = [],
    st = [root];
  while (st.length) {
    const n = st.pop();
    res.push(n.val);
    if (n.left) st.push(n.left);
    if (n.right) st.push(n.right);
  }
  return res.reverse();
}
function levelOrder(root) {
  if (!root) return [];
  const res = [],
    q = [root];
  let h = 0;
  while (h < q.length) {
    const size = q.length - h,
      level = [];
    for (let i = 0; i < size; i++) {
      const n = q[h++];
      level.push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
    res.push(level);
  }
  return res;
}
```

### Zigzag, Boundary, Vertical Order

```js
function zigzag(root) {
  return levelOrder(root).map((lvl, i) => (i % 2 ? lvl.reverse() : lvl));
}
function boundaryTraversal(root) {
  if (!root) return [];
  const isLeaf = (n) => !n.left && !n.right,
    res = isLeaf(root) ? [] : [root.val];
  for (let c = root.left; c; c = c.left || c.right)
    if (!isLeaf(c)) res.push(c.val);
  (function leaves(n) {
    if (!n) return;
    if (isLeaf(n)) res.push(n.val);
    leaves(n.left);
    leaves(n.right);
  })(root);
  const right = [];
  for (let c = root.right; c; c = c.right || c.left)
    if (!isLeaf(c)) right.push(c.val);
  return res.concat(right.reverse());
}
function verticalOrder(root) {
  // columns left to right; within a column top to bottom, ties by value
  if (!root) return [];
  const cols = new Map(),
    q = [[root, 0, 0]];
  let h = 0;
  while (h < q.length) {
    const [n, c, r] = q[h++];
    if (!cols.has(c)) cols.set(c, []);
    cols.get(c).push([r, n.val]);
    if (n.left) q.push([n.left, c - 1, r + 1]);
    if (n.right) q.push([n.right, c + 1, r + 1]);
  }
  return [...cols.keys()]
    .sort((a, b) => a - b)
    .map((c) =>
      cols
        .get(c)
        .sort((x, y) => x[0] - y[0] || x[1] - y[1])
        .map((e) => e[1]),
    );
}
```

### Top, Bottom, Left, Right Views

```js
function topView(root) {
  if (!root) return [];
  const seen = new Map(),
    q = [[root, 0]];
  let h = 0;
  while (h < q.length) {
    const [n, c] = q[h++];
    if (!seen.has(c)) seen.set(c, n.val);
    if (n.left) q.push([n.left, c - 1]);
    if (n.right) q.push([n.right, c + 1]);
  }
  return [...seen.keys()].sort((a, b) => a - b).map((c) => seen.get(c));
}
function bottomView(root) {
  if (!root) return [];
  const seen = new Map(),
    q = [[root, 0]];
  let h = 0;
  while (h < q.length) {
    const [n, c] = q[h++];
    seen.set(c, n.val);
    if (n.left) q.push([n.left, c - 1]);
    if (n.right) q.push([n.right, c + 1]);
  }
  return [...seen.keys()].sort((a, b) => a - b).map((c) => seen.get(c));
}
const rightView = (root) => levelOrder(root).map((l) => l[l.length - 1]);
const leftView = (root) => levelOrder(root).map((l) => l[0]);
```

### Height, Diameter, Maximum Width, Count Nodes, Sum, Max Path Sum

```js
function height(root) {
  return root ? 1 + Math.max(height(root.left), height(root.right)) : 0;
} // nodes count; edges = this - 1
function diameter(root) {
  // in edges
  let best = 0;
  (function h(n) {
    if (!n) return 0;
    const l = h(n.left),
      r = h(n.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  })(root);
  return best;
}
function maxWidth(root) {
  // widest level counting null gaps (index trick)
  if (!root) return 0;
  let q = [[root, 0n]],
    best = 0n;
  while (q.length) {
    best =
      best > q[q.length - 1][1] - q[0][1] + 1n
        ? best
        : q[q.length - 1][1] - q[0][1] + 1n;
    const base = q[0][1],
      nq = [];
    for (const [n, i] of q) {
      const k = i - base;
      if (n.left) nq.push([n.left, 2n * k]);
      if (n.right) nq.push([n.right, 2n * k + 1n]);
    }
    q = nq;
  }
  return Number(best);
}
const countNodes = (root) =>
  root ? 1 + countNodes(root.left) + countNodes(root.right) : 0;
const sumNodes = (root) =>
  root ? root.val + sumNodes(root.left) + sumNodes(root.right) : 0;
function maxPathSum(root) {
  // any node to any node
  let best = -Infinity;
  (function g(n) {
    if (!n) return 0;
    const l = Math.max(0, g(n.left)),
      r = Math.max(0, g(n.right));
    best = Math.max(best, n.val + l + r);
    return n.val + Math.max(l, r);
  })(root);
  return best;
}
function rootToLeafPaths(root) {
  const res = [],
    path = [];
  (function go(n) {
    if (!n) return;
    path.push(n.val);
    if (!n.left && !n.right) res.push(path.join("->"));
    go(n.left);
    go(n.right);
    path.pop();
  })(root);
  return res;
}
```

### Lowest Common Ancestor, Balanced, Symmetric

```js
function lca(root, p, q) {
  // p, q are values present in the tree
  if (!root || root.val === p || root.val === q) return root;
  const l = lca(root.left, p, q),
    r = lca(root.right, p, q);
  return l && r ? root : l || r;
}
function isBalanced(root) {
  function h(n) {
    if (!n) return 0;
    const l = h(n.left),
      r = h(n.right);
    if (l < 0 || r < 0 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  }
  return h(root) >= 0;
}
function isSymmetric(root) {
  const mirror = (a, b) =>
    (!a && !b) ||
    (a &&
      b &&
      a.val === b.val &&
      mirror(a.left, b.right) &&
      mirror(a.right, b.left));
  return !root || mirror(root.left, root.right);
}
```

### Serialize / Deserialize, Construct From Traversals

```js
function serialize(root) {
  const out = [],
    q = root ? [root] : [];
  let h = 0;
  while (h < q.length) {
    const n = q[h++];
    if (!n) {
      out.push("#");
      continue;
    }
    out.push(n.val);
    q.push(n.left);
    q.push(n.right);
  }
  return out.join(",");
}
function deserialize(s) {
  if (!s) return null;
  const t = s.split(","),
    root = new TreeNode(Number(t[0])),
    q = [root];
  let i = 1,
    h = 0;
  while (h < q.length && i < t.length) {
    const n = q[h++];
    if (t[i] !== "#") {
      n.left = new TreeNode(Number(t[i]));
      q.push(n.left);
    }
    i++;
    if (i < t.length && t[i] !== "#") {
      n.right = new TreeNode(Number(t[i]));
      q.push(n.right);
    }
    i++;
  }
  return root;
}
function buildFromPreIn(pre, ino) {
  // distinct values
  const pos = new Map(ino.map((v, i) => [v, i]));
  let pi = 0;
  function go(l, r) {
    if (l > r) return null;
    const node = new TreeNode(pre[pi++]),
      m = pos.get(node.val);
    node.left = go(l, m - 1);
    node.right = go(m + 1, r);
    return node;
  }
  return go(0, ino.length - 1);
}
function buildFromPostIn(post, ino) {
  const pos = new Map(ino.map((v, i) => [v, i]));
  let pi = post.length - 1;
  function go(l, r) {
    if (l > r) return null;
    const node = new TreeNode(post[pi--]),
      m = pos.get(node.val);
    node.right = go(m + 1, r);
    node.left = go(l, m - 1);
    return node;
  }
  return go(0, ino.length - 1);
}
```

### Morris Traversal (O(1) extra space)

```js
function morrisInorder(root) {
  const res = [];
  let cur = root;
  while (cur) {
    if (!cur.left) {
      res.push(cur.val);
      cur = cur.right;
    } else {
      let pred = cur.left;
      while (pred.right && pred.right !== cur) pred = pred.right;
      if (!pred.right) {
        pred.right = cur;
        cur = cur.left;
      } // thread
      else {
        pred.right = null;
        res.push(cur.val);
        cur = cur.right;
      } // remove thread
    }
  }
  return res;
}
```

---

# 19. Binary Search Trees

BST property: left subtree < node < right subtree. Inorder traversal is sorted. Operations are O(h): O(log n) when balanced, O(n) when skewed.

### Search, Insertion, Deletion, Min, Max

```js
function bstSearch(root, x) {
  while (root && root.val !== x) root = x < root.val ? root.left : root.right;
  return root;
}
function bstInsert(root, x) {
  if (!root) return new TreeNode(x);
  if (x < root.val) root.left = bstInsert(root.left, x);
  else root.right = bstInsert(root.right, x);
  return root;
}
const bstMin = (root) => {
  while (root.left) root = root.left;
  return root;
};
const bstMax = (root) => {
  while (root.right) root = root.right;
  return root;
};
function bstDelete(root, x) {
  if (!root) return null;
  if (x < root.val) root.left = bstDelete(root.left, x);
  else if (x > root.val) root.right = bstDelete(root.right, x);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const s = bstMin(root.right); // inorder successor replaces the node
    root.val = s.val;
    root.right = bstDelete(root.right, s.val);
  }
  return root;
}
```

### Inorder Successor / Predecessor, Floor, Ceiling

```js
function inorderSuccessor(root, x) {
  let succ = null;
  while (root) {
    if (x < root.val) {
      succ = root;
      root = root.left;
    } else root = root.right;
  }
  return succ;
}
function inorderPredecessor(root, x) {
  let pred = null;
  while (root) {
    if (x > root.val) {
      pred = root;
      root = root.right;
    } else root = root.left;
  }
  return pred;
}
function bstFloor(root, x) {
  // largest value <= x
  let res = null;
  while (root) {
    if (root.val === x) return root;
    if (root.val < x) {
      res = root;
      root = root.right;
    } else root = root.left;
  }
  return res;
}
function bstCeil(root, x) {
  // smallest value >= x
  let res = null;
  while (root) {
    if (root.val === x) return root;
    if (root.val > x) {
      res = root;
      root = root.left;
    } else root = root.right;
  }
  return res;
}
```

### Validate BST, LCA in BST, Kth Smallest / Largest, Range Sum

```js
function isValidBST(root, lo = -Infinity, hi = Infinity) {
  if (!root) return true;
  if (root.val <= lo || root.val >= hi) return false;
  return (
    isValidBST(root.left, lo, root.val) && isValidBST(root.right, root.val, hi)
  );
}
function lcaBST(root, p, q) {
  while (root) {
    if (p < root.val && q < root.val) root = root.left;
    else if (p > root.val && q > root.val) root = root.right;
    else return root;
  }
  return null;
}
function kthSmallestBST(root, k) {
  const st = [];
  let cur = root;
  while (cur || st.length) {
    while (cur) {
      st.push(cur);
      cur = cur.left;
    }
    cur = st.pop();
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
}
function kthLargestBST(root, k) {
  // reverse inorder
  const st = [];
  let cur = root;
  while (cur || st.length) {
    while (cur) {
      st.push(cur);
      cur = cur.right;
    }
    cur = st.pop();
    if (--k === 0) return cur.val;
    cur = cur.left;
  }
}
function rangeSumBST(root, lo, hi) {
  if (!root) return 0;
  if (root.val < lo) return rangeSumBST(root.right, lo, hi);
  if (root.val > hi) return rangeSumBST(root.left, lo, hi);
  return (
    root.val + rangeSumBST(root.left, lo, hi) + rangeSumBST(root.right, lo, hi)
  );
}
```

### BST Iterator, Sorted Array to BST, Recover BST

```js
class BSTIterator {
  constructor(root) {
    this.st = [];
    this._left(root);
  }
  _left(n) {
    while (n) {
      this.st.push(n);
      n = n.left;
    }
  }
  next() {
    const n = this.st.pop();
    this._left(n.right);
    return n.val;
  }
  hasNext() {
    return this.st.length > 0;
  }
}
function sortedArrayToBST(a, l = 0, r = a.length - 1) {
  if (l > r) return null;
  const m = (l + r) >> 1;
  return new TreeNode(
    a[m],
    sortedArrayToBST(a, l, m - 1),
    sortedArrayToBST(a, m + 1, r),
  );
}
function recoverBST(root) {
  // two nodes swapped: find inversions in inorder
  let first = null,
    second = null,
    prev = null;
  (function go(n) {
    if (!n) return;
    go(n.left);
    if (prev && prev.val > n.val) {
      if (!first) first = prev;
      second = n;
    }
    prev = n;
    go(n.right);
  })(root);
  [first.val, second.val] = [second.val, first.val];
}
```

### Balanced BST: AVL Tree and Rotations

Balance factor = height(left) - height(right) must stay in {-1, 0, 1}. Four cases: LL (right rotate), RR (left rotate), LR (left then right), RL (right then left).

```js
class AVLNode {
  constructor(k) {
    this.key = k;
    this.left = null;
    this.right = null;
    this.h = 1;
  }
}
const hgt = (n) => (n ? n.h : 0);
const upd = (n) => {
  n.h = 1 + Math.max(hgt(n.left), hgt(n.right));
};
function rotateRightAVL(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  upd(y);
  upd(x);
  return x;
}
function rotateLeftAVL(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  upd(x);
  upd(y);
  return y;
}
function avlInsert(n, key) {
  if (!n) return new AVLNode(key);
  if (key < n.key) n.left = avlInsert(n.left, key);
  else if (key > n.key) n.right = avlInsert(n.right, key);
  else return n;
  upd(n);
  const bal = hgt(n.left) - hgt(n.right);
  if (bal > 1) {
    if (key > n.left.key) n.left = rotateLeftAVL(n.left);
    return rotateRightAVL(n);
  } // LL or LR
  if (bal < -1) {
    if (key < n.right.key) n.right = rotateRightAVL(n.right);
    return rotateLeftAVL(n);
  } // RR or RL
  return n;
}
```

### Red-Black Tree

Rules: root black; red nodes have black children; every root-to-null path has the same number of black nodes. Compact **left-leaning** variant (insertion only):

```js
class RBNode {
  constructor(k, red = true) {
    this.key = k;
    this.left = null;
    this.right = null;
    this.red = red;
  }
}
const isRed = (n) => !!n && n.red;
function rbRotL(h) {
  const x = h.right;
  h.right = x.left;
  x.left = h;
  x.red = h.red;
  h.red = true;
  return x;
}
function rbRotR(h) {
  const x = h.left;
  h.left = x.right;
  x.right = h;
  x.red = h.red;
  h.red = true;
  return x;
}
function rbFlip(h) {
  h.red = !h.red;
  h.left.red = !h.left.red;
  h.right.red = !h.right.red;
}
function rbInsert(h, key) {
  if (!h) return new RBNode(key);
  if (key < h.key) h.left = rbInsert(h.left, key);
  else if (key > h.key) h.right = rbInsert(h.right, key);
  if (isRed(h.right) && !isRed(h.left)) h = rbRotL(h);
  if (isRed(h.left) && isRed(h.left.left)) h = rbRotR(h);
  if (isRed(h.left) && isRed(h.right)) rbFlip(h);
  return h;
}
// usage: root = rbInsert(root, k); root.red = false;
```

### Treap (randomized balanced BST with split / merge)

```js
class TreapNode {
  constructor(k) {
    this.key = k;
    this.pri = Math.random();
    this.left = null;
    this.right = null;
    this.size = 1;
  }
}
const tsz = (n) => (n ? n.size : 0);
const tupd = (n) => {
  n.size = 1 + tsz(n.left) + tsz(n.right);
};
function split(n, key) {
  // returns [keys < key, keys >= key]
  if (!n) return [null, null];
  if (n.key < key) {
    const [a, b] = split(n.right, key);
    n.right = a;
    tupd(n);
    return [n, b];
  }
  const [a, b] = split(n.left, key);
  n.left = b;
  tupd(n);
  return [a, n];
}
function merge(a, b) {
  // all keys of a < keys of b
  if (!a || !b) return a || b;
  if (a.pri > b.pri) {
    a.right = merge(a.right, b);
    tupd(a);
    return a;
  }
  b.left = merge(a, b.left);
  tupd(b);
  return b;
}
function treapInsert(root, key) {
  const [a, b] = split(root, key);
  return merge(merge(a, new TreapNode(key)), b);
}
function treapErase(root, key) {
  const [a, b] = split(root, key),
    [, c] = split(b, key + 1);
  return merge(a, c);
}
function treapKth(n, k) {
  // 1-indexed k-th smallest
  while (n) {
    const l = tsz(n.left);
    if (k <= l) n = n.left;
    else if (k === l + 1) return n.key;
    else {
      k -= l + 1;
      n = n.right;
    }
  }
}
```

### Splay Tree

Every access rotates the accessed node to the root: amortized O(log n).

```js
class SplayNode {
  constructor(k) {
    this.key = k;
    this.left = null;
    this.right = null;
  }
}
function sRotR(x) {
  const y = x.left;
  x.left = y.right;
  y.right = x;
  return y;
}
function sRotL(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  return y;
}
function splay(root, key) {
  if (!root || root.key === key) return root;
  if (key < root.key) {
    if (!root.left) return root;
    if (key < root.left.key) {
      root.left.left = splay(root.left.left, key);
      root = sRotR(root);
    } else if (key > root.left.key) {
      root.left.right = splay(root.left.right, key);
      if (root.left.right) root.left = sRotL(root.left);
    }
    return root.left ? sRotR(root) : root;
  }
  if (!root.right) return root;
  if (key > root.right.key) {
    root.right.right = splay(root.right.right, key);
    root = sRotL(root);
  } else if (key < root.right.key) {
    root.right.left = splay(root.right.left, key);
    if (root.right.left) root.right = sRotR(root.right);
  }
  return root.right ? sRotL(root) : root;
}
function splayInsert(root, key) {
  if (!root) return new SplayNode(key);
  root = splay(root, key);
  if (root.key === key) return root;
  const n = new SplayNode(key);
  if (key < root.key) {
    n.right = root;
    n.left = root.left;
    root.left = null;
  } else {
    n.left = root;
    n.right = root.right;
    root.right = null;
  }
  return n;
}
```

---

# 20. Heaps and Priority Queues

A heap is a complete binary tree stored in an array where each parent is <= (min-heap) or >= (max-heap) its children. Index math: parent `(i-1)>>1`, children `2i+1`, `2i+2`. Push / pop O(log n), peek O(1), build O(n).

JS has no built-in heap: use the `PriorityQueue` class from the Toolbox (section 0.4). Heap operations explained:

- **Insertion + heapify up**: push to the end, swap with parent while smaller.
- **Deletion + heapify down**: move last element to the root, swap with smaller child while larger.

```js
// Tiny standalone min-heap showing every operation separately
class MinHeap {
  constructor() {
    this.a = [];
  }
  heapifyUp(i) {
    const a = this.a;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p] <= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  heapifyDown(i) {
    const a = this.a,
      n = a.length;
    while (true) {
      let m = i;
      const l = 2 * i + 1,
        r = l + 1;
      if (l < n && a[l] < a[m]) m = l;
      if (r < n && a[r] < a[m]) m = r;
      if (m === i) break;
      [a[m], a[i]] = [a[i], a[m]];
      i = m;
    }
  }
  insert(x) {
    this.a.push(x);
    this.heapifyUp(this.a.length - 1);
  }
  extractMin() {
    const top = this.a[0],
      last = this.a.pop();
    if (this.a.length) {
      this.a[0] = last;
      this.heapifyDown(0);
    }
    return top;
  }
  static build(arr) {
    const h = new MinHeap();
    h.a = arr.slice();
    for (let i = (arr.length >> 1) - 1; i >= 0; i--) h.heapifyDown(i);
    return h;
  } // O(n)
}
// Heap sort: section 9. Max-heap: PriorityQueue((a, b) => b - a).
```

### Kth Largest / Smallest Element

```js
function kthLargestHeap(a, k) {
  // min-heap of size k, O(n log k)
  const pq = new PriorityQueue();
  for (const x of a) {
    pq.push(x);
    if (pq.size() > k) pq.pop();
  }
  return pq.peek();
}
function kthSmallestHeap(a, k) {
  const pq = new PriorityQueue((x, y) => y - x);
  for (const x of a) {
    pq.push(x);
    if (pq.size() > k) pq.pop();
  }
  return pq.peek();
}
```

### Top K Frequent Elements / Words, K Closest Points

```js
function topKFrequent(a, k) {
  const f = new Map();
  for (const x of a) f.set(x, (f.get(x) || 0) + 1);
  const pq = new PriorityQueue((x, y) => x[1] - y[1]);
  for (const e of f) {
    pq.push(e);
    if (pq.size() > k) pq.pop();
  }
  const res = [];
  while (pq.size()) res.push(pq.pop()[0]);
  return res.reverse();
}
function topKFrequentWords(words, k) {
  // ties: lexicographically smaller first
  const f = new Map();
  for (const w of words) f.set(w, (f.get(w) || 0) + 1);
  return [...f.keys()]
    .sort((a, b) => f.get(b) - f.get(a) || (a < b ? -1 : 1))
    .slice(0, k);
}
function kClosestPoints(pts, k) {
  const pq = new PriorityQueue((a, b) => b[0] - a[0]); // max-heap on distance
  for (const [x, y] of pts) {
    pq.push([x * x + y * y, x, y]);
    if (pq.size() > k) pq.pop();
  }
  return pq.h.map(([, x, y]) => [x, y]);
}
```

### Merge K Sorted Arrays / Linked Lists, Smallest Range Covering K Lists

```js
function mergeKSortedArrays(arrs) {
  return kWayMerge(arrs);
} // kWayMerge in section 9
function mergeKLists(lists) {
  const pq = new PriorityQueue((a, b) => a.val - b.val);
  for (const l of lists) if (l) pq.push(l);
  const dummy = new ListNode(0);
  let t = dummy;
  while (pq.size()) {
    const n = pq.pop();
    t.next = n;
    t = n;
    if (n.next) pq.push(n.next);
  }
  return dummy.next;
}
function smallestRange(lists) {
  // smallest range containing >= 1 element of each list
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);
  let curMax = -Infinity;
  lists.forEach((l, i) => {
    pq.push([l[0], i, 0]);
    curMax = Math.max(curMax, l[0]);
  });
  let best = [pq.peek()[0], curMax];
  while (true) {
    const [v, li, ix] = pq.pop();
    if (ix + 1 === lists[li].length) break;
    const nv = lists[li][ix + 1];
    pq.push([nv, li, ix + 1]);
    curMax = Math.max(curMax, nv);
    if (curMax - pq.peek()[0] < best[1] - best[0])
      best = [pq.peek()[0], curMax];
  }
  return best;
}
```

### Median From Data Stream, Running Median (Two Heaps Pattern)

```js
class MedianFinder {
  constructor() {
    this.lo = new PriorityQueue((a, b) => b - a);
    this.hi = new PriorityQueue();
  } // lo = max-heap (lower half)
  add(x) {
    if (!this.lo.size() || x <= this.lo.peek()) this.lo.push(x);
    else this.hi.push(x);
    if (this.lo.size() > this.hi.size() + 1) this.hi.push(this.lo.pop());
    else if (this.hi.size() > this.lo.size()) this.lo.push(this.hi.pop());
  }
  median() {
    return this.lo.size() > this.hi.size()
      ? this.lo.peek()
      : (this.lo.peek() + this.hi.peek()) / 2;
  }
}
```

### Task Scheduling, Minimum Cost to Connect Ropes

`minCostConnectRopes` is in section 15.

```js
function leastInterval(tasks, cooldown) {
  // CPU scheduling with cooldown, greedy formula
  const f = new Array(26).fill(0);
  for (const t of tasks) f[t.charCodeAt(0) - 65]++;
  const mx = Math.max(...f),
    cntMax = f.filter((x) => x === mx).length;
  return Math.max(tasks.length, (mx - 1) * (cooldown + 1) + cntMax);
}
function minRoomsScheduling(iv) {
  // heap of end times
  iv = iv.slice().sort((a, b) => a[0] - b[0]);
  const pq = new PriorityQueue();
  for (const [s, e] of iv) {
    if (pq.size() && pq.peek() <= s) pq.pop();
    pq.push(e);
  }
  return pq.size();
}
```

### Lazy Deletion in Heaps

Heaps cannot delete arbitrary items quickly. Instead, mark items as removed and skip them when they reach the top.

```js
class LazyHeap {
  constructor() {
    this.pq = new PriorityQueue((a, b) => a[0] - b[0]);
    this.removed = new Map();
  }
  push(x, id) {
    this.pq.push([x, id]);
  }
  remove(id) {
    this.removed.set(id, true);
  }
  _clean() {
    while (this.pq.size() && this.removed.get(this.pq.peek()[1])) this.pq.pop();
  }
  peek() {
    this._clean();
    return this.pq.peek();
  }
  pop() {
    this._clean();
    return this.pq.pop();
  }
}
// Same idea in Dijkstra: ignore a popped entry if d > dist[u] (stale entry).
```

---

# 21. Graph Fundamentals

### Terminology

- **Vertex (node)**, **Edge** (connection). **Degree**: number of edges at a vertex. **In-degree / Out-degree**: incoming / outgoing edges (directed graphs).
- **Path**: sequence of vertices joined by edges. **Cycle**: path that returns to its start.
- **Connected**: a path exists between every pair (undirected). **Disconnected**: otherwise.
- **Directed / Undirected**, **Weighted / Unweighted**, **Complete** (all pairs joined), **Bipartite** (2-colorable, no odd cycle), **Cyclic / Acyclic**.
- **Tree** = connected acyclic graph with `n - 1` edges. **DAG** = directed acyclic graph.

### Graph Representation and Construction

```js
function buildAdjList(n, edges, directed = false) {
  // edges: [u, v] (0-indexed)
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    if (!directed) adj[v].push(u);
  }
  return adj;
}
function buildWeightedAdj(n, edges, directed = false) {
  // edges: [u, v, w] -> adj[u] = [[v, w], ...]
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    if (!directed) adj[v].push([u, w]);
  }
  return adj;
}
function buildAdjMatrix(n, edges, directed = false) {
  // O(n^2) memory: only for n <= ~2000
  const m = Array.from({ length: n }, () => new Array(n).fill(0));
  for (const [u, v] of edges) {
    m[u][v] = 1;
    if (!directed) m[v][u] = 1;
  }
  return m;
}
// Edge list: just the array of [u, v, w] (good for Kruskal, Bellman-Ford).
// Reading a graph from your template (1-indexed input, m edges):
function readGraph(n, m, directed = false) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < m; i++) {
    const u = Number(input[index++]),
      v = Number(input[index++]);
    adj[u].push(v);
    if (!directed) adj[v].push(u);
  }
  return adj;
}
function degrees(adj) {
  return adj.map((l) => l.length);
}
```

### BFS, DFS (Recursive and Iterative)

```js
function bfs(adj, src) {
  // shortest distances in an unweighted graph
  const dist = new Array(adj.length).fill(-1),
    q = [src];
  dist[src] = 0;
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    for (const v of adj[u])
      if (dist[v] === -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
  }
  return dist;
}
function dfsRecursive(
  adj,
  u,
  seen = new Array(adj.length).fill(false),
  order = [],
) {
  seen[u] = true;
  order.push(u); // depth limit ~1e4. Prefer the iterative version.
  for (const v of adj[u]) if (!seen[v]) dfsRecursive(adj, v, seen, order);
  return order;
}
function dfsIterative(adj, src) {
  const seen = new Array(adj.length).fill(false),
    order = [],
    st = [src];
  while (st.length) {
    const u = st.pop();
    if (seen[u]) continue;
    seen[u] = true;
    order.push(u);
    for (let i = adj[u].length - 1; i >= 0; i--)
      if (!seen[adj[u][i]]) st.push(adj[u][i]);
  }
  return order;
}
function dfsWithTimes(adj, root) {
  // iterative DFS with tin / tout (Euler tour), parent
  const n = adj.length,
    tin = new Array(n).fill(-1),
    tout = new Array(n).fill(-1),
    parent = new Array(n).fill(-1),
    ptr = new Array(n).fill(0);
  let timer = 0;
  const st = [root];
  tin[root] = timer++;
  while (st.length) {
    const u = st[st.length - 1];
    if (ptr[u] < adj[u].length) {
      const v = adj[u][ptr[u]++];
      if (tin[v] === -1) {
        tin[v] = timer++;
        parent[v] = u;
        st.push(v);
      }
    } else {
      tout[u] = timer++;
      st.pop();
    }
  }
  return { tin, tout, parent };
}
```

### Connected Components, Cycle Detection, Bipartite Check

```js
function connectedComponents(adj) {
  const n = adj.length,
    comp = new Array(n).fill(-1);
  let c = 0;
  for (let s = 0; s < n; s++) {
    if (comp[s] !== -1) continue;
    comp[s] = c;
    const q = [s];
    for (let h = 0; h < q.length; h++)
      for (const v of adj[q[h]])
        if (comp[v] === -1) {
          comp[v] = c;
          q.push(v);
        }
    c++;
  }
  return { comp, count: c };
}
function hasCycleUndirected(adj) {
  const n = adj.length,
    seen = new Array(n).fill(false);
  for (let s = 0; s < n; s++) {
    if (seen[s]) continue;
    const st = [[s, -1]];
    seen[s] = true;
    while (st.length) {
      const [u, p] = st.pop();
      for (const v of adj[u]) {
        if (v === p) continue; // (for multi-edges track edge ids instead)
        if (seen[v]) return true;
        seen[v] = true;
        st.push([v, u]);
      }
    }
  }
  return false;
}
function hasCycleDirected(adj) {
  // 3-color DFS (iterative); or Kahn: order.length < n
  const n = adj.length,
    color = new Array(n).fill(0),
    ptr = new Array(n).fill(0);
  for (let s = 0; s < n; s++) {
    if (color[s]) continue;
    const st = [s];
    color[s] = 1;
    while (st.length) {
      const u = st[st.length - 1];
      if (ptr[u] < adj[u].length) {
        const v = adj[u][ptr[u]++];
        if (color[v] === 1) return true;
        if (color[v] === 0) {
          color[v] = 1;
          st.push(v);
        }
      } else {
        color[u] = 2;
        st.pop();
      }
    }
  }
  return false;
}
function isBipartite(adj) {
  const n = adj.length,
    color = new Array(n).fill(-1);
  for (let s = 0; s < n; s++) {
    if (color[s] !== -1) continue;
    color[s] = 0;
    const q = [s];
    for (let h = 0; h < q.length; h++) {
      const u = q[h];
      for (const v of adj[u]) {
        if (color[v] === -1) {
          color[v] = color[u] ^ 1;
          q.push(v);
        } else if (color[v] === color[u]) return false;
      }
    }
  }
  return true;
}
```

### Grid BFS / DFS, Multi-Source BFS, Shortest Path in Unweighted Graphs

```js
const DIRS4 = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const DIRS8 = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
function gridBFS(grid, sr, sc) {
  // '#' = wall; returns distance grid
  const n = grid.length,
    m = grid[0].length,
    dist = Array.from({ length: n }, () => new Array(m).fill(-1));
  const q = [[sr, sc]];
  dist[sr][sc] = 0;
  for (let h = 0; h < q.length; h++) {
    const [r, c] = q[h];
    for (const [dr, dc] of DIRS4) {
      const nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < n &&
        nc < m &&
        grid[nr][nc] !== "#" &&
        dist[nr][nc] === -1
      ) {
        dist[nr][nc] = dist[r][c] + 1;
        q.push([nr, nc]);
      }
    }
  }
  return dist;
}
function gridDFS(grid, sr, sc, seen) {
  // iterative flood DFS on cells equal to grid[sr][sc]
  const n = grid.length,
    m = grid[0].length,
    st = [[sr, sc]],
    target = grid[sr][sc];
  let size = 0;
  seen[sr][sc] = true;
  while (st.length) {
    const [r, c] = st.pop();
    size++;
    for (const [dr, dc] of DIRS4) {
      const nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < n &&
        nc < m &&
        !seen[nr][nc] &&
        grid[nr][nc] === target
      ) {
        seen[nr][nc] = true;
        st.push([nr, nc]);
      }
    }
  }
  return size;
}
function multiSourceBFS(adj, sources) {
  const dist = new Array(adj.length).fill(-1),
    q = [];
  for (const s of sources) {
    dist[s] = 0;
    q.push(s);
  }
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    for (const v of adj[u])
      if (dist[v] === -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
  }
  return dist;
}
function shortestPathUnweighted(adj, s, t) {
  // returns the path as an array of vertices
  const par = new Array(adj.length).fill(-2),
    q = [s];
  par[s] = -1;
  for (let h = 0; h < q.length; h++)
    for (const v of adj[q[h]])
      if (par[v] === -2) {
        par[v] = q[h];
        q.push(v);
      }
  if (par[t] === -2) return null;
  const path = [];
  for (let v = t; v !== -1; v = par[v]) path.push(v);
  return path.reverse();
}
```

### Flood Fill, Number of Islands, Enclaves, Rotten Oranges, Surrounded Regions

```js
function floodFill(img, sr, sc, color) {
  const orig = img[sr][sc];
  if (orig === color) return img;
  const st = [[sr, sc]];
  img[sr][sc] = color;
  while (st.length) {
    const [r, c] = st.pop();
    for (const [dr, dc] of DIRS4) {
      const nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < img.length &&
        nc < img[0].length &&
        img[nr][nc] === orig
      ) {
        img[nr][nc] = color;
        st.push([nr, nc]);
      }
    }
  }
  return img;
}
function numberOfIslands(grid) {
  // '1' land, '0' water
  const n = grid.length,
    m = grid[0].length,
    seen = Array.from({ length: n }, () => new Array(m).fill(false));
  let cnt = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      if (grid[i][j] === "1" && !seen[i][j]) {
        cnt++;
        gridDFS(grid, i, j, seen);
      }
  return cnt;
}
function numberOfEnclaves(grid) {
  // land cells (1) that cannot reach the border
  const n = grid.length,
    m = grid[0].length,
    seen = Array.from({ length: n }, () => new Array(m).fill(false)),
    st = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      if (
        (i === 0 || j === 0 || i === n - 1 || j === m - 1) &&
        grid[i][j] === 1
      ) {
        seen[i][j] = true;
        st.push([i, j]);
      }
  while (st.length) {
    const [r, c] = st.pop();
    for (const [dr, dc] of DIRS4) {
      const nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < n &&
        nc < m &&
        grid[nr][nc] === 1 &&
        !seen[nr][nc]
      ) {
        seen[nr][nc] = true;
        st.push([nr, nc]);
      }
    }
  }
  let cnt = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) if (grid[i][j] === 1 && !seen[i][j]) cnt++;
  return cnt;
}
function rottenOranges(g) {
  // 2 = rotten, 1 = fresh; returns minutes or -1
  const n = g.length,
    m = g[0].length,
    q = [];
  let fresh = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      if (g[i][j] === 2) q.push([i, j, 0]);
      else if (g[i][j] === 1) fresh++;
    }
  let t = 0;
  for (let h = 0; h < q.length; h++) {
    const [r, c, d] = q[h];
    t = d;
    for (const [dr, dc] of DIRS4) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < n && nc < m && g[nr][nc] === 1) {
        g[nr][nc] = 2;
        fresh--;
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return fresh ? -1 : t;
}
function surroundedRegions(b) {
  // 'O' regions not touching the border become 'X'
  const n = b.length,
    m = b[0].length,
    st = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      if (
        (i === 0 || j === 0 || i === n - 1 || j === m - 1) &&
        b[i][j] === "O"
      ) {
        b[i][j] = "S";
        st.push([i, j]);
      }
  while (st.length) {
    const [r, c] = st.pop();
    for (const [dr, dc] of DIRS4) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < n && nc < m && b[nr][nc] === "O") {
        b[nr][nc] = "S";
        st.push([nr, nc]);
      }
    }
  }
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      b[i][j] = b[i][j] === "S" ? "O" : b[i][j] === "O" ? "X" : b[i][j];
  return b;
}
```

---

# 22. Advanced Graph Algorithms

> **Recursion warning:** Node's call stack handles only ~1e4 frames. Everything below that runs on large graphs is written **iteratively**.
> Vertices are **0-indexed**. Shift by 1 if your input is 1-indexed.

### Topological Sort (Kahn BFS and DFS-based), DAG Shortest Paths

```js
function kahnTopo(adj) {
  // returns order; order.length < n means a cycle
  const n = adj.length,
    indeg = new Array(n).fill(0);
  for (const l of adj) for (const v of l) indeg[v]++;
  const q = [];
  for (let i = 0; i < n; i++) if (!indeg[i]) q.push(i);
  for (let h = 0; h < q.length; h++)
    for (const v of adj[q[h]]) if (--indeg[v] === 0) q.push(v);
  return q;
}
function dfsTopo(adj) {
  // iterative post-order, reversed
  const n = adj.length,
    seen = new Array(n).fill(false),
    ptr = new Array(n).fill(0),
    order = [];
  for (let s = 0; s < n; s++) {
    if (seen[s]) continue;
    const st = [s];
    seen[s] = true;
    while (st.length) {
      const u = st[st.length - 1];
      if (ptr[u] < adj[u].length) {
        const v = adj[u][ptr[u]++];
        if (!seen[v]) {
          seen[v] = true;
          st.push(v);
        }
      } else {
        order.push(u);
        st.pop();
      }
    }
  }
  return order.reverse();
}
function dagShortestPath(adj, src) {
  // adj[u] = [[v, w]], any weights (negative ok), O(V+E)
  const n = adj.length,
    simple = adj.map((l) => l.map((e) => e[0])),
    order = kahnTopo(simple),
    dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (const u of order)
    if (dist[u] !== Infinity)
      for (const [v, w] of adj[u]) dist[v] = Math.min(dist[v], dist[u] + w);
  return dist;
}
```

### Dijkstra, Multi-Source Dijkstra, Path Reconstruction

Non-negative weights. O((V + E) log V).

```js
function dijkstra(adj, src) {
  // adj[u] = [[v, w], ...]
  const n = adj.length,
    dist = new Array(n).fill(Infinity),
    par = new Array(n).fill(-1);
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);
  dist[src] = 0;
  pq.push([0, src]);
  while (pq.size()) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue; // stale entry (lazy deletion)
    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        par[v] = u;
        pq.push([dist[v], v]);
      }
    }
  }
  return { dist, par };
}
function multiSourceDijkstra(adj, sources) {
  // push all sources with distance 0 (or their own start costs)
  const n = adj.length,
    dist = new Array(n).fill(Infinity),
    pq = new PriorityQueue((a, b) => a[0] - b[0]);
  for (const s of sources) {
    dist[s] = 0;
    pq.push([0, s]);
  }
  while (pq.size()) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u])
      if (d + w < dist[v]) {
        dist[v] = d + w;
        pq.push([dist[v], v]);
      }
  }
  return dist;
}
function reconstructPath(par, t) {
  const path = [];
  for (let v = t; v !== -1; v = par[v]) path.push(v);
  return path.reverse(); // check path[0] === source, else unreachable
}
```

### Bellman-Ford, Negative Cycle Detection, SPFA

```js
function bellmanFord(n, edges, src) {
  // edges: [u, v, w]; O(VE)
  const dist = new Array(n).fill(Infinity),
    par = new Array(n).fill(-1);
  dist[src] = 0;
  let last = -1;
  for (let i = 0; i < n; i++) {
    last = -1;
    for (const [u, v, w] of edges)
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        par[v] = u;
        last = v;
      }
    if (last === -1) break;
  }
  return { dist, par, negativeCycle: last !== -1 }; // last !== -1 after n rounds -> a negative cycle is reachable
}
function findNegativeCycle(n, edges) {
  // any negative cycle in the graph (start from all vertices at 0)
  const dist = new Array(n).fill(0),
    par = new Array(n).fill(-1);
  let x = -1;
  for (let i = 0; i < n; i++) {
    x = -1;
    for (const [u, v, w] of edges)
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        par[v] = u;
        x = v;
      }
  }
  if (x === -1) return null;
  for (let i = 0; i < n; i++) x = par[x]; // step into the cycle
  const cyc = [];
  for (let v = x; ; v = par[v]) {
    cyc.push(v);
    if (v === x && cyc.length > 1) break;
  }
  return cyc.reverse();
}
function spfa(adj, src) {
  // queue-based Bellman-Ford; fast in practice, worst case O(VE)
  const n = adj.length,
    dist = new Array(n).fill(Infinity),
    inq = new Array(n).fill(false),
    cnt = new Array(n).fill(0),
    q = new Deque();
  dist[src] = 0;
  q.pushBack(src);
  inq[src] = true;
  while (q.size()) {
    const u = q.popFront();
    inq[u] = false;
    for (const [v, w] of adj[u])
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        if (!inq[v]) {
          q.pushBack(v);
          inq[v] = true;
          if (++cnt[v] > n) return null;
        } // negative cycle
      }
  }
  return dist;
}
```

### Floyd-Warshall

All-pairs shortest paths in O(V^3). Use for `n <= ~400`.

```js
function floydWarshall(n, edges) {
  // edges: [u, v, w]
  const d = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)),
  );
  const next = Array.from({ length: n }, () => new Array(n).fill(-1));
  for (const [u, v, w] of edges)
    if (w < d[u][v]) {
      d[u][v] = w;
      next[u][v] = v;
    }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++) {
      if (d[i][k] === Infinity) continue;
      for (let j = 0; j < n; j++)
        if (d[i][k] + d[k][j] < d[i][j]) {
          d[i][j] = d[i][k] + d[k][j];
          next[i][j] = next[i][k];
        }
    }
  return { d, next }; // d[i][i] < 0  => negative cycle through i
}
function fwPath(next, u, v) {
  if (next[u][v] === -1) return null;
  const path = [u];
  while (u !== v) {
    u = next[u][v];
    path.push(u);
  }
  return path;
}
```

### 0-1 BFS

Edge weights only 0 or 1: use a deque (0-edges to the front, 1-edges to the back). O(V + E).

```js
function zeroOneBFS(adj, src) {
  // adj[u] = [[v, w]] with w in {0, 1}
  const dist = new Array(adj.length).fill(Infinity),
    dq = new Deque();
  dist[src] = 0;
  dq.pushBack(src);
  while (dq.size()) {
    const u = dq.popFront();
    for (const [v, w] of adj[u])
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        if (w === 0) dq.pushFront(v);
        else dq.pushBack(v);
      }
  }
  return dist;
}
```

### Johnson's Algorithm

All-pairs with negative edges (no negative cycle): Bellman-Ford from a virtual node gives potentials `h`; reweight `w' = w + h[u] - h[v] >= 0`; run Dijkstra from each vertex. O(VE log V).

```js
function johnson(n, edges) {
  const ext = edges.concat(Array.from({ length: n }, (_, i) => [n, i, 0]));
  const bf = bellmanFord(n + 1, ext, n);
  if (bf.negativeCycle) return null;
  const h = bf.dist,
    adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) adj[u].push([v, w + h[u] - h[v]]);
  const res = [];
  for (let s = 0; s < n; s++) {
    const { dist } = dijkstra(adj, s);
    res.push(dist.map((d, v) => (d === Infinity ? Infinity : d - h[s] + h[v])));
  }
  return res;
}
```

### Minimum Spanning Tree: Kruskal and Prim

```js
function kruskal(n, edges) {
  // edges: [u, v, w]; uses DSU (below)
  const sorted = edges.slice().sort((a, b) => a[2] - b[2]),
    dsu = new DSU(n),
    mst = [];
  let total = 0;
  for (const [u, v, w] of sorted)
    if (dsu.union(u, v)) {
      total += w;
      mst.push([u, v, w]);
    }
  return { total, mst, connected: mst.length === n - 1 };
}
function prim(adj, start = 0) {
  const n = adj.length,
    inMST = new Array(n).fill(false),
    pq = new PriorityQueue((a, b) => a[0] - b[0]);
  let total = 0,
    cnt = 0;
  pq.push([0, start]);
  while (pq.size()) {
    const [w, u] = pq.pop();
    if (inMST[u]) continue;
    inMST[u] = true;
    total += w;
    cnt++;
    for (const [v, ww] of adj[u]) if (!inMST[v]) pq.push([ww, v]);
  }
  return { total, connected: cnt === n };
}
```

### Disjoint Set Union

See section 23 for the `DSU` class (Union by Rank/Size, Path Compression).

### Strongly Connected Components: Kosaraju and Tarjan

```js
function kosaraju(adj) {
  const n = adj.length,
    order = [],
    seen = new Array(n).fill(false),
    ptr = new Array(n).fill(0);
  for (let s = 0; s < n; s++) {
    // pass 1: finishing order
    if (seen[s]) continue;
    const st = [s];
    seen[s] = true;
    while (st.length) {
      const u = st[st.length - 1];
      if (ptr[u] < adj[u].length) {
        const v = adj[u][ptr[u]++];
        if (!seen[v]) {
          seen[v] = true;
          st.push(v);
        }
      } else {
        order.push(u);
        st.pop();
      }
    }
  }
  const radj = Array.from({ length: n }, () => []);
  for (let u = 0; u < n; u++) for (const v of adj[u]) radj[v].push(u);
  const comp = new Array(n).fill(-1);
  let c = 0;
  for (let i = n - 1; i >= 0; i--) {
    // pass 2: DFS on reversed graph in reverse finishing order
    const s = order[i];
    if (comp[s] !== -1) continue;
    comp[s] = c;
    const st = [s];
    while (st.length) {
      const u = st.pop();
      for (const v of radj[u])
        if (comp[v] === -1) {
          comp[v] = c;
          st.push(v);
        }
    }
    c++;
  }
  return { comp, count: c }; // components come out in topological order of the condensation DAG
}
function tarjanSCC(n, adj) {
  const idx = new Array(n).fill(-1),
    low = new Array(n).fill(0),
    on = new Array(n).fill(false),
    comp = new Array(n).fill(-1);
  const st = [],
    ptr = new Array(n).fill(0);
  let timer = 0,
    c = 0;
  for (let s = 0; s < n; s++) {
    if (idx[s] !== -1) continue;
    const cs = [s];
    idx[s] = low[s] = timer++;
    st.push(s);
    on[s] = true;
    while (cs.length) {
      const u = cs[cs.length - 1];
      if (ptr[u] < adj[u].length) {
        const v = adj[u][ptr[u]++];
        if (idx[v] === -1) {
          idx[v] = low[v] = timer++;
          st.push(v);
          on[v] = true;
          cs.push(v);
        } else if (on[v]) low[u] = Math.min(low[u], idx[v]);
      } else {
        cs.pop();
        if (low[u] === idx[u]) {
          while (true) {
            const w = st.pop();
            on[w] = false;
            comp[w] = c;
            if (w === u) break;
          }
          c++;
        }
        if (cs.length) {
          const p = cs[cs.length - 1];
          low[p] = Math.min(low[p], low[u]);
        }
      }
    }
  }
  return { comp, count: c };
}
```

### Bridges, Articulation Points, Biconnected Components

```js
function bridgesAndArticulation(n, adj) {
  // adj[u] = [[v, edgeId], ...]
  const tin = new Array(n).fill(-1),
    low = new Array(n).fill(0),
    ptr = new Array(n).fill(0),
    parentEdge = new Array(n).fill(-1);
  const bridges = [],
    isAP = new Array(n).fill(false);
  let timer = 0;
  for (let s = 0; s < n; s++) {
    if (tin[s] !== -1) continue;
    let rootChildren = 0;
    const cs = [s];
    tin[s] = low[s] = timer++;
    while (cs.length) {
      const u = cs[cs.length - 1];
      if (ptr[u] < adj[u].length) {
        const [v, id] = adj[u][ptr[u]++];
        if (id === parentEdge[u]) continue;
        if (tin[v] === -1) {
          parentEdge[v] = id;
          tin[v] = low[v] = timer++;
          cs.push(v);
        } else low[u] = Math.min(low[u], tin[v]);
      } else {
        cs.pop();
        if (cs.length) {
          const p = cs[cs.length - 1];
          low[p] = Math.min(low[p], low[u]);
          if (low[u] > tin[p]) bridges.push(parentEdge[u]);
          if (p === s) rootChildren++;
          else if (low[u] >= tin[p]) isAP[p] = true;
        }
      }
    }
    if (rootChildren > 1) isAP[s] = true;
  }
  return { bridges, isAP };
}
function biconnectedComponents(n, adj) {
  // recursive (n <= ~1e4); returns list of edge-id lists
  const tin = new Array(n).fill(-1),
    low = new Array(n).fill(0),
    st = [],
    comps = [];
  let timer = 0;
  function dfs(u, pe) {
    tin[u] = low[u] = timer++;
    for (const [v, id] of adj[u]) {
      if (id === pe) continue;
      if (tin[v] === -1) {
        st.push(id);
        dfs(v, id);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] >= tin[u]) {
          const comp = [];
          while (true) {
            const e = st.pop();
            comp.push(e);
            if (e === id) break;
          }
          comps.push(comp);
        }
      } else if (tin[v] < tin[u]) {
        st.push(id);
        low[u] = Math.min(low[u], tin[v]);
      }
    }
  }
  for (let s = 0; s < n; s++) if (tin[s] === -1) dfs(s, -1);
  return comps;
}
```

### Eulerian Path / Circuit (Hierholzer's Algorithm)

Undirected: circuit needs all degrees even; path needs exactly 0 or 2 odd-degree vertices. Directed: `in = out` for all (circuit), or one vertex with `out - in = 1` and one with `in - out = 1` (path).

```js
function eulerianPathDirected(n, edges) {
  // returns vertex sequence or null
  const adj = Array.from({ length: n }, () => []),
    diff = new Array(n).fill(0);
  for (const [u, v] of edges) {
    adj[u].push(v);
    diff[u]++;
    diff[v]--;
  }
  let start = edges.length ? edges[0][0] : 0,
    plus = 0,
    minus = 0;
  for (let i = 0; i < n; i++) {
    if (diff[i] === 1) {
      plus++;
      start = i;
    } else if (diff[i] === -1) minus++;
    else if (diff[i] !== 0) return null;
  }
  if (!((plus === 0 && minus === 0) || (plus === 1 && minus === 1)))
    return null;
  const st = [start],
    path = [];
  while (st.length) {
    const u = st[st.length - 1];
    if (adj[u].length) st.push(adj[u].pop());
    else path.push(st.pop());
  }
  path.reverse();
  return path.length === edges.length + 1 ? path : null;
}
function eulerianPathUndirected(n, edges) {
  const adj = Array.from({ length: n }, () => []),
    used = new Array(edges.length).fill(false);
  edges.forEach(([u, v], i) => {
    adj[u].push([v, i]);
    adj[v].push([u, i]);
  });
  let start = edges.length ? edges[0][0] : 0,
    odd = 0;
  for (let i = 0; i < n; i++)
    if (adj[i].length % 2) {
      odd++;
      start = i;
    }
  if (odd !== 0 && odd !== 2) return null;
  const st = [start],
    path = [],
    ptr = new Array(n).fill(0);
  while (st.length) {
    const u = st[st.length - 1];
    while (ptr[u] < adj[u].length && used[adj[u][ptr[u]][1]]) ptr[u]++;
    if (ptr[u] === adj[u].length) path.push(st.pop());
    else {
      const [v, id] = adj[u][ptr[u]++];
      used[id] = true;
      st.push(v);
    }
  }
  return path.length === edges.length + 1 ? path.reverse() : null;
}
```

### Hamiltonian Path / Cycle

NP-hard. For `n <= 20` use bitmask DP (section 30); backtracking version is in section 14.

### Network Flow: Ford-Fulkerson, Edmonds-Karp, Dinic, Maximum Flow = Minimum Cut

```js
class MaxFlow {
  // Dinic: O(V^2 E), very fast in practice
  constructor(n) {
    this.n = n;
    this.to = [];
    this.cap = [];
    this.adj = Array.from({ length: n }, () => []);
  }
  addEdge(u, v, c) {
    this.adj[u].push(this.to.length);
    this.to.push(v);
    this.cap.push(c);
    this.adj[v].push(this.to.length);
    this.to.push(u);
    this.cap.push(0);
  }
  bfs(s, t) {
    this.level = new Array(this.n).fill(-1);
    this.level[s] = 0;
    const q = [s];
    for (let h = 0; h < q.length; h++)
      for (const e of this.adj[q[h]])
        if (this.cap[e] > 0 && this.level[this.to[e]] < 0) {
          this.level[this.to[e]] = this.level[q[h]] + 1;
          q.push(this.to[e]);
        }
    return this.level[t] >= 0;
  }
  dfs(u, t, f) {
    if (u === t) return f;
    for (; this.it[u] < this.adj[u].length; this.it[u]++) {
      const e = this.adj[u][this.it[u]],
        v = this.to[e];
      if (this.cap[e] > 0 && this.level[v] === this.level[u] + 1) {
        const d = this.dfs(v, t, Math.min(f, this.cap[e]));
        if (d > 0) {
          this.cap[e] -= d;
          this.cap[e ^ 1] += d;
          return d;
        }
      }
    }
    return 0;
  }
  maxflow(s, t) {
    let flow = 0;
    while (this.bfs(s, t)) {
      this.it = new Array(this.n).fill(0);
      let f;
      while ((f = this.dfs(s, t, Infinity)) > 0) flow += f;
    }
    return flow;
  }
  minCutSourceSide(s) {
    // after maxflow: vertices reachable from s in the residual graph
    const seen = new Array(this.n).fill(false);
    seen[s] = true;
    const q = [s];
    for (let h = 0; h < q.length; h++)
      for (const e of this.adj[q[h]])
        if (this.cap[e] > 0 && !seen[this.to[e]]) {
          seen[this.to[e]] = true;
          q.push(this.to[e]);
        }
    return seen;
  }
}
// Max flow value == min cut capacity. Cut edges: edges from the seen side to the unseen side.

function edmondsKarp(n, edges, s, t) {
  // BFS augmenting paths, O(V E^2). edges: [u, v, cap]
  const cap = Array.from({ length: n }, () => new Array(n).fill(0)),
    adj = Array.from({ length: n }, () => new Set());
  for (const [u, v, c] of edges) {
    cap[u][v] += c;
    adj[u].add(v);
    adj[v].add(u);
  }
  let flow = 0;
  while (true) {
    const par = new Array(n).fill(-1);
    par[s] = s;
    const q = [s];
    for (let h = 0; h < q.length && par[t] === -1; h++)
      for (const v of adj[q[h]])
        if (par[v] === -1 && cap[q[h]][v] > 0) {
          par[v] = q[h];
          q.push(v);
        }
    if (par[t] === -1) break;
    let f = Infinity;
    for (let v = t; v !== s; v = par[v]) f = Math.min(f, cap[par[v]][v]);
    for (let v = t; v !== s; v = par[v]) {
      cap[par[v]][v] -= f;
      cap[v][par[v]] += f;
    }
    flow += f;
  }
  return flow;
}
function fordFulkerson(n, edges, s, t) {
  // DFS augmenting paths; pseudo-polynomial (integer capacities)
  const cap = Array.from({ length: n }, () => new Array(n).fill(0));
  for (const [u, v, c] of edges) cap[u][v] += c;
  let flow = 0;
  while (true) {
    const par = new Array(n).fill(-1);
    par[s] = s;
    const st = [s];
    while (st.length && par[t] === -1) {
      const u = st.pop();
      for (let v = 0; v < n; v++)
        if (par[v] === -1 && cap[u][v] > 0) {
          par[v] = u;
          st.push(v);
        }
    }
    if (par[t] === -1) break;
    let f = Infinity;
    for (let v = t; v !== s; v = par[v]) f = Math.min(f, cap[par[v]][v]);
    for (let v = t; v !== s; v = par[v]) {
      cap[par[v]][v] -= f;
      cap[v][par[v]] += f;
    }
    flow += f;
  }
  return flow;
}
```

### Maximum Bipartite Matching, Hopcroft-Karp

```js
function kuhnMatching(nLeft, nRight, adj) {
  // adj[u] = right vertices; O(V E)
  const matchR = new Array(nRight).fill(-1);
  let cnt = 0;
  function tryKuhn(u, seen) {
    // recursion depth <= nLeft
    for (const v of adj[u]) {
      if (seen[v]) continue;
      seen[v] = true;
      if (matchR[v] === -1 || tryKuhn(matchR[v], seen)) {
        matchR[v] = u;
        return true;
      }
    }
    return false;
  }
  for (let u = 0; u < nLeft; u++)
    if (tryKuhn(u, new Array(nRight).fill(false))) cnt++;
  return { size: cnt, matchR };
}
function hopcroftKarp(nL, nR, adj) {
  // O(E sqrt V)
  const matchL = new Array(nL).fill(-1),
    matchR = new Array(nR).fill(-1);
  let dist;
  function bfs() {
    dist = new Array(nL).fill(-1);
    const q = [];
    let found = false;
    for (let u = 0; u < nL; u++)
      if (matchL[u] === -1) {
        dist[u] = 0;
        q.push(u);
      }
    for (let h = 0; h < q.length; h++) {
      const u = q[h];
      for (const v of adj[u]) {
        const w = matchR[v];
        if (w === -1) found = true;
        else if (dist[w] === -1) {
          dist[w] = dist[u] + 1;
          q.push(w);
        }
      }
    }
    return found;
  }
  function dfs(u) {
    for (const v of adj[u]) {
      const w = matchR[v];
      if (w === -1 || (dist[w] === dist[u] + 1 && dfs(w))) {
        matchL[u] = v;
        matchR[v] = u;
        return true;
      }
    }
    dist[u] = -1;
    return false;
  }
  let res = 0;
  while (bfs())
    for (let u = 0; u < nL; u++) if (matchL[u] === -1 && dfs(u)) res++;
  return { size: res, matchL, matchR }; // König: min vertex cover size == max matching size
}
```

### Lowest Common Ancestor (Binary Lifting)

```js
class LCA {
  constructor(n, adj, root = 0) {
    this.LOG = Math.max(1, Math.ceil(Math.log2(n)) + 1);
    this.up = Array.from({ length: this.LOG }, () => new Array(n).fill(root));
    this.depth = new Array(n).fill(0);
    const seen = new Array(n).fill(false),
      q = [root];
    seen[root] = true;
    for (let h = 0; h < q.length; h++) {
      const u = q[h];
      for (const v of adj[u])
        if (!seen[v]) {
          seen[v] = true;
          this.depth[v] = this.depth[u] + 1;
          this.up[0][v] = u;
          q.push(v);
        }
    }
    for (let j = 1; j < this.LOG; j++)
      for (let v = 0; v < n; v++)
        this.up[j][v] = this.up[j - 1][this.up[j - 1][v]];
  }
  kthAncestor(v, k) {
    for (let j = 0; j < this.LOG; j++) if ((k >> j) & 1) v = this.up[j][v];
    return v;
  }
  lca(a, b) {
    if (this.depth[a] < this.depth[b]) [a, b] = [b, a];
    a = this.kthAncestor(a, this.depth[a] - this.depth[b]);
    if (a === b) return a;
    for (let j = this.LOG - 1; j >= 0; j--)
      if (this.up[j][a] !== this.up[j][b]) {
        a = this.up[j][a];
        b = this.up[j][b];
      }
    return this.up[0][a];
  }
  dist(a, b) {
    return this.depth[a] + this.depth[b] - 2 * this.depth[this.lca(a, b)];
  }
}
```

### Heavy-Light Decomposition

Splits a tree into O(log n) chains per root path, so path queries become O(log n) range queries on an array (use a segment tree / Fenwick from section 24).

```js
class HLD {
  constructor(n, adj, root = 0) {
    this.parent = new Array(n).fill(-1);
    this.depth = new Array(n).fill(0);
    this.heavy = new Array(n).fill(-1);
    this.head = new Array(n).fill(0);
    this.pos = new Array(n).fill(0);
    const order = [root],
      size = new Array(n).fill(1);
    for (let h = 0; h < order.length; h++) {
      const u = order[h];
      for (const v of adj[u])
        if (v !== this.parent[u]) {
          this.parent[v] = u;
          this.depth[v] = this.depth[u] + 1;
          order.push(v);
        }
    }
    for (let i = n - 1; i > 0; i--) {
      const u = order[i],
        p = this.parent[u];
      size[p] += size[u];
    }
    for (let i = n - 1; i > 0; i--) {
      const u = order[i],
        p = this.parent[u];
      if (this.heavy[p] === -1 || size[u] > size[this.heavy[p]])
        this.heavy[p] = u;
    }
    let cur = 0;
    for (const u of order) {
      if (this.parent[u] === -1 || this.heavy[this.parent[u]] !== u) {
        // u starts a chain
        for (let v = u; v !== -1; v = this.heavy[v]) {
          this.head[v] = u;
          this.pos[v] = cur++;
        }
      }
    }
  }
  // Calls fn(l, r) for every contiguous position range [l, r] on the path a..b (inclusive of both nodes).
  forEachPathRange(a, b, fn) {
    while (this.head[a] !== this.head[b]) {
      if (this.depth[this.head[a]] < this.depth[this.head[b]]) [a, b] = [b, a];
      fn(this.pos[this.head[a]], this.pos[a]);
      a = this.parent[this.head[a]];
    }
    if (this.depth[a] > this.depth[b]) [a, b] = [b, a];
    fn(this.pos[a], this.pos[b]);
  }
  lca(a, b) {
    while (this.head[a] !== this.head[b]) {
      if (this.depth[this.head[a]] < this.depth[this.head[b]]) [a, b] = [b, a];
      a = this.parent[this.head[a]];
    }
    return this.depth[a] < this.depth[b] ? a : b;
  }
  subtreeRange(v, size) {
    return [this.pos[v], this.pos[v] + size[v] - 1];
  } // (subtree contiguous because heavy child is placed first)
}
// Path max query example: for (each range) ans = Math.max(ans, seg.queryMax(l, r)); seg built over values by `pos`.
```

### Centroid Decomposition

Repeatedly remove the centroid (a vertex whose removal leaves components of size <= n/2). Depth of the centroid tree is O(log n). Typical use: count / minimize paths through the centroid.

```js
function centroidDecomposition(n, adj) {
  // returns cpar[] = parent in the centroid tree, plus levels
  const removed = new Array(n).fill(false),
    size = new Array(n).fill(0),
    cpar = new Array(n).fill(-1),
    clevel = new Array(n).fill(0);
  function computeSizes(root) {
    // iterative; returns BFS order of the current component
    const order = [root],
      par = new Map([[root, -1]]);
    for (let h = 0; h < order.length; h++) {
      const u = order[h];
      for (const v of adj[u])
        if (!removed[v] && v !== par.get(u)) {
          par.set(v, u);
          order.push(v);
        }
    }
    for (let i = order.length - 1; i >= 0; i--) {
      const u = order[i];
      size[u] = 1;
      for (const v of adj[u])
        if (!removed[v] && v !== par.get(u)) size[u] += size[v];
    }
    return { order, par };
  }
  const stack = [[0, -1, 0]];
  while (stack.length) {
    const [start, parentC, level] = stack.pop();
    const { order, par } = computeSizes(start),
      total = order.length;
    let c = start; // walk toward heavy child until balanced
    while (true) {
      let moved = false;
      for (const v of adj[c])
        if (!removed[v] && v !== par.get(c) && size[v] * 2 > total) {
          c = v;
          moved = true;
          break;
        }
      if (!moved) break;
    }
    removed[c] = true;
    cpar[c] = parentC;
    clevel[c] = level;
    // -- problem-specific work with centroid c goes here (BFS over its component, combine child answers) --
    for (const v of adj[c]) if (!removed[v]) stack.push([v, c, level + 1]);
  }
  return { cpar, clevel };
}
```

---

# 23. Disjoint Set Union (DSU)

Maintains a partition of `n` elements: `find(x)` returns the set representative, `union(a, b)` merges two sets. With **path compression** and **union by size/rank**, each operation is ~O(alpha(n)) (nearly constant).

### DSU Fundamentals: Find, Union, Path Compression, Union by Rank / Size, Component Counting

```js
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
    this.count = n;
  }
  find(x) {
    // iterative with path compression
    let r = x;
    while (this.parent[r] !== r) r = this.parent[r];
    while (this.parent[x] !== r) {
      const nx = this.parent[x];
      this.parent[x] = r;
      x = nx;
    }
    return r;
  }
  union(a, b) {
    // union by size; returns false if already connected
    a = this.find(a);
    b = this.find(b);
    if (a === b) return false;
    if (this.size[a] < this.size[b]) [a, b] = [b, a];
    this.parent[b] = a;
    this.size[a] += this.size[b];
    this.count--;
    return true;
  }
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
  sizeOf(x) {
    return this.size[this.find(x)];
  }
}
// Union by rank variant: keep rank[] (tree height bound); attach lower rank under higher, increment on tie.
class DSURank {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    while (this.p[x] !== x) {
      this.p[x] = this.p[this.p[x]];
      x = this.p[x];
    }
    return x;
  } // path halving
  union(a, b) {
    a = this.find(a);
    b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.p[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }
}
```

### Connected Component Queries, Dynamic Connectivity (incremental), Cycle Detection

```js
function componentSizes(n, edges) {
  const d = new DSU(n);
  for (const [u, v] of edges) d.union(u, v);
  const sizes = new Map();
  for (let i = 0; i < n; i++) {
    const r = d.find(i);
    sizes.set(r, d.size[r]);
  }
  return [...sizes.values()];
}
function firstEdgeCreatingCycle(n, edges) {
  // returns index of the first edge that closes a cycle
  const d = new DSU(n);
  for (let i = 0; i < edges.length; i++)
    if (!d.union(edges[i][0], edges[i][1])) return i;
  return -1;
}
function processConnectivityQueries(n, ops) {
  // ops: ["union", a, b] or ["query", a, b], online (adds only)
  const d = new DSU(n),
    res = [];
  for (const [t, a, b] of ops) {
    if (t === "union") d.union(a, b);
    else res.push(d.connected(a, b));
  }
  return res;
}
// Kruskal's algorithm with DSU: section 22.
```

### Offline Connectivity Queries (Edge Deletions via Reverse Processing)

Deletions are hard for DSU, so process in reverse: deletions become additions.

```js
function connectivityWithDeletions(n, edges, deletedOrder, queries) {
  // edges: [u, v]; deletedOrder: edge ids removed one by one; queries[i] asked AFTER i+1 deletions: [a, b]
  const dead = new Set(deletedOrder),
    d = new DSU(n);
  edges.forEach(([u, v], i) => {
    if (!dead.has(i)) d.union(u, v);
  });
  const ans = new Array(queries.length);
  for (let i = queries.length - 1; i >= 0; i--) {
    ans[i] = d.connected(queries[i][0], queries[i][1]);
    const [u, v] = edges[deletedOrder[i]];
    d.union(u, v); // undo deletion i before answering query i-1
  }
  return ans;
}
```

### Rollback DSU

No path compression (it cannot be undone). Union by size only: O(log n) find, supports `undo`.

```js
class RollbackDSU {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i);
    this.sz = new Array(n).fill(1);
    this.hist = [];
    this.count = n;
  }
  find(x) {
    while (this.p[x] !== x) x = this.p[x];
    return x;
  }
  union(a, b) {
    a = this.find(a);
    b = this.find(b);
    if (a === b) {
      this.hist.push(null);
      return false;
    }
    if (this.sz[a] < this.sz[b]) [a, b] = [b, a];
    this.p[b] = a;
    this.sz[a] += this.sz[b];
    this.count--;
    this.hist.push(b);
    return true;
  }
  snapshot() {
    return this.hist.length;
  }
  rollback(snap) {
    while (this.hist.length > snap) {
      const b = this.hist.pop();
      if (b === null) continue;
      const a = this.p[b];
      this.sz[a] -= this.sz[b];
      this.p[b] = b;
      this.count++;
    }
  }
}
// Offline dynamic connectivity (edges appear and disappear): segment tree over time + rollback DSU.
function offlineDynamicConnectivity(n, T, edgeLifetimes, queryTimes) {
  // edgeLifetimes: [u, v, startTime, endTime] active for t in [start, end]; queryTimes: list of t to ask (components count)
  const tree = Array.from({ length: 4 * T }, () => []);
  function addEdge(node, l, r, ql, qr, e) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) {
      tree[node].push(e);
      return;
    }
    const m = (l + r) >> 1;
    addEdge(2 * node, l, m, ql, qr, e);
    addEdge(2 * node + 1, m + 1, r, ql, qr, e);
  }
  for (const [u, v, s, e] of edgeLifetimes) addEdge(1, 0, T - 1, s, e, [u, v]);
  const d = new RollbackDSU(n),
    qset = new Set(queryTimes),
    ans = new Map();
  (function dfs(node, l, r) {
    const snap = d.snapshot();
    for (const [u, v] of tree[node]) d.union(u, v);
    if (l === r) {
      if (qset.has(l)) ans.set(l, d.count);
    } else {
      const m = (l + r) >> 1;
      dfs(2 * node, l, m);
      dfs(2 * node + 1, m + 1, r);
    }
    d.rollback(snap);
  })(1, 0, T - 1);
  return queryTimes.map((t) => ans.get(t));
}
```

### DSU on Trees (Small to Large Merging)

Keep the data structure of the heaviest child, merge lighter children into it: every element moves O(log n) times.

```js
function distinctColorsInSubtrees(n, adj, color, root = 0) {
  // number of distinct colors in each subtree
  const { order, parent } = treeOrder(n, adj, root),
    sets = new Array(n),
    ans = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];
    if (!sets[u]) sets[u] = new Set();
    sets[u].add(color[u]);
    ans[u] = sets[u].size;
    const p = parent[u];
    if (p !== -1) {
      if (!sets[p]) sets[p] = new Set();
      if (sets[p].size < sets[u].size) [sets[p], sets[u]] = [sets[u], sets[p]]; // swap so we always merge small into large
      for (const x of sets[u]) sets[p].add(x);
      sets[u] = null;
    }
  }
  return ans; // note: ans[u] is computed after all children merged into sets[u]
}
```

### Persistent DSU (partially persistent: "were a and b connected at time t?")

Union by size, **no** path compression. Store the time each node got attached; a query at time `t` climbs only through edges with time `<= t`.

```js
class PersistentDSU {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i);
    this.sz = new Array(n).fill(1);
    this.time = new Array(n).fill(Infinity);
    this.now = 0;
  }
  find(x, t = Infinity) {
    while (this.p[x] !== x && this.time[x] <= t) x = this.p[x];
    return x;
  }
  union(a, b) {
    // each call advances time by 1; returns that time
    this.now++;
    a = this.find(a);
    b = this.find(b);
    if (a !== b) {
      if (this.sz[a] < this.sz[b]) [a, b] = [b, a];
      this.p[b] = a;
      this.time[b] = this.now;
      this.sz[a] += this.sz[b];
    }
    return this.now;
  }
  connectedAt(a, b, t) {
    return this.find(a, t) === this.find(b, t);
  }
}
```

---

# 24. Fenwick Tree and Segment Tree

| Structure     | Build      | Point update | Range query | Range update        | Notes                                   |
| ------------- | ---------- | ------------ | ----------- | ------------------- | --------------------------------------- |
| Prefix sums   | O(n)       | O(n)         | O(1)        | -                   | static arrays only                      |
| Fenwick (BIT) | O(n)       | O(log n)     | O(log n)    | O(log n) (two BITs) | tiny code, invertible ops (sum, xor)    |
| Segment tree  | O(n)       | O(log n)     | O(log n)    | O(log n) with lazy  | any associative op (min, max, gcd, ...) |
| Sparse table  | O(n log n) | -            | O(1)        | -                   | static, idempotent ops (min, max, gcd)  |

### Fenwick Tree (Binary Indexed Tree): Point Update, Prefix Sum, Range Sum

1-indexed internally. `i & -i` is the lowest set bit.

```js
class Fenwick {
  constructor(n) {
    this.n = n;
    this.t = new Array(n + 1).fill(0);
  }
  static fromArray(a) {
    // O(n) build
    const f = new Fenwick(a.length);
    for (let i = 1; i <= a.length; i++) {
      f.t[i] += a[i - 1];
      const j = i + (i & -i);
      if (j <= f.n) f.t[j] += f.t[i];
    }
    return f;
  }
  update(i, delta) {
    for (i++; i <= this.n; i += i & -i) this.t[i] += delta;
  } // i is 0-indexed
  prefix(i) {
    let s = 0;
    for (i++; i > 0; i -= i & -i) s += this.t[i];
    return s;
  } // sum of [0, i]
  range(l, r) {
    return this.prefix(r) - (l ? this.prefix(l - 1) : 0);
  } // sum of [l, r]
  lowerBound(target) {
    // smallest index with prefix >= target (non-negative values)
    let pos = 0,
      rem = target;
    for (
      let pw = 1 << Math.floor(Math.log2(Math.max(1, this.n)));
      pw > 0;
      pw >>= 1
    )
      if (pos + pw <= this.n && this.t[pos + pw] < rem) {
        pos += pw;
        rem -= this.t[pos];
      }
    return pos; // 0-indexed result
  }
}
```

### Range Update (Range Add, Point Query) and Range Update + Range Query

```js
class FenwickRangeUpdate {
  // add v to [l, r]; query single position
  constructor(n) {
    this.f = new Fenwick(n + 1);
  }
  rangeAdd(l, r, v) {
    this.f.update(l, v);
    this.f.update(r + 1, -v);
  }
  pointQuery(i) {
    return this.f.prefix(i);
  }
}
class FenwickRangeRange {
  // add v to [l, r]; sum over [l, r]. Two BITs.
  constructor(n) {
    this.n = n;
    this.b1 = new Fenwick(n + 2);
    this.b2 = new Fenwick(n + 2);
  }
  _add(i, v) {
    this.b1.update(i, v);
    this.b2.update(i, v * (i - 1));
  }
  rangeAdd(l, r, v) {
    this._add(l + 1, v);
    this._add(r + 2, -v);
  } // 1-indexed inside
  _prefix(i) {
    return this.b1.prefix(i) * i - this.b2.prefix(i);
  }
  rangeSum(l, r) {
    return this._prefix(r + 1) - this._prefix(l);
  }
}
```

### 2D Fenwick Tree

```js
class Fenwick2D {
  constructor(n, m) {
    this.n = n;
    this.m = m;
    this.t = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  }
  update(r, c, v) {
    for (let i = r + 1; i <= this.n; i += i & -i)
      for (let j = c + 1; j <= this.m; j += j & -j) this.t[i][j] += v;
  }
  prefix(r, c) {
    let s = 0;
    for (let i = r + 1; i > 0; i -= i & -i)
      for (let j = c + 1; j > 0; j -= j & -j) s += this.t[i][j];
    return s;
  }
  rangeSum(r1, c1, r2, c2) {
    const P = (r, c) => (r < 0 || c < 0 ? 0 : this.prefix(r, c));
    return P(r2, c2) - P(r1 - 1, c2) - P(r2, c1 - 1) + P(r1 - 1, c1 - 1);
  }
}
```

### Coordinate Compression With Fenwick, Inversion Count

```js
function countInversionsBIT(a) {
  // O(n log n)
  const { comp } = compress(a),
    f = new Fenwick(Math.max(...comp) + 1);
  let inv = 0;
  for (let i = a.length - 1; i >= 0; i--) {
    inv += comp[i] ? f.prefix(comp[i] - 1) : 0;
    f.update(comp[i], 1);
  } // smaller elements to the right
  return inv;
}
function countSmallerToRight(a) {
  const { comp } = compress(a),
    f = new Fenwick(Math.max(...comp) + 1),
    res = new Array(a.length);
  for (let i = a.length - 1; i >= 0; i--) {
    res[i] = comp[i] ? f.prefix(comp[i] - 1) : 0;
    f.update(comp[i], 1);
  }
  return res;
}
```

### Segment Tree Fundamentals: Construction, Point Update, Range Sum / Min / Max Queries

A recursive, array-based tree. Replace `+` and `0` with `Math.min` and `Infinity` (or `Math.max`, `-Infinity`) for other queries. Size `4n`.

```js
class SegTree {
  constructor(a, op = (x, y) => x + y, identity = 0) {
    this.n = a.length;
    this.op = op;
    this.id = identity;
    this.t = new Array(4 * this.n).fill(identity);
    if (this.n) this.build(1, 0, this.n - 1, a);
  }
  build(node, l, r, a) {
    if (l === r) {
      this.t[node] = a[l];
      return;
    }
    const m = (l + r) >> 1;
    this.build(2 * node, l, m, a);
    this.build(2 * node + 1, m + 1, r, a);
    this.t[node] = this.op(this.t[2 * node], this.t[2 * node + 1]);
  }
  update(i, v, node = 1, l = 0, r = this.n - 1) {
    // point set: a[i] = v
    if (l === r) {
      this.t[node] = v;
      return;
    }
    const m = (l + r) >> 1;
    if (i <= m) this.update(i, v, 2 * node, l, m);
    else this.update(i, v, 2 * node + 1, m + 1, r);
    this.t[node] = this.op(this.t[2 * node], this.t[2 * node + 1]);
  }
  query(ql, qr, node = 1, l = 0, r = this.n - 1) {
    // op over [ql, qr]
    if (qr < l || r < ql) return this.id;
    if (ql <= l && r <= qr) return this.t[node];
    const m = (l + r) >> 1;
    return this.op(
      this.query(ql, qr, 2 * node, l, m),
      this.query(ql, qr, 2 * node + 1, m + 1, r),
    );
  }
  pointQuery(i) {
    return this.query(i, i);
  }
}
// const sum = new SegTree(a);   const mn = new SegTree(a, Math.min, Infinity);   const mx = new SegTree(a, Math.max, -Infinity);
// gcd tree: new SegTree(a, gcd, 0)
```

### Iterative (Bottom-Up) Segment Tree

Shorter and faster. Works for any associative `op` (commutativity not required with the careful version below).

```js
class IterSegTree {
  constructor(a, op = (x, y) => x + y, id = 0) {
    this.n = a.length;
    this.op = op;
    this.id = id;
    this.t = new Array(2 * this.n).fill(id);
    for (let i = 0; i < this.n; i++) this.t[this.n + i] = a[i];
    for (let i = this.n - 1; i > 0; i--)
      this.t[i] = op(this.t[2 * i], this.t[2 * i + 1]);
  }
  update(i, v) {
    i += this.n;
    this.t[i] = v;
    for (i >>= 1; i >= 1; i >>= 1)
      this.t[i] = this.op(this.t[2 * i], this.t[2 * i + 1]);
  }
  query(l, r) {
    // inclusive [l, r]
    let resL = this.id,
      resR = this.id;
    for (l += this.n, r += this.n + 1; l < r; l >>= 1, r >>= 1) {
      if (l & 1) resL = this.op(resL, this.t[l++]);
      if (r & 1) resR = this.op(this.t[--r], resR);
    }
    return this.op(resL, resR);
  }
}
```

### Lazy Propagation: Range Update, Range Query

Range add + range sum (swap the combine logic for assign / min / max).

```js
class LazySegTree {
  constructor(a) {
    this.n = a.length;
    this.sum = new Array(4 * this.n).fill(0);
    this.lz = new Array(4 * this.n).fill(0);
    this.build(1, 0, this.n - 1, a);
  }
  build(o, l, r, a) {
    if (l === r) {
      this.sum[o] = a[l];
      return;
    }
    const m = (l + r) >> 1;
    this.build(2 * o, l, m, a);
    this.build(2 * o + 1, m + 1, r, a);
    this.sum[o] = this.sum[2 * o] + this.sum[2 * o + 1];
  }
  apply(o, l, r, v) {
    this.sum[o] += v * (r - l + 1);
    this.lz[o] += v;
  }
  push(o, l, r) {
    if (this.lz[o] !== 0) {
      const m = (l + r) >> 1;
      this.apply(2 * o, l, m, this.lz[o]);
      this.apply(2 * o + 1, m + 1, r, this.lz[o]);
      this.lz[o] = 0;
    }
  }
  rangeAdd(ql, qr, v, o = 1, l = 0, r = this.n - 1) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) {
      this.apply(o, l, r, v);
      return;
    }
    this.push(o, l, r);
    const m = (l + r) >> 1;
    this.rangeAdd(ql, qr, v, 2 * o, l, m);
    this.rangeAdd(ql, qr, v, 2 * o + 1, m + 1, r);
    this.sum[o] = this.sum[2 * o] + this.sum[2 * o + 1];
  }
  rangeSum(ql, qr, o = 1, l = 0, r = this.n - 1) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return this.sum[o];
    this.push(o, l, r);
    const m = (l + r) >> 1;
    return (
      this.rangeSum(ql, qr, 2 * o, l, m) +
      this.rangeSum(ql, qr, 2 * o + 1, m + 1, r)
    );
  }
}
```

### Segment Tree With Pair Values

Store tuples. Example: min value + how many times it occurs; and "max subarray sum" with 4 fields.

```js
const mergeMinCount = (a, b) =>
  a[0] < b[0] ? a : b[0] < a[0] ? b : [a[0], a[1] + b[1]];
// new SegTree(a.map(x => [x, 1]), mergeMinCount, [Infinity, 0])   -> query returns [min, count]

const mergeMaxSub = (a, b) => ({
  // node = {sum, pref, suf, best}
  sum: a.sum + b.sum,
  pref: Math.max(a.pref, a.sum + b.pref),
  suf: Math.max(b.suf, b.sum + a.suf),
  best: Math.max(a.best, b.best, a.suf + b.pref),
});
const leafMaxSub = (x) => ({ sum: x, pref: x, suf: x, best: x });
const idMaxSub = { sum: 0, pref: -Infinity, suf: -Infinity, best: -Infinity };
// const st = new SegTree(a.map(leafMaxSub), mergeMaxSub, idMaxSub);  st.query(l, r).best  -> max subarray sum in [l, r]
```

### Persistent Segment Tree (k-th smallest in a range)

Every update creates `O(log n)` new nodes; old versions stay accessible. Array-backed for speed.

```js
class PersistentSegTree {
  constructor(maxNodes) {
    this.L = new Int32Array(maxNodes);
    this.R = new Int32Array(maxNodes);
    this.cnt = new Int32Array(maxNodes);
    this.tot = 1;
  } // node 0 = empty tree
  insert(prev, l, r, pos) {
    // returns the new root; counts occurrences of positions
    const cur = this.tot++;
    this.L[cur] = this.L[prev];
    this.R[cur] = this.R[prev];
    this.cnt[cur] = this.cnt[prev] + 1;
    if (l < r) {
      const m = (l + r) >> 1;
      if (pos <= m) this.L[cur] = this.insert(this.L[prev], l, m, pos);
      else this.R[cur] = this.insert(this.R[prev], m + 1, r, pos);
    }
    return cur;
  }
  kth(u, v, l, r, k) {
    // k-th smallest among elements added between versions u (older) and v (newer)
    while (l < r) {
      const m = (l + r) >> 1,
        c = this.cnt[this.L[v]] - this.cnt[this.L[u]];
      if (k <= c) {
        u = this.L[u];
        v = this.L[v];
        r = m;
      } else {
        k -= c;
        u = this.R[u];
        v = this.R[v];
        l = m + 1;
      }
    }
    return l;
  }
}
function buildKthRangeStructure(a) {
  // queries: kth smallest of a[l..r]
  const { comp, sorted } = compress(a),
    n = a.length,
    m = sorted.length;
  const pst = new PersistentSegTree(n * (Math.ceil(Math.log2(m)) + 3) + 5),
    roots = [0];
  for (let i = 0; i < n; i++)
    roots.push(pst.insert(roots[i], 0, m - 1, comp[i]));
  return (l, r, k) => sorted[pst.kth(roots[l], roots[r + 1], 0, m - 1, k)]; // l, r 0-indexed inclusive
}
```

### Dynamic / Sparse Segment Tree

Nodes are created lazily over a huge range (e.g. `[0, 1e9]`) without coordinate compression.

```js
class DynamicSegTree {
  constructor(lo, hi) {
    this.lo = lo;
    this.hi = hi;
    this.L = [0, 0];
    this.R = [0, 0];
    this.sum = [0, 0];
    this.root = 1;
  } // node 0 = null
  _new() {
    this.L.push(0);
    this.R.push(0);
    this.sum.push(0);
    return this.L.length - 1;
  }
  add(pos, v) {
    // point add (iterative descent)
    let o = this.root,
      l = this.lo,
      r = this.hi;
    const path = [o];
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (pos <= m) {
        if (!this.L[o]) this.L[o] = this._new();
        o = this.L[o];
        r = m;
      } else {
        if (!this.R[o]) this.R[o] = this._new();
        o = this.R[o];
        l = m + 1;
      }
      path.push(o);
    }
    for (const node of path) this.sum[node] += v;
  }
  query(ql, qr, o = this.root, l = this.lo, r = this.hi) {
    // sum over [ql, qr]
    if (!o || qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return this.sum[o];
    const m = Math.floor((l + r) / 2);
    return (
      this.query(ql, qr, this.L[o], l, m) +
      this.query(ql, qr, this.R[o], m + 1, r)
    );
  }
}
```

### Merge Sort Tree

Each node stores the sorted values of its range: answers "how many elements in `a[l..r]` are `<= x`" in O(log^2 n).

```js
class MergeSortTree {
  constructor(a) {
    this.n = a.length;
    this.t = Array.from({ length: 4 * this.n }, () => []);
    this.build(1, 0, this.n - 1, a);
  }
  build(o, l, r, a) {
    if (l === r) {
      this.t[o] = [a[l]];
      return;
    }
    const m = (l + r) >> 1;
    this.build(2 * o, l, m, a);
    this.build(2 * o + 1, m + 1, r, a);
    this.t[o] = mergeSorted(this.t[2 * o], this.t[2 * o + 1]);
  }
  countLessEq(ql, qr, x, o = 1, l = 0, r = this.n - 1) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return upperBound(this.t[o], x); // upperBound from section 8
    const m = (l + r) >> 1;
    return (
      this.countLessEq(ql, qr, x, 2 * o, l, m) +
      this.countLessEq(ql, qr, x, 2 * o + 1, m + 1, r)
    );
  }
}
```

### Segment Tree Beats (range chmin + range sum)

Supports `a[i] = min(a[i], x)` on a range, plus sum queries, in O(log n) amortized (or O(log^2 n) with adds). Each node stores the max, second max, and the count of the max.

```js
class SegTreeBeats {
  constructor(a) {
    this.n = a.length;
    const N = 4 * this.n;
    this.mx = new Array(N).fill(-Infinity);
    this.mx2 = new Array(N).fill(-Infinity);
    this.cnt = new Array(N).fill(0);
    this.sum = new Array(N).fill(0);
    this.build(1, 0, this.n - 1, a);
  }
  pull(o) {
    const L = 2 * o,
      R = 2 * o + 1;
    this.sum[o] = this.sum[L] + this.sum[R];
    if (this.mx[L] === this.mx[R]) {
      this.mx[o] = this.mx[L];
      this.cnt[o] = this.cnt[L] + this.cnt[R];
      this.mx2[o] = Math.max(this.mx2[L], this.mx2[R]);
    } else if (this.mx[L] > this.mx[R]) {
      this.mx[o] = this.mx[L];
      this.cnt[o] = this.cnt[L];
      this.mx2[o] = Math.max(this.mx2[L], this.mx[R]);
    } else {
      this.mx[o] = this.mx[R];
      this.cnt[o] = this.cnt[R];
      this.mx2[o] = Math.max(this.mx[L], this.mx2[R]);
    }
  }
  build(o, l, r, a) {
    if (l === r) {
      this.mx[o] = a[l];
      this.cnt[o] = 1;
      this.sum[o] = a[l];
      return;
    }
    const m = (l + r) >> 1;
    this.build(2 * o, l, m, a);
    this.build(2 * o + 1, m + 1, r, a);
    this.pull(o);
  }
  applyMin(o, x) {
    if (x < this.mx[o]) {
      this.sum[o] -= (this.mx[o] - x) * this.cnt[o];
      this.mx[o] = x;
    }
  }
  push(o) {
    this.applyMin(2 * o, this.mx[o]);
    this.applyMin(2 * o + 1, this.mx[o]);
  }
  chmin(ql, qr, x, o = 1, l = 0, r = this.n - 1) {
    if (qr < l || r < ql || this.mx[o] <= x) return;
    if (ql <= l && r <= qr && this.mx2[o] < x) {
      this.applyMin(o, x);
      return;
    } // only the max values change
    this.push(o);
    const m = (l + r) >> 1;
    this.chmin(ql, qr, x, 2 * o, l, m);
    this.chmin(ql, qr, x, 2 * o + 1, m + 1, r);
    this.pull(o);
  }
  rangeSum(ql, qr, o = 1, l = 0, r = this.n - 1) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return this.sum[o];
    this.push(o);
    const m = (l + r) >> 1;
    return (
      this.rangeSum(ql, qr, 2 * o, l, m) +
      this.rangeSum(ql, qr, 2 * o + 1, m + 1, r)
    );
  }
}
```

### 2D Segment Tree (point update, rectangle sum)

```js
class SegTree2D {
  // iterative, n x m grid, sum
  constructor(n, m) {
    this.n = n;
    this.m = m;
    this.t = Array.from({ length: 2 * n }, () => new Array(2 * m).fill(0));
  }
  update(x, y, v) {
    // set cell (x, y) = v
    x += this.n;
    y += this.m;
    this.t[x][y] = v;
    for (let j = y >> 1; j >= 1; j >>= 1)
      this.t[x][j] = this.t[x][2 * j] + this.t[x][2 * j + 1];
    for (let i = x >> 1; i >= 1; i >>= 1) {
      this.t[i][y] = this.t[2 * i][y] + this.t[2 * i + 1][y];
      for (let j = y >> 1; j >= 1; j >>= 1)
        this.t[i][j] = this.t[i][2 * j] + this.t[i][2 * j + 1];
    }
  }
  _row(x, y1, y2) {
    let s = 0;
    for (y1 += this.m, y2 += this.m; y1 < y2; y1 >>= 1, y2 >>= 1) {
      if (y1 & 1) s += this.t[x][y1++];
      if (y2 & 1) s += this.t[x][--y2];
    }
    return s;
  }
  query(x1, y1, x2, y2) {
    // half-open [x1, x2) x [y1, y2)
    let s = 0;
    for (x1 += this.n, x2 += this.n; x1 < x2; x1 >>= 1, x2 >>= 1) {
      if (x1 & 1) s += this._row(x1++, y1, y2);
      if (x2 & 1) s += this._row(--x2, y1, y2);
    }
    return s;
  }
}
```

---

# 25. Tries and String Data Structures

### Trie: Node, Insert, Search, Prefix Search (StartsWith), Count Prefixes, Delete

Array-based (fast) trie for lowercase letters:

```js
class Trie {
  constructor() {
    this.ch = [new Int32Array(26).fill(-1)];
    this.pass = [0];
    this.end = [0];
  } // node 0 = root
  _newNode() {
    this.ch.push(new Int32Array(26).fill(-1));
    this.pass.push(0);
    this.end.push(0);
    return this.ch.length - 1;
  }
  insert(w) {
    let u = 0;
    for (let i = 0; i < w.length; i++) {
      const c = w.charCodeAt(i) - 97;
      if (this.ch[u][c] === -1) this.ch[u][c] = this._newNode();
      u = this.ch[u][c];
      this.pass[u]++;
    }
    this.end[u]++;
  }
  _find(s) {
    let u = 0;
    for (let i = 0; i < s.length; i++) {
      u = this.ch[u][s.charCodeAt(i) - 97];
      if (u === -1) return -1;
    }
    return u;
  }
  search(w) {
    const u = this._find(w);
    return u !== -1 && this.end[u] > 0;
  }
  startsWith(p) {
    return (
      this._find(p) !== -1 && (p.length === 0 || this.pass[this._find(p)] > 0)
    );
  }
  countPrefix(p) {
    const u = this._find(p);
    return u === -1 ? 0 : p.length === 0 ? this.pass[0] : this.pass[u];
  }
  countWord(w) {
    const u = this._find(w);
    return u === -1 ? 0 : this.end[u];
  }
  erase(w) {
    // deletes one occurrence if present (nodes stay, counts drop)
    if (!this.search(w)) return false;
    let u = 0;
    for (let i = 0; i < w.length; i++) {
      u = this.ch[u][w.charCodeAt(i) - 97];
      this.pass[u]--;
    }
    this.end[u]--;
    return true;
  }
}
// Trie of arbitrary characters: use Map children:  { children: new Map(), end: false }
class MapTrieNode {
  constructor() {
    this.children = new Map();
    this.end = false;
  }
}
```

### Word Dictionary (with '.' wildcard)

```js
class WordDictionary {
  constructor() {
    this.root = new MapTrieNode();
  }
  addWord(w) {
    let n = this.root;
    for (const c of w) {
      if (!n.children.has(c)) n.children.set(c, new MapTrieNode());
      n = n.children.get(c);
    }
    n.end = true;
  }
  search(w, i = 0, n = this.root) {
    if (i === w.length) return n.end;
    if (w[i] === ".") {
      for (const nx of n.children.values())
        if (this.search(w, i + 1, nx)) return true;
      return false;
    }
    return n.children.has(w[i]) && this.search(w, i + 1, n.children.get(w[i]));
  }
}
```

### Binary Trie: Maximum XOR Pair, XOR Queries

Store numbers bit by bit (from the highest bit). Greedy walk picks the opposite bit whenever possible.

```js
class BinaryTrie {
  constructor(bits = 30, maxNodes = 1e6 + 5) {
    this.B = bits;
    this.c0 = new Int32Array(maxNodes);
    this.c1 = new Int32Array(maxNodes);
    this.cnt = new Int32Array(maxNodes);
    this.tot = 1;
  }
  insert(x, delta = 1) {
    // delta = -1 removes one occurrence
    let u = 0;
    for (let b = this.B - 1; b >= 0; b--) {
      const bit = (x >> b) & 1,
        arr = bit ? this.c1 : this.c0;
      if (!arr[u]) arr[u] = this.tot++;
      u = arr[u];
      this.cnt[u] += delta;
    }
  }
  maxXorWith(x) {
    // max of x ^ y over stored y (trie must be non-empty)
    let u = 0,
      res = 0;
    for (let b = this.B - 1; b >= 0; b--) {
      const bit = (x >> b) & 1,
        want = bit ^ 1,
        arr = want ? this.c1 : this.c0,
        other = want ? this.c0 : this.c1;
      if (arr[u] && this.cnt[arr[u]] > 0) {
        res |= 1 << b;
        u = arr[u];
      } else u = other[u];
    }
    return res >>> 0;
  }
}
function maxXorPair(a) {
  const t = new BinaryTrie(30, a.length * 31 + 5);
  let best = 0;
  t.insert(a[0]);
  for (let i = 1; i < a.length; i++) {
    best = Math.max(best, t.maxXorWith(a[i]));
    t.insert(a[i]);
  }
  return best;
}
function maxXorSubarray(a) {
  // prefix xor + binary trie
  const t = new BinaryTrie(30, (a.length + 2) * 31);
  let pref = 0,
    best = 0;
  t.insert(0);
  for (const x of a) {
    pref ^= x;
    best = Math.max(best, t.maxXorWith(pref));
    t.insert(pref);
  }
  return best;
}
```

### Compressed Trie / Radix Tree

Edges store whole substrings; single-child chains are merged.

```js
class RadixNode {
  constructor() {
    this.children = new Map();
    this.end = false;
  }
} // children: firstChar -> { label, node }
class RadixTree {
  constructor() {
    this.root = new RadixNode();
  }
  insert(word) {
    let node = this.root,
      i = 0;
    while (i < word.length) {
      const c = word[i];
      if (!node.children.has(c)) {
        const n = new RadixNode();
        n.end = true;
        node.children.set(c, { label: word.slice(i), node: n });
        return;
      }
      const edge = node.children.get(c),
        label = edge.label;
      let j = 0;
      while (
        j < label.length &&
        i + j < word.length &&
        label[j] === word[i + j]
      )
        j++;
      if (j === label.length) {
        node = edge.node;
        i += j;
        continue;
      }
      const mid = new RadixNode(); // split the edge at j
      mid.children.set(label[j], { label: label.slice(j), node: edge.node });
      edge.label = label.slice(0, j);
      edge.node = mid;
      i += j;
      if (i === word.length) {
        mid.end = true;
        return;
      }
      const n = new RadixNode();
      n.end = true;
      mid.children.set(word[i], { label: word.slice(i), node: n });
      return;
    }
    node.end = true;
  }
  search(word) {
    let node = this.root,
      i = 0;
    while (i < word.length) {
      const edge = node.children.get(word[i]);
      if (!edge || !word.startsWith(edge.label, i)) return false;
      i += edge.label.length;
      node = edge.node;
    }
    return node.end;
  }
}
```

### Suffix Array, Suffix Tree, Suffix Automaton, Aho-Corasick, KMP, Z, Rolling Hash, Rabin-Karp, Manacher

All implemented in section 4. Where each one fits:

| Need                                             | Use                                                 |
| ------------------------------------------------ | --------------------------------------------------- |
| One pattern in one text                          | KMP / Z / Rabin-Karp                                |
| Many patterns at once                            | Aho-Corasick                                        |
| Longest palindromic substring, count palindromes | Manacher                                            |
| Compare substrings quickly                       | Rolling hash (or suffix array + LCP + sparse table) |
| Distinct substrings, k-th substring, occurrences | Suffix automaton / suffix array                     |

### Longest Common Prefix (LCP) Array and Queries

`lcpArray` is in section 4. LCP of two arbitrary suffixes = range minimum over the LCP array between their ranks:

```js
class SparseTable {
  // static range min / max / gcd in O(1) (idempotent operations)
  constructor(a, op = Math.min) {
    this.op = op;
    const n = a.length,
      K = Math.max(1, Math.floor(Math.log2(n)) + 1);
    this.t = [a.slice()];
    for (let k = 1; k < K; k++) {
      const prev = this.t[k - 1],
        cur = new Array(Math.max(0, n - (1 << k) + 1));
      for (let i = 0; i < cur.length; i++)
        cur[i] = op(prev[i], prev[i + (1 << (k - 1))]);
      this.t.push(cur);
    }
    this.lg = new Array(n + 2).fill(0);
    for (let i = 2; i <= n + 1; i++) this.lg[i] = this.lg[i >> 1] + 1;
  }
  query(l, r) {
    const k = this.lg[r - l + 1];
    return this.op(this.t[k][l], this.t[k][r - (1 << k) + 1]);
  }
}
class SuffixLCP {
  constructor(s) {
    this.sa = suffixArray(s);
    this.lcp = lcpArray(s, this.sa);
    this.rank = new Array(s.length);
    this.sa.forEach((p, i) => (this.rank[p] = i));
    this.st = new SparseTable(this.lcp);
  }
  lcpOfSuffixes(i, j) {
    if (i === j) return this.sa.length - i;
    let a = this.rank[i],
      b = this.rank[j];
    if (a > b) [a, b] = [b, a];
    return this.st.query(a + 1, b);
  }
}
```

---

# 26. Bit Manipulation

JavaScript bitwise operators work on **32-bit signed integers**. Bit 31 is the sign bit: `1 << 31 === -2147483648`. Use `>>> 0` to see unsigned, and `BigInt` for 64-bit values.

### Binary Number System, Decimal <-> Binary

```js
const toBinary = (n) => n.toString(2); // 10 -> "1010"
const fromBinary = (s) => parseInt(s, 2); // "1010" -> 10
const toBinaryPadded = (n, w) => n.toString(2).padStart(w, "0");
function toBinaryManual(n) {
  let s = "";
  while (n > 0) {
    s = (n & 1) + s;
    n >>= 1;
  }
  return s || "0";
}
const toUnsigned32 = (x) => x >>> 0; // -1 >>> 0 = 4294967295
```

### AND, OR, XOR, NOT, Shifts

```js
// a & b  -> 1 if both bits 1          a | b  -> 1 if any bit 1          a ^ b -> 1 if bits differ
// ~a     -> flips all bits (= -a - 1)  a << k -> a * 2^k                  a >> k -> floor(a / 2^k), keeps sign
// a >>> k -> logical shift (zero fill)
console.log(5 & 3, 5 | 3, 5 ^ 3, ~5, 1 << 4, -16 >> 2, -16 >>> 28); // 1 7 6 -6 16 -4 15
// Odd / even:  (x & 1) ; multiply/divide by 2: x << 1, x >> 1 ; swap without temp: a ^= b; b ^= a; a ^= b;
```

### Check / Set / Clear / Toggle the i-th Bit

```js
const checkBit = (x, i) => (x >> i) & 1;
const setBit = (x, i) => x | (1 << i);
const clearBit = (x, i) => x & ~(1 << i);
const toggleBit = (x, i) => x ^ (1 << i);
const updateBit = (x, i, v) => (x & ~(1 << i)) | (v << i);
```

### Count Set Bits, Brian Kernighan, Lowest / Highest Set Bit, Power of Two

```js
function popcount(x) {
  // Brian Kernighan: each step clears the lowest set bit
  let c = 0;
  while (x) {
    x &= x - 1;
    c++;
  }
  return c;
}
function popcountFast(x) {
  // parallel bit count for 32-bit values
  x = x - ((x >>> 1) & 0x55555555);
  x = (x & 0x33333333) + ((x >>> 2) & 0x33333333);
  return (((x + (x >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24; // (use Math.imul if you modify)
}
const lowestSetBit = (x) => x & -x; // 12 (1100) -> 4 (0100)
const lowestSetBitIndex = (x) => 31 - Math.clz32(x & -x);
const highestSetBitIndex = (x) => 31 - Math.clz32(x); // floor(log2(x)) for x > 0
const highestSetBit = (x) => (x === 0 ? 0 : 1 << (31 - Math.clz32(x)));
const isPowerOfTwo = (x) => x > 0 && (x & (x - 1)) === 0;
const nextPowerOfTwo = (x) => (x <= 1 ? 1 : 2 ** (32 - Math.clz32(x - 1)));
function popcountBig(x) {
  let c = 0;
  while (x > 0n) {
    c += Number(x & 1n);
    x >>= 1n;
  }
  return c;
} // 64-bit
```

### XOR Properties, XOR From 1 to N, Single Number, Two Unique Numbers

Properties: `a ^ a = 0`, `a ^ 0 = a`, commutative, associative. So XOR-ing a list cancels pairs.

```js
function xorUpTo(n) {
  // 1 ^ 2 ^ ... ^ n
  switch (n & 3) {
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
const xorRange = (l, r) => xorUpTo(r) ^ xorUpTo(l - 1);
function singleNumber(a) {
  let x = 0;
  for (const v of a) x ^= v;
  return x;
} // all others appear twice
function singleNumberThrice(a) {
  // all others appear three times
  let ones = 0,
    twos = 0;
  for (const x of a) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
}
function twoUniqueNumbers(a) {
  // every other number appears twice
  let x = 0;
  for (const v of a) x ^= v;
  const low = x & -x;
  let p = 0,
    q = 0;
  for (const v of a) {
    if (v & low) p ^= v;
    else q ^= v;
  }
  return [p, q];
}
```

### Generate Subsets Using a Bitmask, Bitmasking

```js
function allSubsetsMask(a) {
  // n <= ~20
  const n = a.length,
    res = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    const sub = [];
    for (let i = 0; i < n; i++) if (mask & (1 << i)) sub.push(a[i]);
    res.push(sub);
  }
  return res;
}
function iterateSubmasks(mask, fn) {
  // all non-empty submasks of mask; total over all masks is 3^n
  for (let sub = mask; sub > 0; sub = (sub - 1) & mask) fn(sub);
}
function nextCombinationMask(x) {
  // next integer with the same number of set bits (Gosper's hack)
  const c = x & -x,
    r = x + c;
  return (((r ^ x) >>> 2) / c) | r;
}
// Enumerate all k-subsets of n: for (let m = (1 << k) - 1; m < (1 << n); m = nextCombinationMask(m)) {...}
```

### Bitmask DP, SOS DP (Sum Over Subsets)

Bitmask DP examples are in section 30.

SOS DP: `f[mask] = sum of a[sub] for every sub that is a submask of mask` in O(n 2^n).

```js
function sosSubsetSum(a, n) {
  // a.length === 1 << n
  const f = a.slice();
  for (let i = 0; i < n; i++)
    for (let mask = 0; mask < 1 << n; mask++)
      if (mask & (1 << i)) f[mask] += f[mask ^ (1 << i)];
  return f;
}
function sosSupersetSum(a, n) {
  // sum over supersets
  const f = a.slice();
  for (let i = 0; i < n; i++)
    for (let mask = (1 << n) - 1; mask >= 0; mask--)
      if (!(mask & (1 << i))) f[mask] += f[mask | (1 << i)];
  return f;
}
// Example: count pairs (i, j) with a[i] & a[j] === 0: for each a[i], count elements that are submasks of ~a[i] using SOS.
```

### Gray Code, Bitwise Trie, Maximum XOR Subarray

```js
const grayCode = (i) => i ^ (i >> 1); // consecutive values differ in exactly one bit
function grayToBinary(g) {
  let n = 0;
  for (; g; g >>= 1) n ^= g;
  return n;
}
function grayCodeSequence(bits) {
  return Array.from({ length: 1 << bits }, (_, i) => grayCode(i));
}
// Bitwise trie and maximum XOR subarray: BinaryTrie / maxXorSubarray in section 25.
```

---

# 27. Advanced Number Theory

### Prime Sieves: Linear Sieve, Smallest Prime Factor, Segmented Sieve

```js
function linearSieve(n) {
  // spf[i] = smallest prime factor; each composite visited once, O(n)
  const spf = new Int32Array(n + 1),
    primes = [];
  for (let i = 2; i <= n; i++) {
    if (spf[i] === 0) {
      spf[i] = i;
      primes.push(i);
    }
    for (const p of primes) {
      if (p > spf[i] || i * p > n) break;
      spf[i * p] = p;
    }
  }
  return { spf, primes };
}
function factorizeSPF(x, spf) {
  // O(log x) per number
  const res = [];
  while (x > 1) {
    const p = spf[x];
    let e = 0;
    while (x % p === 0) {
      x = x / p;
      e++;
    }
    res.push([p, e]);
  }
  return res;
}
// Segmented sieve: section 2.
```

### Euler Totient, Mobius Function, Divisor Function

```js
function sieveMobiusPhi(n) {
  // mu[] and phi[] for all 1..n in one linear sieve
  const mu = new Int8Array(n + 1),
    phi = new Int32Array(n + 1),
    isComp = new Uint8Array(n + 1),
    primes = [];
  mu[1] = 1;
  phi[1] = 1;
  for (let i = 2; i <= n; i++) {
    if (!isComp[i]) {
      primes.push(i);
      mu[i] = -1;
      phi[i] = i - 1;
    }
    for (const p of primes) {
      if (i * p > n) break;
      isComp[i * p] = 1;
      if (i % p === 0) {
        mu[i * p] = 0;
        phi[i * p] = phi[i] * p;
        break;
      }
      mu[i * p] = -mu[i];
      phi[i * p] = phi[i] * (p - 1);
    }
  }
  return { mu, phi, primes };
}
function divisorCountSieve(n) {
  // d(k) for all k <= n, O(n log n)
  const d = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) for (let j = i; j <= n; j += i) d[j]++;
  return d;
}
function divisorSumSieve(n) {
  // sigma(k) for all k <= n
  const s = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) for (let j = i; j <= n; j += i) s[j] += i;
  return s;
}
// Mobius use: number of coprime pairs (a, b) in [1, n]^2 = sum over d of mu[d] * floor(n/d)^2
function coprimePairs(n, mu) {
  let t = 0;
  for (let d = 1; d <= n; d++) t += mu[d] * Math.floor(n / d) ** 2;
  return t;
}
```

### Euler's Theorem, Wilson's Theorem, Fermat's Little Theorem

- **Fermat**: `a^(p-1) = 1 (mod p)` for prime `p`, `gcd(a, p) = 1`.
- **Euler**: `a^phi(m) = 1 (mod m)` for `gcd(a, m) = 1`. Reduces huge exponents: `a^e = a^(e mod phi(m)) (mod m)`.
- **Wilson**: `(p-1)! = -1 (mod p)` iff `p` is prime.

```js
function powModHugeExponent(a, eBig, m) {
  // a^e mod m with e as BigInt (e.g. a tower), m arbitrary but gcd(a, m) = 1
  const e = Number(eBig % BigInt(phi(m)));
  return powmod(a, e, m);
}
function modInverseEuler(a, m) {
  return powmod(a, phi(m) - 1, m);
}
const isPrimeWilson = (p) => {
  let f = 1;
  for (let i = 2; i < p; i++) f = mulmod(f, i, p);
  return p > 1 && f === p - 1;
}; // O(p) demo
```

### Primitive Roots, Discrete Logarithm (Baby-Step Giant-Step)

```js
function primitiveRoot(p) {
  // smallest generator of the multiplicative group mod prime p
  const factors = primeFactorize(p - 1).map((x) => x[0]);
  for (let g = 2; g < p; g++)
    if (factors.every((q) => powmod(g, (p - 1) / q, p) !== 1)) return g;
  return -1;
}
function discreteLog(a, b, m) {
  // smallest x with a^x = b (mod m), gcd(a, m) = 1. returns -1 if none. O(sqrt m)
  a %= m;
  b %= m;
  const n = Math.ceil(Math.sqrt(m)),
    table = new Map();
  let cur = b;
  for (let j = 0; j <= n; j++) {
    table.set(cur, j);
    cur = mulmod(cur, a, m);
  } // b * a^j
  const an = powmod(a, n, m);
  cur = 1;
  for (let i = 1; i <= n; i++) {
    cur = mulmod(cur, an, m); // a^(n*i)
    if (table.has(cur)) return i * n - table.get(cur);
  }
  return -1;
}
```

### Miller-Rabin Primality Test, Pollard Rho Factorization (BigInt for 64-bit)

```js
function powModBig(b, e, m) {
  let r = 1n;
  b %= m;
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return r;
}
function millerRabin(nIn) {
  // deterministic for n < 3.3e24 with these bases
  const n = BigInt(nIn);
  if (n < 2n) return false;
  for (const p of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }
  let d = n - 1n,
    r = 0;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    r++;
  }
  outer: for (const a of [
    2n,
    3n,
    5n,
    7n,
    11n,
    13n,
    17n,
    19n,
    23n,
    29n,
    31n,
    37n,
  ]) {
    let x = powModBig(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    for (let i = 1; i < r; i++) {
      x = (x * x) % n;
      if (x === n - 1n) continue outer;
    }
    return false;
  }
  return true;
}
function gcdBig(a, b) {
  while (b) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}
function pollardRho(n) {
  // n BigInt, composite. returns a non-trivial factor
  if (n % 2n === 0n) return 2n;
  while (true) {
    const c = BigInt(1 + Math.floor(Math.random() * 1e9));
    let x = BigInt(2 + Math.floor(Math.random() * 1e9)),
      y = x,
      d = 1n;
    const f = (v) => (v * v + c) % n;
    while (d === 1n) {
      x = f(x);
      y = f(f(y));
      d = gcdBig(x > y ? x - y : y - x, n);
    }
    if (d !== n) return d;
  }
}
function factorizeBig(nIn) {
  // full factorization of a 64-bit number: returns Map(prime -> exponent) (BigInt keys)
  const res = new Map();
  (function go(n) {
    if (n === 1n) return;
    if (millerRabin(n)) {
      res.set(n, (res.get(n) || 0) + 1);
      return;
    }
    for (const p of [2n, 3n, 5n, 7n, 11n, 13n])
      if (n % p === 0n) {
        go(p);
        go(n / p);
        return;
      }
    const d = pollardRho(n);
    go(d);
    go(n / d);
  })(BigInt(nIn));
  return res;
}
```

### Lucas Theorem

`C(n, k) mod p` for a **small prime** `p` and huge `n, k`: multiply `C(n_i, k_i)` over base-`p` digits.

```js
function lucas(n, k, p) {
  // p prime up to ~1e6 (factorials precomputed mod p)
  const f = new Array(p).fill(1);
  for (let i = 1; i < p; i++) f[i] = mulmod(f[i - 1], i, p);
  const small = (a, b) =>
    b > a
      ? 0
      : mulmod(
          f[a],
          mulmod(powmod(f[b], p - 2, p), powmod(f[a - b], p - 2, p), p),
          p,
        );
  let res = 1;
  while (n > 0 || k > 0) {
    res = mulmod(res, small(n % p, k % p), p);
    n = Math.floor(n / p);
    k = Math.floor(k / p);
    if (res === 0) return 0;
  }
  return res;
}
```

### Linear Diophantine Equations

Solve `a x + b y = c`.

```js
function solveDiophantine(a, b, c) {
  // returns a particular solution [x0, y0] and step vector, or null
  const [g, x, y] = extgcd(Math.abs(a), Math.abs(b));
  if (c % g !== 0) return null;
  const k = c / g;
  const x0 = x * k * (a < 0 ? -1 : 1),
    y0 = y * k * (b < 0 ? -1 : 1);
  return { x0, y0, dx: b / g, dy: -a / g }; // all solutions: (x0 + t*dx, y0 + t*dy), t integer
}
function minPositiveX(a, b, c) {
  // smallest non-negative x (b > 0)
  const s = solveDiophantine(a, b, c);
  if (!s) return null;
  const step = Math.abs(b / extgcd(Math.abs(a), Math.abs(b))[0]);
  return ((s.x0 % step) + step) % step;
}
```

### GCD Convolutions

Compute `h[g] = sum over pairs (i, j) with gcd(i, j) = g of a[i] * b[j]` using Dirichlet-style prefix sums over multiples and Mobius-like inversion.

```js
function gcdConvolution(a, b, N, m = MOD) {
  // a[1..N], b[1..N] (index 0 unused)
  const A = new Array(N + 1).fill(0),
    B = new Array(N + 1).fill(0),
    C = new Array(N + 1).fill(0);
  for (let g = 1; g <= N; g++)
    for (let k = g; k <= N; k += g) {
      A[g] = (A[g] + a[k]) % m;
      B[g] = (B[g] + b[k]) % m;
    } // sums over multiples
  for (let g = 1; g <= N; g++) C[g] = mulmod(A[g], B[g], m); // pairs where g divides both i and j
  for (let g = N; g >= 1; g--)
    for (let k = 2 * g; k <= N; k += g) C[g] = (C[g] - C[k] + m) % m; // remove multiples -> gcd exactly g
  return C;
}
```

### Number Theoretic Transform (NTT)

Exact polynomial multiplication modulo `998244353` (primitive root 3). Use `mulmod` from the Toolbox (mod < 2^30).

```js
const NTT_MOD = 998244353,
  NTT_G = 3;
function ntt(a, invert) {
  const n = a.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    let w = powmod(NTT_G, (NTT_MOD - 1) / len, NTT_MOD);
    if (invert) w = powmod(w, NTT_MOD - 2, NTT_MOD);
    const half = len >> 1,
      ws = new Array(half);
    ws[0] = 1;
    for (let k = 1; k < half; k++) ws[k] = mulmod(ws[k - 1], w, NTT_MOD);
    for (let i = 0; i < n; i += len)
      for (let j = 0; j < half; j++) {
        const u = a[i + j],
          v = mulmod(a[i + j + half], ws[j], NTT_MOD);
        a[i + j] = u + v >= NTT_MOD ? u + v - NTT_MOD : u + v;
        a[i + j + half] = u - v < 0 ? u - v + NTT_MOD : u - v;
      }
  }
  if (invert) {
    const inv = powmod(n, NTT_MOD - 2, NTT_MOD);
    for (let i = 0; i < n; i++) a[i] = mulmod(a[i], inv, NTT_MOD);
  }
}
function multiplyNTT(A, B) {
  let n = 1;
  while (n < A.length + B.length - 1) n <<= 1;
  const fa = new Array(n).fill(0),
    fb = new Array(n).fill(0);
  A.forEach((v, i) => (fa[i] = v % NTT_MOD));
  B.forEach((v, i) => (fb[i] = v % NTT_MOD));
  ntt(fa, false);
  ntt(fb, false);
  for (let i = 0; i < n; i++) fa[i] = mulmod(fa[i], fb[i], NTT_MOD);
  ntt(fa, true);
  return fa.slice(0, A.length + B.length - 1);
}
```

---

# 28. Computational Geometry

Prefer **integer arithmetic** (cross/dot products on integer coordinates are exact up to ~9e15). Use `EPS = 1e-9` only when floats are unavoidable.

### Points, Vectors, Distances, Dot and Cross Product

```js
const EPS = 1e-9;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const scale = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1]; // > 0 acute, 0 perpendicular, < 0 obtuse
const cross = (a, b) => a[0] * b[1] - a[1] * b[0]; // > 0 b is counter-clockwise from a; |cross| = parallelogram area
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]); // Euclidean
const dist2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2; // squared, exact for integers
const manhattan = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
const norm = (a) => Math.hypot(a[0], a[1]);
const angleOf = (a) => Math.atan2(a[1], a[0]);
```

### Orientation of Three Points, Collinearity

```js
function orientation(a, b, c) {
  // 1 = counter-clockwise (left turn), -1 = clockwise, 0 = collinear
  const v = cross(sub(b, a), sub(c, a));
  return v > 0 ? 1 : v < 0 ? -1 : 0;
}
const collinear = (a, b, c) => cross(sub(b, a), sub(c, a)) === 0;
function onSegment(p, a, b) {
  // p on segment ab (integers)
  return (
    cross(sub(b, a), sub(p, a)) === 0 &&
    Math.min(a[0], b[0]) <= p[0] &&
    p[0] <= Math.max(a[0], b[0]) &&
    Math.min(a[1], b[1]) <= p[1] &&
    p[1] <= Math.max(a[1], b[1])
  );
}
```

### Line Intersection, Segment Intersection

```js
function segmentsIntersect(a, b, c, d) {
  // closed segments ab and cd (integers)
  const o1 = orientation(a, b, c),
    o2 = orientation(a, b, d),
    o3 = orientation(c, d, a),
    o4 = orientation(c, d, b);
  if (o1 !== o2 && o3 !== o4) return true;
  return (
    (o1 === 0 && onSegment(c, a, b)) ||
    (o2 === 0 && onSegment(d, a, b)) ||
    (o3 === 0 && onSegment(a, c, d)) ||
    (o4 === 0 && onSegment(b, c, d))
  );
}
function lineIntersection(p1, d1, p2, d2) {
  // lines p + t*d; returns point or null if parallel
  const den = cross(d1, d2);
  if (Math.abs(den) < EPS) return null;
  const t = cross(sub(p2, p1), d2) / den;
  return add(p1, scale(d1, t));
}
function lineFromPoints(a, b) {
  return {
    A: b[1] - a[1],
    B: a[0] - b[0],
    C: (b[1] - a[1]) * a[0] + (a[0] - b[0]) * a[1],
  };
} // Ax + By = C
function pointToLineDistance(p, a, b) {
  return Math.abs(cross(sub(b, a), sub(p, a))) / dist(a, b);
}
function pointToSegmentDistance(p, a, b) {
  const ab = sub(b, a),
    t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / dot(ab, ab)));
  return dist(p, add(a, scale(ab, t)));
}
```

### Polygon Area (Shoelace), Point in Polygon

```js
function polygonArea2(poly) {
  // twice the signed area (integer exact); > 0 if counter-clockwise
  let s = 0;
  for (let i = 0; i < poly.length; i++)
    s += cross(poly[i], poly[(i + 1) % poly.length]);
  return s;
}
const polygonArea = (poly) => Math.abs(polygonArea2(poly)) / 2;
function pointInPolygon(p, poly) {
  // returns 0 outside, 1 inside, 2 on boundary (ray casting)
  let inside = false;
  for (let i = 0, n = poly.length; i < n; i++) {
    const a = poly[i],
      b = poly[(i + 1) % n];
    if (onSegment(p, a, b)) return 2;
    if (
      a[1] > p[1] !== b[1] > p[1] &&
      p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]
    )
      inside = !inside;
  }
  return inside ? 1 : 0;
}
function latticePointsInPolygon(poly) {
  // Pick: A = I + B/2 - 1  ->  I = A - B/2 + 1
  let B = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i],
      b = poly[(i + 1) % poly.length];
    B += gcd(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
  }
  return { interior: (Math.abs(polygonArea2(poly)) - B + 2) / 2, boundary: B };
}
```

### Convex Hull: Monotone Chain and Graham Scan

```js
function convexHull(pts) {
  // Andrew's monotone chain, O(n log n); counter-clockwise, no collinear points
  pts = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  pts = pts.filter(
    (p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1],
  );
  if (pts.length <= 2) return pts;
  const lower = [],
    upper = [];
  for (const p of pts) {
    while (
      lower.length >= 2 &&
      cross(
        sub(lower[lower.length - 1], lower[lower.length - 2]),
        sub(p, lower[lower.length - 1]),
      ) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (
      upper.length >= 2 &&
      cross(
        sub(upper[upper.length - 1], upper[upper.length - 2]),
        sub(p, upper[upper.length - 1]),
      ) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper); // use `< 0` instead of `<= 0` to keep collinear boundary points
}
function grahamScan(pts) {
  // sort by polar angle around the lowest point
  pts = pts.slice();
  const p0 = pts.reduce((m, p) =>
    p[1] < m[1] || (p[1] === m[1] && p[0] < m[0]) ? p : m,
  );
  const rest = pts
    .filter((p) => p !== p0)
    .sort((a, b) => {
      const o = cross(sub(a, p0), sub(b, p0));
      return o !== 0 ? -o : dist2(p0, a) - dist2(p0, b);
    });
  const st = [p0];
  for (const p of rest) {
    while (
      st.length >= 2 &&
      cross(
        sub(st[st.length - 1], st[st.length - 2]),
        sub(p, st[st.length - 1]),
      ) <= 0
    )
      st.pop();
    st.push(p);
  }
  return st;
}
```

### Closest Pair of Points

D&C version is in section 16. Sweep-line version below.

### Sweep Line / Line Sweep Algorithm

Process events sorted by x (or time); maintain a structure of "active" objects.

```js
function maxOverlap(intervals) {
  // max number of intervals covering one point
  const ev = [];
  for (const [l, r] of intervals) {
    ev.push([l, 1]);
    ev.push([r, -1]);
  }
  ev.sort((a, b) => a[0] - b[0] || b[1] - a[1]); // starts before ends at equal coordinates (closed intervals)
  let cur = 0,
    best = 0;
  for (const [, d] of ev) {
    cur += d;
    best = Math.max(best, cur);
  }
  return best;
}
function unionLength(intervals) {
  // total length covered
  const iv = mergeIntervals(intervals);
  return iv.reduce((s, [l, r]) => s + r - l, 0);
}
function rectangleUnionArea(rects) {
  // rects: [x1, y1, x2, y2]; O(n^2) sweep with coordinate compression
  const xs = [...new Set(rects.flatMap((r) => [r[0], r[2]]))].sort(
    (a, b) => a - b,
  );
  let area = 0;
  for (let i = 0; i + 1 < xs.length; i++) {
    const ys = rects
      .filter((r) => r[0] <= xs[i] && r[2] >= xs[i + 1])
      .map((r) => [r[1], r[3]]);
    area += (xs[i + 1] - xs[i]) * unionLength(ys);
  }
  return area;
}
function closestPairSweep(pts) {
  // sweep by x; active = points within current best distance, sorted by y
  pts = pts.slice().sort((a, b) => a[0] - b[0]);
  let best = Infinity,
    left = 0;
  const active = []; // (array splice: fine for n <= ~5e4)
  for (const p of pts) {
    const d = Math.sqrt(best);
    while (left < pts.length && pts[left][0] < p[0] - d) {
      const k = active.indexOf(pts[left]);
      if (k >= 0) active.splice(k, 1);
      left++;
    }
    for (
      let i = lowerBoundBy(active, p[1] - d);
      i < active.length && active[i][1] <= p[1] + d;
      i++
    )
      best = Math.min(best, dist2(p, active[i]));
    active.splice(lowerBoundBy(active, p[1]), 0, p);
  }
  return Math.sqrt(best);
}
function lowerBoundBy(arr, y) {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (arr[m][1] < y) lo = m + 1;
    else hi = m;
  }
  return lo;
}
```

### Rotating Calipers (diameter of a convex polygon)

```js
function convexDiameter(hull) {
  // hull in counter-clockwise order, returns the farthest pair distance
  const n = hull.length;
  if (n === 1) return 0;
  if (n === 2) return dist(hull[0], hull[1]);
  let best = 0,
    j = 1;
  for (let i = 0; i < n; i++) {
    const a = hull[i],
      b = hull[(i + 1) % n];
    while (
      Math.abs(cross(sub(b, a), sub(hull[(j + 1) % n], a))) >
      Math.abs(cross(sub(b, a), sub(hull[j], a)))
    )
      j = (j + 1) % n;
    best = Math.max(best, dist2(a, hull[j]), dist2(b, hull[j]));
  }
  return Math.sqrt(best);
}
```

### Half-Plane Intersection

Each half-plane is `{p, d}`: the allowed side is to the **left** of direction `d`. Add four bounding lines first if the region could be unbounded. Returns the polygon vertices of the intersection (empty if none).

```js
function halfPlaneIntersection(lines) {
  const onLeft = (l, p) => cross(l.d, sub(p, l.p)) > 0;
  const inter = (a, b) => {
    const w = sub(a.p, b.p),
      t = cross(b.d, w) / cross(a.d, b.d);
    return add(a.p, scale(a.d, t));
  };
  const L = lines
    .map((l) => ({ p: l.p, d: l.d, ang: Math.atan2(l.d[1], l.d[0]) }))
    .sort((a, b) => a.ang - b.ang);
  const n = L.length,
    q = new Array(n),
    p = new Array(n);
  let first = 0,
    last = 0;
  q[0] = L[0];
  for (let i = 1; i < n; i++) {
    while (first < last && !onLeft(L[i], p[last - 1])) last--;
    while (first < last && !onLeft(L[i], p[first])) first++;
    q[++last] = L[i];
    if (Math.abs(cross(q[last].d, q[last - 1].d)) < EPS) {
      // parallel, same direction: keep the more restrictive
      last--;
      if (onLeft(q[last], L[i].p)) q[last] = L[i];
    }
    if (first < last) p[last - 1] = inter(q[last - 1], q[last]);
  }
  while (first < last && !onLeft(q[first], p[last - 1])) last--;
  if (last - first <= 1) return [];
  p[last] = inter(q[last], q[first]);
  return p.slice(first, last + 1);
}
// Bounding box helper: [{p:[-1e9,-1e9],d:[1,0]},{p:[1e9,-1e9],d:[0,1]},{p:[1e9,1e9],d:[-1,0]},{p:[-1e9,1e9],d:[0,-1]}]
```

---

# 29. Advanced Competitive Programming Techniques

### Coordinate Compression

See `compress` in section 7.

### Meet in the Middle

Split `n <= 40` items into two halves of 20: enumerate each half (`2^20`), then combine with sorting + two pointers or binary search.

```js
function subsetSumsOf(a) {
  let sums = [0];
  for (const x of a) {
    const n = sums.length;
    for (let i = 0; i < n; i++) sums.push(sums[i] + x);
  }
  return sums;
}
function countSubsetsWithSumMITM(a, target) {
  // number of subsets with sum == target, n <= 40
  const h = a.length >> 1,
    L = subsetSumsOf(a.slice(0, h)),
    R = subsetSumsOf(a.slice(h)).sort((x, y) => x - y);
  let cnt = 0;
  for (const s of L)
    cnt += upperBound(R, target - s) - lowerBound(R, target - s);
  return cnt;
}
```

### Square Root Decomposition

Blocks of size ~sqrt(n): update O(1)/O(sqrt n), query O(sqrt n). Useful for operations that segment trees cannot combine.

```js
class SqrtDecomposition {
  // point update, range sum
  constructor(a) {
    this.a = a.slice();
    this.n = a.length;
    this.B = Math.max(1, Math.floor(Math.sqrt(this.n)));
    this.blocks = new Array(Math.ceil(this.n / this.B)).fill(0);
    for (let i = 0; i < this.n; i++)
      this.blocks[Math.floor(i / this.B)] += a[i];
  }
  update(i, v) {
    this.blocks[Math.floor(i / this.B)] += v - this.a[i];
    this.a[i] = v;
  }
  query(l, r) {
    let s = 0;
    const bl = Math.floor(l / this.B),
      br = Math.floor(r / this.B);
    if (bl === br) {
      for (let i = l; i <= r; i++) s += this.a[i];
      return s;
    }
    for (let i = l; i < (bl + 1) * this.B; i++) s += this.a[i];
    for (let b = bl + 1; b < br; b++) s += this.blocks[b];
    for (let i = br * this.B; i <= r; i++) s += this.a[i];
    return s;
  }
}
```

### Mo's Algorithm (offline range queries)

Sort queries by `(block of l, r)`; move two pointers with `add/remove`. O((n + q) sqrt n).

```js
function mosAlgorithm(a, queries) {
  // queries: [l, r] inclusive. Example: number of distinct values in each range
  const n = a.length,
    B = Math.max(1, Math.floor(n / Math.sqrt(queries.length || 1)));
  const order = queries
    .map((_, i) => i)
    .sort((x, y) => {
      const bx = Math.floor(queries[x][0] / B),
        by = Math.floor(queries[y][0] / B);
      if (bx !== by) return bx - by;
      return bx & 1
        ? queries[y][1] - queries[x][1]
        : queries[x][1] - queries[y][1]; // zig-zag order
    });
  const { comp } = compress(a),
    cnt = new Int32Array(n + 1),
    ans = new Array(queries.length);
  let distinct = 0;
  const add = (i) => {
    if (cnt[comp[i]]++ === 0) distinct++;
  };
  const remove = (i) => {
    if (--cnt[comp[i]] === 0) distinct--;
  };
  let curL = 0,
    curR = -1;
  for (const qi of order) {
    const [l, r] = queries[qi];
    while (curL > l) add(--curL);
    while (curR < r) add(++curR);
    while (curL < l) remove(curL++);
    while (curR > r) remove(curR--);
    ans[qi] = distinct;
  }
  return ans;
}
```

### Sparse Table

`SparseTable` class (section 25): O(n log n) build, O(1) range min / max / gcd queries.

### Binary Lifting

`LCA` class (section 22) provides `kthAncestor` and `lca`. Generic "jump pointers" pattern:

```js
function buildJump(next, LOG = 20) {
  // next[i] = successor (or i itself at the end)
  const up = [next.slice()];
  for (let j = 1; j < LOG; j++) {
    const p = up[j - 1];
    up.push(p.map((x) => p[x]));
  }
  return up;
}
function jump(up, v, k) {
  for (let j = 0; k > 0; j++, k = Math.floor(k / 2)) if (k & 1) v = up[j][v];
  return v;
}
```

### Euler Tour Technique

Flatten a tree so every subtree is a contiguous range, then use a Fenwick / segment tree for subtree queries and updates.

```js
function eulerTour(n, adj, root = 0) {
  // tin/tout via the iterative DFS in section 21
  const { tin, tout, parent } = dfsWithTimes(adj, root);
  // subtree of v corresponds to positions with tin in [tin[v], tout[v]]. For compact ranges, use a counter that increments only on entry:
  const enter = new Array(n).fill(0),
    exit = new Array(n).fill(0),
    st = [root],
    ptr = new Array(n).fill(0);
  let timer = 0;
  enter[root] = timer++;
  while (st.length) {
    const u = st[st.length - 1];
    if (ptr[u] < adj[u].length) {
      const v = adj[u][ptr[u]++];
      if (v !== parent[u]) {
        enter[v] = timer++;
        st.push(v);
      }
    } else {
      exit[u] = timer - 1;
      st.pop();
    }
  }
  return { enter, exit, parent }; // subtree of v = positions [enter[v], exit[v]]
}
```

### Heavy-Light Decomposition, Centroid Decomposition, Small to Large Merging

Implemented in sections 22 and 23.

### Offline Queries vs Online Queries

- **Offline**: you know all queries upfront. Reorder them (sort by right endpoint, by threshold, by time) to use simpler structures: Mo's, offline Fenwick, DSU with sorted edges, parallel binary search.
- **Online**: each answer must be given immediately (forced by `last answer` encoding): need persistent / balanced structures.

```js
function countDistinctInRangesOffline(a, queries) {
  // sort by r, Fenwick marks the last occurrence of each value
  const n = a.length,
    f = new Fenwick(n),
    last = new Map(),
    ans = new Array(queries.length);
  const order = queries
    .map((_, i) => i)
    .sort((x, y) => queries[x][1] - queries[y][1]);
  let r = -1;
  for (const qi of order) {
    const [l, qr] = queries[qi];
    while (r < qr) {
      r++;
      if (last.has(a[r])) f.update(last.get(a[r]), -1);
      f.update(r, 1);
      last.set(a[r], r);
    }
    ans[qi] = f.range(l, qr);
  }
  return ans;
}
```

### Persistent Data Structures, Lazy Propagation

Persistent segment tree: section 24. Lazy propagation: section 24. Persistent stack / list: just keep pointers to immutable nodes:

```js
class PersistentStack {
  // each version is a pointer; push/pop are O(1) and old versions stay valid
  static push(node, val) {
    return { val, next: node };
  }
  static pop(node) {
    return node.next;
  }
  static top(node) {
    return node ? node.val : undefined;
  }
}
```

### Randomized and Probability-Based Algorithms

```js
// Randomized quicksort / quickselect: sections 3 and 9. Random hash base: section 4. Treap priorities: section 19.
function freivalds(A, B, C, rounds = 10) {
  // probabilistic check of A*B == C in O(n^2) per round
  const n = A.length;
  for (let t = 0; t < rounds; t++) {
    const r = Array.from({ length: n }, () => (Math.random() < 0.5 ? 0 : 1));
    const mul = (M, v) =>
      M.map((row) => row.reduce((s, x, j) => s + x * v[j], 0));
    const Br = mul(B, r),
      ABr = mul(A, Br),
      Cr = mul(C, r);
    for (let i = 0; i < n; i++) if (ABr[i] !== Cr[i]) return false;
  }
  return true; // wrong with probability <= 2^-rounds
}
function estimatePi(samples = 1e6) {
  // Monte Carlo
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random(),
      y = Math.random();
    if (x * x + y * y <= 1) inside++;
  }
  return (4 * inside) / samples;
}
// Tip: when an adversary can craft tests (hash collisions, quicksort killers), randomize.
```

### Game Theory: Nim, Sprague-Grundy, Grundy Numbers

- **Nim**: XOR of pile sizes `!= 0` -> first player wins.
- **Sprague-Grundy**: any impartial game = Nim pile with size `grundy(state) = mex{grundy(next states)}`. For sums of independent games, XOR the Grundy values.

```js
function nimWinner(piles) {
  return piles.reduce((x, p) => x ^ p, 0) !== 0 ? "First" : "Second";
}
function mex(set) {
  let m = 0;
  while (set.has(m)) m++;
  return m;
}
function grundyNumbers(maxN, moves) {
  // moves(n) -> list of reachable states (< n). Example: take 1, 3 or 4 stones
  const g = new Array(maxN + 1).fill(0);
  for (let n = 1; n <= maxN; n++)
    g[n] = mex(new Set(moves(n).map((m) => g[m])));
  return g;
}
// Example: stones game with moves {1, 3, 4}:
//   const g = grundyNumbers(100, (n) => [1, 3, 4].filter((k) => k <= n).map((k) => n - k));
// Winning position <=> grundy != 0.   Sum of games: XOR of grundy values of each component.
function stairNim(a) {
  let x = 0;
  for (let i = 1; i < a.length; i += 2) x ^= a[i];
  return x !== 0;
} // moving coins down stairs: odd steps matter
```

### Minimax, Alpha-Beta Pruning

```js
function minimax(state, depth, alpha, beta, maximizing, game) {
  // game: { isTerminal(s), evaluate(s), moves(s), apply(s, m) } with evaluate from the maximizer's perspective
  if (depth === 0 || game.isTerminal(state)) return game.evaluate(state);
  if (maximizing) {
    let best = -Infinity;
    for (const m of game.moves(state)) {
      best = Math.max(
        best,
        minimax(game.apply(state, m), depth - 1, alpha, beta, false, game),
      );
      alpha = Math.max(alpha, best);
      if (alpha >= beta) break; // beta cut-off
    }
    return best;
  }
  let best = Infinity;
  for (const m of game.moves(state)) {
    best = Math.min(
      best,
      minimax(game.apply(state, m), depth - 1, alpha, beta, true, game),
    );
    beta = Math.min(beta, best);
    if (alpha >= beta) break; // alpha cut-off
  }
  return best;
}
// Usage: minimax(start, 9, -Infinity, Infinity, true, ticTacToe)
```

### Convex Hull Trick, Li Chao Tree

Li Chao tree: insert lines `y = m x + b` in any order, query the minimum at any integer `x` in `[lo, hi]`, O(log C) each.

```js
class LiChao {
  constructor(lo, hi) {
    this.lo = lo;
    this.hi = hi;
    this.M = [0];
    this.B = [Infinity];
    this.L = [-1];
    this.R = [-1];
  } // node 0 = root (no line yet)
  _eval(i, x) {
    return this.M[i] * x + this.B[i];
  }
  addLine(m, b) {
    let node = 0,
      l = this.lo,
      r = this.hi,
      cm = m,
      cb = b;
    while (true) {
      const mid = Math.floor((l + r) / 2);
      const curM = this.M[node],
        curB = this.B[node];
      const newBetterMid = cm * mid + cb < curM * mid + curB;
      if (newBetterMid) {
        this.M[node] = cm;
        this.B[node] = cb;
        cm = curM;
        cb = curB;
      } // keep better-at-mid line here; push the other down
      if (cb === Infinity || l === r) return;
      const leftBetter = cm * l + cb < this.M[node] * l + this.B[node];
      const rightBetter = cm * r + cb < this.M[node] * r + this.B[node];
      if (leftBetter) {
        if (this.L[node] === -1) {
          this.L[node] = this._newNode();
        }
        node = this.L[node];
        r = mid;
      } else if (rightBetter) {
        if (this.R[node] === -1) {
          this.R[node] = this._newNode();
        }
        node = this.R[node];
        l = mid + 1;
      } else return;
    }
  }
  _newNode() {
    this.M.push(0);
    this.B.push(Infinity);
    this.L.push(-1);
    this.R.push(-1);
    return this.M.length - 1;
  }
  query(x) {
    let node = 0,
      l = this.lo,
      r = this.hi,
      best = Infinity;
    while (node !== -1) {
      best = Math.min(best, this._eval(node, x));
      if (l === r) break;
      const mid = Math.floor((l + r) / 2);
      if (x <= mid) {
        node = this.L[node];
        r = mid;
      } else {
        node = this.R[node];
        l = mid + 1;
      }
    }
    return best;
  }
}
// Max query: insert (-m, -b) and negate the answer.   Monotone CHT with a deque: section 17.
```

### Fast Fourier Transform, Number Theoretic Transform, Matrix Exponentiation, Ternary Search, Parallel Binary Search, D&C Optimization, Knuth Optimization

Implemented earlier: FFT (section 16), NTT (section 27), matrix exponentiation (section 2), ternary search and parallel binary search (section 8), D&C optimization and Knuth optimization (section 17).

---

# 30. Graph and Bitmask DP Problems

### Bitmask DP and Travelling Salesperson Problem

`dp[mask][i]` = minimum cost of a path that visited the set `mask` and currently stands at `i`. O(2^n n^2), n <= ~20.

```js
function tsp(dist) {
  // dist[i][j]; returns min cost of a Hamiltonian cycle starting and ending at 0
  const n = dist.length,
    FULL = 1 << n,
    INF = 1e18;
  const dp = Array.from({ length: FULL }, () => new Float64Array(n).fill(INF));
  dp[1][0] = 0;
  for (
    let mask = 1;
    mask < FULL;
    mask += 2 // only masks containing city 0
  )
    for (let i = 0; i < n; i++) {
      const cur = dp[mask][i];
      if (cur >= INF || !(mask & (1 << i))) continue;
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;
        const nm = mask | (1 << j),
          v = cur + dist[i][j];
        if (v < dp[nm][j]) dp[nm][j] = v;
      }
    }
  let best = INF;
  for (let i = 1; i < n; i++)
    best = Math.min(best, dp[FULL - 1][i] + dist[i][0]);
  return n === 1 ? 0 : best;
}
```

### Hamiltonian Path DP, Shortest Hamiltonian Path

```js
function hamiltonianPathExists(adj, n) {
  // adj as lists; dp[mask] = bitmask of possible END vertices of paths covering mask
  const dp = new Int32Array(1 << n);
  for (let i = 0; i < n; i++) dp[1 << i] = 1 << i;
  for (let mask = 1; mask < 1 << n; mask++)
    for (let i = 0; i < n; i++) {
      if (!(dp[mask] & (1 << i))) continue;
      for (const j of adj[i])
        if (!(mask & (1 << j))) dp[mask | (1 << j)] |= 1 << j;
    }
  return dp[(1 << n) - 1] !== 0;
}
function shortestHamiltonianPath(dist) {
  // any start, any end
  const n = dist.length,
    FULL = 1 << n,
    INF = 1e18,
    dp = Array.from({ length: FULL }, () => new Float64Array(n).fill(INF));
  for (let i = 0; i < n; i++) dp[1 << i][i] = 0;
  for (let mask = 1; mask < FULL; mask++)
    for (let i = 0; i < n; i++) {
      if (dp[mask][i] >= INF) continue;
      for (let j = 0; j < n; j++)
        if (!(mask & (1 << j))) {
          const nm = mask | (1 << j),
            v = dp[mask][i] + dist[i][j];
          if (v < dp[nm][j]) dp[nm][j] = v;
        }
    }
  return Math.min(...dp[FULL - 1]);
}
```

### Assignment Problem, Minimum Cost Matching

Bitmask version (n <= 20) and Hungarian algorithm (n up to ~500).

```js
function assignmentBitmask(cost) {
  // person i takes exactly one job; minimize total cost
  const n = cost.length,
    dp = new Array(1 << n).fill(Infinity);
  dp[0] = 0;
  for (let mask = 0; mask < 1 << n; mask++) {
    const i = popcount(mask); // next person to assign
    if (i >= n || dp[mask] === Infinity) continue;
    for (let j = 0; j < n; j++)
      if (!(mask & (1 << j)))
        dp[mask | (1 << j)] = Math.min(
          dp[mask | (1 << j)],
          dp[mask] + cost[i][j],
        );
  }
  return dp[(1 << n) - 1];
}
function hungarian(a) {
  // a is 1-indexed (n rows <= m columns), minimize. O(n^2 m)
  const n = a.length - 1,
    m = a[0].length - 1,
    INF = 1e18;
  const u = new Array(n + 1).fill(0),
    v = new Array(m + 1).fill(0),
    p = new Array(m + 1).fill(0),
    way = new Array(m + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array(m + 1).fill(INF),
      used = new Array(m + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = INF,
        j1 = 0;
      for (let j = 1; j <= m; j++)
        if (!used[j]) {
          const cur = a[i0][j] - u[i0] - v[j];
          if (cur < minv[j]) {
            minv[j] = cur;
            way[j] = j0;
          }
          if (minv[j] < delta) {
            delta = minv[j];
            j1 = j;
          }
        }
      for (let j = 0; j <= m; j++) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else minv[j] -= delta;
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0);
  }
  const assign = new Array(n + 1).fill(0);
  for (let j = 1; j <= m; j++) if (p[j]) assign[p[j]] = j;
  return { cost: -v[0], assign }; // assign[i] = column chosen for row i
}
```

### Subset DP (3^n submask enumeration)

```js
function minPartitionCost(n, costOf) {
  // partition n items into groups; costOf[mask] = cost of one group. dp[mask] = best for set mask
  const dp = new Array(1 << n).fill(Infinity);
  dp[0] = 0;
  for (let mask = 1; mask < 1 << n; mask++) {
    const low = mask & -mask; // force the lowest item into the group to avoid counting orders
    for (let sub = mask; sub > 0; sub = (sub - 1) & mask)
      if (sub & low)
        dp[mask] = Math.min(dp[mask], dp[mask ^ sub] + costOf[sub]);
  }
  return dp[(1 << n) - 1];
}
function minTripsKnapsack(weights, cap) {
  // pack items into the fewest trips; classic subset DP O(2^n n)
  const n = weights.length,
    trips = new Array(1 << n).fill(Infinity),
    last = new Array(1 << n).fill(0);
  trips[0] = 1;
  last[0] = 0;
  for (let mask = 1; mask < 1 << n; mask++)
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i))) continue;
      const prev = mask ^ (1 << i);
      let t = trips[prev],
        l = last[prev] + weights[i];
      if (l > cap) {
        t++;
        l = weights[i];
      }
      if (t < trips[mask] || (t === trips[mask] && l < last[mask])) {
        trips[mask] = t;
        last[mask] = l;
      }
    }
  return trips[(1 << n) - 1];
}
// SOS DP: section 26.  Digit DP: section 17.
```

### Profile DP and Broken Profile DP

Count domino tilings of an `n x m` grid (cell-by-cell "broken profile": the mask has `m` bits describing the frontier).

```js
function dominoTilings(n, m, mod = MOD) {
  let dp = new Array(1 << m).fill(0);
  dp[0] = 1;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      const nd = new Array(1 << m).fill(0);
      for (let mask = 0; mask < 1 << m; mask++) {
        const v = dp[mask];
        if (!v) continue;
        if (mask & (1 << j)) {
          nd[mask ^ (1 << j)] = (nd[mask ^ (1 << j)] + v) % mod;
        } // already covered from above
        else {
          if (i + 1 < n) nd[mask | (1 << j)] = (nd[mask | (1 << j)] + v) % mod; // vertical domino
          if (j + 1 < m && !(mask & (1 << (j + 1))))
            nd[mask | (1 << (j + 1))] = (nd[mask | (1 << (j + 1))] + v) % mod; // horizontal
        }
      }
      dp = nd;
    }
  return dp[0];
}
// dominoTilings(8, 8) = 12988816
```

### DP on Trees, Tree Matching, Minimum Vertex Cover on Trees

```js
function maxMatchingTree(n, adj) {
  // greedy from the leaves: match a node with its parent if both are free
  const { order, parent } = treeOrder(n, adj),
    used = new Array(n).fill(false);
  let cnt = 0;
  for (let i = n - 1; i > 0; i--) {
    const u = order[i],
      p = parent[u];
    if (!used[u] && !used[p]) {
      used[u] = used[p] = true;
      cnt++;
    }
  }
  return cnt;
}
function minVertexCoverTree(n, adj) {
  // dp[u][1] = u in cover, dp[u][0] = u not in cover (children must be in)
  const { order, parent } = treeOrder(n, adj),
    in1 = new Array(n).fill(1),
    in0 = new Array(n).fill(0);
  for (let i = n - 1; i > 0; i--) {
    const u = order[i],
      p = parent[u];
    in1[p] += Math.min(in0[u], in1[u]);
    in0[p] += in1[u];
  }
  return Math.min(in0[0], in1[0]); // by König on trees this equals max matching
}
```

### Rerooting DP (Tree Rerooting)

Compute an answer for **every** node as root in O(n): first a bottom-up pass, then a top-down pass that passes "everything outside the subtree" to children.

```js
function sumOfDistancesAllRoots(n, adj) {
  const { order, parent } = treeOrder(n, adj),
    sz = new Array(n).fill(1),
    down = new Array(n).fill(0),
    ans = new Array(n).fill(0);
  for (let i = n - 1; i > 0; i--) {
    const u = order[i],
      p = parent[u];
    sz[p] += sz[u];
    down[p] += down[u] + sz[u];
  } // distances to nodes in subtree
  ans[order[0]] = down[order[0]];
  for (let i = 1; i < n; i++) {
    const u = order[i],
      p = parent[u];
    ans[u] = ans[p] - sz[u] + (n - sz[u]);
  } // move root from p to u
  return ans;
}
function farthestNodeDistanceAllRoots(n, adj) {
  // eccentricity of every node (tree, unweighted)
  const { order, parent } = treeOrder(n, adj),
    d1 = new Array(n).fill(0),
    d2 = new Array(n).fill(0),
    via = new Array(n).fill(-1),
    up = new Array(n).fill(0);
  for (let i = n - 1; i > 0; i--) {
    const u = order[i],
      p = parent[u],
      val = d1[u] + 1;
    if (val > d1[p]) {
      d2[p] = d1[p];
      d1[p] = val;
      via[p] = u;
    } else if (val > d2[p]) d2[p] = val;
  }
  for (let i = 1; i < n; i++) {
    const u = order[i],
      p = parent[u];
    up[u] = 1 + Math.max(up[p], via[p] === u ? d2[p] : d1[p]);
  }
  return d1.map((x, i) => Math.max(x, up[i]));
}
```

### DP on DAG, DP With Bitmasks

`longestPathDAG` and `countPathsDAG` are in section 17. Bitmask-state DP (non-graph) example:

```js
function countPermutationsNoAdjacentConflict(n, bad) {
  // bad[i][j] = true if i and j cannot be adjacent; count orderings of 0..n-1
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[1 << i][i] = 1;
  for (let mask = 1; mask < 1 << n; mask++)
    for (let i = 0; i < n; i++) {
      if (!dp[mask][i]) continue;
      for (let j = 0; j < n; j++)
        if (!(mask & (1 << j)) && !bad[i][j])
          dp[mask | (1 << j)][j] += dp[mask][i];
    }
  return dp[(1 << n) - 1].reduce((s, x) => s + x, 0);
}
```

---

# Appendix: Contest-Day Checklist

1. **Read constraints first** and pick the complexity target (section 0.6).
2. **Overflow?** Sums of up to 1e5 values of 1e9 reach 1e14 (fine for doubles). Products need `mulmod` / `BigInt`.
3. **Sort numerically** with `(a, b) => a - b`.
4. **Output in one `console.log`**, never in a loop.
5. **Recursion deeper than ~1e4?** Switch to iterative (BFS order, explicit stack).
6. **Reset per-test state** inside the `t` loop; do not allocate `1e6`-sized arrays on every test, allocate once and clear only the used part.
7. **Edge cases**: `n = 1`, all equal, already sorted, negative numbers, empty answer (`-1`).
8. **Stress-test** with a brute force on small random inputs before submitting hard problems.

### Skeleton to Start Every Problem

```js
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);
let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = Number(input[index++]);
  return arr;
}

function solve(n, arr) {
  // ... small helper functions above, answer here
  return arr.join(" ");
}

for (let tc = 0; tc < t; tc++) {
  const n = Number(input[index++]);
  const arr = inputArray(n);
  outcomes.push(solve(n, arr));
}

console.log(outcomes.join("\n"));
```
