// Topic: Thread Scheduling
// Concept: The scheduler chooses among runnable threads using priorities and time slices.
// Thread scheduling is similar to process scheduling but has lower switching overhead.
// Use: Mapping user threads onto CPU cores.
// Time: O(n * totalBurst / quantum). Space: O(n).

const threads = [
    { id: "T1", burst: 5, priority: 2 },
    { id: "T2", burst: 3, priority: 1 },
    { id: "T3", burst: 4, priority: 3 },
    { id: "T4", burst: 2, priority: 1 }
];
const quantum = 2;

const jobs = threads.map((thread) => ({ ...thread, remaining: thread.burst }));
const queue = [...jobs];
const gantt = [];
let time = 0;

console.log("Thread Scheduling (Round Robin with priority ordering)");
while (queue.length > 0) {
    queue.sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
    const current = queue.shift();
    const run = Math.min(quantum, current.remaining);
    gantt.push(`${current.id}[${time}-${time + run}]`);
    console.log(`${current.id} runs for ${run} units (remaining ${current.remaining - run})`);
    current.remaining -= run;
    time += run;

    if (current.remaining > 0) {
        queue.push(current);
    }
}

console.log(`\nGantt: ${gantt.join(" -> ")}`);
console.log(`Total time: ${time}`);
