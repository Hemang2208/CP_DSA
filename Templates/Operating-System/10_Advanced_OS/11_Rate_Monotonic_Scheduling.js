// Topic: Rate Monotonic Scheduling (RMS)
// Concept: Periodic tasks get fixed priorities: shorter period means higher priority.
// RMS is optimal among fixed-priority schedulers under its utilization bound.
// Use: Periodic real-time task sets with fixed priorities.
// Time: O(hyperperiod * tasks). Space: O(tasks).

const tasks = [
    { id: "T1", period: 4, execution: 1 },
    { id: "T2", period: 5, execution: 2 },
    { id: "T3", period: 10, execution: 2 }
];

const hyperperiod = tasks.reduce((lcm, task) => {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    return (lcm * task.period) / gcd(lcm, task.period);
}, 1);

const utilization = tasks.reduce((sum, task) => sum + task.execution / task.period, 0);
const bound = tasks.length * (Math.pow(2, 1 / tasks.length) - 1);

console.log("Rate Monotonic Scheduling");
console.log(`Hyperperiod: ${hyperperiod}`);
console.log(`Utilization: ${utilization.toFixed(3)}, RMS bound: ${bound.toFixed(3)}`);
console.log(`Schedulable by utilization test: ${utilization <= bound}`);
console.log("Note: the utilization bound is sufficient but not necessary; the simulation checks actual deadlines.");

const jobs = [];
for (const task of tasks) {
    for (let release = 0; release < hyperperiod; release += task.period) {
        jobs.push({
            id: task.id,
            release,
            deadline: release + task.period,
            remaining: task.execution,
            completed: false
        });
    }
}

let time = 0;
let missed = 0;
while (time < hyperperiod) {
    const ready = jobs.filter((job) => !job.completed && job.release <= time);

    if (ready.length === 0) {
        console.log(`t=${time}: idle`);
        time++;
        continue;
    }

    ready.sort((a, b) => {
        const periodA = tasks.find((task) => task.id === a.id).period;
        const periodB = tasks.find((task) => task.id === b.id).period;
        return periodA - periodB || a.deadline - b.deadline;
    });

    const current = ready[0];
    current.remaining--;
    console.log(`t=${time}: ${current.id} (deadline ${current.deadline})`);
    time++;

    if (current.remaining === 0) {
        current.completed = true;
        if (time > current.deadline) {
            missed++;
            console.log(`  ${current.id} MISSED deadline ${current.deadline}`);
        }
    }
}

console.log(`\nDeadline misses in hyperperiod: ${missed}`);
