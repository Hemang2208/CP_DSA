// Topic: Thread Synchronization
// Concept: Threads sharing data need mutual exclusion. A mutex ensures only one thread
// updates a shared variable at a time.
// Use: Protecting counters, caches, and shared buffers in multithreaded programs.
// Time: O(1) per lock operation. Space: O(1).

class Mutex {
    constructor() {
        this.locked = false;
        this.owner = null;
    }

    acquire(thread) {
        if (this.locked) {
            console.log(`T${thread}: blocked, mutex owned by T${this.owner}`);
            return false;
        }
        this.locked = true;
        this.owner = thread;
        console.log(`T${thread}: acquired mutex`);
        return true;
    }

    release(thread) {
        if (this.owner !== thread) {
            console.log(`T${thread}: cannot release mutex owned by T${this.owner}`);
            return;
        }
        this.locked = false;
        this.owner = null;
        console.log(`T${thread}: released mutex`);
    }
}

const mutex = new Mutex();
let sharedCounter = 0;

function increment(thread) {
    if (!mutex.acquire(thread)) return;
    const old = sharedCounter;
    sharedCounter = old + 1;
    console.log(`T${thread}: ${old} -> ${sharedCounter}`);
    mutex.release(thread);
}

console.log("Thread Synchronization with a Mutex");
increment(1);
increment(2);
increment(3);

console.log(`\nFinal shared counter: ${sharedCounter}`);

console.log("\nSimulating contention:");
mutex.acquire(1);
mutex.acquire(2);
mutex.release(1);
mutex.acquire(2);
mutex.release(2);
