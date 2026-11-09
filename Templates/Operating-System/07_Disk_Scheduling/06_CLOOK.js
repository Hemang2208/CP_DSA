// Topic: C-LOOK Disk Scheduling
// Concept: Like C-SCAN, but the head jumps from the highest pending request to the lowest
// pending request instead of travelling to the disk boundaries.
// Use: Uniform service with less boundary travel.
// Time: O(n log n). Space: O(n).

const requests = [82, 170, 43, 140, 24, 16, 190];
const head = 50;

const sorted = [...requests].sort((a, b) => a - b);
const right = sorted.filter((r) => r >= head);
const left = sorted.filter((r) => r < head);
const sequence = [head, ...right, ...left];
let totalMovement = 0;

console.log("C-LOOK Disk Scheduling");
for (let i = 1; i < sequence.length; i++) {
    const movement = Math.abs(sequence[i] - sequence[i - 1]);
    totalMovement += movement;
    console.log(`Head ${sequence[i - 1]} -> ${sequence[i]} (movement ${movement})`);
}

console.log(`\nService order: ${sequence.join(" -> ")}`);
console.log(`Total head movement: ${totalMovement}`);
console.log("The jump is from the highest pending request to the lowest pending request.");
