// Topic: Swapping
// Concept: When physical memory is full, the OS writes a process's pages to swap space on
// disk and later brings them back when the process is needed again.
// Use: Freeing RAM for higher-priority or newly runnable processes.
// Time: O(memory size) per swap, plus disk I/O. Space: O(process pages).

class Swapper {
    constructor(frameCount) {
        this.memory = new Array(frameCount).fill(null);
        this.swapSpace = [];
        this.swapCount = 0;
    }

    freeFrames() {
        return this.memory.filter((slot) => slot === null).length;
    }

    load(pid, pages) {
        while (this.freeFrames() < pages) {
            this.swapOut();
        }

        for (let page = 0; page < pages; page++) {
            const frame = this.memory.indexOf(null);
            this.memory[frame] = { pid, page };
        }

        console.log(`${pid}: loaded ${pages} pages into memory`);
    }

    swapOut() {
        const victim = this.memory.find((slot) => slot !== null);
        if (!victim) return;

        const pages = this.memory
            .filter((slot) => slot && slot.pid === victim.pid)
            .map((slot) => slot.page);

        this.memory = this.memory.map((slot) =>
            slot && slot.pid === victim.pid ? null : slot
        );

        this.swapSpace.push({ pid: victim.pid, pages });
        this.swapCount++;
        console.log(`Swapped out ${victim.pid} (${pages.length} pages) to disk`);
    }

    swapIn(pid) {
        const index = this.swapSpace.findIndex((entry) => entry.pid === pid);
        if (index === -1) {
            console.log(`${pid}: not in swap space`);
            return;
        }

        const entry = this.swapSpace[index];
        while (this.freeFrames() < entry.pages.length) {
            this.swapOut();
        }

        for (const page of entry.pages) {
            const frame = this.memory.indexOf(null);
            this.memory[frame] = { pid, page };
        }

        this.swapSpace.splice(index, 1);
        console.log(`${pid}: swapped in ${entry.pages.length} pages`);
    }

    display() {
        console.log(`Memory: [${this.memory.map((slot) => (slot ? `${slot.pid}:p${slot.page}` : "FREE")).join(", ")}]`);
        console.log(`Swap: [${this.swapSpace.map((entry) => `${entry.pid}(${entry.pages.length} pages)`).join(", ") || "empty"}]`);
    }
}

const swapper = new Swapper(4);
console.log("Swapping Simulation");
swapper.load("P1", 2);
swapper.load("P2", 2);
swapper.display();

console.log("\nP3 needs memory; a process must be swapped out");
swapper.load("P3", 2);
swapper.display();

console.log("\nP1 is needed again; another process is swapped out");
swapper.swapIn("P1");
swapper.display();

console.log(`Total swap-outs: ${swapper.swapCount}`);
