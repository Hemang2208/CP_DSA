// Topic: Deadlock Avoidance
// Concept: Before granting a request, the OS pretends to allocate it and checks whether the
// resulting state is safe. Unsafe requests are delayed even if resources are available.
// Use: Resource managers that must avoid future deadlock rather than recover from it.
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

function calculateNeed() {
    return max.map((row, i) => row.map((value, j) => value - allocation[i][j]));
}

function isSafe(avail, alloc, need) {
    const work = [...avail];
    const finish = alloc.map(() => false);
    const sequence = [];
    let changed = true;

    while (changed) {
        changed = false;
        for (let i = 0; i < alloc.length; i++) {
            if (finish[i]) continue;
            if (need[i].every((value, j) => value <= work[j])) {
                finish[i] = true;
                sequence.push(`P${i}`);
                for (let j = 0; j < work.length; j++) work[j] += alloc[i][j];
                changed = true;
            }
        }
    }

    return { safe: finish.every(Boolean), sequence };
}

function requestResources(pid, request) {
    const i = Number(pid.slice(1));
    const need = calculateNeed();
    console.log(`\n${pid} requests [${request.join(", ")}]`);

    if (!request.every((value, j) => value <= need[i][j])) {
        console.log("Request exceeds maximum claim -> denied");
        return;
    }

    if (!request.every((value, j) => value <= available[j])) {
        console.log("Request exceeds available resources -> wait");
        return;
    }

    const trialAvailable = available.map((value, j) => value - request[j]);
    const trialAllocation = allocation.map((row, index) =>
        index === i ? row.map((value, j) => value + request[j]) : [...row]
    );
    const trialNeed = trialAllocation.map((row, index) =>
        row.map((value, j) => max[index][j] - value)
    );

    const result = isSafe(trialAvailable, trialAllocation, trialNeed);

    if (result.safe) {
        for (let j = 0; j < available.length; j++) {
            available[j] = trialAvailable[j];
            allocation[i][j] = trialAllocation[i][j];
        }
        console.log(`Request granted. Safe sequence: ${result.sequence.join(" -> ")}`);
    } else {
        console.log("Request denied: granting it would make the state unsafe.");
    }
}

console.log("Deadlock Avoidance (Banker-style)");
console.log(`Initial available: [${available.join(", ")}]`);
requestResources("P1", [1, 0, 2]);
requestResources("P0", [7, 4, 3]);
console.log(`\nFinal available: [${available.join(", ")}]`);
