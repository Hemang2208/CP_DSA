// Topic: Completion, Turnaround, Waiting and Response Time
// Concept: For a process, completion is its finish time, turnaround is completion - arrival,
// waiting is turnaround - burst, and response is firstStart - arrival.
// Use: These metrics measure scheduler fairness and responsiveness.
// Time: O(n) for n processes. Space: O(n).

const processes = [
    { pid: "P1", arrival: 0, burst: 5, start: 0, completion: 5 },
    { pid: "P2", arrival: 1, burst: 3, start: 5, completion: 8 },
    { pid: "P3", arrival: 2, burst: 8, start: 8, completion: 16 },
    { pid: "P4", arrival: 3, burst: 2, start: 16, completion: 18 }
];

console.log("Time Metrics for a FCFS Schedule");
for (const process of processes) {
    process.turnaround = process.completion - process.arrival;
    process.waiting = process.turnaround - process.burst;
    process.response = process.start - process.arrival;
}

console.table(processes.map((p) => ({
    PID: p.pid,
    Arrival: p.arrival,
    Burst: p.burst,
    Start: p.start,
    Completion: p.completion,
    Turnaround: p.turnaround,
    Waiting: p.waiting,
    Response: p.response
})));

const totalTurnaround = processes.reduce((sum, p) => sum + p.turnaround, 0);
const totalWaiting = processes.reduce((sum, p) => sum + p.waiting, 0);
const totalResponse = processes.reduce((sum, p) => sum + p.response, 0);

console.log(`Total Turnaround Time: ${totalTurnaround}`);
console.log(`Total Waiting Time   : ${totalWaiting}`);
console.log(`Total Response Time  : ${totalResponse}`);
