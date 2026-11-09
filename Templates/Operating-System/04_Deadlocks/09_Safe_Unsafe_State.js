// Topic: Safe and Unsafe State Detection
// Concept: A state is safe if there is at least one order in which every process can finish.
// An unsafe state does not necessarily mean deadlock, but deadlock may occur later.
// Use: Classifying resource-allocation states before granting requests.
// Time: O(n^2 * m). Space: O(n * m).

function isSafeState(available, allocation, need) {
    const work = [...available];
    const finish = allocation.map(() => false);
    let progress = true;

    while (progress) {
        progress = false;
        for (let i = 0; i < allocation.length; i++) {
            if (finish[i]) continue;
            if (need[i].every((value, j) => value <= work[j])) {
                finish[i] = true;
                for (let j = 0; j < work.length; j++) work[j] += allocation[i][j];
                progress = true;
            }
        }
    }

    return finish.every(Boolean);
}

const safeState = {
    available: [3, 3, 2],
    allocation: [
        [0, 1, 0],
        [2, 0, 0],
        [3, 0, 2],
        [2, 1, 1],
        [0, 0, 2]
    ],
    need: [
        [7, 4, 3],
        [1, 2, 2],
        [6, 0, 0],
        [0, 1, 1],
        [4, 3, 1]
    ]
};

const unsafeState = {
    available: [0, 0, 0],
    allocation: [
        [1, 0, 0],
        [0, 1, 0]
    ],
    need: [
        [0, 1, 0],
        [1, 0, 0]
    ]
};

console.log("Safe State Detection");
console.log(`Safe example: ${isSafeState(safeState.available, safeState.allocation, safeState.need)}`);

console.log("\nUnsafe State Detection");
console.log(`Unsafe example: ${isSafeState(unsafeState.available, unsafeState.allocation, unsafeState.need)}`);

console.log("\nA safe state guarantees a completion order.");
console.log("An unsafe state may still avoid deadlock if processes release resources early.");
