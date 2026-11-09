// Topic: User-Level Threads
// Concept: A user-level thread library manages many threads inside one kernel thread.
// The kernel sees only one execution context; the library performs cooperative scheduling.
// Use: Lightweight concurrency when kernel thread support is limited.
// Time: O(t) per scheduling round. Space: O(t) for t thread control blocks.

class UserThread {
    constructor(id, work) {
        this.id = id;
        this.remaining = work;
        this.state = "READY";
    }
}

const threads = [
    new UserThread(1, 3),
    new UserThread(2, 2),
    new UserThread(3, 4)
];

console.log("User-Level Threads on One Kernel Thread");
let running = true;

while (running) {
    running = false;

    for (const thread of threads) {
        if (thread.remaining <= 0) continue;

        thread.state = "RUNNING";
        console.log(`Library schedules T${thread.id} (remaining ${thread.remaining})`);
        thread.remaining--;
        console.log(`T${thread.id} yields, remaining ${thread.remaining}`);

        if (thread.remaining === 0) {
            thread.state = "TERMINATED";
            console.log(`T${thread.id} terminated`);
        } else {
            thread.state = "READY";
            running = true;
        }
    }
}

console.log("\nAll user threads completed.");
console.log("The kernel only saw one schedulable entity throughout.");
