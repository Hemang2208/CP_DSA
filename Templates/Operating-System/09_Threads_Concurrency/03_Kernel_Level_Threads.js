// Topic: Kernel-Level Threads
// Concept: The kernel creates and schedules each thread independently. Threads can run in
// parallel on multiple CPUs, and blocking one thread does not block the whole process.
// Use: Multicore servers and applications that need true parallelism.
// Time: O(t log t) for priority scheduling. Space: O(t).

const threads = [
    { id: 1, priority: 2, burst: 4 },
    { id: 2, priority: 1, burst: 3 },
    { id: 3, priority: 3, burst: 5 },
    { id: 4, priority: 1, burst: 2 }
];

const cpus = [
    { id: "CPU0", current: null },
    { id: "CPU1", current: null }
];

console.log("Kernel-Level Threads on Two CPUs");
const pending = [...threads].sort((a, b) => a.priority - b.priority);
let time = 0;

while (pending.length > 0) {
    for (const cpu of cpus) {
        if (cpu.current === null && pending.length > 0) {
            cpu.current = pending.shift();
            console.log(`${cpu.id}: starts T${cpu.current.id} (priority ${cpu.current.priority}, burst ${cpu.current.burst})`);
        }
    }

    for (const cpu of cpus) {
        if (cpu.current === null) continue;

        cpu.current.burst--;
        if (cpu.current.burst === 0) {
            console.log(`${cpu.id}: T${cpu.current.id} finishes at time ${time + 1}`);
            cpu.current = null;
        }
    }

    time++;
}

console.log(`\nAll kernel threads completed at time ${time}`);
console.log("Multiple CPUs executed threads concurrently.");
