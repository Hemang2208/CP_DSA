// Topic: First Come First Served (FCFS) CPU Scheduling
// Concept: Processes are dispatched in arrival order without preemption.
// Use: Simple batch scheduling and the baseline for comparing schedulers.
// Time: O(n log n) for sorting + O(n) scheduling. Space: O(n).

const processes = [
    { pid: "P1", arrival: 0, burst: 5 },
    { pid: "P2", arrival: 1, burst: 3 },
    { pid: "P3", arrival: 2, burst: 8 },
    { pid: "P4", arrival: 3, burst: 2 }
];

const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
const gantt = [];
let time = 0;

for (const process of sorted) {
    if (time < process.arrival) {
        gantt.push({ pid: "IDLE", start: time, end: process.arrival });
        time = process.arrival;
    }

    process.start = time;
    time += process.burst;
    process.completion = time;
    process.turnaround = process.completion - process.arrival;
    process.waiting = process.turnaround - process.burst;
    process.response = process.start - process.arrival;
    gantt.push({ pid: process.pid, start: process.start, end: process.completion });
}

console.log("FCFS Scheduling");
console.log("Gantt Chart:");
console.log(gantt.map((slot) => `${slot.pid}[${slot.start}-${slot.end}]`).join(" -> "));

console.table(sorted.map((p) => ({
    PID: p.pid,
    Arrival: p.arrival,
    Burst: p.burst,
    Start: p.start,
    Completion: p.completion,
    Turnaround: p.turnaround,
    Waiting: p.waiting,
    Response: p.response
})));

const average = (key) => sorted.reduce((sum, p) => sum + p[key], 0) / sorted.length;
console.log(`Average Waiting Time    : ${average("waiting").toFixed(2)}`);
console.log(`Average Turnaround Time : ${average("turnaround").toFixed(2)}`);
console.log(`Average Response Time   : ${average("response").toFixed(2)}`);
