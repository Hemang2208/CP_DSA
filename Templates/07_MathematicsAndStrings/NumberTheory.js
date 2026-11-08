// Topic: ADVANCED NUMBER THEORY
// Pattern: Miller-Rabin / Pollard-Rho / Sieve / CRT / BSGS
// Use Cases: Large primality, factorization, multiplicative functions,
// modular inverse, discrete logarithm, Jacobi symbol, segmented sieve.
//
// Example Problem: Prime Factorization Of A Number
// Source: Classic integer factorization exercise.
//
// node "NumberTheory.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
}

function lcm(a, b) {
    return (a / gcd(a, b)) * b;
}

function modPow(base, exponent, mod) {
    let result = 1;
    base %= mod;

    while (exponent > 0) {
        if (exponent & 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exponent >>= 1;
    }

    return result;
}

function modInverse(value, mod) {
    const [g, x] = extendedGcd(value, mod);
    return g === 1 ? ((x % mod) + mod) % mod : -1;
}

function extendedGcd(a, b) {
    if (b === 0) return [a, 1, 0];
    const [g, x1, y1] = extendedGcd(b, a % b);
    return [g, y1, x1 - Math.floor(a / b) * y1];
}

function isPrime(n) {
    if (n < 2) return false;
    for (const prime of [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]) {
        if (n % prime === 0) return n === prime;
    }

    let d = n - 1;
    let s = 0;

    while (d % 2 === 0) {
        d /= 2;
        s++;
    }

    for (const base of [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]) {
        if (base >= n) continue;
        let x = modPow(base, d, n);
        if (x === 1 || x === n - 1) continue;
        let composite = true;

        for (let r = 1; r < s; r++) {
            x = (x * x) % n;
            if (x === n - 1) {
                composite = false;
                break;
            }
        }

        if (composite) return false;
    }

    return true;
}

function pollardRho(n) {
    if (n % 2 === 0) return 2;
    if (n % 3 === 0) return 3;

    let c = 1;

    while (true) {
        let x = 2;
        let y = 2;
        let d = 1;

        while (d === 1) {
            x = (x * x + c) % n;
            y = (y * y + c) % n;
            y = (y * y + c) % n;
            d = gcd(Math.abs(x - y), n);
        }

        if (d !== n) return d;
        c++;
    }
}

function factorize(n, result = []) {
    if (n === 1) return result;
    if (isPrime(n)) {
        result.push(n);
        return result;
    }

    const divisor = pollardRho(n);
    factorize(divisor, result);
    factorize(n / divisor, result);
    return result.sort((a, b) => a - b);
}

function sieveSmallestPrime(n) {
    const spf = Array.from({ length: n + 1 }, (_, i) => i);

    for (let i = 2; i * i <= n; i++) {
        if (spf[i] === i) {
            for (let j = i * i; j <= n; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }

    return spf;
}

function segmentedSieve(left, right) {
    const limit = Math.floor(Math.sqrt(right));
    const base = sieveSmallestPrime(limit);
    const primes = [];

    for (let i = 2; i <= limit; i++) {
        if (base[i] === i) primes.push(i);
    }

    const isPrimeRange = new Array(right - left + 1).fill(true);
    if (left === 0) isPrimeRange[0] = isPrimeRange[1] = false;

    for (const prime of primes) {
        const start = Math.max(prime * prime, Math.ceil(left / prime) * prime);

        for (let value = start; value <= right; value += prime) {
            isPrimeRange[value - left] = false;
        }
    }

    const result = [];

    for (let value = left; value <= right; value++) {
        if (isPrimeRange[value - left]) result.push(value);
    }

    return result;
}

function eulerPhi(n) {
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

function mobiusSieve(n) {
    const primes = [];
    const isComposite = new Array(n + 1).fill(false);
    const mu = new Array(n + 1).fill(0);
    mu[1] = 1;

    for (let i = 2; i <= n; i++) {
        if (!isComposite[i]) {
            primes.push(i);
            mu[i] = -1;
        }

        for (const prime of primes) {
            if (i * prime > n) break;
            isComposite[i * prime] = true;

            if (i % prime === 0) {
                mu[i * prime] = 0;
                break;
            }

            mu[i * prime] = -mu[i];
        }
    }

    return mu;
}

function divisors(n) {
    const result = [];

    for (let d = 1; d * d <= n; d++) {
        if (n % d === 0) {
            result.push(d);
            if (d * d !== n) result.push(n / d);
        }
    }

    return result.sort((a, b) => a - b);
}

function crt(remainders, moduli) {
    let result = 0;
    let product = 1;

    for (const modulus of moduli) product *= modulus;

    for (let i = 0; i < remainders.length; i++) {
        const partial = product / moduli[i];
        const inverse = modInverse(partial % moduli[i], moduli[i]);
        result = (result + remainders[i] * partial * inverse) % product;
    }

    return ((result % product) + product) % product;
}

function babyStepGiantStep(base, target, mod) {
    const size = Math.ceil(Math.sqrt(mod));
    const table = new Map();
    let value = 1;

    for (let i = 0; i < size; i++) {
        if (!table.has(value)) table.set(value, i);
        value = (value * base) % mod;
    }

    const factor = modInverse(modPow(base, size, mod), mod);
    let current = target;

    for (let i = 0; i <= size; i++) {
        if (table.has(current)) return i * size + table.get(current);
        current = (current * factor) % mod;
    }

    return -1;
}

function jacobiSymbol(a, n) {
    let result = 1;
    a %= n;

    while (a !== 0) {
        while (a % 2 === 0) {
            a /= 2;
            if (n % 8 === 3 || n % 8 === 5) result = -result;
        }

        [a, n] = [n, a];

        if (a % 4 === 3 && n % 4 === 3) result = -result;

        a %= n;
    }

    return n === 1 ? result : 0;
}

function solve() {
    const n = Number(input[index++]);
    return factorize(n).join(" ");
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));
