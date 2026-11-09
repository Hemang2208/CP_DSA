// Topic: Priority Scheduling - Preemptive
// Concept: The arrived process with the highest priority (smallest number) runs.
// A newly arrived higher-priority process can preempt the running process.
// Use: Real-time systems and OS schedulers where important tasks must respond quickly.
// Time: O(totalBurst * n) in this simulation. Space: O(n).

const processes = [
    { pid: "P1", arrival: 0, burst: 6, priority: 3 },
    { pid: "P2", arrival: 1, burst: 4, priority: 1 },
    { pid: "P3", arrival: 2, burst: 7, priority: 2 },
    { pid: "P4", arrival: 4, burst: 3, priority: 0 }
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

    available.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
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

console.log("Priority Scheduling (Preemptive, lower number = higher priority)");
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
