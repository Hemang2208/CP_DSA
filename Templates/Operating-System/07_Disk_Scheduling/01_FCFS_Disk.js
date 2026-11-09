// Topic: FCFS Disk Scheduling
// Concept: Disk requests are served in the order they arrive. It is fair but can cause
// large head movements.
// Use: Simple disk controllers and baseline comparison.
// Time: O(n) for n requests. Space: O(n).

const requests = [82, 170, 43, 140, 24, 16, 190];
const head = 50;

let current = head;
let totalMovement = 0;
const sequence = [head];

console.log("FCFS Disk Scheduling");
console.log(`Initial head: ${head}`);

for (const request of requests) {
    const movement = Math.abs(request - current);
    totalMovement += movement;
    console.log(`Head ${current} -> ${request} (movement ${movement})`);
    current = request;
    sequence.push(request);
}

console.log(`\nService order: ${sequence.join(" -> ")}`);
console.log(`Total head movement: ${totalMovement}`);
