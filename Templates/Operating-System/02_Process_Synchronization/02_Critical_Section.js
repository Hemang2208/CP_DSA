// Topic: Critical Section Problem
// Concept: A critical section is code that accesses shared data. The solution must provide
// mutual exclusion, progress, and bounded waiting.
// Use: Protecting shared counters, buffers, and kernel data structures.
// Time: O(1) per entry/exit. Space: O(1).

class CriticalSection {
    constructor() {
        this.busy = false;
        this.owner = null;
        this.sharedValue = 0;
    }

    enter(pid) {
        if (this.busy) {
            console.log(`${pid} tries to enter but is BLOCKED by ${this.owner}`);
            return false;
        }

        this.busy = true;
        this.owner = pid;
        console.log(`${pid} ENTERS critical section`);
        return true;
    }

    work(pid, amount) {
        console.log(`${pid} updates shared value: ${this.sharedValue} -> ${this.sharedValue + amount}`);
        this.sharedValue += amount;
    }

    exit(pid) {
        console.log(`${pid} EXITS critical section`);
        this.busy = false;
        this.owner = null;
    }
}

const section = new CriticalSection();

console.log("Critical Section Demonstration");
section.enter("P1");
section.work("P1", 10);
section.enter("P2");
section.work("P1", 5);
section.exit("P1");

section.enter("P2");
section.work("P2", 7);
section.exit("P2");

console.log(`Final shared value: ${section.sharedValue}`);
console.log("Only one process was inside the critical section at a time.");
