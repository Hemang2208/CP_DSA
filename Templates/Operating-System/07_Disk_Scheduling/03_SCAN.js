// Topic: SCAN Disk Scheduling (Elevator Algorithm)
// Concept: The head moves in one direction serving requests, reaches the disk end, then
// reverses and serves requests in the other direction.
// Use: Reducing starvation compared with SSTF.
// Time: O(n log n) for sorting. Space: O(n).

const requests = [82, 170, 43, 140, 24, 16, 190];
const diskSize = 200;
const head = 50;
const direction = "right";

const sorted = [...requests].sort((a, b) => a - b);
let sequence = [head];
let totalMovement = 0;

if (direction === "right") {
    const right = sorted.filter((r) => r >= head);
    const left = sorted.filter((r) => r < head).reverse();
    sequence.push(...right, diskSize - 1, ...left);
} else {
    const left = sorted.filter((r) => r <= head).reverse();
    const right = sorted.filter((r) => r > head);
    sequence.push(...left, 0, ...right);
}

for (let i = 1; i < sequence.length; i++) {
    const movement = Math.abs(sequence[i] - sequence[i - 1]);
    totalMovement += movement;
    console.log(`Head ${sequence[i - 1]} -> ${sequence[i]} (movement ${movement})`);
}

console.log(`\nService order: ${sequence.join(" -> ")}`);
console.log(`Total head movement: ${totalMovement}`);
console.log(`Direction: ${direction}, disk end included: ${direction === "right" ? diskSize - 1 : 0}`);
