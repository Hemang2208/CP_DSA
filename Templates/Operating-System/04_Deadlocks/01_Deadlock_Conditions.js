// Topic: Deadlock Conditions (Coffman Conditions)
// Concept: Deadlock requires mutual exclusion, hold-and-wait, no preemption, and circular wait.
// Breaking any one condition prevents deadlock.
// Use: Reasoning about and preventing deadlocks in resource management.
// Time: O(1). Space: O(1).

const conditions = [
    {
        name: "Mutual Exclusion",
        present: true,
        meaning: "At least one resource is held in a non-sharable mode."
    },
    {
        name: "Hold and Wait",
        present: true,
        meaning: "A process holds one resource while waiting for another."
    },
    {
        name: "No Preemption",
        present: true,
        meaning: "Resources cannot be forcibly taken from a process."
    },
    {
        name: "Circular Wait",
        present: true,
        meaning: "A closed chain of processes waits for resources held by the next process."
    }
];

console.log("Coffman Deadlock Conditions");
for (const condition of conditions) {
    console.log(`${condition.name}: ${condition.present ? "PRESENT" : "absent"}`);
    console.log(`  ${condition.meaning}`);
}

const allPresent = conditions.every((condition) => condition.present);
console.log(`\nAll four conditions present: ${allPresent}`);
console.log("Deadlock is possible only when all four conditions hold simultaneously.");

console.log("\nBreaking a condition:");
conditions[3].present = false;
console.log("Impose a global resource order to remove circular wait.");
console.log(`Deadlock still possible: ${conditions.every((condition) => condition.present)}`);
