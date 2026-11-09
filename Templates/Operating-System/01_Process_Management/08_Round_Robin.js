// Topic: Round Robin (RR) CPU Scheduling
// Concept: Each process runs for a fixed time quantum, then moves to the back of the ready queue.
// Use: Time-sharing systems that need fair response time for interactive processes.
// Time: O(n * totalBurst / quantum) worst case. Space: O(n).

const processes = [
    { pid: "P1", arrival: 0, burst: 5 },
    { pid: "P2", arrival: 1, burst: 3 },
    { pid: "P3", arrival: 2, burst: 8 },
    { pid: "P4", arrival: 3, burst: 2 }
];
const quantum = 3;

const jobs = processes
    .map((p) => ({ ...p, remaining: p.burst, start: null, completion: null }))
    .sort((a, b) => a.arrival - b.arrival);

const queue = [];
const gantt = [];
let time = 0;
let index = 0;
let completed = 0;

while (completed < jobs.length) {
    while (index < jobs.length && jobs[index].arrival <= time) {
        queue.push(jobs[index]);
        index++;
    }

    if (queue.length === 0) {
        time = jobs[index].arrival;
        continue;
    }

    const current = queue.shift();
    if (current.start === null) current.start = time;

    const runTime = Math.min(quantum, current.remaining);
    const start = time;
    time += runTime;
    current.remaining -= runTime;

    while (index < jobs.length && jobs[index].arrival <= time) {
        queue.push(jobs[index]);
        index++;
    }

    if (current.remaining > 0) {
        queue.push(current);
    } else {
        current.completion = time;
        current.turnaround = current.completion - current.arrival;
        current.waiting = current.turnaround - current.burst;
        current.response = current.start - current.arrival;
        completed++;
    }

    const last = gantt[gantt.length - 1];
    if (last && last.pid === current.pid && last.end === start) {
        last.end = time;
    } else {
        gantt.push({ pid: current.pid, start, end: time });
    }
}

console.log(`Round Robin Scheduling (Quantum = ${quantum})`);
console.log("Gantt Chart:");
console.log(gantt.map((slot) => `${slot.pid}[${slot.start}-${slot.end}]`).join(" -> "));

console.table(jobs.map((p) => ({
    PID: p.pid,
    Arrival: p.arrival,
    Burst: p.burst,
    Start: p.start,
    Completion: p.completion,
    Turnaround: p.turnaround,
    Waiting: p.waiting,
    Response: p.response
})));

const average = (key) => jobs.reduce((sum, p) => sum + p[key], 0) / jobs.length;
console.log(`Average Waiting Time    : ${average("waiting").toFixed(2)}`);
console.log(`Average Turnaround Time : ${average("turnaround").toFixed(2)}`);
