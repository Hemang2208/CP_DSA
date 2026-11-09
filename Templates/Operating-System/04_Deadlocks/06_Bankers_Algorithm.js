// Topic: Banker's Algorithm
// Concept: Banker's algorithm grants resources only if the system remains in a safe state.
// It models the OS as a banker that must keep enough resources to satisfy some completion order.
// Use: Deadlock avoidance with multiple resource instances.
// Time: O(n^2 * m). Space: O(n * m).

const processes = ["P0", "P1", "P2", "P3", "P4"];
const available = [3, 3, 2];
const allocation = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
];
const max = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
];

const need = max.map((row, i) => row.map((value, j) => value - allocation[i][j]));

console.log("Banker's Algorithm");
console.log("Available:", available);
console.log("Allocation:");
console.table(allocation.map((row, i) => ({
    Process: processes[i],
    R0: row[0],
    R1: row[1],
    R2: row[2]
})));
console.log("Max:");
console.table(max.map((row, i) => ({
    Process: processes[i],
    R0: row[0],
    R1: row[1],
    R2: row[2]
})));
console.log("Need:");
console.table(need.map((row, i) => ({
    Process: processes[i],
    R0: row[0],
    R1: row[1],
    R2: row[2]
})));

const work = [...available];
const finish = processes.map(() => false);
const safeSequence = [];
let changed = true;

while (changed) {
    changed = false;

    for (let i = 0; i < processes.length; i++) {
        if (finish[i]) continue;

        const canRun = need[i].every((value, j) => value <= work[j]);
        if (canRun) {
            finish[i] = true;
            safeSequence.push(processes[i]);
            for (let j = 0; j < work.length; j++) work[j] += allocation[i][j];
            changed = true;
            console.log(`${processes[i]} can finish, Work = [${work.join(", ")}]`);
        }
    }
}

console.log(`\nSafe sequence: ${safeSequence.join(" -> ")}`);
console.log(`System is safe: ${finish.every(Boolean)}`);
