// Topic: Resource Request Algorithm
// Concept: A request is granted only if it is within the process's remaining need, within
// available resources, and leaves the system in a safe state.
// Use: Online resource allocation in Banker's algorithm.
// Time: O(n^2 * m) per request. Space: O(n * m).

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

function isSafe(avail, alloc, needs) {
    const work = [...avail];
    const finish = alloc.map(() => false);
    const sequence = [];
    let progress = true;

    while (progress) {
        progress = false;
        for (let i = 0; i < alloc.length; i++) {
            if (finish[i]) continue;
            if (needs[i].every((value, j) => value <= work[j])) {
                finish[i] = true;
                sequence.push(`P${i}`);
                for (let j = 0; j < work.length; j++) work[j] += alloc[i][j];
                progress = true;
            }
        }
    }

    return { safe: finish.every(Boolean), sequence };
}

function requestResources(pid, request) {
    const index = Number(pid.slice(1));
    console.log(`\nRequest: ${pid} asks for [${request.join(", ")}]`);

    if (!request.every((value, j) => value <= need[index][j])) {
        console.log("Denied: request exceeds maximum need.");
        return;
    }

    if (!request.every((value, j) => value <= available[j])) {
        console.log("Denied: not enough available resources.");
        return;
    }

    const newAvailable = available.map((value, j) => value - request[j]);
    const newAllocation = allocation.map((row, i) =>
        i === index ? row.map((value, j) => value + request[j]) : [...row]
    );
    const newNeed = newAllocation.map((row, i) =>
        row.map((value, j) => max[i][j] - value)
    );

    const check = isSafe(newAvailable, newAllocation, newNeed);

    if (!check.safe) {
        console.log("Denied: state would be unsafe.");
        return;
    }

    for (let j = 0; j < available.length; j++) {
        available[j] = newAvailable[j];
        allocation[index][j] = newAllocation[index][j];
        need[index][j] = newNeed[index][j];
    }

    console.log(`Granted. Safe sequence: ${check.sequence.join(" -> ")}`);
    console.log(`Available now: [${available.join(", ")}]`);
}

console.log("Resource Request Algorithm");
console.log(`Initial available: [${available.join(", ")}]`);
requestResources("P1", [1, 0, 2]);
requestResources("P0", [7, 4, 3]);
requestResources("P2", [6, 0, 0]);
