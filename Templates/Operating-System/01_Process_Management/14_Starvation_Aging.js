// Topic: Starvation and Aging
// Concept: Fixed-priority scheduling can starve low-priority processes. Aging gradually
// raises the priority of waiting processes so they eventually run.
// Use: Preventing indefinite blocking in priority-based schedulers.
// Time: O(totalBurst * n). Space: O(n).

const baseProcesses = [
    { pid: "P1", arrival: 0, burst: 8, priority: 1 },
    { pid: "P2", arrival: 0, burst: 4, priority: 2 },
    { pid: "P3", arrival: 0, burst: 6, priority: 5 }
];

function simulate(useAging, agingInterval = 3) {
    const jobs = baseProcesses.map((p) => ({
        ...p,
        remaining: p.burst,
        effectivePriority: p.priority,
        waited: 0,
        completion: null
    }));

    let time = 0;
    let completed = 0;
    const order = [];

    while (completed < jobs.length) {
        const waiting = jobs.filter((p) => p.remaining > 0);

        if (useAging) {
            for (const job of waiting) {
                if (job.remaining > 0) {
                    job.waited++;
                    if (job.waited % agingInterval === 0 && job.effectivePriority > 0) {
                        job.effectivePriority--;
                    }
                }
            }
        }

        waiting.sort((a, b) => a.effectivePriority - b.effectivePriority || a.priority - b.priority);
        const current = waiting[0];
        current.remaining--;
        time++;

        if (current.remaining === 0) {
            current.completion = time;
            order.push(current.pid);
            completed++;
        }
    }

    return { order, jobs };
}

console.log("Without Aging:");
const withoutAging = simulate(false);
console.log(`Completion order: ${withoutAging.order.join(" -> ")}`);
console.table(withoutAging.jobs.map((p) => ({ PID: p.pid, Priority: p.priority, Completion: p.completion })));

console.log("\nWith Aging (every 3 waiting ticks):");
const withAging = simulate(true);
console.log(`Completion order: ${withAging.order.join(" -> ")}`);
console.table(withAging.jobs.map((p) => ({ PID: p.pid, Priority: p.priority, Completion: p.completion })));
console.log("Aging lets P3 gain priority over time instead of starving forever.");
