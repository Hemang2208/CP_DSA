// Topic: Priority Inversion and Priority Inheritance
// Concept: A high-priority task waits for a lock held by a low-priority task while a
// medium-priority task preempts the holder; inheritance raises the holder's priority.
// Use: Real-time kernels and Mars Pathfinder-style fixes.
// Time: O(1) per scheduling decision. Space: O(tasks).

const tasks = [
    { id: "Low", priority: 3, holdsLock: false },
    { id: "Medium", priority: 2, holdsLock: false },
    { id: "High", priority: 1, holdsLock: false }
];

function showPriorities(label) {
    console.log(`${label}: ${tasks.map((t) => `${t.id}=${t.priority}`).join(", ")}`);
}

console.log("Priority Inversion (lower number = higher priority)");
showPriorities("Initial");

console.log("\nLow acquires the shared lock");
tasks[0].holdsLock = true;

console.log("High requests the lock and blocks");
console.log("Medium becomes runnable and preempts Low");
console.log("Result: High waits for Medium even though High has highest priority");
showPriorities("Without inheritance");

console.log("\nApplying priority inheritance");
tasks[0].priority = tasks[2].priority;
showPriorities("Low inherits High priority");
console.log("Low finishes critical section quickly, releases lock");
tasks[0].holdsLock = false;
tasks[0].priority = 3;
tasks[2].priority = 1;
console.log("High acquires the lock and runs");
showPriorities("After inheritance");
