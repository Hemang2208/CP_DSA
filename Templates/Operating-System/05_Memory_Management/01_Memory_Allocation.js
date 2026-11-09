// Topic: Memory Allocation
// Concept: A memory manager tracks free and used blocks, allocates space to processes,
// and reclaims it on termination.
// Use: Loader and heap management in operating systems.
// Time: O(n) per allocation for n blocks. Space: O(n).

class MemoryManager {
    constructor(blockSizes) {
        this.blocks = blockSizes.map((size, index) => ({
            id: index,
            size,
            free: true,
            process: null
        }));
    }

    allocate(pid, size) {
        const block = this.blocks.find((item) => item.free && item.size >= size);

        if (!block) {
            console.log(`${pid}: allocation of ${size} KB FAILED`);
            return false;
        }

        block.free = false;
        block.process = pid;
        console.log(`${pid}: allocated ${size} KB in block ${block.id} (${block.size} KB)`);
        return true;
    }

    release(pid) {
        const block = this.blocks.find((item) => item.process === pid);
        if (!block) {
            console.log(`${pid}: no allocation found`);
            return;
        }
        block.free = true;
        block.process = null;
        console.log(`${pid}: released block ${block.id}`);
    }

    display() {
        console.log("\nMemory Map:");
        for (const block of this.blocks) {
            const status = block.free ? "FREE" : block.process;
            console.log(`Block ${block.id} [${block.size} KB]: ${status}`);
        }
    }
}

const memory = new MemoryManager([100, 500, 200, 300, 600]);
console.log("Memory Allocation Simulation");
memory.allocate("P1", 212);
memory.allocate("P2", 417);
memory.allocate("P3", 112);
memory.allocate("P4", 426);
memory.display();

memory.release("P2");
memory.allocate("P5", 300);
memory.display();
