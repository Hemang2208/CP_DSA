// Topic: Safety Algorithm
// Concept: The safety algorithm simulates finishing processes whose remaining needs can be met.
// If every process can finish, the state is safe and the finishing order is a safe sequence.
// Use: Core check inside Banker's deadlock-avoidance algorithm.
// Time: O(n^2 * m). Space: O(n * m).

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

function safetyAlgorithm(available, allocation, need) {
    const work = [...available];
    const finish = allocation.map(() => false);
    const sequence = [];

    console.log(`Initial Work: [${work.join(", ")}]`);

    let progress = true;
    while (progress) {
        progress = false;

        for (let i = 0; i < allocation.length; i++) {
            if (finish[i]) continue;

            const possible = need[i].every((value, j) => value <= work[j]);
            if (possible) {
                finish[i] = true;
                sequence.push(`P${i}`);
                for (let j = 0; j < work.length; j++) work[j] += allocation[i][j];
                progress = true;
                console.log(`P${i} finishes, Work -> [${work.join(", ")}]`);
            }
        }
    }

    return { safe: finish.every(Boolean), sequence, work };
}

console.log("Safety Algorithm");
const result = safetyAlgorithm(available, allocation, need);
console.log(`\nSafe: ${result.safe}`);
console.log(`Safe sequence: ${result.sequence.join(" -> ")}`);
console.log(`Final Work: [${result.work.join(", ")}]`);
