// Topic: Barrier Synchronization
// Concept: A barrier makes every thread wait until all participating threads have arrived.
// Then all threads are released together.
// Use: Parallel algorithms with phases that must finish before the next phase begins.
// Time: O(n) per barrier for n threads. Space: O(n).

class Barrier {
    constructor(count) {
        this.count = count;
        this.arrived = 0;
        this.generation = 0;
        this.waiting = [];
    }

    arrive(thread, releaseAll) {
        this.arrived++;
        this.waiting.push(thread);
        console.log(`${thread}: arrived at barrier (${this.arrived}/${this.count})`);

        if (this.arrived === this.count) {
            console.log(`Barrier released: all ${this.count} threads proceed`);
            this.arrived = 0;
            this.generation++;
            const released = [...this.waiting];
            this.waiting = [];
            releaseAll(released);
        } else {
            console.log(`${thread}: waiting for other threads`);
        }
    }
}

const barrier = new Barrier(4);

function releaseAll(threads) {
    for (const thread of threads) {
        console.log(`${thread}: resumes phase ${barrier.generation}`);
    }
}

console.log("Barrier Synchronization");
const threads = ["T1", "T2", "T3", "T4"];
for (const thread of threads) {
    barrier.arrive(thread, releaseAll);
}

console.log("\nAll threads are now in the same phase.");
