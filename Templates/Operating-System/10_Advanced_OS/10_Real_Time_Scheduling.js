// Topic: Real-Time Scheduling
// Concept: Real-time tasks have release times, execution times, and deadlines. A scheduler
// must finish each job before its deadline.
// Use: Embedded controllers, multimedia, and safety-critical systems.
// Time: O(totalTime * tasks). Space: O(tasks).

const tasks = [
    { id: "T1", release: 0, execution: 3, deadline: 6 },
    { id: "T2", release: 1, execution: 2, deadline: 5 },
    { id: "T3", release: 2, execution: 4, deadline: 10 },
    { id: "T4", release: 4, execution: 2, deadline: 8 }
];

const jobs = tasks.map((task) => ({ ...task, remaining: task.execution, completed: false }));
let time = 0;
let missed = 0;
const schedule = [];

console.log("Real-Time Scheduling (Earliest Deadline First)");
while (jobs.some((job) => !job.completed)) {
    const ready = jobs.filter((job) => !job.completed && job.release <= time);

    if (ready.length === 0) {
        console.log(`t=${time}: CPU idle`);
        time++;
        continue;
    }

    ready.sort((a, b) => a.deadline - b.deadline);
    const current = ready[0];
    current.remaining--;
    schedule.push(`${current.id}@${time}`);
    console.log(`t=${time}: run ${current.id} (remaining ${current.remaining}, deadline ${current.deadline})`);
    time++;

    if (current.remaining === 0) {
        current.completed = true;
        const finish = time;
        const status = finish <= current.deadline ? "met" : "MISSED";
        if (finish > current.deadline) missed++;
        console.log(`  ${current.id} finished at ${finish}, deadline ${current.deadline}: ${status}`);
    }
}

console.log(`\nSchedule: ${schedule.join(", ")}`);
console.log(`Total time: ${time}`);
console.log(`Deadline misses: ${missed}`);
