// Topic: Counting Semaphore
// Concept: A counting semaphore tracks multiple identical resources. Its count can be
// greater than one, and waiters are served when resources are returned.
// Use: Managing a pool of buffers, connections, or printer slots.
// Time: O(1) per operation. Space: O(n) for waiters.

class CountingSemaphore {
    constructor(resources) {
        this.available = resources;
        this.waiters = [];
    }

    wait(pid) {
        if (this.available > 0) {
            this.available--;
            console.log(`${pid}: acquired resource, available = ${this.available}`);
            return true;
        }

        this.waiters.push(pid);
        console.log(`${pid}: no resource, blocked (waiters: ${this.waiters.join(", ")})`);
        return false;
    }

    signal(pid) {
        if (this.waiters.length > 0) {
            const next = this.waiters.shift();
            console.log(`${pid}: released resource, ${next} is now unblocked`);
            return next;
        }

        this.available++;
        console.log(`${pid}: released resource, available = ${this.available}`);
        return null;
    }
}

const pool = new CountingSemaphore(3);
const users = ["P1", "P2", "P3", "P4", "P5"];

console.log("Counting Semaphore with 3 resources");
for (const user of users) {
    pool.wait(user);
}

console.log("\nReturning resources:");
pool.signal("P1");
pool.signal("P2");
pool.signal("P3");

console.log(`\nAvailable resources: ${pool.available}`);
console.log(`Still waiting: [${pool.waiters.join(", ")}]`);
