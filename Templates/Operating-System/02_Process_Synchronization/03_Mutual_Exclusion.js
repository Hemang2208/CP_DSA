// Topic: Mutual Exclusion
// Concept: Mutual exclusion guarantees that at most one process executes its critical section
// at any instant. A simple lock or token enforces this property.
// Use: Preventing inconsistent updates to shared counters and queues.
// Time: O(1) per lock operation. Space: O(1).

class Lock {
    constructor() {
        this.locked = false;
    }

    acquire(pid) {
        if (this.locked) {
            console.log(`${pid}: acquire failed, lock is held`);
            return false;
        }

        this.locked = true;
        console.log(`${pid}: lock acquired`);
        return true;
    }

    release(pid) {
        this.locked = false;
        console.log(`${pid}: lock released`);
    }
}

const lock = new Lock();
let sharedCounter = 0;

function increment(pid) {
    if (!lock.acquire(pid)) return;

    const oldValue = sharedCounter;
    sharedCounter = oldValue + 1;
    console.log(`${pid}: counter ${oldValue} -> ${sharedCounter}`);

    lock.release(pid);
}

console.log("Mutual Exclusion Demonstration");
increment("P1");
increment("P2");
increment("P3");

console.log(`Final counter: ${sharedCounter}`);
console.log("All increments were serialized, so no update was lost.");

console.log("\nSimulating contention:");
lock.acquire("P4");
lock.acquire("P5");
lock.release("P4");
lock.acquire("P5");
lock.release("P5");
