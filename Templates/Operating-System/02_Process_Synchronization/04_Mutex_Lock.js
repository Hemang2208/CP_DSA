// Topic: Mutex Lock Simulation
// Concept: A mutex is a sleep-based lock. A process that cannot acquire it is queued
// until the owner releases the lock.
// Use: Protecting short critical sections in kernels and multithreaded programs.
// Time: O(1) per acquire/release. Space: O(n) for waiting processes.

class Mutex {
    constructor() {
        this.locked = false;
        this.owner = null;
        this.waitQueue = [];
    }

    acquire(pid) {
        if (!this.locked) {
            this.locked = true;
            this.owner = pid;
            console.log(`${pid}: acquired mutex`);
            return true;
        }

        this.waitQueue.push(pid);
        console.log(`${pid}: mutex busy, added to wait queue [${this.waitQueue.join(", ")}]`);
        return false;
    }

    release(pid) {
        if (this.owner !== pid) {
            console.log(`${pid}: cannot release, mutex owned by ${this.owner}`);
            return null;
        }

        if (this.waitQueue.length > 0) {
            const next = this.waitQueue.shift();
            this.owner = next;
            console.log(`${pid}: released mutex, handed ownership to ${next}`);
            return next;
        }

        this.locked = false;
        this.owner = null;
        console.log(`${pid}: released mutex, now free`);
        return null;
    }
}

const mutex = new Mutex();
let counter = 0;

function criticalWork(pid) {
    if (!mutex.acquire(pid)) return;
    counter++;
    console.log(`${pid}: counter = ${counter}`);
    mutex.release(pid);
}

console.log("Mutex Lock Demonstration");
criticalWork("P1");
mutex.acquire("P2");
mutex.acquire("P3");
mutex.release("P2");
mutex.release("P3");

console.log(`Final counter: ${counter}`);
