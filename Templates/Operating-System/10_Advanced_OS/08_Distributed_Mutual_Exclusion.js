// Topic: Distributed Mutual Exclusion Simulation
// Concept: Nodes in a distributed system coordinate access to a shared resource using a
// coordinator or message-based algorithm. This example uses a central coordinator.
// Use: Distributed locks, leader-based coordination, and cluster resource management.
// Time: O(1) per request at the coordinator. Space: O(n) for the request queue.

class Coordinator {
    constructor() {
        this.locked = false;
        this.owner = null;
        this.queue = [];
    }

    request(node) {
        if (!this.locked) {
            this.locked = true;
            this.owner = node;
            console.log(`Coordinator grants lock to ${node}`);
            return true;
        }

        this.queue.push(node);
        console.log(`Coordinator queues ${node} behind ${this.owner}`);
        return false;
    }

    release(node) {
        if (this.owner !== node) {
            console.log(`Coordinator: ${node} does not own the lock`);
            return;
        }

        console.log(`${node} releases the lock`);
        if (this.queue.length > 0) {
            this.owner = this.queue.shift();
            console.log(`Coordinator grants lock to waiting node ${this.owner}`);
        } else {
            this.locked = false;
            this.owner = null;
        }
    }
}

const coordinator = new Coordinator();
console.log("Distributed Mutual Exclusion via Coordinator");
coordinator.request("N1");
coordinator.request("N2");
coordinator.request("N3");
coordinator.release("N1");
coordinator.release("N2");
coordinator.release("N3");

console.log("\nLock free:", !coordinator.locked);
console.log("Queue empty:", coordinator.queue.length === 0);
