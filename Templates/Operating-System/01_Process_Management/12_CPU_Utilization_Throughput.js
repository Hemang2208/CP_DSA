// Topic: CPU Utilization and Throughput
// Concept: CPU utilization is busy time divided by total time. Throughput is the number
// of completed processes per unit of time.
// Use: Evaluating system efficiency and comparing scheduling or I/O strategies.
// Time: O(n) for n timeline segments. Space: O(n).

const timeline = [
    { pid: "P1", start: 0, end: 5 },
    { pid: "P2", start: 5, end: 9 },
    { pid: "IDLE", start: 9, end: 12 },
    { pid: "P3", start: 12, end: 18 },
    { pid: "P4", start: 18, end: 22 },
    { pid: "IDLE", start: 22, end: 24 }
];

let busyTime = 0;
let idleTime = 0;
let completedProcesses = 0;

for (const segment of timeline) {
    const duration = segment.end - segment.start;
    if (segment.pid === "IDLE") {
        idleTime += duration;
    } else {
        busyTime += duration;
        completedProcesses++;
    }
}

const totalTime = busyTime + idleTime;
const utilization = (busyTime / totalTime) * 100;
const throughput = completedProcesses / totalTime;

console.log("CPU Utilization and Throughput");
console.log(`Busy Time        : ${busyTime}`);
console.log(`Idle Time        : ${idleTime}`);
console.log(`Total Time       : ${totalTime}`);
console.log(`CPU Utilization  : ${utilization.toFixed(2)}%`);
console.log(`Completed Jobs   : ${completedProcesses}`);
console.log(`Throughput       : ${throughput.toFixed(3)} processes/unit time`);

console.log("\nInterpretation:");
console.log(`The CPU was busy for ${busyTime} of ${totalTime} time units.`);
console.log(`The system completed ${completedProcesses} processes in ${totalTime} units.`);
