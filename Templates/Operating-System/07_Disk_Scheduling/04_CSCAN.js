// Topic: C-SCAN (Circular SCAN) Disk Scheduling
// Concept: The head serves requests in one direction, jumps back to the beginning without
// servicing on the return trip, and continues in the same direction.
// Use: More uniform wait times than SCAN.
// Time: O(n log n). Space: O(n).

const requests = [82, 170, 43, 140, 24, 16, 190];
const diskSize = 200;
const head = 50;

const sorted = [...requests].sort((a, b) => a - b);
const right = sorted.filter((r) => r >= head);
const left = sorted.filter((r) => r < head);
const sequence = [head, ...right, diskSize - 1, 0, ...left];
let totalMovement = 0;

console.log("C-SCAN Disk Scheduling");
for (let i = 1; i < sequence.length; i++) {
    const movement = Math.abs(sequence[i] - sequence[i - 1]);
    totalMovement += movement;
    console.log(`Head ${sequence[i - 1]} -> ${sequence[i]} (movement ${movement})`);
}

console.log(`\nService order: ${sequence.join(" -> ")}`);
console.log(`Total head movement: ${totalMovement}`);
console.log("The jump from the end back to 0 is counted as head movement.");
