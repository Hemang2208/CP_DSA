// Topic: Deadlock Detection
// Concept: With multiple instances of resources, repeatedly finish processes whose requests
// can be satisfied by the current work vector. If some processes remain unfinished, deadlock exists.
// Use: Detecting deadlocks in systems that allow them to occur.
// Time: O(n^2 * m) for n processes and m resource types. Space: O(n * m).

const processes = ["P0", "P1", "P2"];
const available = [0, 0, 0];
const allocation = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];
const request = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0]
];

const work = [...available];
const finish = processes.map(() => false);
let changed = true;

console.log("Deadlock Detection Algorithm");
console.log(`Initial Work: [${work.join(", ")}]`);

while (changed) {
    changed = false;

    for (let i = 0; i < processes.length; i++) {
        if (finish[i]) continue;

        const canFinish = request[i].every((need, j) => need <= work[j]);
        if (canFinish) {
            finish[i] = true;
            for (let j = 0; j < work.length; j++) {
                work[j] += allocation[i][j];
            }
            changed = true;
            console.log(`${processes[i]} can finish, Work -> [${work.join(", ")}]`);
        }
    }
}

console.log(`\nFinish vector: [${finish.map((v) => (v ? "T" : "F")).join(", ")}]`);

if (finish.every(Boolean)) {
    console.log("No deadlock detected.");
} else {
    const deadlocked = processes.filter((_, i) => !finish[i]);
    console.log(`Deadlock detected among: ${deadlocked.join(", ")}`);
}
