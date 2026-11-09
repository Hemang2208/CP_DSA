// Topic: SSTF (Shortest Seek Time First) Disk Scheduling
// Concept: Always serve the request closest to the current head position. This reduces
// movement but can starve far-away requests.
// Use: Disk schedulers that favor low seek time.
// Time: O(n^2). Space: O(n).

const requests = [82, 170, 43, 140, 24, 16, 190];
let current = 50;
const pending = [...requests];
let totalMovement = 0;
const sequence = [current];

console.log("SSTF Disk Scheduling");
console.log(`Initial head: ${current}`);

while (pending.length > 0) {
    pending.sort((a, b) => Math.abs(a - current) - Math.abs(b - current));
    const next = pending.shift();
    const movement = Math.abs(next - current);
    totalMovement += movement;
    console.log(`Head ${current} -> ${next} (movement ${movement})`);
    current = next;
    sequence.push(next);
}

console.log(`\nService order: ${sequence.join(" -> ")}`);
console.log(`Total head movement: ${totalMovement}`);
