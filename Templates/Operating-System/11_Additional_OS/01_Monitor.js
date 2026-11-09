// Topic: Monitor
// Concept: A monitor combines shared data with implicit mutual exclusion. Condition variables
// let a thread wait inside the monitor and be signaled when a condition becomes true.
// Use: High-level synchronization in Java, C#, and monitor-based kernels.
// Time: O(1) per enter/leave/wait/signal. Space: O(waiting threads).

class Monitor {
    constructor() {
        this.busy = false;
        this.owner = null;
        this.waitQueue = [];
    }

    enter(thread) {
        if (this.busy) {
            this.waitQueue.push(thread);
            console.log(`${thread}: waits to enter monitor (queue: ${this.waitQueue.join(", ")})`);
            return false;
        }
        this.busy = true;
        this.owner = thread;
        console.log(`${thread}: enters monitor`);
        return true;
    }

    leave(thread) {
        if (this.owner !== thread) {
            console.log(`${thread}: does not own monitor`);
            return;
        }

        if (this.waitQueue.length > 0) {
            this.owner = this.waitQueue.shift();
            console.log(`${thread}: leaves monitor, ${this.owner} enters`);
        } else {
            this.busy = false;
            this.owner = null;
            console.log(`${thread}: leaves monitor, now free`);
        }
    }
}

class Condition {
    constructor(name) {
        this.name = name;
        this.waiters = [];
    }

    wait(thread) {
        this.waiters.push(thread);
        console.log(`${thread}: waits on condition ${this.name}`);
    }

    signal() {
        if (this.waiters.length > 0) {
            const thread = this.waiters.shift();
            console.log(`Signal condition ${this.name}: wakes ${thread}`);
            return thread;
        }
        console.log(`Signal condition ${this.name}: no waiters`);
        return null;
    }
}

const monitor = new Monitor();
const bufferNotEmpty = new Condition("bufferNotEmpty");
const bufferNotFull = new Condition("bufferNotFull");

console.log("Monitor with Condition Variables");
monitor.enter("Producer");
console.log("Producer: buffer is full, must wait");
bufferNotFull.wait("Producer");
monitor.leave("Producer");

monitor.enter("Consumer");
console.log("Consumer: consumes an item");
bufferNotFull.signal();
monitor.leave("Consumer");

monitor.enter("Producer");
console.log("Producer: buffer has space, produces an item");
bufferNotEmpty.signal();
monitor.leave("Producer");

monitor.enter("Consumer");
console.log("Consumer: buffer has an item, consumes it");
monitor.leave("Consumer");

console.log("\nMonitor state:", { busy: monitor.busy, owner: monitor.owner });
console.log("Condition waiters:", {
    bufferNotEmpty: bufferNotEmpty.waiters.length,
    bufferNotFull: bufferNotFull.waiters.length
});
