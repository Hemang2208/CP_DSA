// Topic: Priority Scheduling - Non-Preemptive
// Concept: When the CPU is free, the arrived process with the highest priority runs to completion.
// Use: Batch and embedded systems where a running job should not be interrupted.
// Time: O(n^2) with linear selection. Space: O(n).

const processes = [
    { pid: "P1", arrival: 0, burst: 6, priority: 3 },
    { pid: "P2", arrival: 1, burst: 4, priority: 1 },
    { pid: "P3", arrival: 2, burst: 7, priority: 2 },
    { pid: "P4", arrival: 4, burst: 3, priority: 0 }
];

const jobs = processes.map((p) => ({ ...p, completed: false }));
const gantt = [];
let time = 0;
let completed = 0;

while (completed < jobs.length) {
    const available = jobs.filter((p) => !p.completed && p.arrival <= time);

    if (available.length === 0) {
        const nextArrival = Math.min(...jobs.filter((p) => !p.completed).map((p) => p.arrival));
        gantt.push({ pid: "IDLE", start: time, end: nextArrival });
        time = nextArrival;
        continue;
    }

    available.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
    const current = available[0];
    current.start = time;
    time += current.burst;
    current.completion = time;
    current.turnaround = current.completion - current.arrival;
    current.waiting = current.turnaround - current.burst;
    current.response = current.start - current.arrival;
    current.completed = true;
    completed++;
    gantt.push({ pid: current.pid, start: current.start, end: current.completion });
}

console.log("Priority Scheduling (Non-Preemptive, lower number = higher priority)");
console.log("Gantt Chart:");
console.log(gantt.map((slot) => `${slot.pid}[${slot.start}-${slot.end}]`).join(" -> "));

console.table(jobs.map((p) => ({
    PID: p.pid,
    Arrival: p.arrival,
    Burst: p.burst,
    Priority: p.priority,
    Start: p.start,
    Completion: p.completion,
    Turnaround: p.turnaround,
    Waiting: p.waiting,
    Response: p.response
})));

const average = (key) => jobs.reduce((sum, p) => sum + p[key], 0) / jobs.length;
console.log(`Average Waiting Time    : ${average("waiting").toFixed(2)}`);
console.log(`Average Turnaround Time : ${average("turnaround").toFixed(2)}`);
