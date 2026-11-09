// Topic: Earliest Deadline First (EDF)
// Concept: A dynamic-priority scheduler always runs the ready job with the earliest absolute
// deadline. It is optimal for preemptive uniprocessor real-time scheduling.
// Use: Real-time systems where deadlines are known and tasks can preempt each other.
// Time: O(hyperperiod * tasks). Space: O(jobs).

const tasks = [
    { id: "T1", period: 4, execution: 1 },
    { id: "T2", period: 5, execution: 2 },
    { id: "T3", period: 10, execution: 2 }
];

const hyperperiod = tasks.reduce((lcm, task) => {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    return (lcm * task.period) / gcd(lcm, task.period);
}, 1);

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

console.log("Earliest Deadline First Scheduling");
console.log(`Hyperperiod: ${hyperperiod}`);

let time = 0;
let missed = 0;
const timeline = [];

while (time < hyperperiod) {
    const ready = jobs.filter((job) => !job.completed && job.release <= time);

    if (ready.length === 0) {
        timeline.push("IDLE");
        console.log(`t=${time}: idle`);
        time++;
        continue;
    }

    ready.sort((a, b) => a.deadline - b.deadline);
    const current = ready[0];
    current.remaining--;
    timeline.push(current.id);
    console.log(`t=${time}: ${current.id} (deadline ${current.deadline}, remaining ${current.remaining})`);
    time++;

    if (current.remaining === 0) {
        current.completed = true;
        if (time > current.deadline) {
            missed++;
            console.log(`  ${current.id} MISSED deadline ${current.deadline}`);
        }
    }
}

console.log(`\nTimeline: ${timeline.join(" ")}`);
console.log(`Deadline misses: ${missed}`);
