// Topic: Disk Scheduling Algorithm Comparison
// Concept: Different policies produce different service orders and total head movements.
// The best choice depends on locality, fairness, and worst-case requirements.
// Use: Selecting a disk scheduler for a workload.
// Time: O(n^2) overall for the simple implementations. Space: O(n).

const requests = [82, 170, 43, 140, 24, 16, 190];
const diskSize = 200;
const head = 50;

function movement(sequence) {
    let total = 0;
    for (let i = 1; i < sequence.length; i++) {
        total += Math.abs(sequence[i] - sequence[i - 1]);
    }
    return total;
}

function fcfs() {
    return [head, ...requests];
}

function sstf() {
    const pending = [...requests];
    const sequence = [head];
    let current = head;

    while (pending.length > 0) {
        pending.sort((a, b) => Math.abs(a - current) - Math.abs(b - current));
        current = pending.shift();
        sequence.push(current);
    }

    return sequence;
}

function scan() {
    const sorted = [...requests].sort((a, b) => a - b);
    return [head, ...sorted.filter((r) => r >= head), diskSize - 1, ...sorted.filter((r) => r < head).reverse()];
}

function cscan() {
    const sorted = [...requests].sort((a, b) => a - b);
    return [head, ...sorted.filter((r) => r >= head), diskSize - 1, 0, ...sorted.filter((r) => r < head)];
}

function look() {
    const sorted = [...requests].sort((a, b) => a - b);
    return [head, ...sorted.filter((r) => r >= head), ...sorted.filter((r) => r < head).reverse()];
}

function clook() {
    const sorted = [...requests].sort((a, b) => a - b);
    return [head, ...sorted.filter((r) => r >= head), ...sorted.filter((r) => r < head)];
}

const algorithms = [
    { Algorithm: "FCFS", Sequence: fcfs() },
    { Algorithm: "SSTF", Sequence: sstf() },
    { Algorithm: "SCAN", Sequence: scan() },
    { Algorithm: "C-SCAN", Sequence: cscan() },
    { Algorithm: "LOOK", Sequence: look() },
    { Algorithm: "C-LOOK", Sequence: clook() }
];

const results = algorithms.map((item) => ({
    Algorithm: item.Algorithm,
    Order: item.Sequence.join(" -> "),
    "Total Movement": movement(item.Sequence)
}));

console.log("Disk Scheduling Comparison");
console.table(results);
