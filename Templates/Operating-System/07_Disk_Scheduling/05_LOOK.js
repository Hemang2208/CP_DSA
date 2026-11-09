// Topic: LOOK Disk Scheduling
// Concept: Like SCAN, but the head reverses at the last pending request instead of going
// all the way to the disk end.
// Use: Avoiding unnecessary travel to the disk boundary.
// Time: O(n log n). Space: O(n).

const requests = [82, 170, 43, 140, 24, 16, 190];
const head = 50;

const sorted = [...requests].sort((a, b) => a - b);
const right = sorted.filter((r) => r >= head);
const left = sorted.filter((r) => r < head).reverse();
const sequence = [head, ...right, ...left];
let totalMovement = 0;

console.log("LOOK Disk Scheduling");
for (let i = 1; i < sequence.length; i++) {
    const movement = Math.abs(sequence[i] - sequence[i - 1]);
    totalMovement += movement;
    console.log(`Head ${sequence[i - 1]} -> ${sequence[i]} (movement ${movement})`);
}

console.log(`\nService order: ${sequence.join(" -> ")}`);
console.log(`Total head movement: ${totalMovement}`);
console.log("The head reverses at the highest pending request, not at the disk end.");
