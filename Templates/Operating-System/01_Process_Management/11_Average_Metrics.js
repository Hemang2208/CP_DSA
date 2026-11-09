// Topic: Average Waiting Time and Average Turnaround Time
// Concept: Scheduler quality is often compared using the mean waiting and turnaround times.
// Use: Choosing a scheduling policy for a workload.
// Time: O(n) after a schedule is known. Space: O(n).

const processes = [
    { pid: "P1", arrival: 0, burst: 10, completion: 10 },
    { pid: "P2", arrival: 1, burst: 4, completion: 14 },
    { pid: "P3", arrival: 2, burst: 2, completion: 16 },
    { pid: "P4", arrival: 3, burst: 6, completion: 22 }
];

let totalWaiting = 0;
let totalTurnaround = 0;

console.log("Average Metric Calculation");
for (const process of processes) {
    const turnaround = process.completion - process.arrival;
    const waiting = turnaround - process.burst;
    totalWaiting += waiting;
    totalTurnaround += turnaround;
    console.log(`${process.pid}: turnaround=${turnaround}, waiting=${waiting}`);
}

const averageWaiting = totalWaiting / processes.length;
const averageTurnaround = totalTurnaround / processes.length;

console.log(`\nTotal Waiting Time    : ${totalWaiting}`);
console.log(`Total Turnaround Time : ${totalTurnaround}`);
console.log(`Average Waiting Time    : ${averageWaiting.toFixed(2)}`);
console.log(`Average Turnaround Time : ${averageTurnaround.toFixed(2)}`);
