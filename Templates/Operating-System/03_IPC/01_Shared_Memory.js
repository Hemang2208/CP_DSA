// Topic: Shared Memory Simulation
// Concept: Two or more processes map the same memory region into their address spaces.
// Writes by one process are immediately visible to the others.
// Use: Fast IPC for large data, databases, and producer-consumer buffers.
// Time: O(1) per read/write. Space: O(shared region size).

class SharedMemory {
    constructor(size) {
        this.data = new Array(size).fill(null);
        this.attached = new Set();
    }

    attach(pid) {
        this.attached.add(pid);
        console.log(`${pid} attached to shared memory (processes: ${[...this.attached].join(", ")})`);
    }

    detach(pid) {
        this.attached.delete(pid);
        console.log(`${pid} detached from shared memory`);
    }

    write(pid, index, value) {
        if (!this.attached.has(pid)) {
            console.log(`${pid} cannot write: not attached`);
            return;
        }
        this.data[index] = value;
        console.log(`${pid} writes index ${index} = ${value}`);
    }

    read(pid, index) {
        if (!this.attached.has(pid)) {
            console.log(`${pid} cannot read: not attached`);
            return null;
        }
        console.log(`${pid} reads index ${index} = ${this.data[index]}`);
        return this.data[index];
    }
}

const shared = new SharedMemory(5);
console.log("Shared Memory Simulation");
shared.attach("P1");
shared.attach("P2");

shared.write("P1", 0, 42);
shared.read("P2", 0);
shared.write("P2", 1, "hello");
shared.read("P1", 1);

console.log(`\nShared data: [${shared.data.join(", ")}]`);
shared.detach("P1");
shared.read("P1", 0);
shared.detach("P2");
