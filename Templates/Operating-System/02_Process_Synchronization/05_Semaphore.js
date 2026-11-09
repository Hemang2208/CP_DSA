// Topic: Semaphore Implementation
// Concept: A semaphore has an integer count and a wait queue. wait/P decrements or blocks,
// signal/V increments or wakes a blocked process.
// Use: Controlling access to shared resources and signaling between processes.
// Time: O(1) amortized per wait/signal. Space: O(n) for blocked processes.

class Semaphore {
    constructor(count) {
        this.count = count;
        this.queue = [];
    }

    wait(pid) {
        if (this.count > 0) {
            this.count--;
            console.log(`${pid}: wait() succeeded, count = ${this.count}`);
            return true;
        }

        this.queue.push(pid);
        console.log(`${pid}: wait() blocked, queue = [${this.queue.join(", ")}]`);
        return false;
    }

    signal(pid) {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            console.log(`${pid}: signal() woke ${next}, count = ${this.count}`);
            return next;
        }

        this.count++;
        console.log(`${pid}: signal() incremented count to ${this.count}`);
        return null;
    }
}

const semaphore = new Semaphore(2);

console.log("Semaphore with initial count 2");
semaphore.wait("P1");
semaphore.wait("P2");
semaphore.wait("P3");
semaphore.signal("P1");
semaphore.wait("P3");
semaphore.signal("P2");
semaphore.signal("P3");

console.log(`Final semaphore count: ${semaphore.count}`);
console.log(`Waiting queue: [${semaphore.queue.join(", ")}]`);
