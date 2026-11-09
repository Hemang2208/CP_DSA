// Topic: Deadlock Prevention
// Concept: Prevention breaks at least one Coffman condition. This example breaks hold-and-wait
// by requesting all needed resources at once, or none at all.
// Use: Simple resource managers where atomic allocation is practical.
// Time: O(r) per request for r resource types. Space: O(n * r).

class ResourceManager {
    constructor(resources) {
        this.available = [...resources];
        this.allocated = {};
    }

    requestAll(pid, needs) {
        const canAllocate = needs.every((need, i) => need <= this.available[i]);

        if (!canAllocate) {
            console.log(`${pid}: request [${needs.join(", ")}] DENIED (cannot allocate all resources atomically)`);
            return false;
        }

        for (let i = 0; i < needs.length; i++) {
            this.available[i] -= needs[i];
        }
        this.allocated[pid] = needs;
        console.log(`${pid}: allocated [${needs.join(", ")}], available = [${this.available.join(", ")}]`);
        return true;
    }

    release(pid) {
        const held = this.allocated[pid];
        if (!held) {
            console.log(`${pid}: holds no resources`);
            return;
        }

        for (let i = 0; i < held.length; i++) {
            this.available[i] += held[i];
        }
        delete this.allocated[pid];
        console.log(`${pid}: released [${held.join(", ")}], available = [${this.available.join(", ")}]`);
    }
}

const manager = new ResourceManager([2, 2, 1]);
console.log("Deadlock Prevention by Atomic Allocation");
manager.requestAll("P1", [1, 1, 0]);
manager.requestAll("P2", [1, 1, 1]);
manager.release("P1");
manager.requestAll("P2", [1, 1, 1]);
manager.release("P2");

console.log(`Final available resources: [${manager.available.join(", ")}]`);
console.log("No process holds a resource while waiting for another, so circular wait is impossible.");
