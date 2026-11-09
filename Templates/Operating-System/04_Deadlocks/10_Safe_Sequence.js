// Topic: Safe Sequence Generation
// Concept: A safe sequence is an ordering of processes in which each process's remaining need
// can be satisfied by currently available resources plus resources released by earlier processes.
// Use: Proving that a resource-allocation state is safe.
// Time: O(n^2 * m) per sequence, exponential for all sequences. Space: O(n * m).

const processes = ["P0", "P1", "P2", "P3", "P4"];
const available = [3, 3, 2];
const allocation = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
];
const need = [
    [7, 4, 3],
    [1, 2, 2],
    [6, 0, 0],
    [0, 1, 1],
    [4, 3, 1]
];

const sequences = [];

function generate(work, finish, current) {
    if (current.length === processes.length) {
        sequences.push([...current]);
        return;
    }

    for (let i = 0; i < processes.length; i++) {
        if (finish[i]) continue;
        if (!need[i].every((value, j) => value <= work[j])) continue;

        finish[i] = true;
        current.push(processes[i]);
        const nextWork = work.map((value, j) => value + allocation[i][j]);
        generate(nextWork, finish, current);
        current.pop();
        finish[i] = false;
    }
}

console.log("All Safe Sequences");
generate([...available], processes.map(() => false), []);

if (sequences.length === 0) {
    console.log("No safe sequence: the state is unsafe.");
} else {
    for (let i = 0; i < sequences.length; i++) {
        console.log(`${i + 1}. ${sequences[i].join(" -> ")}`);
    }
    console.log(`\nTotal safe sequences found: ${sequences.length}`);
}
