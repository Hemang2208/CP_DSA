// Topic: Binary Semaphore
// Concept: A binary semaphore has only values 0 and 1. It behaves like a mutex but is
// signaling-oriented and does not require ownership for signal.
// Use: Mutual exclusion and simple event notification.
// Time: O(1) per operation. Space: O(n) for waiters.

class BinarySemaphore {
    constructor() {
        this.value = 1;
        this.waiters = [];
    }

    wait(pid) {
        if (this.value === 1) {
            this.value = 0;
            console.log(`${pid}: entered, binary semaphore = 0`);
            return true;
        }

        this.waiters.push(pid);
        console.log(`${pid}: blocked, waiters = [${this.waiters.join(", ")}]`);
        return false;
    }

    signal(pid) {
        if (this.waiters.length > 0) {
            const next = this.waiters.shift();
            console.log(`${pid}: signaled, ${next} may enter`);
            return next;
        }

        this.value = 1;
        console.log(`${pid}: signaled, binary semaphore = 1`);
        return null;
    }
}

const gate = new BinarySemaphore();

console.log("Binary Semaphore Demonstration");
gate.wait("P1");
gate.wait("P2");
gate.wait("P3");
gate.signal("P1");
gate.signal("P2");
gate.signal("P3");

console.log(`Final value: ${gate.value}`);
