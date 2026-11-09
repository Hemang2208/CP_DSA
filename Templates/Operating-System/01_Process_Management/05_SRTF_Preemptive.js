// Topic: Shortest Remaining Time First (SRTF) - Preemptive SJF
// Concept: At every time unit, the arrived process with the smallest remaining burst runs.
// Use: Reduces average waiting time when short jobs arrive during long jobs.
// Time: O(totalBurst * n) in this simulation. Space: O(n).

const processes = [
    { pid: "P1", arrival: 0, burst: 8 },
    { pid: "P2", arrival: 1, burst: 4 },
    { pid: "P3", arrival: 2, burst: 9 },
    { pid: "P4", arrival: 3, burst: 5 }
];

const jobs = processes.map((p) => ({ ...p, remaining: p.burst, start: null, completion: null }));
const gantt = [];
let time = 0;
let completed = 0;

while (completed < jobs.length) {
    const available = jobs.filter((p) => p.arrival <= time && p.remaining > 0);

    if (available.length === 0) {
        const nextArrival = Math.min(...jobs.filter((p) => p.remaining > 0).map((p) => p.arrival));
        gantt.push({ pid: "IDLE", start: time, end: nextArrival });
        time = nextArrival;
        continue;
    }

    available.sort((a, b) => a.remaining - b.remaining || a.arrival - b.arrival);
    const current = available[0];

    if (current.start === null) current.start = time;

    const last = gantt[gantt.length - 1];
    if (last && last.pid === current.pid && last.end === time) {
        last.end++;
    } else {
        gantt.push({ pid: current.pid, start: time, end: time + 1 });
    }

    current.remaining--;
    time++;

    if (current.remaining === 0) {
        current.completion = time;
        current.turnaround = current.completion - current.arrival;
        current.waiting = current.turnaround - current.burst;
        current.response = current.start - current.arrival;
        completed++;
    }
}

console.log("SRTF Preemptive Scheduling");
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
